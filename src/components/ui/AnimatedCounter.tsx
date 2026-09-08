"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "@/lib/motion";

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  format?: "number" | "compact" | "decimal";
  className?: string;
}

export function AnimatedCounter({
  end,
  duration = 2,
  suffix = "",
  prefix = "",
  format = "number",
  className = "",
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const hasAnimated = useRef(false);

  const formatNumber = (num: number) => {
    switch (format) {
      case "compact":
        if (num >= 10000) return `${(num / 1000).toFixed(0)}k+`;
        return num.toLocaleString();
      case "decimal":
        return num.toFixed(1);
      default:
        return num.toLocaleString();
    }
  };

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      const startTime = Date.now();
      const step = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / (duration * 1000), 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(easeOut * end));
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };
      requestAnimationFrame(step);
    }
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatNumber(count)}
      {suffix}
    </span>
  );
}
