import {
  AthleteProfile,
  PrestasiDataPoint,
  RadarMetric,
  WeeklyScheduleDay,
  TrainingDistributionItem,
  RecentSession,
  BenchmarkComparison,
  MatchAnalysis,
  CoachNote,
} from "../types";

export const primaryAthlete: AthleteProfile = {
  name: "MUHAMMAD HAZIQ BIN ISKANDAR",
  role: "ATLET SILAT | PSSGM PERAK",
  age: 18,
  gender: "Lelaki",
  silatClass: "Kelas A",
  discipline: "Seni & Tempur",
  location: "Psng: Perak Tengah",
  quote: '"Disiplin hari ini, juara esok."',
  club: {
    name: "PSSGM PERAK",
    organization: "Persatuan Silat Seni Gayong Malaysia",
    chapter: "Cawangan Perak",
  },
  metrics: {
    readiness: {
      score: 82,
      max: 100,
      status: "Sedia Bertanding",
      change: "+6%",
    },
    weight: {
      current: 63.4,
      targetMin: 60.0,
      targetMax: 65.0,
      note: "Target kelas",
      change: "-0.8 kg dlm 2 minggu",
    },
    bodyFat: {
      percentage: 14.2,
      category: "Body Fat",
      targetStatus: "Lean ✓ Atletik",
    },
    hydration: {
      percentage: 78,
      status: "Optimal",
      consumedL: 2.6,
      targetL: 3.5,
    },
    nutrition: {
      adherence: 87,
      status: "Pematuhan",
      macroNote: "Makro seimbang",
    },
    trainingLoad: {
      score: 7.2,
      max: 10,
      status: "Sederhana-Tinggi",
    },
    recovery: {
      score: 76,
      status: "Baik",
    },
    sleep: {
      hours: 7,
      minutes: 24,
      status: "Kualiti Baik",
    },
    injury: {
      status: "Tiada",
      note: "Laporan kendiri demo",
    },
    mood: {
      status: "Baik",
      note: "Fokus Tinggi",
    },
  },
};

export const prestasiMonthlyData: PrestasiDataPoint[] = [
  { month: "Jan", score: 36, kekuatan: 52, dayaTahan: 50, ketepatan: 55 },
  { month: "Feb", score: 54, kekuatan: 60, dayaTahan: 56, ketepatan: 58 },
  { month: "Mac", score: 56, kekuatan: 64, dayaTahan: 54, ketepatan: 62 },
  { month: "Apr", score: 65, kekuatan: 68, dayaTahan: 65, ketepatan: 70 },
  { month: "Mei", score: 73, kekuatan: 74, dayaTahan: 72, ketepatan: 78 },
  { month: "Jun", score: 86, kekuatan: 78, dayaTahan: 76, ketepatan: 88 },
];

export const radarMetricsData: RadarMetric[] = [
  {
    key: "kelajuan",
    label: "Kelajuan",
    sublabel: "Speed",
    value: 84,
    max: 100,
  },
  {
    key: "kekuatan",
    label: "Kekuatan",
    sublabel: "Power",
    value: 78,
    max: 100,
  },
  {
    key: "ketangkasan",
    label: "Ketangkasan",
    sublabel: "Agility",
    value: 83,
    max: 100,
  },
  {
    key: "dayaTahan",
    label: "Daya Tahan",
    sublabel: "Endurance",
    value: 76,
    max: 100,
  },
  {
    key: "mobiliti",
    label: "Mobiliti",
    sublabel: "Mobility",
    value: 80,
    max: 100,
  },
  {
    key: "kecekapanTeknikal",
    label: "Kecekapan Teknikal",
    sublabel: "Technical Efficiency",
    value: 88,
    max: 100,
  },
];

export const weeklyScheduleData: WeeklyScheduleDay[] = [
  {
    dayShort: "Isn",
    dayNum: 3,
    name: "Isnin",
    type: "Teknik & Form",
    intensity: 3,
    status: "Selesai",
    time: "16:00 - 17:30",
    venue: "Gelanggang Utama",
  },
  {
    dayShort: "Sel",
    dayNum: 4,
    name: "Selasa",
    type: "Sparring / Tempur",
    intensity: 3,
    status: "Selesai",
    time: "08:00 - 10:00",
    venue: "Dewan PSSGM Perak",
  },
  {
    dayShort: "Rab",
    dayNum: 5,
    name: "Rabu",
    type: "Kekuatan & Kondisi",
    intensity: 2,
    status: "Selesai",
    time: "18:00 - 19:30",
    venue: "Bilik Kekuatan",
  },
  {
    dayShort: "Kha",
    dayNum: 6,
    name: "Khamis",
    type: "Mobiliti & Recovery",
    intensity: 1,
    status: "Selesai",
    time: "17:00 - 18:30",
    venue: "Pusat Fisioterapi",
  },
  {
    dayShort: "Jum",
    dayNum: 7,
    name: "Jumaat",
    type: "Strategi Perlawanan",
    intensity: 3,
    status: "Hari Ini",
    time: "15:30 - 17:30",
    venue: "Bilik Teori & Taktikal",
  },
  {
    dayShort: "Sab",
    dayNum: 8,
    name: "Sabtu",
    type: "Simulasi Perlawanan",
    intensity: 3,
    status: "Akan Datang",
    time: "08:30 - 11:30",
    venue: "Gelanggang Kejohanan",
  },
  {
    dayShort: "Ahd",
    dayNum: 9,
    name: "Ahad",
    type: "Rehat Aktif",
    intensity: 1,
    status: "Akan Datang",
    time: "Fleksibel",
    venue: "Pemulihan Sendiri",
  },
];

export const trainingDistribution: TrainingDistributionItem[] = [
  { name: "Teknik & Form", percentage: 33, color: "#E11D2E" },
  { name: "Sparring / Tempur", percentage: 28, color: "#F3D217" },
  { name: "Kekuatan & Kondisi", percentage: 17, color: "#16C172" },
  { name: "Mobiliti & Recovery", percentage: 11, color: "#3AA0FF" },
  { name: "Strategi & Analisis", percentage: 11, color: "#A1A1AA" },
];

export const recentSessions: RecentSession[] = [
  {
    id: "s1",
    title: "Sparring Intensiti Tinggi",
    date: "Hari ini",
    durationMin: 90,
    rpe: 8.2,
    status: "Selesai",
    type: "combat",
  },
  {
    id: "s2",
    title: "Teknik Tangan & Kaki",
    date: "2 Jun 2024",
    durationMin: 75,
    rpe: 7.8,
    status: "Selesai",
    type: "technique",
  },
  {
    id: "s3",
    title: "Kekuatan Lower Body",
    date: "31 Mei 2024",
    durationMin: 60,
    rpe: 7.5,
    status: "Selesai",
    type: "strength",
  },
  {
    id: "s4",
    title: "Analisis Video Perlawanan",
    date: "29 Mei 2024",
    durationMin: 45,
    rpe: 8.0,
    status: "Selesai",
    type: "analysis",
  },
];

export const benchmarkComparisons: BenchmarkComparison[] = [
  {
    category: "Anda",
    score: 86,
    highlight: true,
    dataOrigin: "DEMO_SYNTHETIC",
  },
  { category: "Purata PSSGM Perak", score: 72, dataOrigin: "DEMO_SYNTHETIC" },
  {
    category: "Atlet Negeri (Top 25%)",
    score: 78,
    dataOrigin: "DEMO_SYNTHETIC",
  },
  { category: "Atlet Kebangsaan", score: 83, dataOrigin: "DEMO_SYNTHETIC" },
  {
    category: "Peringkat Antarabangsa",
    score: 90,
    dataOrigin: "DEMO_SYNTHETIC",
  },
];

export const matchAnalysisData: MatchAnalysis = {
  tournament: "Kejohanan Silat Kebangsaan 2024",
  stage: "Separuh Akhir",
  date: "12 Mei 2024",
  result: "MENANG",
  score: "3 - 1",
  opponent: "Ahmad Faiz (PSSGM Selangor)",
  tacticalNotes:
    "Penguasaan gelanggang cemerlang pada pusingan kedua. Serangan balas jatuhan berjaya mengutip 2 mata penting.",
  videoDuration: "14:32",
};

export const coachNotesData: CoachNote = {
  id: "cn1",
  coachName: "Cikgu Razman",
  coachRole: "Jurulatih Kanan Tempur · Identiti demo",
  date: "2 Jun 2024",
  avatarInitials: "CR",
  content:
    "Prestasi konsisten. Fokus pada ketepatan serangan belakang dan kawalan jarak. Kondisi fizikal semakin baik.",
};

export const weightHistoryTrend = [
  { date: "27 Mei", weight: 64.2, targetMin: 60, targetMax: 65 },
  { date: "3 Jun", weight: 64.9, targetMin: 60, targetMax: 65 },
  { date: "10 Jun", weight: 64.2, targetMin: 60, targetMax: 65 },
  { date: "17 Jun", weight: 63.8, targetMin: 60, targetMax: 65 },
  { date: "24 Jun", weight: 63.4, targetMin: 60, targetMax: 65 },
];

export const combatSpecificMetrics = {
  ketepatanSerangan: { value: 78, change: "+5%", status: "Tinggi" },
  keberkesananPertahanan: { value: 82, change: "+8%", status: "Sangat Baik" },
  kadarReaksi: { value: "0.28s", change: "-12%", status: "Pantas · Demo" },
  kawalanGelanggang: { value: 76, change: "+6%", status: "Dominan" },
};

// Denser demonstration samples reconstructed from the approved performance curve.
export const performanceSampleScores = [
  36, 40, 50, 52, 58, 57, 56, 62, 65, 73, 71, 75, 78, 86,
] as const;
