import { useState, useEffect, useRef } from "react";
import { m, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    setInView(true);
  }, []);
  return { ref, inView };
}

export default function FAQ() {
  const { t } = useLanguage();
  const { ref, inView } = useInView();
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="py-24 lg:py-32 bg-background"
      aria-label="Întrebări frecvente"
      data-testid="faq-section"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="text-center mb-14">
          <m.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5 }}
            className="text-gold text-sm tracking-widest uppercase font-medium mb-4"
          >
            {t.faq.badge}
          </m.p>
          <m.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-4xl sm:text-5xl text-foreground mb-4"
          >
            {t.faq.title}
          </m.h2>
          <div className="divider-gold" />
        </div>

        <div className="space-y-3">
          {t.faq.items.map((faq, i) => (
            <m.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.06 }}
              className="rounded-2xl border border-border bg-card overflow-hidden"
              data-testid={`faq-item-${i}`}
            >
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-muted/20 transition-colors duration-200"
                aria-expanded={openIdx === i}
                data-testid={`faq-toggle-${i}`}
              >
                <span className="text-sm sm:text-base font-medium text-foreground leading-snug">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-gold shrink-0 transition-transform duration-300 ${openIdx === i ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {openIdx === i && (
                  <m.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">
                      {faq.a}
                    </div>
                  </m.div>
                )}
              </AnimatePresence>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
