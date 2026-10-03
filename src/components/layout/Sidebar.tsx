import {
  LayoutDashboard,
  UserRound,
  ChartNoAxesCombined,
  Dumbbell,
  Apple,
  ShieldPlus,
  Swords,
  Video,
  ScanLine,
  Users,
  FileText,
  Settings,
} from "lucide-react";
import type { NavSection } from "../../types";
import { PssgmLogo } from "../common/PssgmLogo";
export const navigation = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "profil", label: "Profil Atlet", icon: UserRound },
  { key: "prestasi", label: "Analisis Prestasi", icon: ChartNoAxesCombined },
  { key: "latihan", label: "Program Latihan", icon: Dumbbell },
  { key: "nutrisi", label: "Nutrisi & Berat", icon: Apple },
  { key: "recovery", label: "Recovery & Kesihatan", icon: ShieldPlus },
  { key: "perlawanan", label: "Analisis Perlawanan", icon: Swords },
  { key: "video", label: "Video & Teknik", icon: Video },
  { key: "benchmark", label: "Benchmark Atlet", icon: ScanLine },
  { key: "pasukan", label: "Pasukan & Jurulatih", icon: Users },
  { key: "laporan", label: "Laporan", icon: FileText },
  { key: "tetapan", label: "Tetapan", icon: Settings },
] satisfies { key: NavSection; label: string; icon: typeof UserRound }[];
export function Sidebar({
  currentSection,
  onSelectSection,
}: {
  currentSection: NavSection;
  onSelectSection: (s: NavSection) => void;
}) {
  return (
    <aside className="desktop-sidebar">
      <div className="sidebar-logo">
        <PssgmLogo size={145} />
      </div>
      <nav aria-label="Navigasi utama">
        {navigation.map(({ key, label, icon: Icon }) => (
          <a
            href={`#/${key}`}
            key={key}
            aria-current={currentSection === key ? "page" : undefined}
            className={currentSection === key ? "active" : ""}
            onClick={(e) => {
              e.preventDefault();
              onSelectSection(key);
            }}
          >
            <Icon size={20} />
            <span>{label}</span>
          </a>
        ))}
      </nav>
      <div className="sidebar-heritage">
        <strong>PSSGM PERAK</strong>
        <small>SILAT · ILMU · JATI DIRI</small>
      </div>
    </aside>
  );
}
