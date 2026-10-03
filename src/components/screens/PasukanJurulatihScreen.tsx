import React from "react";
import { Users2, Shield, Award, MapPin } from "lucide-react";
import { PssgmLogo } from "../common/PssgmLogo";

export const PasukanJurulatihScreen: React.FC = () => {
  const coaches = [
    {
      name: "Cikgu Razman bin Idris",
      role: "Ketua Jurulatih Tempur & Taktikal",
      bengkung: "Hitam Harimau Pelangi",
      experience: "Identiti sintetik",
      initials: "CR",
    },
    {
      name: "Coach Hafizul Amin",
      role: "Jurulatih S&C / Kekuatan & Kondisi",
      bengkung: "Kuning Pelangi",
      experience: "Identiti sintetik",
      initials: "HA",
    },
    {
      name: "Farah Nadia (Demo)",
      role: "Pegawai Nutrisi & Fisiologi Sukan",
      bengkung: "Pegawai Sokongan Sains Sukan",
      experience: "Identiti sintetik",
      initials: "FN",
    },
  ];

  const teammates = [
    {
      name: "Muhammad Haziq bin Iskandar",
      class: "Kelas A (60-65kg)",
      role: "Atlet Silat Utama",
      active: true,
    },
    {
      name: "Khairul Anwar bin Zakaria",
      class: "Kelas B (65-70kg)",
      role: "Rakan Sparring Utama",
      active: true,
    },
    {
      name: "Amirul Hakim bin Roslan",
      class: "Kelas C (70-75kg)",
      role: "Skuad demo",
      active: true,
    },
    {
      name: "Luqman Hakim bin Fauzi",
      class: "Seni Tempur",
      role: "Pasangan Seni Beladiri",
      active: true,
    },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-5 max-w-7xl mx-auto select-none">
      <div className="bg-[#0C1013] p-4 rounded-lg border border-[#252B30] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-4 bg-[#F3D217] rounded-full" />
            <h2 className="text-xl font-black text-white uppercase tracking-tight">
              Pasukan, Barisan Jurulatih & Kontinjen Perak
            </h2>
          </div>
          <p className="text-xs text-neutral-400 mt-0.5">
            Contoh struktur pasukan · Semua nama, peranan dan pengalaman ialah
            data sintetik
          </p>
        </div>

        <div className="flex items-center gap-2">
          <PssgmLogo size={36} />
          <div className="text-left">
            <div className="text-xs font-black text-white">PSSGM PERAK</div>
            <div className="text-[10px] text-[#F3D217] font-semibold">
              Skuad Demo 2024
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Coaches Column (6 cols) */}
        <div className="lg:col-span-6 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#E11D2E]" />
            Barisan Jurulatih & Pakar Prestasi
          </h3>
          <div className="space-y-2.5">
            {coaches.map((c) => (
              <div
                key={c.name}
                className="p-3.5 rounded-lg bg-[#0C1013] border border-[#252B30] flex items-center gap-3.5"
              >
                <div className="w-11 h-11 shrink-0 rounded-full bg-[#E11D2E]/20 border border-[#E11D2E]/40 flex items-center justify-center font-bold text-white text-xs">
                  {c.initials}
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-white">{c.name}</h4>
                  <div className="text-xs font-semibold text-[#F3D217]">
                    {c.role}
                  </div>
                  <div className="text-[10px] text-neutral-400 flex flex-wrap items-center gap-2 mt-0.5">
                    <span>{c.bengkung}</span>
                    <span>•</span>
                    <span>{c.experience}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Teammates & Sparring Roster (6 cols) */}
        <div className="lg:col-span-6 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-2">
            <Users2 className="w-4 h-4 text-[#16C172]" />
            Roster Atlet & Rakan Sparring Tempur
          </h3>
          <div className="space-y-2.5">
            {teammates.map((t) => (
              <div
                key={t.name}
                className="p-3 rounded-lg bg-[#0C1013] border border-[#252B30] flex items-center justify-between"
              >
                <div>
                  <h4 className="text-xs font-bold text-white">{t.name}</h4>
                  <div className="text-[10.5px] text-neutral-400">
                    {t.class} • {t.role}
                  </div>
                </div>
                <span className="bg-[#16C172]/15 text-[#16C172] text-[10px] font-bold px-2 py-0.5 rounded border border-[#16C172]/30">
                  Aktif
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
