import { ReactNode } from "react";

interface MagicBentoProps {
  children: ReactNode;
  textAutoHide?: boolean;
  enableStars?: boolean;
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  enableTilt?: boolean;
  enableMagnetism?: boolean;
  clickEffect?: boolean;
  spotlightRadius?: number;
  particleCount?: number;
  glowColor?: string;
}

export default function MagicBento({
  children,
  textAutoHide = true,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  enableTilt = true,
  enableMagnetism = true,
  clickEffect = true,
  spotlightRadius = 300,
  particleCount = 12,
  glowColor = "132, 0, 255"
}: MagicBentoProps) {
  return (
    <div
      className={`relative p-4 rounded-2xl transition-all duration-500`}
      style={{
        boxShadow: enableBorderGlow
          ? `0 0 20px rgba(${glowColor}, 0.6)`
          : "none",
        transform: enableTilt ? "perspective(1000px) rotateX(2deg)" : "none",
        background: "rgba(255, 255, 255, 0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      {/* Stars / particles */}
      {enableStars && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(particleCount)].map((_, i) => (
            <span
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: 0.7,
              }}
            />
          ))}
        </div>
      )}

      {/* Spotlight effect */}
      {enableSpotlight && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle ${spotlightRadius}px at center, rgba(${glowColor},0.2), transparent 70%)`
          }}
        />
      )}

      {/* Content inside the bento card */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
