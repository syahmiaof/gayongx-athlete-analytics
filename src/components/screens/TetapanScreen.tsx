import { useState } from "react";
import {
  Screen,
  panelClass,
  inputClass,
  buttonClass,
} from "./ScreenPrimitives";

type Settings = {
  notifySessions: boolean;
  notifyWeight: boolean;
  weightUnit: "kg" | "lbs";
};
const defaults: Settings = {
  notifySessions: true,
  notifyWeight: true,
  weightUnit: "kg",
};
function readSettings(): Settings {
  try {
    const stored: unknown = JSON.parse(
      localStorage.getItem("gayongx-demo-settings-v1") ?? "null",
    );
    if (
      stored &&
      typeof stored === "object" &&
      "notifySessions" in stored &&
      "notifyWeight" in stored &&
      "weightUnit" in stored &&
      typeof stored.notifySessions === "boolean" &&
      typeof stored.notifyWeight === "boolean" &&
      (stored.weightUnit === "kg" || stored.weightUnit === "lbs")
    )
      return stored as Settings;
  } catch {
    /* Storage may be unavailable; local state remains usable. */
  }
  return defaults;
}
export function TetapanScreen() {
  const [settings, setSettings] = useState(readSettings);
  const [status, setStatus] = useState("");
  const update = (patch: Partial<Settings>) => {
    setSettings((value) => ({ ...value, ...patch }));
    setStatus("");
  };
  const save = () => {
    try {
      localStorage.setItem(
        "gayongx-demo-settings-v1",
        JSON.stringify(settings),
      );
      setStatus("Tetapan demo disimpan pada pelayar ini.");
    } catch {
      setStatus(
        "Pelayar tidak membenarkan simpanan. Tetapan masih aktif sepanjang sesi ini.",
      );
    }
  };
  return (
    <Screen
      title="Tetapan"
      subtitle="Pilihan demo pada pelayar ini"
      actions={
        <button className={buttonClass} onClick={save}>
          Simpan Tetapan
        </button>
      }
    >
      {status && (
        <p role="status" className="text-xs text-[#f0d313]">
          {status}
        </p>
      )}
      <article className={`${panelClass} space-y-4`}>
        <h2 className="text-sm font-bold">Pratonton Peringatan</h2>
        <p className="text-xs text-[#9aa3aa]">
          Pilihan ini mengubah pratonton di bawah. Demo tidak menghantar push
          notification.
        </p>
        <label className="flex items-center justify-between gap-3 text-xs">
          Peringatan Jadual Latihan
          <input
            type="checkbox"
            className="accent-[#e61e2b]"
            checked={settings.notifySessions}
            onChange={(event) =>
              update({ notifySessions: event.target.checked })
            }
          />
        </label>
        <label className="flex items-center justify-between gap-3 text-xs">
          Peringatan Log Berat & Hidrasi
          <input
            type="checkbox"
            className="accent-[#e61e2b]"
            checked={settings.notifyWeight}
            onChange={(event) => update({ notifyWeight: event.target.checked })}
          />
        </label>
        <div className="space-y-2 rounded border border-white/10 p-3 text-xs text-[#9aa3aa]">
          {settings.notifySessions && (
            <p>Latihan demo · Sesi bermula dalam 30 minit.</p>
          )}
          {settings.notifyWeight && (
            <p>Log demo · Semak catatan berat dan pengambilan air.</p>
          )}
          {!settings.notifySessions && !settings.notifyWeight && (
            <p>Tiada peringatan dalam pratonton.</p>
          )}
        </div>
      </article>
      <article className={`${panelClass} space-y-3`}>
        <h2 className="text-sm font-bold">Unit Pratonton Berat</h2>
        <label className="flex items-center justify-between gap-3 text-xs">
          Unit berat
          <select
            className={inputClass}
            value={settings.weightUnit}
            onChange={(event) =>
              update({
                weightUnit: event.target.value as Settings["weightUnit"],
              })
            }
          >
            <option value="kg">Kilogram (kg)</option>
            <option value="lbs">Pound (lbs)</option>
          </select>
        </label>
        <p className="text-xl font-bold text-[#f0d313]">
          {settings.weightUnit === "kg" ? "63.4 kg" : "139.8 lbs"}
        </p>
        <p className="text-[10px] text-[#9aa3aa]">
          Pratonton penukaran unit. Rekod analitik asal dipaparkan dalam kg.
        </p>
      </article>
      <p className="text-xs text-[#687078]">
        GAYONGX ATHLETE ANALYTICS · Frontend demo · Tiada akaun atau integrasi
        atlet sebenar.
      </p>
    </Screen>
  );
}
