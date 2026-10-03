import type { ReactNode } from "react";

export const panelClass =
  "min-w-0 rounded-lg border border-white/10 bg-[#0c1013] p-4";
export const inputClass =
  "min-w-0 rounded border border-white/15 bg-[#11171b] px-3 py-2 text-xs text-white";
export const buttonClass =
  "rounded border border-white/15 bg-[#171d21] px-3 py-2 text-xs font-semibold text-white hover:bg-[#252d33] transition-colors";

export function Screen({
  title,
  subtitle,
  children,
  actions,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <section className="mx-auto w-full max-w-7xl space-y-4 p-4 sm:p-6">
      <header
        className={`${panelClass} flex flex-wrap items-center justify-between gap-3`}
      >
        <div className="min-w-0">
          <h1 className="text-lg font-extrabold uppercase tracking-tight text-white">
            {title}
          </h1>
          <p className="mt-1 text-xs text-[#9aa3aa]">{subtitle}</p>
        </div>
        {actions}
      </header>
      {children}
      <p className="text-[10px] text-[#687078]">
        DEMO · Semua profil, rekod, metrik dan identiti jurulatih ialah data
        sintetik.
      </p>
    </section>
  );
}
