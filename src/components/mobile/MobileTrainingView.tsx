import React, { useState } from "react";
import {
  Activity,
  ChevronRight,
  Clock,
  Dumbbell,
  Footprints,
  MapPin,
  ShieldCheck,
  Swords,
  Target,
  Zap,
} from "lucide-react";
import { WeightTrendChart } from "../charts/WeightTrendChart";
import { primaryAthlete, weeklyScheduleData } from "../../data/mockData";
import type { NavSection } from "../../types";
import "./MobileTrainingView.css";

interface MobileTrainingViewProps {
  onOpenNotifications?: () => void;
  onOpenProfile?: () => void;
  onNavigate?: (section: NavSection) => void;
}

type NutritionTab = "berat" | "nutrisi" | "air" | "kalori";
type CombatTab = "sparring" | "perlawanan" | "ujian";
const nutritionTabs: { id: NutritionTab; label: string }[] = [
  { id: "berat", label: "BERAT BADAN" },
  { id: "nutrisi", label: "NUTRISI" },
  { id: "air", label: "AIR" },
  { id: "kalori", label: "KALORI" },
];
const combatTabs: { id: CombatTab; label: string }[] = [
  { id: "sparring", label: "Sparring" },
  { id: "perlawanan", label: "Perlawanan" },
  { id: "ujian", label: "Ujian Teknik" },
];
const combatDemo: Record<
  CombatTab,
  {
    values: [number, number, number, number];
    changes: [number, number, number, number];
  }
> = {
  sparring: { values: [78, 82, 0.28, 76], changes: [5, 8, 12, 6] },
  perlawanan: { values: [74, 79, 0.31, 81], changes: [3, 4, 6, 9] },
  ujian: { values: [86, 88, 0.26, 84], changes: [7, 6, 8, 5] },
};
const combatLabels = [
  { label: "Ketepatan Serangan", Icon: Target, color: "red" },
  { label: "Keberkesanan Pertahanan", Icon: ShieldCheck, color: "green" },
  { label: "Kadar Reaksi", Icon: Zap, color: "yellow" },
  { label: "Kawalan Gelanggang", Icon: Footprints, color: "white" },
] as const;
const referenceSessions = [
  {
    type: "Sparring & Tempur",
    time: "08:00 – 10:00",
    venue: "Dewan PSSGM Perak",
    status: "Hari Ini",
    day: "Sel",
  },
  {
    type: "Teknik & Form",
    time: "16:00 – 17:30",
    venue: "Gelanggang Utama",
    status: "Akan Datang",
    day: "Sel",
  },
  {
    type: "Kekuatan & Kondisi",
    time: "18:00 – 19:00",
    venue: "Bilik Kekuatan",
    status: "Akan Datang",
    day: "Sel",
  },
];

export const MobileTrainingView: React.FC<MobileTrainingViewProps> = ({
  onNavigate,
}) => {
  const [selectedDay, setSelectedDay] = useState(4);
  const [showWeek, setShowWeek] = useState(false);
  const [nutritionTab, setNutritionTab] = useState<NutritionTab>("berat");
  const [combatTab, setCombatTab] = useState<CombatTab>("sparring");
  const selectedSchedule = weeklyScheduleData.find(
    (day) => day.dayNum === selectedDay,
  )!;
  const sessions = showWeek
    ? weeklyScheduleData.map((day) => ({ ...day, day: day.dayShort }))
    : selectedDay === 4
      ? referenceSessions
      : [{ ...selectedSchedule, day: selectedSchedule.dayShort }];
  const currentCombat = combatDemo[combatTab];

  return (
    <div className="gx-mobile-training" data-origin="DEMO_SYNTHETIC">
      <section className="gx-training-panel" aria-labelledby="training-heading">
        <div className="gx-training-heading">
          <h2 id="training-heading">Jadual Latihan</h2>
          <button
            onClick={() => setShowWeek((value) => !value)}
            aria-expanded={showWeek}
          >
            {showWeek ? "Hari Dipilih" : "Lihat Semua"}
            <ChevronRight size={14} />
          </button>
        </div>
        <div
          className="gx-training-days"
          aria-label="Minggu demo 3 hingga 9 Jun 2024"
        >
          {weeklyScheduleData.map((day) => (
            <button
              key={day.dayNum}
              aria-pressed={selectedDay === day.dayNum}
              onClick={() => {
                setSelectedDay(day.dayNum!);
                setShowWeek(false);
              }}
            >
              <span>{day.dayShort}</span>
              <strong>{day.dayNum}</strong>
            </button>
          ))}
        </div>
        <div className="gx-training-sessions" aria-live="polite">
          {sessions.map((session) => {
            const isCombat = /Sparring|Tempur|Perlawanan/.test(session.type);
            const isStrength = /Kekuatan/.test(session.type);
            const Icon = isCombat ? Swords : isStrength ? Dumbbell : Activity;
            return (
              <article
                key={`${session.day}-${session.type}`}
                className={`gx-training-session ${isCombat ? "is-combat" : isStrength ? "is-strength" : ""}`}
              >
                <Icon className="gx-training-session-icon" aria-hidden="true" />
                <div className="gx-training-session-copy">
                  <h3>{session.type}</h3>
                  <p>
                    <Clock size={12} />
                    {showWeek ? `${session.day} · ` : ""}
                    {session.time}
                  </p>
                  <p>
                    <MapPin size={12} />
                    {session.venue}
                  </p>
                </div>
                <span
                  className={`gx-training-status ${session.status === "Hari Ini" ? "is-today" : ""}`}
                >
                  {session.status}
                </span>
              </article>
            );
          })}
        </div>
      </section>

      <section
        className="gx-training-panel gx-training-nutrition"
        aria-labelledby="training-nutrition-heading"
      >
        <div className="gx-training-heading">
          <h2 id="training-nutrition-heading">Berat & Pemakanan</h2>
          {onNavigate && (
            <button onClick={() => onNavigate("nutrisi")}>
              Lihat Semua
              <ChevronRight size={14} />
            </button>
          )}
        </div>
        <div
          className="gx-nutrition-tabs"
          role="tablist"
          aria-label="Data pemakanan"
        >
          {nutritionTabs.map((tab) => (
            <button
              key={tab.id}
              id={`nutrition-tab-${tab.id}`}
              role="tab"
              aria-selected={nutritionTab === tab.id}
              aria-controls="training-nutrition-content"
              onClick={() => setNutritionTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div
          id="training-nutrition-content"
          role="tabpanel"
          aria-labelledby={`nutrition-tab-${nutritionTab}`}
          className="gx-training-nutrition-content"
        >
          {nutritionTab === "berat" && (
            <>
              <div className="gx-training-weight-stat">
                <strong>
                  {primaryAthlete.metrics.weight.current} <small>kg</small>
                </strong>
                <span className="gx-training-weight-change">
                  ↓ 0.8 kg<small>dlm 2 minggu</small>
                </span>
                <span className="gx-training-target">
                  Target kelas<b>60 – 65 kg</b>
                </span>
              </div>
              <WeightTrendChart compact />
            </>
          )}
          {nutritionTab === "nutrisi" && (
            <div className="gx-training-nutrition-detail">
              <div className="gx-training-detail-stat">
                <strong>
                  87<small>%</small>
                </strong>
                <span>
                  Pematuhan rekod demo
                  <br />
                  <small>Makro seimbang</small>
                </span>
              </div>
              {[
                { label: "Karbohidrat", value: "310 g", percent: 78 },
                { label: "Protein", value: "125 g", percent: 86 },
                { label: "Lemak", value: "68 g", percent: 72 },
              ].map((macro) => (
                <div className="gx-training-macro" key={macro.label}>
                  <span>{macro.label}</span>
                  <b>{macro.value}</b>
                  <div>
                    <i style={{ width: `${macro.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}
          {nutritionTab === "air" && (
            <div className="gx-training-nutrition-detail">
              <div className="gx-training-detail-stat">
                <strong>
                  2.6<small> L</small>
                </strong>
                <span>
                  Air direkodkan
                  <br />
                  <small>Contoh rekod harian</small>
                </span>
              </div>
              <div
                className="gx-training-water"
                aria-label="8 catatan pengambilan air"
              >
                {Array.from({ length: 10 }, (_, index) => (
                  <i key={index} className={index < 8 ? "is-filled" : ""} />
                ))}
              </div>
              <p className="gx-training-detail-note">
                Pagi 0.8 L · Tengah hari 1.0 L · Petang 0.8 L
              </p>
            </div>
          )}
          {nutritionTab === "kalori" && (
            <div className="gx-training-nutrition-detail">
              <div className="gx-training-detail-stat">
                <strong>
                  2,420<small> kcal</small>
                </strong>
                <span>
                  Jumlah direkodkan
                  <br />
                  <small>Contoh log pemakanan</small>
                </span>
              </div>
              <div className="gx-training-food-log">
                <span>
                  Sarapan<b>580 kcal</b>
                </span>
                <span>
                  Makan tengah hari<b>820 kcal</b>
                </span>
                <span>
                  Makan malam & snek<b>1,020 kcal</b>
                </span>
              </div>
            </div>
          )}
        </div>
      </section>

      <section
        className="gx-training-panel gx-training-combat"
        aria-labelledby="training-combat-heading"
      >
        <div className="gx-training-heading">
          <h2 id="training-combat-heading">Analisis Prestasi Tempur</h2>
          {onNavigate && (
            <button onClick={() => onNavigate("perlawanan")}>
              Lihat Semua
              <ChevronRight size={14} />
            </button>
          )}
        </div>
        <div
          className="gx-combat-tabs"
          role="tablist"
          aria-label="Jenis analisis tempur"
        >
          {combatTabs.map((tab) => (
            <button
              key={tab.id}
              id={`combat-tab-${tab.id}`}
              role="tab"
              aria-selected={combatTab === tab.id}
              aria-controls="training-combat-content"
              onClick={() => setCombatTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div
          className="gx-combat-metrics"
          id="training-combat-content"
          role="tabpanel"
          aria-labelledby={`combat-tab-${combatTab}`}
        >
          {combatLabels.map(({ label, Icon, color }, index) => (
            <article className="gx-combat-metric" key={label}>
              <h3>{label}</h3>
              <div>
                <Icon
                  className={`gx-combat-icon is-${color}`}
                  aria-hidden="true"
                />
                <strong>
                  {currentCombat.values[index]}
                  <small>{index === 2 ? "s" : "%"}</small>
                </strong>
                <span>
                  {index === 2 ? "↓" : "↑"} {currentCombat.changes[index]}%
                </span>
              </div>
              <div className="gx-combat-progress">
                <i
                  style={{
                    width: `${index === 2 ? 60 : currentCombat.values[index]}%`,
                  }}
                />
              </div>
            </article>
          ))}
        </div>
      </section>
      <p className="gx-training-demo-note">
        DEMO · Rekod latihan dan metrik sintetik
      </p>
    </div>
  );
};
