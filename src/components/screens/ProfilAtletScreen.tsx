import { useState } from "react";
import type { AthleteProfile } from "../../types";
import { SilatAthleteAvatar } from "../common/SilatAthleteAvatar";
import { PssgmLogo } from "../common/PssgmLogo";
import {
  Screen,
  panelClass,
  buttonClass,
  inputClass,
} from "./ScreenPrimitives";

type ProfileTab = "biodata" | "kejohanan" | "sasaran";
export function ProfilAtletScreen({ athlete }: { athlete: AthleteProfile }) {
  const [tab, setTab] = useState<ProfileTab>("biodata");
  const [editing, setEditing] = useState(false);
  const [quote, setQuote] = useState(athlete.quote);
  const [draftQuote, setDraftQuote] = useState(quote);
  const [saved, setSaved] = useState(false);
  const history = [
    {
      year: "2024",
      name: "Kejohanan Silat Seni Gayong Kebangsaan",
      category: "Tanding Kelas A · 60–65 kg",
      result: "Emas · Demo",
    },
    {
      year: "2023",
      name: "Piala PSSGM",
      category: "Seni Tempur Berpasangan",
      result: "Perak · Demo",
    },
    {
      year: "2023",
      name: "Kejohanan Silat Remaja Terbuka Perak",
      category: "Tanding Kelas A",
      result: "Emas · Demo",
    },
  ];
  return (
    <Screen
      title="Profil Atlet"
      subtitle="Profil dan sejarah pencapaian sintetik"
      actions={
        <button
          className={buttonClass}
          onClick={() => {
            setDraftQuote(quote);
            setEditing((value) => !value);
            setSaved(false);
          }}
        >
          Kemaskini Motto
        </button>
      }
    >
      <article className={`${panelClass} flex flex-wrap items-center gap-4`}>
        <SilatAthleteAvatar size="hero" />
        <div className="min-w-0 flex-1">
          <span className="text-[10px] font-bold text-[#e61e2b]">
            PROFIL DEMO · GX-PRK-0082
          </span>
          <h2 className="mt-1 text-xl font-extrabold">{athlete.name}</h2>
          <p className="mt-2 text-xs text-[#9aa3aa]">{athlete.role}</p>
          <p className="mt-3 text-xs italic">{quote}</p>
        </div>
        <PssgmLogo size={48} />
      </article>
      {editing && (
        <form
          className={`${panelClass} space-y-3`}
          onSubmit={(event) => {
            event.preventDefault();
            setQuote(draftQuote.trim());
            setEditing(false);
            setSaved(true);
          }}
        >
          <label className="block space-y-2 text-xs">
            <span>Motto atlet demo</span>
            <input
              autoFocus
              required
              maxLength={140}
              value={draftQuote}
              onChange={(event) => setDraftQuote(event.target.value)}
              className={`${inputClass} w-full`}
            />
          </label>
          <button className={buttonClass} type="submit">
            Simpan Motto
          </button>
          <p className="text-[10px] text-[#687078]">
            Disimpan sepanjang sesi profil ini sahaja.
          </p>
        </form>
      )}
      {saved && (
        <p role="status" className="text-xs text-[#18cb78]">
          Motto demo dikemaskini.
        </p>
      )}
      <nav aria-label="Bahagian profil" className="flex flex-wrap gap-2">
        {(
          [
            { key: "biodata", label: "Biodata" },
            { key: "kejohanan", label: "Sejarah Kejohanan" },
            { key: "sasaran", label: "Sasaran Musim" },
          ] as const
        ).map((item) => (
          <button
            className={`${buttonClass} ${tab === item.key ? "border-[#e61e2b]" : ""}`}
            aria-pressed={tab === item.key}
            key={item.key}
            onClick={() => setTab(item.key)}
          >
            {item.label}
          </button>
        ))}
      </nav>
      {tab === "biodata" && (
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Maklumat Asas",
              rows: [
                ["Umur / Jantina", `${athlete.age} tahun / ${athlete.gender}`],
                ["Kategori", `${athlete.silatClass} · 60–65 kg`],
                ["Disiplin", athlete.discipline],
                ["Lokasi", athlete.location],
              ],
            },
            {
              title: "Pasukan Demo",
              rows: [
                ["Jurulatih tempur", "Cikgu Razman"],
                ["Jurulatih fizikal", "Coach Hafizul"],
                ["Sokongan nutrisi", "Farah Nadia"],
                ["Organisasi", athlete.club.name],
              ],
            },
            {
              title: "Profil Fizikal Demo",
              rows: [
                ["Ketinggian", "173 cm"],
                ["Berat", `${athlete.metrics.weight.current} kg`],
                ["Lemak badan", `${athlete.metrics.bodyFat.percentage}%`],
                ["Pemeriksaan kesihatan", "Tiada rekod sebenar"],
              ],
            },
          ].map((card) => (
            <article key={card.title} className={panelClass}>
              <h3 className="mb-3 text-xs font-bold uppercase text-[#f0d313]">
                {card.title}
              </h3>
              <dl className="space-y-3">
                {card.rows.map(([label, value]) => (
                  <div
                    key={label}
                    className="flex justify-between gap-4 border-t border-white/5 pt-2 text-xs"
                  >
                    <dt className="text-[#9aa3aa]">{label}</dt>
                    <dd className="max-w-[60%] text-right">{value}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
      )}
      {tab === "kejohanan" && (
        <div className="space-y-3">
          {history.map((item) => (
            <article
              key={item.name}
              className={`${panelClass} flex flex-wrap justify-between gap-3`}
            >
              <div>
                <h3 className="text-sm font-bold">{item.name}</h3>
                <p className="mt-1 text-xs text-[#9aa3aa]">
                  {item.year} · {item.category}
                </p>
              </div>
              <span className="text-xs font-bold text-[#f0d313]">
                {item.result}
              </span>
            </article>
          ))}
        </div>
      )}
      {tab === "sasaran" && (
        <div className="grid gap-4 sm:grid-cols-2">
          <article className={panelClass}>
            <h3 className="text-xs font-bold uppercase text-[#f0d313]">
              Sasaran Latihan Demo
            </h3>
            <ul className="mt-3 list-inside list-disc space-y-3 text-xs text-[#9aa3aa]">
              <li>Meningkatkan ketepatan teknik dan kawalan jarak.</li>
              <li>Mengekalkan rekod latihan yang konsisten.</li>
              <li>Menyemak perkembangan bersama jurulatih.</li>
            </ul>
          </article>
          <article className={panelClass}>
            <h3 className="text-xs font-bold uppercase">Status Rekod</h3>
            <p className="mt-3 text-xs leading-relaxed text-[#9aa3aa]">
              Ranking, kelayakan pertandingan, pemeriksaan perubatan dan
              pengesahan anti-doping sebenar tidak disambungkan dalam demo ini.
            </p>
          </article>
        </div>
      )}
    </Screen>
  );
}
