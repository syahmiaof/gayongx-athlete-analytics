import { useEffect, useState } from "react";
import type { NavSection, MobileTab } from "./types";
import { primaryAthlete } from "./data/mockData";
import { useMediaQuery } from "./hooks/useMediaQuery";
import { Header } from "./components/layout/Header";
import { Sidebar, navigation } from "./components/layout/Sidebar";
import { AthleteHeroStrip } from "./components/layout/AthleteHeroStrip";
import { MetricCardsRow } from "./components/dashboard/MetricCardsRow";
import { MiddlePanels } from "./components/dashboard/MiddlePanels";
import { LowerPanels } from "./components/dashboard/LowerPanels";
import { MobileDashboard } from "./components/mobile/MobileDashboard";
import { MobileTabBar } from "./components/mobile/MobileTabBar";
import { MobileTrainingView } from "./components/mobile/MobileTrainingView";
import { ProfilAtletScreen } from "./components/screens/ProfilAtletScreen";
import { ProgramLatihanScreen } from "./components/screens/ProgramLatihanScreen";
import { NutrisiBeratScreen } from "./components/screens/NutrisiBeratScreen";
import { RecoveryKesihatanScreen } from "./components/screens/RecoveryKesihatanScreen";
import { AnalisisPerlawananScreen } from "./components/screens/AnalisisPerlawananScreen";
import { AnalisisPrestasiScreen } from "./components/screens/AnalisisPrestasiScreen";
import { BenchmarkScreen } from "./components/screens/BenchmarkScreen";
import { VideoTeknikScreen } from "./components/screens/VideoTeknikScreen";
import { PasukanJurulatihScreen } from "./components/screens/PasukanJurulatihScreen";
import { LaporanScreen } from "./components/screens/LaporanScreen";
import { TetapanScreen } from "./components/screens/TetapanScreen";
import { NotificationDrawer } from "./components/common/NotificationDrawer";
import { ProfileModal } from "./components/common/ProfileModal";
type Route = NavSection | "lagi";
function routeFromHash(): Route {
  const hash = window.location.hash.replace("#/", "");
  return hash === "lagi" || navigation.some((n) => n.key === hash)
    ? (hash as Route)
    : "dashboard";
}
export default function App() {
  const mobile = useMediaQuery("(max-width: 900px)");
  const [section, setSection] = useState<Route>(routeFromHash);
  const [notifications, setNotifications] = useState(false);
  const [profile, setProfile] = useState(false);
  const [unread, setUnread] = useState(3);
  useEffect(() => {
    const listener = () => {
      setSection(routeFromHash());
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", listener);
    return () => window.removeEventListener("hashchange", listener);
  }, []);
  const navigate = (s: Route) => {
    setSection(s);
    window.location.hash = `/${s}`;
    window.scrollTo(0, 0);
  };
  const selectMetric = (key: string) =>
    navigate(
      ["weight", "bodyFat", "hydration", "nutrition"].includes(key)
        ? "nutrisi"
        : key === "load"
          ? "latihan"
          : "recovery",
    );
  const mobileTab: MobileTab =
    section === "dashboard"
      ? "dashboard"
      : section === "latihan"
        ? "latihan"
        : section === "nutrisi"
          ? "pemakanan"
          : section === "prestasi"
            ? "prestasi"
            : "lagi";
  const content = () => {
    switch (section) {
      case "dashboard":
        return mobile ? (
          <MobileDashboard
            athlete={primaryAthlete}
            onNavigate={navigate}
            onSelectMetric={selectMetric}
          />
        ) : (
          <div className="dashboard-content">
            <MetricCardsRow
              athlete={primaryAthlete}
              onSelectMetric={selectMetric}
            />
            <MiddlePanels />
            <LowerPanels onNavigate={navigate} />
          </div>
        );
      case "profil":
        return <ProfilAtletScreen athlete={primaryAthlete} />;
      case "prestasi":
        return <AnalisisPrestasiScreen />;
      case "latihan":
        return mobile ? (
          <MobileTrainingView onNavigate={navigate} />
        ) : (
          <ProgramLatihanScreen />
        );
      case "nutrisi":
        return <NutrisiBeratScreen />;
      case "recovery":
        return <RecoveryKesihatanScreen athlete={primaryAthlete} />;
      case "perlawanan":
        return <AnalisisPerlawananScreen />;
      case "benchmark":
        return <BenchmarkScreen />;
      case "video":
        return <VideoTeknikScreen />;
      case "pasukan":
        return <PasukanJurulatihScreen />;
      case "laporan":
        return <LaporanScreen athlete={primaryAthlete} />;
      case "tetapan":
        return <TetapanScreen />;
      case "lagi":
        return (
          <div className="more-menu">
            <h1>Modul Atlet</h1>
            <p>Data demonstrasi · PSSGM Perak</p>
            {navigation
              .filter((n) => n.key !== "dashboard")
              .map(({ key, label, icon: Icon }) => (
                <button key={key} onClick={() => navigate(key)}>
                  <Icon size={20} />
                  {label}
                </button>
              ))}
          </div>
        );
    }
  };
  return (
    <div className={`app-shell ${mobile ? "is-mobile" : ""}`}>
      <a className="skip-link" href="#main-content">
        Langkau ke kandungan
      </a>
      {!mobile && (
        <Sidebar
          currentSection={section === "lagi" ? "profil" : section}
          onSelectSection={navigate}
        />
      )}
      <div className="main-shell">
        <Header
          onOpenNotifications={() => setNotifications(true)}
          onOpenProfile={() => setProfile(true)}
          unreadCount={unread}
          onNavigate={navigate}
        />
        {!mobile && (
          <AthleteHeroStrip
            athlete={primaryAthlete}
            onViewTeam={() => navigate("pasukan")}
          />
        )}
        <main
          id="main-content"
          className={
            section === "dashboard" ? "main-dashboard" : "secondary-screen"
          }
        >
          {content()}
        </main>
        <footer className="demo-footer">
          DEMO · Semua profil, metrik dan benchmark ialah data sintetik.
        </footer>
      </div>
      {mobile && (
        <MobileTabBar
          currentTab={mobileTab}
          onSelectTab={(t) => navigate(t === "pemakanan" ? "nutrisi" : t)}
        />
      )}
      <NotificationDrawer
        isOpen={notifications}
        onClose={() => setNotifications(false)}
        onClearAll={() => {
          setUnread(0);
          setNotifications(false);
        }}
      />
      <ProfileModal
        isOpen={profile}
        onClose={() => setProfile(false)}
        athlete={primaryAthlete}
        onNavigate={navigate}
      />
    </div>
  );
}
