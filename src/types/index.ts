export type NavSection =
  | "dashboard"
  | "profil"
  | "prestasi"
  | "latihan"
  | "nutrisi"
  | "recovery"
  | "perlawanan"
  | "video"
  | "benchmark"
  | "pasukan"
  | "laporan"
  | "tetapan";

export type MobileTab =
  "dashboard" | "latihan" | "pemakanan" | "prestasi" | "lagi";

export interface AthleteProfile {
  name: string;
  role: string;
  age: number;
  gender: string;
  silatClass: string;
  discipline: string;
  location: string;
  quote: string;
  club: {
    name: string;
    organization: string;
    chapter: string;
  };
  metrics: {
    readiness: { score: number; max: number; status: string; change: string };
    weight: {
      current: number;
      targetMin: number;
      targetMax: number;
      note: string;
      change: string;
    };
    bodyFat: { percentage: number; category: string; targetStatus: string };
    hydration: {
      percentage: number;
      status: string;
      consumedL: number;
      targetL: number;
    };
    nutrition: { adherence: number; status: string; macroNote: string };
    trainingLoad: { score: number; max: number; status: string };
    recovery: { score: number; status: string };
    sleep: { hours: number; minutes: number; status: string };
    injury: { status: string; note: string };
    mood: { status: string; note: string };
  };
}

export interface PrestasiDataPoint {
  month: string;
  score: number;
  kekuatan: number;
  dayaTahan: number;
  ketepatan: number;
}

export interface RadarMetric {
  key: string;
  label: string;
  sublabel: string;
  value: number;
  max: number;
}

export interface WeeklyScheduleDay {
  dayShort: string;
  dayNum?: number;
  name: string;
  type: string;
  intensity: 1 | 2 | 3;
  status: "Selesai" | "Hari Ini" | "Akan Datang";
  time?: string;
  venue?: string;
}

export interface TrainingDistributionItem {
  name: string;
  percentage: number;
  color: string;
}

export interface RecentSession {
  id: string;
  title: string;
  date: string;
  durationMin: number;
  rpe: number;
  status: "Selesai" | "Hari Ini";
  type: string;
}

export interface BenchmarkComparison {
  dataOrigin: "DEMO_SYNTHETIC";
  category: string;
  score: number;
  highlight?: boolean;
}

export interface MatchAnalysis {
  tournament: string;
  stage: string;
  date: string;
  result: "MENANG" | "TEWAS";
  score: string;
  opponent: string;
  tacticalNotes: string;
  videoDuration: string;
}

export interface CoachNote {
  id: string;
  coachName: string;
  coachRole: string;
  date: string;
  avatarInitials: string;
  content: string;
}
