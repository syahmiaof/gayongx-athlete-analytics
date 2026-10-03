import { Bell, Search, ChevronDown } from "lucide-react";
import { useState } from "react";
import { navigation } from "./Sidebar";
import type { NavSection } from "../../types";
interface Props {
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
  unreadCount?: number;
  onNavigate?: (section: NavSection) => void;
}
export function Header({
  onOpenNotifications,
  onOpenProfile,
  unreadCount = 3,
  onNavigate,
}: Props) {
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState("");
  return (
    <header className="brand-header">
      <div className="brand">
        <div className="brand-word">
          GAYONG<span>X</span>
        </div>
        <div className="brand-sub">ATHLETE ANALYTICS</div>
        <div className="brand-tag">
          COMBAT ATHLETE INTELLIGENCE · PSSGM PERAK
        </div>
      </div>
      <div className="brand-values">
        DISIPLIN · TRADISI · PRESTASI<small>PENDEKAR · GENERASI · PERAK</small>
      </div>
      <div className="header-actions">
        <button
          className="search-trigger"
          aria-label="Cari"
          onClick={() => setSearch(!search)}
        >
          <Search size={21} />
        </button>
        <button aria-label="Notifikasi" onClick={onOpenNotifications}>
          <Bell size={21} />
          {unreadCount > 0 && (
            <b className="notification-count">{unreadCount}</b>
          )}
        </button>
        <button aria-label="Profil pengguna" onClick={onOpenProfile}>
          <span className="profile-initials">MA</span>
          <ChevronDown size={15} />
        </button>
      </div>
      {search && (
        <div className="search-panel">
          <input
            aria-label="Cari modul"
            autoFocus
            placeholder="Cari modul..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {navigation
            .filter((n) => n.label.toLowerCase().includes(query.toLowerCase()))
            .map((n) => (
              <button
                key={n.key}
                onClick={() => {
                  onNavigate?.(n.key);
                  setSearch(false);
                  setQuery("");
                }}
              >
                {n.label}
              </button>
            ))}
        </div>
      )}
    </header>
  );
}
