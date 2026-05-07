import { useEffect, useRef, useState } from "react";
import { m } from "framer-motion";
import { Bed, Eye, Wifi, Car, Bath, Tv } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const amenityIcons = [Wifi, Car, Bath, Tv, Eye, Bed];

const roomImageIds = [
  "photo-1631049307264-da0ec9d70304",
  "photo-1590490360182-c33d57733427",
];

const buildAvif = (id: string, w: number, q = 55) =>
  `https://images.unsplash.com/${id}?w=${w}&q=${q}&fm=avif`;
const buildWebp = (id: string, w: number, q = 65) =>
  `https://images.unsplash.com/${id}?w=${w}&q=${q}&fm=webp`;
const buildAvifSet = (id: string) =>
  [400, 600, 800].map((w) => `${buildAvif(id, w)} ${w}w`).join(", ");
const buildWebpSet = (id: string) =>
  [400, 600, 800].map((w) => `${buildWebp(id, w)} ${w}w`).join(", ");

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    setInView(true);
  }, []);
  return { ref, inView };
}

export default function Rooms() {
  const { t } = useLanguage();
  const { ref, inView } = useInView();

  return (
    <section
      id="camere"
      className="py-24 lg:py-32 bg-card"
      aria-label="Camere și apartamente"
      data-testid="rooms-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="text-center mb-16">
          <m.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5 }}
            className="text-gold text-sm tracking-widest uppercase font-medium mb-4"
          >
            {t.rooms.badge}
          </m.p>
          <m.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-4xl sm:text-5xl text-foreground mb-4"
          >
            {t.rooms.title}
          </m.h2>
          <m.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="divider-gold mb-6" />
            <p className="text-muted-foreground max-w-xl mx-auto text-base lg:text-lg">
              {t.rooms.subtitle}
            </p>
          </m.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {t.rooms.rooms.map((room, i) => (
            <m.article
              key={room.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.15 }}
              className="rounded-3xl overflow-hidden bg-background border border-border card-hover"
              data-testid={`room-card-${i}`}
            >
              <div className="relative h-56 sm:h-72 overflow-hidden">
                <picture>
                  <source
                    type="image/avif"
                    srcSet={buildAvifSet(roomImageIds[i])}
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                  <source
                    type="image/webp"
                    srcSet={buildWebpSet(roomImageIds[i])}
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                  <img
                    src={buildWebp(roomImageIds[i], 800)}
                    alt={`${room.name} - Domeniul Poiana Ursului`}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                    decoding="async"
                    width={800}
                    height={450}
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <span className="absolute top-4 left-4 bg-gold text-background text-xs font-bold px-3 py-1 rounded-full">
                  {room.badge}
                </span>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-xs text-muted-foreground mb-1">
                    {room.type}
                  </p>
                  <h3 className="font-serif text-xl text-foreground">
                    {room.name}
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {room.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {room.features.map((f) => (
                    <span
                      key={f}
                      className="text-xs bg-muted text-muted-foreground px-3 py-1 rounded-full border border-border"
                    >
                      {f}
                    </span>
                  ))}
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <span className="font-serif text-2xl text-gold">
                      {room.price}
                    </span>
                    <span className="text-muted-foreground text-sm ml-1">
                      {room.priceNote}
                    </span>
                  </div>
                  <a
                    href="https://www.booking.com/hotel/ro/domeniul-poiana-ursului.ro.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gold text-background px-5 py-2.5 rounded-full text-sm font-semibold hover:brightness-110 transition-all duration-200"
                    data-testid={`room-book-${i}`}
                  >
                    {t.rooms.book}
                  </a>
                </div>
              </div>
            </m.article>
          ))}
        </div>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
          data-testid="rooms-amenities"
        >
          {t.rooms.amenities.map((label, i) => {
            const Icon = amenityIcons[i];
            return (
              <div
                key={label}
                className="flex flex-col items-center gap-2 py-5 rounded-2xl bg-background border border-border text-center"
              >
                <Icon className="w-5 h-5 text-gold" />
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
            );
          })}
        </m.div>
      </div>
    </section>
  );
}
