import { useEffect, useRef, useState } from "react";
import { m } from "framer-motion";
import { Check, Info, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    setInView(true);
  }, []);
  return { ref, inView };
}

export default function Pricing() {
  const { t } = useLanguage();
  const { ref, inView } = useInView();

  return (
    <section
      id="tarife"
      className="py-24 lg:py-32 bg-card"
      aria-label="Tarife și prețuri"
      data-testid="pricing-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="text-center mb-16">
          <m.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5 }}
            className="text-gold text-sm tracking-widest uppercase font-medium mb-4"
          >
            {t.pricing.badge}
          </m.p>
          <m.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-4xl sm:text-5xl text-foreground mb-4"
          >
            {t.pricing.title}
          </m.h2>
          <div className="divider-gold mb-6" />
          <m.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground max-w-xl mx-auto"
          >
            {t.pricing.subtitle}
          </m.p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12">
          {t.pricing.plans.map((plan, i) => (
            <m.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.15 }}
              className={`relative rounded-3xl p-7 border ${
                i === 1
                  ? "bg-gold/5 border-gold/40 shadow-lg shadow-amber-900/20"
                  : "bg-background border-border"
              }`}
              data-testid={`pricing-plan-${i}`}
            >
              {i === 1 && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-background text-xs font-bold px-4 py-1 rounded-full">
                  {t.pricing.recommended}
                </span>
              )}
              <div className="mb-6">
                <h3 className="font-serif text-xl text-foreground mb-1">
                  {plan.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {plan.description}
                </p>
              </div>
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="font-serif text-4xl text-gold">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    {plan.currency}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    {plan.period}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {plan.priceEur}
                </span>
              </div>
              <ul className="space-y-2.5 mb-6">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 text-sm text-foreground"
                  >
                    <Check className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
                {plan.notIncluded.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 text-sm text-muted-foreground"
                  >
                    <Info className="w-4 h-4 text-muted-foreground/50 mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="https://www.booking.com/hotel/ro/domeniul-poiana-ursului.ro.html"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-full font-semibold text-sm transition-all duration-200 ${
                  i === 1
                    ? "bg-gold text-background hover:brightness-110"
                    : "border border-gold text-gold hover:bg-gold/10"
                }`}
                data-testid={`pricing-cta-${i}`}
              >
                {plan.cta}
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </m.div>
          ))}
        </div>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="rounded-3xl bg-background border border-border p-6 sm:p-8 max-w-3xl mx-auto"
          data-testid="pricing-policies"
        >
          <h3 className="font-serif text-xl text-foreground mb-6 text-center">
            {t.pricing.policiesTitle}
          </h3>
          <div className="divide-y divide-border">
            {t.pricing.policies.map(({ label, value }) => (
              <div
                key={label}
                className="flex flex-col sm:flex-row sm:items-center justify-between py-3 gap-1"
              >
                <span className="text-sm text-muted-foreground">{label}</span>
                <span className="text-sm text-foreground font-medium text-right">
                  {value}
                </span>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-6 text-center">
            {t.pricing.notIncludedNote}
          </p>
        </m.div>
      </div>
    </section>
  );
}
