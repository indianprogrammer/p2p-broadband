"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";

interface Range {
  pts: number[];
  vals: number[];
}

interface ParallaxLayerProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  y?: Range;
  scale?: Range;
  opacity?: Range;
}

function piecewise(p: number, pts: number[], vals: number[]): number {
  if (p <= pts[0]) return vals[0];
  const last = pts.length - 1;
  if (p >= pts[last]) return vals[last];
  let hi = 1;
  while (pts[hi] < p) hi += 1;
  const lo = hi - 1;
  const t = (p - pts[lo]) / (pts[hi] - pts[lo] || 1);
  return vals[lo] + (vals[hi] - vals[lo]) * t;
}

export function ParallaxLayer({
  children,
  className,
  style,
  y,
  scale,
  opacity,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let raf = 0;
    const tick = () => {
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const progress = Math.min(
        1,
        Math.max(0, (viewportHeight - rect.top) / (viewportHeight + rect.height)),
      );
      const transforms: string[] = [];
      if (y) transforms.push(`translateY(${piecewise(progress, y.pts, y.vals)}px)`);
      if (scale) transforms.push(`scale(${piecewise(progress, scale.pts, scale.vals)})`);
      if (transforms.length) element.style.transform = transforms.join(" ");
      if (opacity) element.style.opacity = String(piecewise(progress, opacity.pts, opacity.vals));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [y, scale, opacity]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}