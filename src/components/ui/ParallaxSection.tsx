"use client";

import { ParallaxLayer } from "@/lib/parallax";

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: "up" | "down";
  background?: React.ReactNode;
  backgroundClassName?: string;
}

export function ParallaxSection({
  children,
  className = "",
  speed = 0.3,
  direction = "up",
  background,
  backgroundClassName = "",
}: ParallaxSectionProps) {
  const move = direction === "up" ? speed * 100 : -speed * 100;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {background && (
        <ParallaxLayer
          y={{ pts: [0, 1], vals: [0, move] }}
          className={`absolute inset-0 ${backgroundClassName}`}
        >
          {background}
        </ParallaxLayer>
      )}
      <ParallaxLayer
        opacity={{ pts: [0, 0.3, 0.7, 1], vals: [0, 1, 1, 0] }}
        className="relative z-10"
      >
        {children}
      </ParallaxLayer>
    </div>
  );
}