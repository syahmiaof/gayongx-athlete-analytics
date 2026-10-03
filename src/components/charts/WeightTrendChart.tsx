import React, { useState } from "react";
import { weightHistoryTrend } from "../../data/mockData";

export const WeightTrendChart: React.FC<{ compact?: boolean }> = ({
  compact = false,
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(4); // default latest

  const width = 360;
  const height = compact ? 120 : 150;
  const padL = 30;
  const padR = 20;
  const padT = 18;
  const padB = 25;

  const chartW = width - padL - padR;
  const chartH = height - padT - padB;

  const minKg = 58;
  const maxKg = 70;

  const points = weightHistoryTrend.map((d, i) => {
    const x = padL + (i / (weightHistoryTrend.length - 1)) * chartW;
    const y = padT + chartH - ((d.weight - minKg) / (maxKg - minKg)) * chartH;
    return { x, y, ...d };
  });

  const pathD = points.reduce((acc, pt, i) => {
    if (i === 0) return `M ${pt.x} ${pt.y}`;
    const prev = points[i - 1];
    const cx = prev.x + (pt.x - prev.x) / 2;
    return `${acc} C ${cx} ${prev.y}, ${cx} ${pt.y}, ${pt.x} ${pt.y}`;
  }, "");

  // Target range band (60 - 65 kg)
  const targetTopY = padT + chartH - ((65 - minKg) / (maxKg - minKg)) * chartH;
  const targetBottomY =
    padT + chartH - ((60 - minKg) / (maxKg - minKg)) * chartH;

  return (
    <div className="w-full">
      <div className="relative w-full h-[140px]">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible select-none"
          preserveAspectRatio="none"
        >
          {/* Target Zone Background Band */}
          <rect
            x={padL}
            y={targetTopY}
            width={chartW}
            height={targetBottomY - targetTopY}
            fill="#16C172"
            fillOpacity="0.08"
          />
          {/* Target Zone Boundary Lines */}
          <line
            x1={padL}
            y1={targetTopY}
            x2={width - padR}
            y2={targetTopY}
            stroke="#16C172"
            strokeWidth="1"
            strokeDasharray="3 3"
            strokeOpacity="0.6"
          />
          <line
            x1={padL}
            y1={targetBottomY}
            x2={width - padR}
            y2={targetBottomY}
            stroke="#16C172"
            strokeWidth="1"
            strokeDasharray="3 3"
            strokeOpacity="0.6"
          />
          <text
            x={padL + 5}
            y={targetTopY - 4}
            textAnchor="start"
            fill="#16C172"
            fontSize="8.5"
            fontWeight="bold"
          >
            Julat Target (60 - 65 kg)
          </text>

          {/* Y Axis Grid Lines */}
          {[58, 62, 66, 70].map((kg) => {
            const y = padT + chartH - ((kg - minKg) / (maxKg - minKg)) * chartH;
            return (
              <g key={kg}>
                <line
                  x1={padL}
                  y1={y}
                  x2={width - padR}
                  y2={y}
                  stroke="#1E2632"
                  strokeWidth="0.8"
                />
                <text
                  x={padL - 6}
                  y={y + 3}
                  textAnchor="end"
                  fill="#6B7280"
                  fontSize="8.5"
                  fontFamily="JetBrains Mono, monospace"
                >
                  {kg}
                </text>
              </g>
            );
          })}

          {/* Trend Line */}
          <path
            d={pathD}
            fill="none"
            stroke="#16C172"
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          {/* Points */}
          {points.map((pt, i) => {
            const isHovered = hoveredIdx === i;
            return (
              <g
                key={i}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIdx(i)}
                onClick={() => setHoveredIdx(i)}
              >
                <circle cx={pt.x} cy={pt.y} r="12" fill="transparent" />
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isHovered ? 4.5 : 3}
                  fill={isHovered ? "#FFFFFF" : "#16C172"}
                  stroke="#16C172"
                  strokeWidth="2"
                />

                {isHovered && (
                  <g transform={`translate(${pt.x}, ${pt.y - 14})`}>
                    <rect
                      x="-18"
                      y="-14"
                      width="36"
                      height="15"
                      rx="3"
                      fill="#16C172"
                    />
                    <text
                      x="0"
                      y="-3.5"
                      textAnchor="middle"
                      fill="#050608"
                      fontSize="9"
                      fontWeight="bold"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      {pt.weight}kg
                    </text>
                  </g>
                )}

                <text
                  x={pt.x}
                  y={padT + chartH + 14}
                  textAnchor="middle"
                  fill={isHovered ? "#FFFFFF" : "#9CA3AF"}
                  fontSize="8.5"
                >
                  {pt.date}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};
