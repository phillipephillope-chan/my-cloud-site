const sparkleColors = [
  "#f3daff",
  "#d5e6f5",
  "#daffd6",
  "#ff9999",
  "#fffab4",
];

const sparkles = Array.from({ length: 32 }).map((_, index) => ({
  id: index,
  left: 5 + Math.random() * 90,
  top: 8 + Math.random() * 78,
  size: 4 + Math.random() * 6,
  delay: Math.random() * 8,
  duration: 5 + Math.random() * 5,
  color: sparkleColors[index % sparkleColors.length],
}));

export default function SkySparkles() {
  return (
    <div className="sky-sparkles" aria-hidden="true">
      {sparkles.map((sparkle) => (
        <span
          key={sparkle.id}
          className="sky-sparkle"
          style={
            {
              left: `${sparkle.left}%`,
              top: `${sparkle.top}%`,
              width: `${sparkle.size}px`,
              height: `${sparkle.size}px`,
              background: sparkle.color,
              "--sparkle-delay": `${sparkle.delay}s`,
              "--sparkle-duration": `${sparkle.duration}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}