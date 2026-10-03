import { trainingSessionsDemo as sessions } from "../../data/secondaryData";
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Swords,
  Check,
} from "lucide-react";
import {
  Screen,
  panelClass,
  inputClass,
  buttonClass,
} from "./ScreenPrimitives";

export function ProgramLatihanScreen() {
  const [filter, setFilter] = useState("all");
  const [week, setWeek] = useState(0);
  const [selected, setSelected] = useState("tempur");
  const [completed, setCompleted] = useState<string[]>([]);
  const visible = sessions.filter(
    (session) => filter === "all" || session.id === filter,
  );
  const session = sessions.find((item) => item.id === selected) ?? sessions[0];
  const sessionKey = `${week}:${session.id}`;
  const done = completed.includes(sessionKey);
  const weekLabel =
    week === 0
      ? "3 – 9 Jun 2024"
      : week === 1
        ? "10 – 16 Jun 2024"
        : "27 Mei – 2 Jun 2024";
  return (
    <Screen
      title="Jadual Latihan"
      subtitle="Program latihan atlet · Minggu demonstrasi"
      actions={
        <select
          aria-label="Jenis latihan"
          value={filter}
          onChange={(event) => {
            setFilter(event.target.value);
            if (event.target.value !== "all") setSelected(event.target.value);
          }}
          className={inputClass}
        >
          <option value="all">Semua Modul</option>
          <option value="tempur">Sparring / Tempur</option>
          <option value="teknik">Teknik & Form</option>
          <option value="fizikal">Kekuatan & Kondisi</option>
        </select>
      }
    >
      <div className="flex items-center justify-between">
        <button
          className={buttonClass}
          aria-label="Minggu sebelumnya"
          disabled={week === -1}
          onClick={() => setWeek((value) => value - 1)}
        >
          <ChevronLeft size={16} />
        </button>
        <h2 className="text-sm font-bold">{weekLabel}</h2>
        <button
          className={buttonClass}
          aria-label="Minggu seterusnya"
          disabled={week === 1}
          onClick={() => setWeek((value) => value + 1)}
        >
          <ChevronRight size={16} />
        </button>
      </div>
      <div className="grid gap-4 lg:grid-cols-5">
        <div className="space-y-3 lg:col-span-3">
          {visible.map((item) => {
            const finished = completed.includes(`${week}:${item.id}`);
            return (
              <button
                key={item.id}
                onClick={() => setSelected(item.id)}
                aria-pressed={selected === item.id}
                className={`${panelClass} w-full text-left transition-colors ${selected === item.id ? "border-l-2 border-l-[#e61e2b]" : "hover:bg-[#11171b]"}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#9aa3aa]">
                    {item.day} · {weekLabel}
                  </span>
                  <span
                    className={`text-[10px] font-bold ${finished ? "text-[#18cb78]" : item.id === "tempur" && week === 0 ? "text-[#f0d313]" : "text-[#9aa3aa]"}`}
                  >
                    {finished
                      ? "Selesai"
                      : item.id === "tempur" && week === 0
                        ? "Hari Ini"
                        : "Akan Datang"}
                  </span>
                </div>
                <h3 className="my-3 flex items-center gap-2 text-base font-bold">
                  <Swords size={18} className="text-[#e61e2b]" />
                  {item.title}
                </h3>
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-[#9aa3aa]">
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {item.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={12} />
                    {item.venue}
                  </span>
                </div>
                <div className="mt-3 flex justify-between border-t border-white/5 pt-2 text-[11px]">
                  <span>
                    Intensiti:{" "}
                    <strong className="text-[#f0d313]">{item.intensity}</strong>
                  </span>
                  <span>{item.duration}</span>
                </div>
              </button>
            );
          })}
          <article className={panelClass}>
            <h3 className="mb-2 text-xs font-bold uppercase">Nota Jurulatih</h3>
            <p className="text-xs leading-relaxed text-[#9aa3aa]">
              Fokus pada kualiti teknik dan komunikasi semasa latihan
              berpasangan. Catat refleksi selepas sesi.
            </p>
            <p className="mt-2 text-[10px] text-[#687078]">
              Cikgu Razman · Identiti demo
            </p>
          </article>
        </div>
        <article className={`${panelClass} h-fit space-y-4 lg:col-span-2`}>
          <span className="text-[10px] font-bold uppercase text-[#f0d313]">
            Butiran sesi
          </span>
          <h2 className="text-lg font-bold">{session.title}</h2>
          <p className="text-xs text-[#9aa3aa]">{session.focus}</p>
          <ol className="space-y-3">
            {session.modules.map((module, index) => (
              <li
                key={module}
                className="flex gap-3 border-t border-white/5 pt-3 text-xs"
              >
                <span className="text-[#e61e2b]">0{index + 1}</span>
                {module}
              </li>
            ))}
          </ol>
          <button
            className={`${buttonClass} w-full flex items-center justify-center gap-2`}
            onClick={() =>
              setCompleted((values) =>
                done
                  ? values.filter((key) => key !== sessionKey)
                  : [...values, sessionKey],
              )
            }
          >
            {done && <Check size={14} />}
            {done ? "Selesai · Batalkan tanda" : "Tandakan Selesai"}
          </button>
          <p className="text-[10px] text-[#687078]">
            Perubahan disimpan sepanjang sesi demo ini.
          </p>
        </article>
      </div>
    </Screen>
  );
}
