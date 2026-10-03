import { BenchmarkBarChart } from "../charts/BenchmarkBarChart";
import { KeupayaanRadarChart } from "../charts/KeupayaanRadarChart";
import { Screen, panelClass } from "./ScreenPrimitives";

export function BenchmarkScreen() {
  return (
    <Screen
      title="Benchmark Atlet"
      subtitle="Sasaran sintetik · Bukan piawaian rasmi PSSGM, SUKMA atau kebangsaan"
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <div className={panelClass}>
          <BenchmarkBarChart />
        </div>
        <div className={panelClass}>
          <h2 className="mb-4 text-sm font-bold">Profil Keupayaan Anda</h2>
          <KeupayaanRadarChart showMetricsList />
        </div>
      </div>
      <p className="text-xs text-[#9aa3aa]">
        Nilai kohort ialah contoh demonstrasi. Label peringkat menunjukkan
        senario perbandingan, bukan kelayakan atau kedudukan atlet sebenar.
      </p>
    </Screen>
  );
}
