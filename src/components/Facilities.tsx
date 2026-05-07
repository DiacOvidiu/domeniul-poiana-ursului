import { useEffect, useRef, useState } from "react";
import { m } from "framer-motion";
import {
  Utensils,
  Wine,
  Waves,
  Flame,
  Heart,
  PlayCircle,
  Flame as Grill,
  TreePine,
  Shield,
  Wifi,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const facilityIcons = [
  Utensils,
  Wine,
  Waves,
  Flame,
  Heart,
  PlayCircle,
  Grill,
  TreePine,
  Shield,
  Wifi,
];

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    setInView(true);
  }, []);
  return { ref, inView };
}

export default function Facilities() {
  const { t } = useLanguage();
  const { ref, inView } = useInView();

  return (
    <section
      id="facilitati"
      className="py-24 lg:py-32 bg-background"
      aria-label="Facilități Domeniul Poiana Ursului"
      data-testid="facilities-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="text-center mb-16">
          <m.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5 }}
            className="text-gold text-sm tracking-widest uppercase font-medium mb-4"
          >
            {t.facilities.badge}
          </m.p>
          <m.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-4xl sm:text-5xl text-foreground mb-4"
          >
            {t.facilities.title}
          </m.h2>
          <m.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="divider-gold mb-6" />
            <p className="text-muted-foreground max-w-xl mx-auto text-base lg:text-lg">
              {t.facilities.subtitle}
            </p>
          </m.div>
        </div>

        <m.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="rounded-3xl overflow-hidden mb-8 relative min-h-[280px] flex items-end"
          data-testid="facilities-wellness-hero"
        >
          <picture>
            <source
              type="image/avif"
              srcSet="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&q=55&fm=avif 600w, https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=900&q=55&fm=avif 900w, https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1200&q=58&fm=avif 1200w"
              sizes="(min-width: 1024px) 1024px, 100vw"
            />
            <source
              type="image/webp"
              srcSet="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&q=65&fm=webp 600w, https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=900&q=65&fm=webp 900w, https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1200&q=68&fm=webp 1200w"
              sizes="(min-width: 1024px) 1024px, 100vw"
            />
            <img
              src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1200&q=68&fm=webp"
              alt="Wellness - Jacuzzi și Saună la Domeniul Poiana Ursului"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              decoding="async"
              width={1200}
              height={429}
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
          <div className="relative z-10 p-8 max-w-xl">
            <span className="text-gold text-sm tracking-widest uppercase font-medium">
              {t.facilities.wellnessBadge}
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-foreground mt-2 mb-3">
              {t.facilities.wellnessTitle}
            </h3>
            <p className="text-muted-foreground text-base leading-relaxed">
              {t.facilities.wellnessDesc}
            </p>
          </div>
        </m.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {t.facilities.items.map(({ title, desc, highlight }, i) => {
            const Icon = facilityIcons[i];
            return (
              <m.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.05 }}
                className={`rounded-2xl p-6 border card-hover ${highlight ? "bg-gold/5 border-gold/20" : "bg-card border-border"}`}
                data-testid={`facility-card-${i}`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${highlight ? "bg-gold/15 border border-gold/30" : "bg-muted border border-border"}`}
                >
                  <Icon
                    className={`w-5 h-5 ${highlight ? "text-gold" : "text-muted-foreground"}`}
                  />
                </div>
                <h3 className="font-serif text-lg text-foreground mb-2">
                  {title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {desc}
                </p>
              </m.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
