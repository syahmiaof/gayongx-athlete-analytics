import { useState } from "react";
import type { AthleteProfile } from "../../types";
import { PssgmLogo } from "../common/PssgmLogo";
import { Screen, panelClass, buttonClass } from "./ScreenPrimitives";

export function LaporanScreen({ athlete }: { athlete: AthleteProfile }) {
  const [exported, setExported] = useState(false);
  const exportReport = () => {
    const rows = [
      ["GAYONGX ATHLETE ANALYTICS", "DEMO_SYNTHETIC"],
      ["Atlet demo", athlete.name],
      ["Tempoh rekod", "Jun 2024"],
      ["Readiness", `${athlete.metrics.readiness.score}/100`],
      ["Berat (kg)", String(athlete.metrics.weight.current)],
      ["Julat kelas demo (kg)", "60–65"],
      ["Lemak badan (%)", String(athlete.metrics.bodyFat.percentage)],
      ["Hidrasi (%)", String(athlete.metrics.hydration.percentage)],
      ["Recovery (%)", String(athlete.metrics.recovery.score)],
      [
        "Nota",
        "Semua data sintetik. Bukan laporan rasmi atau penilaian perubatan.",
      ],
    ];
    const csv =
      "\uFEFF" +
      rows
        .map((row) =>
          row.map((value) => `"${value.replaceAll('"', '""')}"`).join(","),
        )
        .join("\r\n");
    const url = URL.createObjectURL(
      new Blob([csv], { type: "text/csv;charset=utf-8;" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "gayongx-laporan-demo.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setExported(true);
  };
  return (
    <Screen
      title="Laporan Prestasi Atlet"
      subtitle="Ringkasan data sintetik · Eksport setempat"
      actions={
        <button className={buttonClass} onClick={exportReport}>
          Eksport Ringkasan CSV
        </button>
      }
    >
      {exported && (
        <p role="status" className="text-xs text-[#18cb78]">
          Fail CSV demo telah dijana untuk dimuat turun.
        </p>
      )}
      <article className={`${panelClass} mx-auto max-w-4xl space-y-6`}>
        <div className="flex flex-wrap items-center gap-3 border-b border-white/10 pb-4">
          <PssgmLogo size={48} />
          <div>
            <h2 className="text-sm font-extrabold">
              GAYONGX ATHLETE ANALYTICS REPORT
            </h2>
            <p className="mt-1 text-xs text-[#f0d313]">
              DEMO · JUN 2024 · GX-DEMO-082
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            ["Atlet demo", athlete.name],
            ["Kategori", `${athlete.silatClass} · 60–65 kg`],
            ["Readiness", `${athlete.metrics.readiness.score}/100`],
            ["Berat semasa", `${athlete.metrics.weight.current} kg`],
          ].map(([label, value]) => (
            <div key={label}>
              <h3 className="mb-1 text-[10px] text-[#9aa3aa]">{label}</h3>
              <p className="text-xs font-bold">{value}</p>
            </div>
          ))}
        </div>
        <div>
          <h3 className="mb-3 text-xs font-bold uppercase">
            Contoh Nota Jurulatih
          </h3>
          <p className="text-xs leading-relaxed text-[#9aa3aa]">
            Rekod latihan menunjukkan trend peningkatan skor prestasi dalam
            senario demo. Fokus sesi berikutnya ialah ketepatan teknik dan
            kawalan jarak.
          </p>
        </div>
        <div className="border-t border-white/10 pt-4 text-xs text-[#9aa3aa]">
          Cikgu Razman · Identiti sintetik
          <br />
          <span className="text-[10px]">
            Tiada pengesahan rasmi, pemilihan pasukan atau penilaian perubatan
            diberikan melalui laporan demo ini.
          </span>
        </div>
      </article>
    </Screen>
  );
}
