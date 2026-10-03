import { useState } from "react";
import { trainingDistribution } from "../../data/mockData";
export function JenisLatihanDonut() {
  const [period, setPeriod] = useState("month");
  const [selected, setSelected] = useState<number | null>(null);
  const counts = period === "week" ? 7 : period === "season" ? 72 : 18;
  let offset = 0;
  return (
    <div className="distribution">
      <div className="panel-heading">
        <h2>Jenis Latihan</h2>
        <select
          aria-label="Tempoh jenis latihan"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        >
          <option value="month">Bulan Ini</option>
          <option value="week">Minggu Ini</option>
          <option value="season">Musim Ini</option>
        </select>
      </div>
      <div className="distribution-body">
        <div className="donut">
          <svg
            viewBox="0 0 140 140"
            role="img"
            aria-label={`${counts} sesi latihan`}
          >
            <g transform="rotate(-90 70 70)">
              {trainingDistribution.map((t, i) => {
                const start = offset;
                offset += t.percentage;
                return (
                  <circle
                    key={t.name}
                    cx="70"
                    cy="70"
                    r="51"
                    fill="none"
                    stroke={t.color}
                    strokeWidth={selected === i ? 22 : 20}
                    pathLength="100"
                    strokeDasharray={`${t.percentage} 100`}
                    strokeDashoffset={-start}
                    onMouseEnter={() => setSelected(i)}
                    onMouseLeave={() => setSelected(null)}
                  />
                );
              })}
            </g>
            <text
              x="70"
              y="69"
              textAnchor="middle"
              fill="white"
              fontSize="25"
              fontWeight="700"
            >
              {selected === null
                ? counts
                : `${trainingDistribution[selected].percentage}%`}
            </text>
            <text
              x="70"
              y="86"
              textAnchor="middle"
              fill="#c8c9cc"
              fontSize="13"
            >
              {selected === null ? "Sesi" : "Bahagian"}
            </text>
          </svg>
        </div>
        <div className="donut-legend">
          {trainingDistribution.map((t, i) => (
            <button
              key={t.name}
              onMouseEnter={() => setSelected(i)}
              onMouseLeave={() => setSelected(null)}
              onClick={() => setSelected(selected === i ? null : i)}
            >
              <i style={{ background: t.color }} />
              <span>{t.name}</span>
              <b>{t.percentage}%</b>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
