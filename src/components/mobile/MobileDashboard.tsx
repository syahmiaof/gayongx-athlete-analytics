import type { AthleteProfile, NavSection } from "../../types";
import { AthleteHeroStrip } from "../layout/AthleteHeroStrip";
import { MetricCardsRow } from "../dashboard/MetricCardsRow";
import { PrestasiLineChart } from "../charts/PrestasiLineChart";
import { KeupayaanRadarChart } from "../charts/KeupayaanRadarChart";
import { ChevronRight } from "lucide-react";
export function MobileDashboard({
  athlete,
  onNavigate,
  onSelectMetric,
}: {
  athlete: AthleteProfile;
  onNavigate: (s: NavSection) => void;
  onSelectMetric: (key: string) => void;
}) {
  return (
    <div className="mobile-dashboard">
      <AthleteHeroStrip
        athlete={athlete}
        onViewTeam={() => onNavigate("pasukan")}
      />
      <MetricCardsRow
        athlete={athlete}
        mobile
        onSelectMetric={onSelectMetric}
      />
      <section className="gx-panel mobile-performance">
        <div className="panel-heading">
          <h2>Prestasi Terkini</h2>
          <button className="text-link" onClick={() => onNavigate("prestasi")}>
            Lihat Semua <ChevronRight />
          </button>
        </div>
        <PrestasiLineChart compact />
      </section>
      <section className="gx-panel mobile-capability">
        <div className="panel-heading">
          <h2>Analisis Keupayaan Atlet</h2>
          <button className="text-link" onClick={() => onNavigate("prestasi")}>
            Lihat Penuh <ChevronRight />
          </button>
        </div>
        <KeupayaanRadarChart compact showMetricsList />
      </section>
    </div>
  );
}
