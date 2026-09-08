"use client";

import {
  createElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import type { CSSProperties, ReactNode, RefObject } from "react";

interface Transition {
  duration?: number;
  delay?: number;
  ease?: string | number[];
  repeat?: number | "Infinity";
  type?: string;
  stiffness?: number;
  damping?: number;
}

interface ViewportOpts {
  once?: boolean;
  margin?: string;
}

type Target = Record<string, number | string | (number | string)[]>;

interface MotionProps {
  initial?: Target;
  animate?: Target;
  whileInView?: Target;
  whileHover?: Target;
  transition?: Transition;
  viewport?: ViewportOpts;
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
  [key: string]: unknown;
}

const TRANSFORM_PROPS = ["x", "y", "scale", "scaleX", "scaleY", "rotate"];

const DEFAULTS: Record<string, number | string> = {
  opacity: 1,
  x: 0,
  y: 0,
  scale: 1,
  scaleX: 1,
  scaleY: 1,
  rotate: 0,
};

function buildTransform(values: Record<string, number | string>): string {
  const parts: string[] = [];
  const bind = {
    y: (v: number) => parts.push(`translateY(${v}px)`),
    x: (v: number) => parts.push(`translateX(${v}px)`),
    scale: (v: number) => parts.push(`scale(${v})`),
    scaleX: (v: number) => parts.push(`scaleX(${v})`),
    scaleY: (v: number) => parts.push(`scaleY(${v})`),
    rotate: (v: number) => parts.push(`rotate(${v}deg)`),
  };
  for (const key of TRANSFORM_PROPS) {
    const value = values[key];
    if (typeof value === "number") bind[key as keyof typeof bind](value);
  }
  return parts.join(" ");
}

function cssName(prop: string): string {
  if (prop === "transform" || prop === "opacity") return prop;
  return prop.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

function buildKeyframes(
  from: Target,
  to: Target,
): Array<Record<string, number | string>> {
  const keys = new Set([...Object.keys(from ?? {}), ...Object.keys(to ?? {})]);
  let length = 1;
  for (const key of keys) {
    const target = to[key] !== undefined ? to[key] : from[key];
    if (Array.isArray(target)) {
      length = Math.max(length, target.length);
    } else {
      length = Math.max(length, 2);
    }
  }

  const transforms: Array<Record<string, number | string>> = Array.from(
    { length },
    () => ({}),
  );
  const styles: Array<Record<string, number | string>> = Array.from(
    { length },
    () => ({}),
  );

  for (const key of keys) {
    const target = to[key] ?? from[key];
    const initial = from[key];
    const valueAt = (index: number): number | string | undefined => {
      if (Array.isArray(target)) {
        return target[Math.min(index, target.length - 1)];
      }
      if (index === 0) {
        return initial !== undefined ? (initial as number | string) : DEFAULTS[key];
      }
      return target as number | string;
    };
    for (let i = 0; i < length; i++) {
      const value = valueAt(i);
      if (value === undefined || value === null) continue;
      if (TRANSFORM_PROPS.includes(key)) {
        transforms[i][key] = value;
      } else {
        styles[i][cssName(key)] = value;
      }
    }
  }

  return styles.map((frame, i) => {
    const transform = buildTransform(transforms[i]);
    if (transform) frame.transform = transform;
    return frame;
  });
}

function mapEase(ease?: string | number[]): string {
  if (typeof ease === "string") {
    if (ease === "easeOut") return "cubic-bezier(0, 0, 0.2, 1)";
    if (ease === "easeIn") return "cubic-bezier(0.4, 0, 1, 1)";
    if (ease === "easeInOut") return "cubic-bezier(0.42, 0, 0.58, 1)";
    return ease;
  }
  if (Array.isArray(ease)) return `cubic-bezier(${ease.join(", ")})`;
  return "cubic-bezier(0.25, 0.1, 0.25, 1)";
}

function transformFromStyle(style: CSSProperties | undefined): {
  transform: string;
  rest: CSSProperties;
} {
  const base = { ...(style ?? {}) } as Record<string, unknown>;
  const values: Record<string, number> = {};
  for (const key of TRANSFORM_PROPS) {
    const value = base[key];
    if (typeof value === "number") {
      values[key] = value;
      delete base[key];
    }
  }
  const transform = buildTransform(values);
  return { transform, rest: base as CSSProperties };
}

function runAnimation(
  element: Element,
  from: Target,
  to: Target,
  transition: Transition | undefined,
): Animation | undefined {
  const keyframes = buildKeyframes(from ?? {}, to ?? {});
  if (keyframes.length === 0) return undefined;
  return element.animate(keyframes, {
    duration: (transition?.duration ?? 0.5) * 1000,
    delay: (transition?.delay ?? 0) * 1000,
    easing:
      transition?.type === "spring"
        ? "cubic-bezier(0.34, 1.56, 0.64, 1)"
        : mapEase(transition?.ease),
    iterations: transition?.repeat === "Infinity" ? Infinity : transition?.repeat ?? 1,
    fill: "both",
  });
}

function cancelAnimations(element: Element) {
  for (const animation of element.getAnimations()) animation.cancel();
}

function isInInitialViewport(element: Element): boolean {
  const rect = element.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}

function startsHidden(initial: Target | undefined): boolean {
  return !!initial && initial.opacity === 0;
}

function createMotionComponent(tag: string) {
  function MotionComponent(props: MotionProps) {
    const {
      initial,
      animate,
      whileInView,
      whileHover,
      transition,
      viewport,
      style,
      className,
      children,
      ...rest
    } = props;

    const elementRef = useRef<Element | null>(null);
    const animationRef = useRef<Animation | undefined>(undefined);
    const hoverAnimationRef = useRef<Animation | undefined>(undefined);

    const animateTo = useCallback(
      (from: Target, to: Target, enabledOnce = false) => {
        const element = elementRef.current;
        if (!element) return undefined;
        if (enabledOnce) {
          cancelAnimations(element);
        }
        animationRef.current = runAnimation(element, from, to, transition);
        return animationRef.current;
      },
      [transition],
    );

    useEffect(() => {
      if (!animate) return;
      const element = elementRef.current;
      if (!element) return;
      // Above-the-fold entrance animations would first hide the LCP content
      // (server-rendered visible), delaying LCP. Skip them once.
      if (startsHidden(initial) && isInInitialViewport(element)) return;
      cancelAnimations(element);
      animationRef.current = runAnimation(element, initial ?? {}, animate, transition);
    }, [animate, initial, transition]);

    useEffect(() => {
      if (whileInView) {
        const element = elementRef.current;
        if (!element) return;
        let firstEntry = true;
        const observer = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (entry.isIntersecting) {
                if (firstEntry) {
                  firstEntry = false;
                  // Already visible at load: no reveal animation needed (LCP).
                  continue;
                }
                animateTo(initial ?? {}, whileInView, true);
              } else if (!viewport?.once && animationRef.current) {
                animationRef.current.reverse();
              }
            }
          },
          { rootMargin: viewport?.margin ?? "0px", threshold: 0 },
        );
        observer.observe(element);
        return () => observer.disconnect();
      }
      return undefined;
    }, [whileInView, viewport, initial, animateTo]);

    useEffect(() => {
      if (whileHover) {
        const element = elementRef.current;
        if (!element) return;
        const onEnter = () => {
          cancelAnimations(element);
          hoverAnimationRef.current = runAnimation(element, {}, whileHover, {
            duration: 0.2,
          });
        };
        const onLeave = () => {
          if (hoverAnimationRef.current) {
            hoverAnimationRef.current.reverse();
          }
        };
        element.addEventListener("mouseenter", onEnter);
        element.addEventListener("mouseleave", onLeave);
        return () => {
          element.removeEventListener("mouseenter", onEnter);
          element.removeEventListener("mouseleave", onLeave);
        };
      }
      return undefined;
    }, [whileHover]);

    const { transform, rest: styledProps } = transformFromStyle(style);

    return createElement(
      tag,
      {
        ...rest,
        className,
        style: {
          ...styledProps,
          ...(transform ? { transform } : {}),
        },
      } as Record<string, unknown>,
      children,
    );
  }

  return MotionComponent;
}

export const motion: Record<
  string,
  (props: MotionProps) => ReactNode
> = new Proxy({} as Record<string, never>, {
  get: (_target, tag) =>
    typeof tag === "string" ? createMotionComponent(tag) : undefined,
}) as unknown as Record<string, (props: MotionProps) => ReactNode>;

export function useInView(
  ref: RefObject<Element | null>,
  options?: { once?: boolean; margin?: string },
): boolean {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            if (options?.once) observer.disconnect();
          } else if (!options?.once) {
            setInView(false);
          }
        }
      },
      { rootMargin: options?.margin, threshold: 0.1 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, options?.once, options?.margin]);
  return inView;
}