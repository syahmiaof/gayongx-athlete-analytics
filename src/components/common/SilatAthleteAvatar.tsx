export function SilatAthleteAvatar({
  className = "",
  size = "hero",
}: {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "hero";
}) {
  const dimensions = { sm: 40, md: 56, lg: 80, xl: 96, hero: 150 };
  return (
    <img
      src="/assets/athlete-demo.png"
      alt="Visual atlet silat demonstrasi"
      className={`athlete-avatar ${className}`}
      style={{
        width: dimensions[size],
        height: dimensions[size],
        objectFit: "cover",
      }}
    />
  );
}
