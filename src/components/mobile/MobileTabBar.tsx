import {
  House,
  PersonStanding,
  Utensils,
  ChartNoAxesColumnIncreasing,
  Ellipsis,
} from "lucide-react";
import type { MobileTab } from "../../types";
const tabs = [
  { key: "dashboard", label: "Dashboard", icon: House },
  { key: "latihan", label: "Latihan", icon: PersonStanding },
  { key: "pemakanan", label: "Pemakanan", icon: Utensils },
  { key: "prestasi", label: "Prestasi", icon: ChartNoAxesColumnIncreasing },
  { key: "lagi", label: "Lagi", icon: Ellipsis },
] as const;
export function MobileTabBar({
  currentTab,
  onSelectTab,
}: {
  currentTab: MobileTab;
  onSelectTab: (s: MobileTab) => void;
}) {
  return (
    <nav className="mobile-bottom-nav" aria-label="Navigasi mudah alih">
      {tabs.map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          className={currentTab === key ? "active" : ""}
          aria-current={currentTab === key ? "page" : undefined}
          onClick={() => onSelectTab(key)}
        >
          <Icon />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}
