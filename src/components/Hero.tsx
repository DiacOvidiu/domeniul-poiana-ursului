import { useEffect, useRef, useState } from "react";
import { ChevronDown, Star, MapPin, Award } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const HERO_BASE =
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4";
const HERO_AVIF_SRCSET = [
  `${HERO_BASE}?w=600&q=55&fm=avif 600w`,
  `${HERO_BASE}?w=900&q=55&fm=avif 900w`,
  `${HERO_BASE}?w=1280&q=58&fm=avif 1280w`,
  `${HERO_BASE}?w=1600&q=60&fm=avif 1600w`,
  `${HERO_BASE}?w=1920&q=62&fm=avif 1920w`,
].join(", ");
const HERO_WEBP_SRCSET = [
  `${HERO_BASE}?w=600&q=65&fm=webp 600w`,
  `${HERO_BASE}?w=900&q=65&fm=webp 900w`,
  `${HERO_BASE}?w=1280&q=68&fm=webp 1280w`,
  `${HERO_BASE}?w=1600&q=70&fm=webp 1600w`,
  `${HERO_BASE}?w=1920&q=72&fm=webp 1920w`,
].join(", ");
const HERO_FALLBACK = `${HERO_BASE}?w=1280&q=68&fm=webp`;

export default function Hero() {
  const { t } = useLanguage();
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [parallaxEnabled, setParallaxEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
    );
    const update = () => setParallaxEnabled(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!parallaxEnabled) {
      if (parallaxRef.current) parallaxRef.current.style.transform = "";
      return;
    }
    let raf = 0;
    let pending = false;
    const apply = () => {
      pending = false;
      const el = parallaxRef.current;
      if (!el) return;
      const y = window.scrollY * 0.35;
      el.style.transform = `translate3d(0, ${y}px, 0)`;
    };
    const onScroll = () => {
      if (pending) return;
      pending = true;
      raf = window.requestAnimationFrame(apply);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    apply();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [parallaxEnabled]);

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      aria-label="Hero - Domeniul Poiana Ursului"
      data-testid="hero-section"
    >
      <div
        ref={parallaxRef}
        className="absolute inset-0 hero-bg pointer-events-none"
      >
        <picture>
          <source type="image/avif" srcSet={HERO_AVIF_SRCSET} sizes="100vw" />
          <source type="image/webp" srcSet={HERO_WEBP_SRCSET} sizes="100vw" />
          <img
            src={HERO_FALLBACK}
            alt="Peisaj montan - Domeniul Poiana Ursului, Dumbrăveni, Sibiu"
            width={1600}
            height={1067}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover scale-110"
          />
        </picture>
      </div>
      <div className="absolute inset-0 gradient-overlay pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-3xl">
          <div
            className="flex items-center gap-2 mb-6 animate-fade-in-up"
            data-testid="hero-location"
          >
            <div className="flex items-center gap-2 glass px-3 py-1.5 rounded-full text-xs text-muted-foreground">
              <MapPin className="w-3 h-3 text-gold" />
              <span>{t.hero.location}</span>
            </div>
            <div className="flex items-center gap-1.5 glass px-3 py-1.5 rounded-full text-xs text-gold">
              <Star className="w-3 h-3 fill-gold" />
              <span className="font-semibold">{t.hero.booking}</span>
            </div>
          </div>

          <h1
            className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-foreground leading-none mb-6 animate-fade-in-up delay-100"
            data-testid="hero-title"
          >
            {t.hero.title1}
            <br />
            <span className="text-gradient-gold italic">{t.hero.title2}</span>
          </h1>

          <p
            className="text-lg sm:text-xl text-muted-foreground max-w-xl mb-8 leading-relaxed animate-fade-in-up delay-200"
            data-testid="hero-subtitle"
          >
            {t.hero.subtitle}
          </p>

          <div
            className="flex flex-wrap gap-4 mb-10 animate-fade-in-up delay-300"
            data-testid="hero-trust"
          >
            {[
              { icon: Award, text: t.hero.trust1 },
              { icon: MapPin, text: t.hero.trust2 },
              { icon: Star, text: t.hero.trust3 },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon className="w-4 h-4 text-gold" />
                <span>{text}</span>
              </div>
            ))}
          </div>

          <div
            className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-400"
            data-testid="hero-ctas"
          >
            <a
              href="https://www.booking.com/hotel/ro/domeniul-poiana-ursului.ro.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-gold text-background px-8 py-4 rounded-full font-semibold text-base hover:brightness-110 transition-all duration-300 shadow-xl shadow-amber-900/30"
              data-testid="hero-cta-book"
            >
              {t.hero.cta1}
            </a>
            <button
              onClick={() => {
                const el = document.querySelector("#despre");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center justify-center gap-2 glass border border-gold/30 text-foreground px-8 py-4 rounded-full font-medium text-base hover:border-gold/60 transition-all duration-300"
              data-testid="hero-cta-discover"
            >
              {t.hero.cta2}
            </button>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 animate-fade-in delay-1000"
        data-testid="hero-scroll-indicator"
      >
        <span className="text-xs text-muted-foreground tracking-widest uppercase">{t.hero.scroll}</span>
        <div className="animate-bounce-y">
          <ChevronDown className="w-5 h-5 text-gold" />
        </div>
      </div>
    </section>
  );
}
