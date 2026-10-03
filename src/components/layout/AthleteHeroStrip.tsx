import {
  CalendarDays,
  UserRound,
  ChartNoAxesColumn,
  MapPin,
  Swords,
  ChevronRight,
} from "lucide-react";
import type { AthleteProfile } from "../../types";
import { PssgmLogo } from "../common/PssgmLogo";
export function AthleteHeroStrip({
  athlete,
  onViewTeam,
}: {
  athlete: AthleteProfile;
  onViewTeam?: () => void;
}) {
  return (
    <section className="athlete-hero" aria-label="Profil ringkas atlet">
      <picture className="hero-picture">
        <source
          media="(max-width: 900px)"
          srcSet="/assets/athlete-mobile-demo.png"
        />
        <img
          className="hero-athlete"
          src="/assets/athlete-demo.png"
          alt="Atlet silat demonstrasi dalam posisi tempur"
        />
      </picture>
      <div className="athlete-info">
        <h1>
          <span>MUHAMMAD </span>HAZIQ BIN ISKANDAR
        </h1>
        <p className="athlete-role">ATLET SILAT | PSSGM PERAK</p>
        <div className="athlete-meta">
          <span>
            <CalendarDays />
            18 tahun
          </span>
          <span>
            <UserRound />
            Lelaki
          </span>
          <span>
            <ChartNoAxesColumn />
            Kelas A
          </span>
          <span>
            <Swords />
            Seni & Tempur
          </span>
          <span>
            <MapPin />
            <i>Psng: </i>Perak Tengah
          </span>
        </div>
        <blockquote>“{athlete.quote.replace(/[“”"]/g, "")}”</blockquote>
      </div>
      <PssgmLogo className="mobile-hero-logo" size={51} />
      <button className="athlete-club" onClick={onViewTeam}>
        <PssgmLogo size={98} />
        <div>
          <small>KELAB / PASUKAN</small>
          <strong>PSSGM PERAK</strong>
          <p>
            Persatuan Silat Seni Gayong Malaysia
            <br />
            Cawangan Perak
          </p>
        </div>
        <ChevronRight size={18} />
      </button>
    </section>
  );
}
