import { radarMetricsData } from "../../data/mockData";
export function KeupayaanRadarChart({
  showMetricsList = false,
  compact = false,
}: {
  showMetricsList?: boolean;
  compact?: boolean;
}) {
  const centerX = compact ? 130 : 180;
  const radius = compact ? 88 : 93;
  const point = (i: number, v: number) => ({
    x:
      centerX + (Math.cos(-Math.PI / 2 + (i * Math.PI) / 3) * radius * v) / 100,
    y: 128 + (Math.sin(-Math.PI / 2 + (i * Math.PI) / 3) * radius * v) / 100,
  });
  const polygon = (v: number) =>
    radarMetricsData
      .map((_, i) => {
        const p = point(i, v);
        return `${p.x},${p.y}`;
      })
      .join(" ");
  const labels = compact
    ? [
        { x: 130, y: 19, anchor: "middle" },
        { x: 222, y: 78, anchor: "middle" },
        { x: 222, y: 175, anchor: "middle" },
        { x: 130, y: 225, anchor: "middle" },
        { x: 38, y: 175, anchor: "middle" },
        { x: 38, y: 78, anchor: "middle" },
      ]
    : [
        { x: 180, y: 9, anchor: "middle" },
        { x: 267, y: 77, anchor: "start" },
        { x: 267, y: 172, anchor: "start" },
        { x: 180, y: 218, anchor: "middle" },
        { x: 94, y: 172, anchor: "end" },
        { x: 94, y: 77, anchor: "end" },
      ];
  return (
    <div
      className={`capability-chart ${showMetricsList ? "with-summary" : ""} ${compact ? "compact" : ""}`}
    >
      <svg
        viewBox={compact ? "0 0 260 250" : "0 0 360 250"}
        role="img"
        aria-label="Keupayaan atlet: kelajuan84, kekuatan78, ketangkasan83, daya tahan76, mobiliti80, teknik88"
      >
        {[20, 40, 60, 80, 90, 100].map((v) => (
          <polygon
            key={v}
            points={polygon(v)}
            fill="none"
            stroke="#44474a"
            strokeWidth=".7"
          />
        ))}
        {radarMetricsData.map((_, i) => {
          const p = point(i, 100);
          return (
            <line
              key={i}
              x1={centerX}
              y1="128"
              x2={p.x}
              y2={p.y}
              stroke="#555"
              strokeWidth=".6"
            />
          );
        })}
        <polygon
          points={radarMetricsData
            .map((m, i) => {
              const p = point(i, m.value);
              return `${p.x},${p.y}`;
            })
            .join(" ")}
          fill="#e4ce0c"
          fillOpacity=".35"
          stroke="#f0d313"
          strokeWidth="2"
        />
        {radarMetricsData.map((m, i) => {
          const p = point(i, m.value);
          const l = labels[i];
          return (
            <g key={m.key}>
              <circle cx={p.x} cy={p.y} r="3" fill="#f0d313" />
              <text
                x={l.x}
                y={l.y}
                textAnchor={l.anchor as "middle" | "start" | "end"}
                fill="#f2f2f2"
                fontSize="12"
                fontWeight="500"
              >
                {i === 5 ? "Kec. Teknikal" : m.label}
              </text>
              <text
                className="radar-subtitle"
                x={l.x}
                y={l.y + 13}
                textAnchor={l.anchor as "middle" | "start" | "end"}
                fill="#b5b7bc"
                fontSize="11"
              >
                {m.sublabel}
              </text>
              <text
                x={l.x}
                y={l.y + (compact ? 20 : 30)}
                textAnchor={l.anchor as "middle" | "start" | "end"}
                fill={i >= 4 ? "#3ed987" : "#f0d313"}
                fontSize="18"
                fontWeight="700"
              >
                {m.value}
              </text>
            </g>
          );
        })}
      </svg>
      {showMetricsList && (
        <div className="radar-summary">
          {radarMetricsData.map((m, i) => (
            <div key={m.key}>
              <span>{i === 5 ? "Kec. Teknikal" : m.label}</span>
              <i>
                <b
                  style={{
                    width: `${m.value}%`,
                    background:
                      i >= 4
                        ? "var(--gx-green)"
                        : i === 0 || i === 3
                          ? "var(--gx-yellow)"
                          : "#a6abb2",
                  }}
                />
              </i>
              <strong>{m.value}</strong>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
