import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Circle,
  PlayCircle,
  Swords,
  Dumbbell,
  Leaf,
  Target,
  Users,
  Flower2,
} from "lucide-react";
import { weeklyScheduleData } from "../../data/mockData";
import { PrestasiLineChart } from "../charts/PrestasiLineChart";
import { KeupayaanRadarChart } from "../charts/KeupayaanRadarChart";
export function WeeklySchedule() {
  const [week, setWeek] = useState(0);
  const icons = [Swords, Swords, Dumbbell, Leaf, Target, Users, Flower2];
  return (
    <section className="gx-panel weekly-schedule">
      <div className="panel-heading">
        <h2>Jadual Mingguan</h2>
        <div className="week-controls">
          <button
            aria-label="Minggu sebelumnya"
            onClick={() => setWeek((w) => w - 1)}
          >
            <ChevronLeft size={15} />
          </button>
          <span>
            {new Intl.DateTimeFormat("ms", {
              day: "numeric",
              month: "short",
            }).format(new Date(2024, 5, 3 + week * 7))}{" "}
            –{" "}
            {new Intl.DateTimeFormat("ms", {
              day: "numeric",
              month: "short",
              year: "numeric",
            }).format(new Date(2024, 5, 9 + week * 7))}
          </span>
          <button
            aria-label="Minggu seterusnya"
            onClick={() => setWeek((w) => w + 1)}
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>HARI</th>
            <th>JENIS LATIHAN</th>
            <th>INTENSITI</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          {weeklyScheduleData.map((d, i) => {
            const Icon = icons[i];
            const status =
              week > 0 ? "Akan Datang" : week < 0 ? "Selesai" : d.status;
            return (
              <tr
                key={d.dayShort}
                className={status === "Hari Ini" ? "today" : ""}
              >
                <td>{d.dayShort}</td>
                <td>
                  <span className="schedule-type">
                    <Icon size={17} />
                    {d.type}
                  </span>
                </td>
                <td>
                  <span className={`intensity intensity-${d.intensity}`}>
                    {Array.from({ length: d.intensity }, (_, n) => (
                      <i key={n} />
                    ))}
                  </span>
                </td>
                <td>
                  <span
                    className={`schedule-status ${status === "Selesai" ? "done" : ""}`}
                  >
                    {status === "Selesai" ? (
                      <CheckCircle2 />
                    ) : status === "Hari Ini" ? (
                      <PlayCircle />
                    ) : (
                      <Circle />
                    )}
                    {status}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
export function MiddlePanels() {
  return (
    <div className="analytics-grid">
      <section className="gx-panel performance-panel">
        <div className="panel-heading">
          <h2>Prestasi Terkini</h2>
        </div>
        <PrestasiLineChart />
      </section>
      <section className="gx-panel radar-panel">
        <div className="panel-heading">
          <h2>Analisis Keupayaan Atlet</h2>
        </div>
        <KeupayaanRadarChart />
      </section>
      <WeeklySchedule />
    </div>
  );
}
