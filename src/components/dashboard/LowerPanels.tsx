import {
  Swords,
  PersonStanding,
  Dumbbell,
  Video,
  CheckCircle2,
  ArrowRight,
  Play,
  Plus,
} from "lucide-react";
import type { NavSection } from "../../types";
import {
  recentSessions,
  matchAnalysisData,
  coachNotesData,
} from "../../data/mockData";
import { JenisLatihanDonut } from "../charts/JenisLatihanDonut";
import { BenchmarkBarChart } from "../charts/BenchmarkBarChart";
export function LowerPanels({
  onNavigate,
}: {
  onNavigate: (s: NavSection) => void;
}) {
  const icons = [Swords, PersonStanding, Dumbbell, Video];
  return (
    <div className="lower-grid">
      <section className="gx-panel">
        <JenisLatihanDonut />
      </section>
      <section className="gx-panel recent-panel">
        <div className="panel-heading">
          <h2>Sesi Terkini</h2>
          <button className="text-link" onClick={() => onNavigate("latihan")}>
            Lihat Semua <ArrowRight />
          </button>
        </div>
        <div className="recent-sessions">
          {recentSessions.map((s, i) => {
            const Icon = icons[i];
            return (
              <button
                className="session-row"
                key={s.id}
                onClick={() => onNavigate("latihan")}
              >
                <Icon className={i === 0 ? "red" : ""} />
                <div>
                  <strong>{s.title}</strong>
                  <p>
                    {s.date} · {s.durationMin} min ·{" "}
                    <span>↑ {s.rpe.toFixed(1)}</span>/10
                  </p>
                </div>
                <span className="session-done">
                  <CheckCircle2 />
                  Selesai
                </span>
              </button>
            );
          })}
        </div>
      </section>
      <section className="gx-panel">
        <BenchmarkBarChart />
      </section>
      <div className="match-stack">
        <section className="gx-panel match-panel">
          <div className="panel-heading">
            <h2>Analisis Perlawanan</h2>
            <button
              className="text-link"
              onClick={() => onNavigate("perlawanan")}
            >
              Lihat Semua <ArrowRight />
            </button>
          </div>
          <div className="match-body">
            <button
              className="match-thumb"
              aria-label="Buka analisis perlawanan demo"
              onClick={() => onNavigate("perlawanan")}
            >
              <img
                src="/assets/match-demo.jpg"
                alt="Visual demonstrasi perlawanan silat"
              />
              <Play />
            </button>
            <div>
              <strong>{matchAnalysisData.tournament}</strong>
              <p>
                {matchAnalysisData.stage} · {matchAnalysisData.date}
              </p>
              <div className="match-result">
                <b>MENANG</b>
                <strong>3 - 1</strong>
              </div>
              <button
                className="text-link"
                onClick={() => onNavigate("perlawanan")}
              >
                Lihat Analisis Penuh <ArrowRight />
              </button>
            </div>
          </div>
        </section>
        <section className="gx-panel coach-panel">
          <div className="panel-heading">
            <h2>Nota Jurulatih</h2>
            <button className="text-link" onClick={() => onNavigate("pasukan")}>
              Lihat Nota <Plus />
            </button>
          </div>
          <div className="coach-body">
            <span className="coach-avatar">CR</span>
            <p>
              <strong>
                {coachNotesData.coachName} <small>· Demo · 2 Jun 2024</small>
              </strong>
              <q>{coachNotesData.content}</q>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
