import React from "react";
import {
  Heart,
  Moon,
  ShieldCheck,
  Smile,
  Activity,
  BatteryCharging,
  CheckCircle2,
} from "lucide-react";
import { AthleteProfile } from "../../types";

export const RecoveryKesihatanScreen: React.FC<{ athlete: AthleteProfile }> = ({
  athlete,
}) => {
  const m = athlete.metrics;

  const sorenessAreas = [
    { muscle: "Bahu & Sendi Lengan", status: "Selesa (0/10)", level: 0 },
    {
      muscle: "Hamstring & Gluteus",
      status: "Kepenatan Ringan (2/10)",
      level: 2,
    },
    { muscle: "Betis & Pergelangan Kaki", status: "Selesa (1/10)", level: 1 },
    { muscle: "Otot Teras & Pinggul", status: "Selesa (0/10)", level: 0 },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-5 max-w-7xl mx-auto select-none">
      {/* Header */}
      <div className="bg-[#0C1013] p-4 rounded-lg border border-[#252B30] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-4 bg-[#16C172] rounded-full" />
            <h2 className="text-xl font-black text-white uppercase tracking-tight">
              Recovery, Kesihatan & Kualiti Tidur
            </h2>
          </div>
          <p className="text-xs text-neutral-400 mt-0.5">
            Rekod pemulihan sintetik · Bukan diagnosis atau penilaian kesediaan
            perubatan
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="bg-[#16C172]/15 text-[#16C172] border border-[#16C172]/30 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            <span>Status demo: Rekod tersedia</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Sleep Breakdown */}
        <div className="bg-[#0C1013] border border-[#252B30] rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#3AA0FF] flex items-center gap-2">
              <Moon className="w-4 h-4" />
              Kualiti Tidur Semalam
            </h3>
            <span className="text-[10px] font-bold text-[#16C172] bg-[#16C172]/10 px-2 py-0.5 rounded">
              {m.sleep.status}
            </span>
          </div>

          <div className="text-center py-2">
            <span className="text-3xl font-black text-white font-mono">
              {m.sleep.hours}h {m.sleep.minutes}m
            </span>
            <div className="text-xs text-neutral-400 mt-0.5">
              Efisiensi Tidur: 91%
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-neutral-300">
              <span>Deep Sleep</span>
              <span className="font-mono font-bold text-white">
                2h 10m (29%)
              </span>
            </div>
            <div className="flex justify-between text-neutral-300">
              <span>REM Sleep</span>
              <span className="font-mono font-bold text-white">
                1h 45m (24%)
              </span>
            </div>
            <div className="flex justify-between text-neutral-300">
              <span>Light Sleep</span>
              <span className="font-mono font-bold text-white">
                3h 29m (47%)
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: Status Kecederaan & Ketegangan Otot */}
        <div className="bg-[#0C1013] border border-[#252B30] rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#16C172] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              Ketegangan Otot (Soreness)
            </h3>
            <span className="text-[10px] font-bold text-[#16C172] bg-[#16C172]/10 px-2 py-0.5 rounded">
              Laporan kendiri demo
            </span>
          </div>

          <div className="space-y-2.5 text-xs pt-1">
            {sorenessAreas.map((area) => (
              <div
                key={area.muscle}
                className="bg-[#11171B] p-2 rounded-lg border border-[#1B2533]"
              >
                <div className="flex justify-between mb-1">
                  <span className="font-medium text-white">{area.muscle}</span>
                  <span className="text-neutral-400 font-mono text-[11px]">
                    {area.status}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-[#16202C] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(area.level / 10) * 100 || 0}%`,
                      backgroundColor:
                        area.level > 3
                          ? "#E11D2E"
                          : area.level > 1
                            ? "#F3D217"
                            : "#16C172",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card 3: Biometrik Saraf & HRV */}
        <div className="bg-[#0C1013] border border-[#252B30] rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#F3D217] flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Biometrik Pemulihan (HRV & CNS)
            </h3>
            <span className="text-[10px] font-bold text-[#F3D217] bg-[#F3D217]/10 px-2 py-0.5 rounded">
              Data sintetik
            </span>
          </div>

          <div className="space-y-2 text-xs divide-y divide-[#151C21]">
            <div className="flex justify-between pt-1">
              <span className="text-neutral-400">
                Heart Rate Variability (HRV)
              </span>
              <span className="font-mono font-bold text-[#16C172]">
                78 ms · Demo
              </span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="text-neutral-400">Kadar Nadi Rehat (RHR)</span>
              <span className="font-mono font-bold text-white">52 bpm</span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="text-neutral-400">Tekanan Darah Purata</span>
              <span className="font-mono font-bold text-white">
                118 / 76 mmHg
              </span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="text-neutral-400">
                Skor Kesiapsiagaan Saraf (CNS)
              </span>
              <span className="font-mono font-bold text-[#16C172]">
                8.6 / 10
              </span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="text-neutral-400">Rekod Fisioterapi</span>
              <span className="font-semibold text-neutral-300">
                Tiada rekod sebenar
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
