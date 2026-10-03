// Synthetic presentation records for the frontend demo only.
export const secondaryDataOrigin = "DEMO_SYNTHETIC" as const;

export const trainingSessionsDemo = [
  {
    id: "tempur",
    title: "Sparring & Tempur",
    date: "3 Jun",
    day: "Isnin",
    time: "08:00 – 10:00",
    venue: "Dewan PSSGM Perak",
    intensity: "Tinggi",
    duration: "120 min",
    focus: "Kawalan jarak dan serangan balas",
    modules: [
      "Pemanasan & gerak langkah",
      "Latihan berpasangan",
      "Ulasan taktikal bersama jurulatih",
    ],
  },
  {
    id: "teknik",
    title: "Teknik & Form",
    date: "4 Jun",
    day: "Selasa",
    time: "16:00 – 17:30",
    venue: "Gelanggang Utama",
    intensity: "Sederhana",
    duration: "90 min",
    focus: "Ketepatan teknik dan keseimbangan",
    modules: [
      "Ulangan form asas",
      "Koordinasi tangan & kaki",
      "Semakan teknik bersama jurulatih",
    ],
  },
  {
    id: "fizikal",
    title: "Kekuatan & Kondisi",
    date: "5 Jun",
    day: "Rabu",
    time: "18:00 – 19:30",
    venue: "Bilik Kekuatan",
    intensity: "Sederhana",
    duration: "90 min",
    focus: "Kualiti pergerakan dan kondisi",
    modules: [
      "Persediaan pergerakan",
      "Sesi kekuatan terselia",
      "Catatan beban latihan",
    ],
  },
];

export const techniqueVideosDemo = [
  {
    id: "v1",
    title: "Sapuan Rebah & Jatuhan Pungguk",
    date: "2 Jun 2024",
    duration: "06:45",
    category: "Teknik Jatuhan",
    score: "9.2 / 10",
    feedback:
      "Paksi tapak kaki hadapan stabil. Posisi tangan penghalang tepat.",
    chapters: [
      "00:00 · Persediaan tapak",
      "01:40 · Tangkapan dan imbangan",
      "04:20 · Ulasan ulangan teknik",
    ],
  },
  {
    id: "v2",
    title: "Sepakan Layang Kilas",
    date: "28 Mei 2024",
    duration: "04:12",
    category: "Teknik Serangan Kaki",
    score: "8.7 / 10",
    feedback: "Fokus pada koordinasi putaran pinggul dan posisi pertahanan.",
    chapters: [
      "00:00 · Posisi awal",
      "01:15 · Gerakan sepakan",
      "03:10 · Semakan teknik",
    ],
  },
  {
    id: "v3",
    title: "Tangkapan & Serangan Balas",
    date: "24 Mei 2024",
    duration: "08:20",
    category: "Pertahanan & Tangkapan",
    score: "9.5 / 10",
    feedback:
      "Kualiti tangkapan kemas. Contoh masa reaksi dalam rekod demo: 0.26 saat.",
    chapters: [
      "00:00 · Kawalan jarak",
      "02:30 · Tangkapan sepakan",
      "06:00 · Serangan balas",
    ],
  },
];

export const matchesDemo = [
  {
    id: "m1",
    title: "Separuh Akhir · Kejohanan Silat Kebangsaan 2024",
    date: "12 Mei 2024",
    opponent: "Ahmad Faiz (Selangor)",
    score: "3 – 1",
    notes:
      "Penguasaan gelanggang pada pusingan kedua. Serangan balas jatuhan berjaya mengutip mata.",
    strikes: 80,
    kicks: 82,
    takedowns: 80,
    control: 76,
  },
  {
    id: "m2",
    title: "Suku Akhir · Kejohanan Silat Kebangsaan 2024",
    date: "11 Mei 2024",
    opponent: "Kamarul Ariffin (Kedah)",
    score: "4 – 0",
    notes:
      "Kawalan jarak konsisten. Pertahanan dan tangkapan membuka ruang untuk serangan balas.",
    strikes: 84,
    kicks: 76,
    takedowns: 85,
    control: 81,
  },
];

export const mealsDemo = [
  {
    id: "pagi",
    label: "Sarapan",
    meal: "Oatmeal, telur dan pisang",
    calories: 420,
  },
  {
    id: "tengahari",
    label: "Tengah hari",
    meal: "Nasi perang, ayam bakar dan sayur",
    calories: 580,
  },
  {
    id: "malam",
    label: "Malam",
    meal: "Ikan stim, brokoli dan sup sayur",
    calories: 390,
  },
];
