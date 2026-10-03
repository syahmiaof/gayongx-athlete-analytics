import React from "react";
import { useDialogFocus } from "../../hooks/useDialogFocus";
import { X, Bell, Swords, Scale, HeartPulse, CheckCheck } from "lucide-react";

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onClearAll: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  onClearAll,
}) => {
  const dialogRef = useDialogFocus(isOpen, onClose);
  if (!isOpen) return null;

  const notifications = [
    {
      id: "n1",
      title: "Sesi Sparring Tempur Bermula 08:00",
      desc: "Dewan PSSGM Perak • Bawa pelindung dada dan sarung tangan.",
      time: "15 minit lalu",
      type: "combat",
    },
    {
      id: "n2",
      title: "Kemas Kini Berat Badan",
      desc: "Berat semasa 63.4 kg. Sasaran kelas 60-65 kg dicapai dengan baik.",
      time: "1 jam lalu",
      type: "weight",
    },
    {
      id: "n3",
      title: "Skor Readiness Bertanding: 82/100",
      desc: "Pemulihan dan kualiti tidur cemerlang. Tiada sebarang kecederaan dilaporkan.",
      time: "Pagi tadi",
      type: "recovery",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end select-none">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Notifikasi Prestasi"
        className="relative w-full max-w-sm bg-[#0B0F15] border-l border-[#1F2937] h-full z-10 flex flex-col shadow-2xl"
      >
        {/* Header */}
        <div className="p-4 border-b border-[#1A2330] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#E11D2E]" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Notifikasi Prestasi
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-[#161D28] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Notification list */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {notifications.map((item) => (
            <div
              key={item.id}
              className="p-3 rounded-xl bg-[#0E131A] border border-[#18212C] space-y-1 hover:border-[#263548] transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-bold text-white leading-tight">
                  {item.title}
                </span>
                <span className="text-[9px] text-neutral-500 font-mono flex-shrink-0">
                  {item.time}
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 leading-snug">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-[#1A2330] flex items-center justify-between text-xs">
          <button
            onClick={onClearAll}
            className="text-[11px] text-neutral-400 hover:text-white flex items-center gap-1"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Tanda Semua Dibaca</span>
          </button>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-[#141C25] hover:bg-[#1E2938] text-white rounded text-[11px] font-bold"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
