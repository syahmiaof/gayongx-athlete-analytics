import { mealsDemo as meals } from "../../data/secondaryData";
import { useState } from "react";
import { WeightTrendChart } from "../charts/WeightTrendChart";
import {
  Screen,
  panelClass,
  buttonClass,
  inputClass,
} from "./ScreenPrimitives";

export function NutrisiBeratScreen() {
  const [logging, setLogging] = useState(false);
  const [draftWeight, setDraftWeight] = useState("63.4");
  const [weights, setWeights] = useState<number[]>([]);
  const [selectedMeal, setSelectedMeal] = useState("tengahari");
  const [water, setWater] = useState(2.6);
  const meal = meals.find((item) => item.id === selectedMeal) ?? meals[1];
  const weight = weights.at(-1) ?? 63.4;
  const macros = [
    { label: "Karbohidrat", current: 240, target: 260, color: "#f0d313" },
    { label: "Protein", current: 145, target: 150, color: "#e61e2b" },
    { label: "Lemak", current: 52, target: 55, color: "#34a7e8" },
  ];
  return (
    <Screen
      title="Nutrisi & Berat"
      subtitle="Log demo · Julat kelas contoh 60–65 kg · Bukan pelan pemakanan peribadi"
      actions={
        <button
          className={buttonClass}
          onClick={() => setLogging((value) => !value)}
        >
          Log Timbang Berat
        </button>
      }
    >
      {logging && (
        <form
          className={`${panelClass} flex flex-wrap items-end gap-3`}
          onSubmit={(event) => {
            event.preventDefault();
            const value = Number(draftWeight);
            if (Number.isFinite(value) && value >= 20 && value <= 250) {
              setWeights((items) => [...items, value]);
              setLogging(false);
            }
          }}
        >
          <label className="space-y-2 text-xs">
            <span className="block">Berat demo (kg)</span>
            <input
              autoFocus
              required
              type="number"
              min="20"
              max="250"
              step="0.1"
              value={draftWeight}
              onChange={(event) => setDraftWeight(event.target.value)}
              className={inputClass}
            />
          </label>
          <button type="submit" className={buttonClass}>
            Simpan Log
          </button>
          <p className="text-[10px] text-[#9aa3aa]">
            Log setempat untuk sesi ini.
          </p>
        </form>
      )}
      <div className="grid gap-4 lg:grid-cols-5">
        <div className="space-y-4 lg:col-span-3">
          <article className={`${panelClass} space-y-3`}>
            <div className="flex flex-wrap justify-between gap-2">
              <div>
                <h2 className="text-xs font-bold uppercase text-[#9aa3aa]">
                  Berat Semasa
                </h2>
                <p className="mt-2 text-3xl font-extrabold">
                  {weight.toFixed(1)} <span className="text-base">kg</span>
                </p>
              </div>
              <div className="text-right text-xs">
                <span className="text-[#9aa3aa]">Julat kelas demo</span>
                <p className="mt-2 font-bold text-[#f0d313]">60–65 kg</p>
              </div>
            </div>
            <p className="text-[10px] text-[#9aa3aa]">
              Trend sejarah demo · Mei–Jun 2024
            </p>
            <WeightTrendChart />
            {weights.length > 0 && (
              <div
                role="status"
                className="border-t border-white/10 pt-3 text-xs"
              >
                <h3 className="font-bold">Log Sesi Ini</h3>
                <ol className="mt-2 space-y-1 text-[#9aa3aa]">
                  {weights.map((value, index) => (
                    <li key={index}>
                      Catatan {index + 1}: {value.toFixed(1)} kg
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </article>
          <article className={`${panelClass} space-y-3`}>
            <div className="flex justify-between gap-2">
              <h2 className="text-xs font-bold uppercase text-[#34a7e8]">
                Log Pengambilan Air
              </h2>
              <span className="text-xs">{water.toFixed(2)} / 3.5 L</span>
            </div>
            <div className="h-2 rounded bg-white/5">
              <div
                className="h-full rounded bg-[#34a7e8] transition-all"
                style={{ width: `${Math.min(100, (water / 3.5) * 100)}%` }}
              />
            </div>
            <button
              className={buttonClass}
              onClick={() =>
                setWater((value) => Math.round((value + 0.25) * 100) / 100)
              }
            >
              Tambah 250 ml
            </button>
            <p className="text-[10px] text-[#9aa3aa]">
              Sasaran 3.5 L ialah nilai demo. Skor hidrasi dashboard (78%) ialah
              metrik sintetik berasingan.
            </p>
          </article>
        </div>
        <div className="space-y-4 lg:col-span-2">
          <article className={`${panelClass} space-y-4`}>
            <h2 className="text-xs font-bold uppercase">
              Ringkasan Makro Demo
            </h2>
            {macros.map((item) => (
              <div key={item.label}>
                <div className="flex justify-between gap-2 text-xs">
                  <span>{item.label}</span>
                  <span>
                    {item.current}/{item.target} g
                  </span>
                </div>
                <div className="mt-2 h-1.5 rounded bg-white/5">
                  <div
                    className="h-full rounded"
                    style={{
                      width: `${(item.current / item.target) * 100}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </article>
          <article className={`${panelClass} space-y-4`}>
            <h2 className="text-xs font-bold uppercase">
              Contoh Catatan Makanan
            </h2>
            <div className="flex flex-wrap gap-2">
              {meals.map((item) => (
                <button
                  key={item.id}
                  aria-pressed={selectedMeal === item.id}
                  onClick={() => setSelectedMeal(item.id)}
                  className={`${buttonClass} ${selectedMeal === item.id ? "border-[#e61e2b]" : ""}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <p className="text-sm">{meal.meal}</p>
            <span className="text-xs text-[#f0d313]">
              {meal.calories} kcal · Anggaran sintetik
            </span>
          </article>
        </div>
      </div>
    </Screen>
  );
}
