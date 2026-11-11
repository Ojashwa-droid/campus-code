export function StaticDotGrid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-20"
      style={{
        backgroundImage: "radial-gradient(circle, rgba(161, 161, 170, 0.65) 1px, transparent 1.15px)",
        backgroundSize: "20px 20px",
        opacity: 0.07,
      }}
    />
  );
}
