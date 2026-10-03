import { useState } from "react";
import { Users, PersonStanding } from "lucide-react";
import { benchmarkComparisons } from "../../data/mockData";
export function BenchmarkBarChart() {
  const [weight, setWeight] = useState("60");
  const [group, setGroup] = useState("all");
  const available = weight === "60";
  const rows = benchmarkComparisons.filter(
    (r) => group === "all" || r.highlight || r.category.includes(group),
  );
  return (
    <div className="benchmark-chart">
      <div className="panel-heading">
        <h2>Benchmark Atlet</h2>
        <div className="benchmark-filters">
          <select
            aria-label="Kelas berat benchmark"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          >
            <option value="60">Berat: 60–65kg</option>
            <option value="55">Berat: 55–60kg</option>
            <option value="65">Berat: 65–70kg</option>
          </select>
          <select
            aria-label="Kumpulan benchmark"
            value={group}
            onChange={(e) => setGroup(e.target.value)}
          >
            <option value="all">PSSGM Perak</option>
            <option value="Negeri">Negeri</option>
            <option value="Kebangsaan">Kebangsaan</option>
          </select>
        </div>
      </div>
      {available ? (
        <div className="benchmark-rows">
          {rows.map((r, i) => (
            <div
              className={`benchmark-row ${r.highlight ? "you" : ""}`}
              key={r.category}
            >
              {r.highlight ? <PersonStanding size={17} /> : <Users size={16} />}
              <span>
                {r.category}
                {!r.highlight && <small> DEMO</small>}
              </span>
              <div className="benchmark-track">
                <i
                  style={{
                    width: `${r.score}%`,
                    background: r.highlight
                      ? "var(--gx-yellow)"
                      : i === 4
                        ? "var(--gx-green)"
                        : "#a6aab1",
                  }}
                />
              </div>
              <b>{r.score}</b>
            </div>
          ))}
        </div>
      ) : (
        <p className="empty-demo">
          Tiada sampel demo untuk kelas ini. Pilih 60–65 kg.
        </p>
      )}
      <small className="benchmark-disclaimer">
        Sasaran sintetik · bukan standard rasmi
      </small>
    </div>
  );
}
