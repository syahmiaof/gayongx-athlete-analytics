import { useId, useState } from "react";
import {
  prestasiMonthlyData,
  performanceSampleScores,
} from "../../data/mockData";
type Metric = "score" | "kekuatan" | "dayaTahan" | "ketepatan";
export function PrestasiLineChart({ compact = false }: { compact?: boolean }) {
  const [metric, setMetric] = useState<Metric>("score");
  const [period, setPeriod] = useState("3");
  const [hover, setHover] = useState<number | null>(null);
  const id = useId();
  // The default golden view is the six-month context; the selected period highlights its trailing window.
  const data =
    period === "1" ? prestasiMonthlyData.slice(-3) : prestasiMonthlyData;
  const monthlyPoints = data.flatMap((d, i) => {
    const x = 38 + i * (492 / (data.length - 1));
    const y = 167 - d[metric] * 1.37;
    return i < data.length - 1
      ? [
          { x, y, v: d[metric], month: d.month },
          {
            x: x + 492 / (data.length - 1) / 2,
            y: (y + 167 - data[i + 1][metric] * 1.37) / 2 + (i % 2 ? 3 : -4),
            v: Math.round((d[metric] + data[i + 1][metric]) / 2),
            month: "",
          },
        ]
      : [{ x, y, v: d[metric], month: d.month }];
  });
  const monthPositions: Record<number, string> = {
    0: "Jan",
    2: "Feb",
    5: "Mac",
    8: "Apr",
    10: "Mei",
    13: "Jun",
  };
  const pts =
    metric === "score" && period !== "1"
      ? performanceSampleScores.map((v, i) => ({
          x: 38 + (i * 492) / (performanceSampleScores.length - 1),
          y: 167 - v * 1.37,
          v,
          month: monthPositions[i] ?? "",
        }))
      : monthlyPoints;
  const line = pts.map((p, i) => `${i ? "L" : "M"}${p.x},${p.y}`).join(" ");
  const selected = pts[hover ?? pts.length - 1];
  return (
    <div className={`performance-chart ${compact ? "compact" : ""}`}>
      <div className="performance-controls">
        <div className="chart-tabs">
          {(
            [
              { key: "score", label: "SCORE PRESTASI" },
              { key: "kekuatan", label: "KEKUATAN" },
              { key: "dayaTahan", label: "DAYA TAHAN" },
              { key: "ketepatan", label: compact ? "TEKNIK" : "KETEPATAN" },
            ] as const
          ).map((t) => (
            <button
              key={t.key}
              aria-pressed={metric === t.key}
              className={metric === t.key ? "active" : ""}
              onClick={() => {
                setMetric(t.key);
                setHover(null);
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
        <select
          aria-label="Tempoh prestasi"
          value={period}
          onChange={(e) => {
            setPeriod(e.target.value);
            setHover(null);
          }}
        >
          <option value="3">3 Bulan Terakhir</option>
          <option value="6">6 Bulan Terakhir</option>
          <option value="1">Apr – Jun 2024</option>
        </select>
      </div>
      <svg
        viewBox="0 0 560 194"
        preserveAspectRatio="none"
        role="img"
        aria-label={`Trend ${metric}, skor terkini ${data.at(-1)?.[metric]}`}
      >
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#e61e2b" stopOpacity=".2" />
            <stop offset="1" stopColor="#e61e2b" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 20, 40, 60, 80, 100].map((v) => (
          <g key={v}>
            <line
              x1="38"
              y1={167 - v * 1.37}
              x2="548"
              y2={167 - v * 1.37}
              stroke="#292b2d"
              strokeWidth=".7"
              strokeDasharray={v ? "2 3" : undefined}
            />
            <text x="9" y={171 - v * 1.37} fill="#afb2b6" fontSize="11">
              {v}
            </text>
          </g>
        ))}
        <path d={`${line} L530,167 L38,167Z`} fill={`url(#${id})`} />
        {period === "3" && (
          <rect
            x="285"
            y="22"
            width="260"
            height="147"
            fill="white"
            opacity=".013"
          />
        )}
        <path d={line} fill="none" stroke="#ee273a" strokeWidth="2" />
        {pts.map((p, i) => (
          <g
            key={i}
            onMouseEnter={() => setHover(i)}
            onClick={() => setHover(i)}
          >
            <circle cx={p.x} cy={p.y} r="12" fill="transparent" />
            <circle cx={p.x} cy={p.y} r="3" fill="#e9283a" />
            {p.month && (
              <text
                x={p.x}
                y="187"
                textAnchor="middle"
                fill="#b6b8bd"
                fontSize="11"
              >
                {p.month}
              </text>
            )}
          </g>
        ))}
        <g transform={`translate(${selected.x},${selected.y})`}>
          <circle r="7" fill="#ed2337" opacity=".28" />
          <circle r="3.8" fill="white" stroke="#ed2337" strokeWidth="2" />
          <rect x="-17" y="-34" width="34" height="22" rx="3" fill="#d91b2c" />
          <path d="M-4,-12 L0,-7 L4,-12" fill="#d91b2c" />
          <text
            y="-18"
            textAnchor="middle"
            fill="white"
            fontSize="13"
            fontWeight="700"
          >
            {selected.v}
          </text>
        </g>
      </svg>
    </div>
  );
}
