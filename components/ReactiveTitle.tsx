"use client";

import { useEffect, useState } from "react";

const titleText = "PHILLIPE PHILLOPE";

export default function ReactiveTitle() {
  const [isWindy, setIsWindy] = useState(false);

  useEffect(() => {
    function handleMouseMove(event: MouseEvent) {
      const title = document.querySelector(".brand");
      if (!title) return;

      const rect = title.getBoundingClientRect();

      const titleCenterX = rect.left + rect.width / 2;
      const titleCenterY = rect.top + rect.height / 2;

      const distanceX = event.clientX - titleCenterX;
      const distanceY = event.clientY - titleCenterY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance < 180) {
        setIsWindy(true);
      } else {
        setIsWindy(false);
      }
    }

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <h1 className={`brand ${isWindy ? "brand-windy" : ""}`}>
      {titleText.split("").map((letter, index) => (
        <span
          key={`${letter}-${index}`}
          style={
            {
              "--letter-index": index,
            } as React.CSSProperties
          }
        >
          {letter === " " ? "\u00A0" : letter}
        </span>
      ))}
    </h1>
  );
}