"use client";

import { useEffect, useRef, useState } from "react";

type TrailPoint = {
  id: number;
  x: number;
  y: number;
  createdAt: number;
};

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isClicking, setIsClicking] = useState(false);
  const [lineTrail, setLineTrail] = useState<TrailPoint[]>([]);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const trailActiveUntil = useRef(0);
  const nextId = useRef(1);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: none), (pointer: coarse)");

    function updateInputMode() {
      setIsTouchDevice(mediaQuery.matches);
    }

    updateInputMode();

    mediaQuery.addEventListener("change", updateInputMode);

    function handleMouseMove(event: MouseEvent) {
      const x = event.clientX;
      const y = event.clientY;
      const now = Date.now();

      setPosition({ x, y });

      const elementsUnderPointer = document.elementsFromPoint(x, y);
      const isTouchingCloud = elementsUnderPointer.some((element) =>
        (element as HTMLElement).closest(".cloud-wrap")
      );

      if (isTouchingCloud) {
        const wasTrailInactive = now >= trailActiveUntil.current;

        if (wasTrailInactive) {
          setLineTrail([]);
        }

        trailActiveUntil.current = now + 2000;
      }

      const isTrailActive = now < trailActiveUntil.current;

      if (isTrailActive) {
        const newPoint: TrailPoint = {
          id: nextId.current++,
          x,
          y,
          createdAt: now,
        };

        setLineTrail((previousTrail) => [...previousTrail, newPoint].slice(-56));
      }
    }

    function handleMouseDown() {
      setIsClicking(true);
    }

    function handleMouseUp() {
      setIsClicking(false);
    }

    const cleanupInterval = window.setInterval(() => {
      const now = Date.now();

      setLineTrail((previousTrail) =>
        previousTrail.filter((point) => now - point.createdAt < 2200)
      );
    }, 60);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      mediaQuery.removeEventListener("change", updateInputMode);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.clearInterval(cleanupInterval);
    };
  }, []);

  if (isTouchDevice) {
    return null;
  }
  return (
    <>
      <svg className="plane-line-layer">
        {lineTrail.map((point, index) => {
          const nextPoint = lineTrail[index + 1];

          if (!nextPoint) return null;

          const age = Date.now() - point.createdAt;
          const ageProgress = Math.min(age / 2200, 1);

          const totalSegments = Math.max(lineTrail.length - 1, 1);
          const headProgress = index / totalSegments;
          const headStrength = Math.pow(headProgress, 1.8);

          const ageFade = Math.pow(1 - ageProgress, 1.35);

          const opacity = 0.06 + 0.94 * headStrength * ageFade;
          const strokeWidth = 0.22 + 0.95 * headStrength;

          return (
            <line
              key={point.id}
              x1={point.x}
              y1={point.y}
              x2={nextPoint.x}
              y2={nextPoint.y}
              style={{
                opacity,
                strokeWidth,
              }}
            />
          );
        })}
      </svg>

      <div
        className={`custom-cursor ${isClicking ? "cursor-clicking" : ""}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      >
        <div className="paper-plane">
          <span className="plane-wing plane-wing-main" />
          <span className="plane-wing plane-wing-top" />
          <span className="plane-wing plane-wing-bottom" />
          <span className="plane-fold" />
        </div>
      </div>
    </>
  );
}