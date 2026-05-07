import { useEffect, useRef, useState } from "react";
import { m } from "framer-motion";
import { Leaf, Fish, TreePine, Compass } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const cardIcons = [TreePine, Fish, Leaf, Compass];

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    setInView(true);
  }, []);
  return { ref, inView };
}

export default function About() {
  const { t } = useLanguage();
  const { ref, inView } = useInView();

  return (
    <section
      id="despre"
      className="py-24 lg:py-32 bg-background"
      aria-label="Despre Domeniul Poiana Ursului"
      data-testid="about-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="grid lg:grid-cols-2 gap-16 items-center">
          <m.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-gold text-sm tracking-widest uppercase font-medium mb-4">
              {t.about.badge}
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl text-foreground mb-6 leading-tight">
              {t.about.title1}
              <br />
              <span className="text-gradient-gold italic">
                {t.about.title2}
              </span>
            </h2>
            <div className="divider-gold mb-8" style={{ marginLeft: 0 }} />
            <p className="text-muted-foreground leading-relaxed mb-6 text-base lg:text-lg">
              {t.about.p1}
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8 text-base lg:text-lg">
              {t.about.p2}
            </p>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <span className="font-serif text-4xl text-gold font-light">
                  9.3
                </span>
                <p className="text-xs text-muted-foreground mt-1">
                  {t.about.stat1}
                </p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <span className="font-serif text-4xl text-gold font-light">
                  7
                </span>
                <p className="text-xs text-muted-foreground mt-1">
                  {t.about.stat2}
                </p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <span className="font-serif text-4xl text-gold font-light">
                  18
                </span>
                <p className="text-xs text-muted-foreground mt-1">
                  {t.about.stat3}
                </p>
              </div>
            </div>
          </m.div>

          <m.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {t.about.cards.map(({ title, desc }, i) => {
              const Icon = cardIcons[i];
              return (
                <m.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                  className="card-hover rounded-2xl p-6 bg-card border border-border"
                  data-testid={`about-highlight-${i}`}
                >
                  <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-gold" />
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
          </m.div>
        </div>
      </div>
    </section>
  );
}
