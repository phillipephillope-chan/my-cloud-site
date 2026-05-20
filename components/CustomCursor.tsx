"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({
    x: -100,
    y: -100,
  });

  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    function handleMouseMove(event: MouseEvent) {
      setPosition({
        x: event.clientX,
        y: event.clientY,
      });
    }

    function handleMouseDown() {
      setIsClicking(true);
    }

    function handleMouseUp() {
      setIsClicking(false);
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div
      className={`custom-cursor ${isClicking ? "cursor-clicking" : ""}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    />
  );
}