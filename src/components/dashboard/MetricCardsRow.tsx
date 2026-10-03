import {
  Weight,
  Accessibility,
  Droplet,
  Utensils,
  ChartNoAxesColumnIncreasing,
  HeartPulse,
  Moon,
  ShieldPlus,
  Smile,
  Info,
} from "lucide-react";
import type { AthleteProfile } from "../../types";
export function ReadinessRing() {
  return (
    <div className="readiness-ring">
      <svg viewBox="0 0 100 100" aria-label="Readiness 82 daripada 100">
        <circle
          cx="50"
          cy="50"
          r="43"
          fill="none"
          stroke="#17352a"
          strokeWidth="8"
        />
        <circle
          cx="50"
          cy="50"
          r="43"
          fill="none"
          stroke="var(--gx-green)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray="222 271"
          transform="rotate(-90 50 50)"
        />
      </svg>
      <div>
        <strong>82</strong>
        <small>/100</small>
      </div>
    </div>
  );
}
export function MetricCardsRow({
  onSelectMetric,
  mobile = false,
}: {
  athlete?: AthleteProfile;
  onSelectMetric?: (key: string) => void;
  mobile?: boolean;
}) {
  const cards = [
    {
      key: "weight",
      label: "Berat Semasa",
      value: "63.4",
      unit: "kg",
      detail: "Target Kelas",
      foot: "60–65 kg",
      color: "yellow",
      icon: Weight,
    },
    {
      key: "bodyFat",
      label: "Komposisi Badan",
      value: "14.2%",
      detail: "Body Fat",
      foot: "Lean ✓ Atletik",
      color: "yellow",
      progress: 60,
      icon: Accessibility,
    },
    {
      key: "hydration",
      label: "Hidrasi",
      value: "78%",
      detail: "Optimal",
      foot: "2.6 / 3.5 L",
      color: "blue",
      progress: 78,
      icon: Droplet,
    },
    {
      key: "nutrition",
      label: "Nutrisi",
      value: "87%",
      detail: "Pematuhan",
      foot: "Makro seimbang",
      color: "green",
      progress: 87,
      icon: Utensils,
    },
    {
      key: "load",
      label: "Training Load",
      value: "7.2",
      unit: "/ 10",
      detail: "Sederhana-Tinggi",
      color: "yellow",
      progress: 72,
      icon: ChartNoAxesColumnIncreasing,
    },
    {
      key: "recovery",
      label: "Recovery",
      value: "76%",
      detail: "Baik",
      color: "green",
      progress: 76,
      icon: HeartPulse,
    },
    {
      key: "sleep",
      label: "Sleep",
      value: "7h 24m",
      detail: "Kualiti Baik",
      color: "green",
      progress: 82,
      icon: Moon,
    },
    {
      key: "injury",
      label: "Kecederaan",
      value: "Tiada",
      detail: "Sihat",
      color: "muted",
      icon: ShieldPlus,
    },
    {
      key: "mood",
      label: "Mood",
      value: "Baik",
      detail: "Fokus Tinggi",
      color: "green",
      icon: Smile,
    },
  ];
  return (
    <div className={`metric-grid ${mobile ? "mobile-metrics" : ""}`}>
      <button
        className="metric-card readiness"
        onClick={() => onSelectMetric?.("readiness")}
      >
        <div className="metric-label">
          Readiness Score
          <Info />
        </div>
        <div className="readiness-content">
          <ReadinessRing />
          <div className="readiness-status">
            <strong>↑ 6%</strong>
            <span>Sedia Bertanding</span>
          </div>
        </div>
      </button>
      {cards
        .filter((c) =>
          mobile ? c.key !== "bodyFat" : !["injury", "mood"].includes(c.key),
        )
        .map((c) => (
          <button
            key={c.key}
            onClick={() => onSelectMetric?.(c.key)}
            className={`metric-card metric-${c.key} tone-${c.color}`}
          >
            <div className="metric-label">
              <span>{c.label}</span>
              <Info />
            </div>
            <div className="metric-content">
              <c.icon />
              <div>
                <strong>
                  {c.value} <small>{c.unit}</small>
                </strong>
                <span className="metric-detail">{c.detail}</span>
              </div>
            </div>
            {c.progress && (
              <div className="metric-progress">
                <span style={{ width: `${c.progress}%` }} />
              </div>
            )}
            {c.foot && <div className="metric-foot">{c.foot}</div>}
          </button>
        ))}
    </div>
  );
}
