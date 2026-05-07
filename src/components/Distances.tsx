import { useEffect, useRef, useState } from "react";
import { m } from "framer-motion";
import { MapPin, Clock, Car } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    setInView(true);
  }, []);
  return { ref, inView };
}

const destinations = [
  {
    nameRo: "Sighișoara",
    nameEn: "Sighișoara",
    distance: "18–20 km",
    time: "~25 min",
    typeRo: "Oraș UNESCO",
    typeEn: "UNESCO City",
  },
  {
    nameRo: "Mediaș",
    nameEn: "Mediaș",
    distance: "18–21 km",
    time: "~20 min",
    typeRo: "Oraș",
    typeEn: "City",
  },
  {
    nameRo: "Biertan",
    nameEn: "Biertan",
    distance: "16 km",
    time: "~20 min",
    typeRo: "UNESCO",
    typeEn: "UNESCO",
  },
  {
    nameRo: "Salina Praid",
    nameEn: "Praid Salt Mine",
    distance: "45 km",
    time: "~50 min",
    typeRo: "Atracție",
    typeEn: "Attraction",
  },
  {
    nameRo: "Salina Turda",
    nameEn: "Turda Salt Mine",
    distance: "60 km",
    time: "~65 min",
    typeRo: "Atracție",
    typeEn: "Attraction",
  },
  {
    nameRo: "Târgu Mureș",
    nameEn: "Târgu Mureș",
    distance: "42–52 km",
    time: "~45 min",
    typeRo: "Oraș",
    typeEn: "City",
  },
  {
    nameRo: "Sibiu",
    nameEn: "Sibiu",
    distance: "~70 km",
    time: "~70 min",
    typeRo: "Capitală",
    typeEn: "Capital",
  },
  {
    nameRo: "Aeroport Târgu Mureș",
    nameEn: "Târgu Mureș Airport",
    distance: "52–59 km",
    time: "~55 min",
    typeRo: "Aeroport",
    typeEn: "Airport",
  },
  {
    nameRo: "Aeroport Sibiu",
    nameEn: "Sibiu Airport",
    distance: "~64 km",
    time: "~65 min",
    typeRo: "Aeroport",
    typeEn: "Airport",
  },
  {
    nameRo: "Cetatea Saschiz",
    nameEn: "Saschiz Fortress",
    distance: "~26 km",
    time: "~30 min",
    typeRo: "UNESCO",
    typeEn: "UNESCO",
  },
  {
    nameRo: "Cetatea Viscri",
    nameEn: "Viscri Fortified Church",
    distance: "~24 km",
    time: "~30 min",
    typeRo: "UNESCO",
    typeEn: "UNESCO",
  },
  {
    nameRo: "Valea Zânelor",
    nameEn: "Fairy Valley",
    distance: "70 km",
    time: "~75 min",
    typeRo: "Natură",
    typeEn: "Nature",
  },
];

const typeColors: Record<string, string> = {
  UNESCO: "bg-amber-900/40 text-amber-400 border-amber-800/40",
  Aeroport: "bg-blue-900/40 text-blue-400 border-blue-800/40",
  Airport: "bg-blue-900/40 text-blue-400 border-blue-800/40",
  Natură: "bg-green-900/40 text-green-400 border-green-800/40",
  Nature: "bg-green-900/40 text-green-400 border-green-800/40",
  Atracție: "bg-purple-900/40 text-purple-400 border-purple-800/40",
  Attraction: "bg-purple-900/40 text-purple-400 border-purple-800/40",
  Capitală: "bg-red-900/40 text-red-400 border-red-800/40",
  Capital: "bg-red-900/40 text-red-400 border-red-800/40",
  Oraș: "bg-muted text-muted-foreground border-border",
  City: "bg-muted text-muted-foreground border-border",
  "UNESCO City": "bg-amber-900/40 text-amber-400 border-amber-800/40",
};

export default function Distances() {
  const { t, lang } = useLanguage();
  const { ref, inView } = useInView();

  return (
    <section
      id="locatie"
      className="py-24 lg:py-32 bg-background"
      aria-label="Locație și distanțe"
      data-testid="distances-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="text-center mb-16">
          <m.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5 }}
            className="text-gold text-sm tracking-widest uppercase font-medium mb-4"
          >
            {t.distances.badge}
          </m.p>
          <m.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-4xl sm:text-5xl text-foreground mb-4"
          >
            {t.distances.title1}
            <br />
            <span className="text-gradient-gold italic">
              {t.distances.title2}
            </span>
          </m.h2>
          <div className="divider-gold mb-6" />
          <m.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground max-w-xl mx-auto"
          >
            {t.distances.subtitle}
          </m.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <m.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8 }}
            className="rounded-3xl overflow-hidden border border-border shadow-xl"
            data-testid="map-embed"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2744.5!2d24.583!3d46.233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDbCsDE0JzAwLjAiTiAyNMKwMzUnMDAuMCJF!5e0!3m2!1sro!2sro!4v1683000000000!5m2!1sro!2sro"
              width="100%"
              height="420"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Locație Domeniul Poiana Ursului pe hartă"
            />
            <div className="p-5 bg-card border-t border-border">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <p className="text-foreground font-medium text-sm">
                    {t.distances.address}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {t.distances.addressText}
                  </p>
                </div>
              </div>
            </div>
          </m.div>

          <m.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            data-testid="distances-list"
          >
            <div className="space-y-3">
              {destinations.map(
                ({ nameRo, nameEn, distance, time, typeRo, typeEn }, i) => {
                  const name = lang === "en" ? nameEn : nameRo;
                  const type = lang === "en" ? typeEn : typeRo;
                  return (
                    <m.div
                      key={nameRo}
                      initial={{ opacity: 0, x: 20 }}
                      animate={
                        inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }
                      }
                      transition={{ duration: 0.5, delay: 0.15 + i * 0.06 }}
                      className="flex items-center justify-between p-4 rounded-xl bg-card border border-border hover:border-gold/30 transition-colors duration-200"
                      data-testid={`distance-item-${i}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center">
                          <MapPin className="w-3.5 h-3.5 text-gold" />
                        </div>
                        <div>
                          <p className="text-foreground text-sm font-medium">
                            {name}
                          </p>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full border ${typeColors[type] || typeColors["Oraș"]}`}
                          >
                            {type}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1.5 justify-end">
                          <Car className="w-3.5 h-3.5 text-muted-foreground" />
                          <span className="text-foreground text-sm font-semibold">
                            {distance}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 justify-end mt-0.5">
                          <Clock className="w-3 h-3 text-muted-foreground" />
                          <span className="text-muted-foreground text-xs">
                            {time}
                          </span>
                        </div>
                      </div>
                    </m.div>
                  );
                },
              )}
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
