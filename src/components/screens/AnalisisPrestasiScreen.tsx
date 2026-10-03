import { PrestasiLineChart } from "../charts/PrestasiLineChart";
import { KeupayaanRadarChart } from "../charts/KeupayaanRadarChart";
import { combatSpecificMetrics, radarMetricsData } from "../../data/mockData";
import { Screen, panelClass } from "./ScreenPrimitives";

export function AnalisisPrestasiScreen() {
  return (
    <Screen
      title="Analisis Prestasi"
      subtitle="Trend latihan dan keupayaan atlet · Jan–Jun 2024 · Data demo"
    >
      <div className="grid gap-4 lg:grid-cols-5">
        <div className={`${panelClass} lg:col-span-3`}>
          <h2 className="mb-4 text-sm font-bold">Prestasi Terkini</h2>
          <div className="h-64">
            <PrestasiLineChart />
          </div>
        </div>
        <div className={`${panelClass} lg:col-span-2`}>
          <h2 className="mb-4 text-sm font-bold">Analisis Keupayaan Atlet</h2>
          <KeupayaanRadarChart showMetricsList />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {Object.entries(combatSpecificMetrics).map(([key, metric]) => (
          <article key={key} className={panelClass}>
            <h3 className="text-xs text-[#9aa3aa]">
              {
                {
                  ketepatanSerangan: "Ketepatan serangan",
                  keberkesananPertahanan: "Keberkesanan pertahanan",
                  kadarReaksi: "Kadar reaksi",
                  kawalanGelanggang: "Kawalan gelanggang",
                }[key]
              }
            </h3>
            <p className="my-2 text-2xl font-bold text-white">
              {metric.value}
              {typeof metric.value === "number" ? "%" : ""}
            </p>
            <span className="text-xs text-[#18cb78]">
              {metric.change} · {metric.status}
            </span>
          </article>
        ))}
      </div>
      <div className={panelClass}>
        <h2 className="mb-3 text-sm font-bold">Ringkasan Keupayaan</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {radarMetricsData.map((metric) => (
            <div key={metric.key}>
              <div className="flex justify-between text-xs">
                <span>{metric.label}</span>
                <strong className="text-[#f0d313]">{metric.value}/100</strong>
              </div>
              <div className="mt-2 h-1.5 rounded bg-white/5">
                <div
                  className="h-full rounded bg-[#f0d313]"
                  style={{ width: `${metric.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Screen>
  );
}
