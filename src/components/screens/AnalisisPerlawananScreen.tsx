import { matchesDemo as matches } from "../../data/secondaryData";
import { useState } from "react";
import { Screen, panelClass, buttonClass } from "./ScreenPrimitives";

export function AnalisisPerlawananScreen() {
  const [selected, setSelected] = useState("m1");
  const [tab, setTab] = useState<"ringkasan" | "serangan" | "jatuhan">(
    "ringkasan",
  );
  const match = matches.find((item) => item.id === selected) ?? matches[0];
  const metrics =
    tab === "serangan"
      ? [
          ["Pukulan tangan", match.strikes],
          ["Tendangan", match.kicks],
        ]
      : tab === "jatuhan"
        ? [["Jatuhan / Sapuan", match.takedowns]]
        : [
            ["Pukulan tangan", match.strikes],
            ["Tendangan", match.kicks],
            ["Jatuhan / Sapuan", match.takedowns],
            ["Kawalan gelanggang", match.control],
          ];
  return (
    <Screen
      title="Analisis Perlawanan"
      subtitle="Arkib dan statistik perlawanan sintetik"
    >
      <div className="grid gap-4 lg:grid-cols-5">
        <article className={`${panelClass} space-y-4 lg:col-span-3`}>
          <div className="flex aspect-video flex-col items-center justify-center rounded bg-[#07090b] p-4 text-center">
            <span className="text-[10px] font-bold uppercase text-[#9aa3aa]">
              Pratonton rekod demo · Tiada rakaman video
            </span>
            <h2 className="mt-4 text-lg font-bold">
              Muhammad Haziq vs {match.opponent}
            </h2>
            <p className="mt-2 text-xs text-[#9aa3aa]">{match.title}</p>
            <strong className="mt-4 text-3xl text-[#18cb78]">
              {match.score}
            </strong>
            <span className="mt-1 text-[10px] text-[#18cb78]">
              MENANG · DEMO
            </span>
          </div>
          <h3 className="text-xs font-bold uppercase text-[#f0d313]">
            Nota Taktikal
          </h3>
          <p className="text-xs leading-relaxed text-[#9aa3aa]">
            {match.notes}
          </p>
        </article>
        <div className="space-y-4 lg:col-span-2">
          <article className={panelClass}>
            <div className="mb-4 flex flex-wrap gap-2">
              {(["ringkasan", "serangan", "jatuhan"] as const).map((item) => (
                <button
                  key={item}
                  aria-pressed={tab === item}
                  onClick={() => setTab(item)}
                  className={`${buttonClass} ${tab === item ? "border-[#e61e2b] text-[#f0d313]" : ""}`}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="space-y-4">
              {metrics.map(([label, score]) => (
                <div key={label}>
                  <div className="flex justify-between text-xs">
                    <span>{label}</span>
                    <strong>{score}%</strong>
                  </div>
                  <div className="mt-2 h-1.5 rounded bg-white/5">
                    <div
                      className="h-full rounded bg-[#e61e2b]"
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </article>
          <h3 className="text-xs font-bold uppercase">Arkib Perlawanan</h3>
          {matches.map((item) => (
            <button
              key={item.id}
              aria-pressed={selected === item.id}
              onClick={() => setSelected(item.id)}
              className={`${panelClass} w-full text-left ${selected === item.id ? "border-[#e61e2b]" : ""}`}
            >
              <h4 className="text-xs font-bold">{item.title}</h4>
              <p className="mt-2 text-[11px] text-[#9aa3aa]">
                {item.date} · {item.opponent}
              </p>
              <p className="mt-2 text-xs text-[#18cb78]">MENANG {item.score}</p>
            </button>
          ))}
        </div>
      </div>
    </Screen>
  );
}
