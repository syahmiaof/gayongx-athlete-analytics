import React from "react";
import { useDialogFocus } from "../../hooks/useDialogFocus";
import { X, User, Shield, Award, MapPin, LogOut } from "lucide-react";
import { AthleteProfile, NavSection } from "../../types";
import { SilatAthleteAvatar } from "./SilatAthleteAvatar";
import { PssgmLogo } from "./PssgmLogo";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  athlete: AthleteProfile;
  onNavigate: (section: NavSection) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  athlete,
  onNavigate,
}) => {
  const dialogRef = useDialogFocus(isOpen, onClose);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Profil pengguna demo"
        className="relative w-full max-w-md bg-[#0B0F15] border border-[#232F3F] rounded-2xl p-5 shadow-2xl z-10 space-y-4"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1A2330] pb-3">
          <div className="flex items-center gap-2">
            <PssgmLogo size={32} />
            <div>
              <div className="text-xs font-black text-white">
                GAYONGX ATHLETE PROFILE
              </div>
              <div className="text-[9.5px] text-[#F3D217] font-bold">
                PSSGM Cawangan Perak
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-neutral-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Profile Card */}
        <div className="flex items-center gap-4 bg-[#0E141D] p-3.5 rounded-xl border border-[#1C2736]">
          <SilatAthleteAvatar size="md" />
          <div>
            <h4 className="text-sm font-black text-white">{athlete.name}</h4>
            <div className="text-[11px] font-bold text-[#E11D2E]">
              {athlete.role}
            </div>
            <div className="text-[10px] text-neutral-400 mt-0.5">
              {athlete.age} tahun • {athlete.silatClass} • {athlete.discipline}
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-1.5 text-xs">
          <button
            onClick={() => {
              onNavigate("profil");
              onClose();
            }}
            className="w-full text-left p-2.5 rounded-lg bg-[#0E141C] hover:bg-[#161F2C] border border-[#192330] text-neutral-200 hover:text-white font-medium flex items-center justify-between"
          >
            <span>Buka Profil Lengkap Atlet</span>
            <span className="text-[#E11D2E] font-bold">→</span>
          </button>
          <button
            onClick={() => {
              onNavigate("tetapan");
              onClose();
            }}
            className="w-full text-left p-2.5 rounded-lg bg-[#0E141C] hover:bg-[#161F2C] border border-[#192330] text-neutral-200 hover:text-white font-medium flex items-center justify-between"
          >
            <span>Tetapan Akaun & Aplikasi</span>
            <span className="text-neutral-500 font-bold">⚙</span>
          </button>
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-[#1A2330] flex items-center justify-between text-[11px] text-neutral-500">
          <span>Sesi Demo Pengguna: Atlet Aktif</span>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white font-semibold"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
