import { techniqueVideosDemo as videos } from "../../data/secondaryData";
import { useState } from "react";
import { FileText } from "lucide-react";
import { Screen, panelClass, buttonClass } from "./ScreenPrimitives";

export function VideoTeknikScreen() {
  const [selected, setSelected] = useState("v1");
  const [expanded, setExpanded] = useState(false);
  const video = videos.find((item) => item.id === selected) ?? videos[0];
  return (
    <Screen
      title="Video & Teknik"
      subtitle="Pustaka analisis teknik · Contoh anotasi jurulatih"
    >
      <div className="grid gap-4 lg:grid-cols-5">
        <article className={`${panelClass} space-y-4 lg:col-span-3`}>
          <div className="flex aspect-video flex-col items-center justify-center gap-3 rounded bg-[#07090b] p-5 text-center">
            <FileText size={32} className="text-[#e61e2b]" />
            <h2 className="text-base font-bold">{video.title}</h2>
            <p className="text-xs text-[#9aa3aa]">
              Pratonton anotasi demo · Fail video tidak disertakan
            </p>
            <button
              className={buttonClass}
              onClick={() => setExpanded((value) => !value)}
              aria-expanded={expanded}
            >
              {expanded ? "Tutup pecahan teknik" : "Lihat pecahan teknik"}
            </button>
          </div>
          {expanded && (
            <ol className="space-y-2 rounded border border-white/10 p-3 text-xs">
              {video.chapters.map((chapter) => (
                <li key={chapter}>{chapter}</li>
              ))}
            </ol>
          )}
          <div className="flex flex-wrap justify-between gap-2 text-xs">
            <strong>Ulasan Cikgu Razman · Demo</strong>
            <span className="text-[#18cb78]">Skor teknik: {video.score}</span>
          </div>
          <p className="text-xs leading-relaxed text-[#9aa3aa]">
            {video.feedback}
          </p>
        </article>
        <div className="space-y-3 lg:col-span-2">
          <h2 className="text-xs font-bold uppercase">Senarai Klip Teknik</h2>
          {videos.map((item) => (
            <button
              key={item.id}
              aria-pressed={selected === item.id}
              onClick={() => {
                setSelected(item.id);
                setExpanded(false);
              }}
              className={`${panelClass} w-full text-left ${selected === item.id ? "border-[#e61e2b]" : ""}`}
            >
              <span className="text-[10px] text-[#f0d313]">
                {item.category}
              </span>
              <h3 className="my-2 text-sm font-bold">{item.title}</h3>
              <span className="text-xs text-[#9aa3aa]">
                {item.date} · {item.duration}
              </span>
            </button>
          ))}
        </div>
      </div>
    </Screen>
  );
}
