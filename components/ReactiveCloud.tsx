"use client";

import { useEffect, useRef, useState } from "react";

type ReactiveCloudProps = {
  className: string;
};

export default function ReactiveCloud({ className }: ReactiveCloudProps) {
  const cloudRef = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isPopping, setIsPopping] = useState(false);

  useEffect(() => {
    function handleMouseMove(event: MouseEvent) {
      const cloud = cloudRef.current;
      if (!cloud) return;

      const rect = cloud.getBoundingClientRect();

      const cloudCenterX = rect.left + rect.width / 2;
      const cloudCenterY = rect.top + rect.height / 2;

      const mouseX = event.clientX;
      const mouseY = event.clientY;

      const distanceX = mouseX - cloudCenterX;
      const distanceY = mouseY - cloudCenterY;

      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      const reactionDistance = 260;

      if (distance < reactionDistance) {
        const strength = (reactionDistance - distance) / reactionDistance;

        const pushX = -distanceX * strength * 0.18;
        const pushY = -distanceY * strength * 0.18;

        setOffset({
          x: pushX,
          y: pushY,
        });
      } else {
        setOffset({
          x: 0,
          y: 0,
        });
      }
    }

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
        ref={cloudRef}
        className={`cloud-wrap ${className} ${isPopping ? "cloud-popping" : ""}`}
        onClick={() => {
            setIsPopping(true);

            window.setTimeout(() => {
                setIsPopping(false);
            }, 320);
        }}
      style={{
        "--push-x": `${offset.x}px`,
        "--push-y": `${offset.y}px`,
      } as React.CSSProperties}
    >
      <div className="cloud-shape">
        <div className="cloud-pop-layer">
        <div className="facet f1" />
        <div className="facet f2" />
        <div className="facet f3" />
        <div className="facet f4" />
        <div className="facet f5" />
        <div className="facet f6" />
        <div className="facet f7" />
    </div>
</div>
    </div>
  );
}