"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

type ReactiveCloudProps = {
  className: string;
};

type FallingStar = {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  drift: number;
  color: string;
  rotation: number;
};

export default function ReactiveCloud({ className }: ReactiveCloudProps) {
  const cloudRef = useRef<HTMLDivElement | null>(null);
  const clickCount = useRef(0);
  const clickResetTimer = useRef<number | null>(null);
  const nextStarId = useRef(1);
  const lastTapTime = useRef(0);

  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isPopping, setIsPopping] = useState(false);
  const [stars, setStars] = useState<FallingStar[]>([]);

  useEffect(() => {
    function handleMouseMove(event: MouseEvent) {
      const cloud = cloudRef.current;
      if (!cloud) return;

      const rect = cloud.getBoundingClientRect();

      const cloudCenterX = rect.left + rect.width / 2;
      const cloudCenterY = rect.top + rect.height / 2;

      const distanceX = event.clientX - cloudCenterX;
      const distanceY = event.clientY - cloudCenterY;

      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      const reactionDistance = 260;

      if (distance < reactionDistance) {
        const strength = (reactionDistance - distance) / reactionDistance;

        setOffset({
          x: -distanceX * strength * 0.18,
          y: -distanceY * strength * 0.18,
        });
      } else {
        setOffset({ x: 0, y: 0 });
      }
    }

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  function handleCloudPress() {
    const now = Date.now();

    // 防止手机 touch + pointer 触发两次
    if (now - lastTapTime.current < 120) return;

    lastTapTime.current = now;

    setIsPopping(true);

    window.setTimeout(() => {
      setIsPopping(false);
    }, 320);

    clickCount.current += 1;

    if (clickResetTimer.current) {
      window.clearTimeout(clickResetTimer.current);
    }

    clickResetTimer.current = window.setTimeout(() => {
      clickCount.current = 0;
    }, 1600);

    if (clickCount.current >= 5) {
      clickCount.current = 0;
      createStarRain();
    }
  }

  function createStarRain() {
    const cloud = cloudRef.current;
    if (!cloud) return;

    const rect = cloud.getBoundingClientRect();

    const starColors = [
      "#f3daff",
      "#d5e6f5",
      "#daffd6",
      "#ff9999",
      "#fffab4",
    ];

    const newStars: FallingStar[] = Array.from({ length: 38 }).map(() => {
      return {
        id: nextStarId.current++,
        x: rect.left + Math.random() * rect.width,
        y: rect.top + rect.height * 0.45 + Math.random() * rect.height * 0.35,
        size: 5 + Math.random() * 16,
        delay: Math.random() * 0.45,
        duration: 1.5 + Math.random() * 1.35,
        drift: -70 + Math.random() * 140,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        rotation: Math.random() * 360,
      };
    });

    setStars((previousStars) => [...previousStars, ...newStars].slice(-120));

    window.setTimeout(() => {
      setStars((previousStars) =>
        previousStars.filter(
          (star) => !newStars.some((newStar) => newStar.id === star.id)
        )
      );
    }, 3600);
  }

  return (
    <>
      {stars.map((star) => (
        <span
          key={star.id}
          className="falling-star"
          style={
            {
              left: `${star.x}px`,
              top: `${star.y}px`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              background: star.color,
              "--star-delay": `${star.delay}s`,
              "--star-duration": `${star.duration}s`,
              "--star-drift": `${star.drift}px`,
              "--star-rotation": `${star.rotation}deg`,
            } as CSSProperties
          }
        />
      ))}

      <div
        ref={cloudRef}
        className={`cloud-wrap ${className} ${isPopping ? "cloud-popping" : ""}`}
        style={
          {
            "--push-x": `${offset.x}px`,
            "--push-y": `${offset.y}px`,
          } as CSSProperties
        }
      >
        <button
          type="button"
          className="cloud-hit-area"
          aria-label="tap cloud"
          onPointerDown={(event) => {
            event.preventDefault();
            handleCloudPress();
          }}
          onTouchStart={(event) => {
            event.preventDefault();
            handleCloudPress();
          }}
        />

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
    </>
  );
}