import { useEffect, useRef, useState } from "react";
import { m } from "framer-motion";
import { Star, Quote, Award, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    setInView(true);
  }, []);
  return { ref, inView };
}

export default function Reviews() {
  const { t } = useLanguage();
  const { ref, inView } = useInView();

  return (
    <section
      id="recenzii"
      className="py-24 lg:py-32 bg-card"
      aria-label="Recenzii oaspeți"
      data-testid="reviews-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="text-center mb-16">
          <m.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5 }}
            className="text-gold text-sm tracking-widest uppercase font-medium mb-4"
          >
            {t.reviews.badge}
          </m.p>
          <m.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-4xl sm:text-5xl text-foreground mb-4"
          >
            {t.reviews.title}
          </m.h2>
          <div className="divider-gold mb-4" />
          <m.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xs text-muted-foreground tracking-wide"
          >
            {t.reviews.source}
          </m.p>
        </div>

        {/* Stats strip */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"
          data-testid="reviews-stats"
        >
          {t.reviews.stats.map(({ value, label }) => (
            <div
              key={label}
              className="text-center py-6 px-4 rounded-2xl bg-background border border-border"
            >
              <div className="font-serif text-4xl text-gold mb-1">{value}</div>
              <p className="text-xs text-muted-foreground">{label}</p>
            </div>
          ))}
        </m.div>

        {/* Category scores from Booking.com */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.22 }}
          className="rounded-3xl bg-background border border-border p-6 mb-10"
          data-testid="reviews-categories"
        >
          <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
            <h3 className="font-serif text-lg text-foreground">
              {t.reviews.categoryLabel}
            </h3>
            {/* Guests' Choice badge */}
            <div className="flex items-center gap-2 bg-gold/10 border border-gold/30 px-4 py-2 rounded-full">
              <Award className="w-4 h-4 text-gold" />
              <div>
                <p className="text-xs text-gold font-semibold leading-none">
                  {t.reviews.guestsChoice}
                </p>
                <p className="text-xs text-muted-foreground leading-none mt-0.5">
                  {t.reviews.guestsChoiceDesc}
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.reviews.categories.map(({ label, score }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-muted-foreground">
                      {label}
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                      {score.toFixed(1)}
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <m.div
                      initial={{ width: 0 }}
                      animate={
                        inView
                          ? { width: `${(score / 10) * 100}%` }
                          : { width: 0 }
                      }
                      transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                      className="h-full rounded-full bg-gold"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </m.div>

        {/* Review cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {t.reviews.items.map((review, i) => (
            <m.article
              key={i}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
              transition={{ duration: 0.6, delay: 0.25 + i * 0.08 }}
              className="rounded-2xl p-6 bg-background border border-border card-hover relative"
              data-testid={`review-card-${i}`}
            >
              <Quote className="absolute top-5 right-5 w-6 h-6 text-gold/20" />

              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    className={`w-3.5 h-3.5 ${j < Math.round(review.rating / 2) ? "text-gold fill-gold" : "text-muted"}`}
                  />
                ))}
                <span className="text-xs text-gold ml-1 font-semibold">
                  {review.rating}/10
                </span>
              </div>

              <p className="text-sm text-foreground leading-relaxed mb-5 italic">
                "{review.text}"
              </p>

              <div className="flex items-center justify-between mt-auto">
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {review.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {review.origin} · Booking.com
                  </p>
                </div>
                <span className="text-xs bg-gold/10 text-gold border border-gold/20 px-2.5 py-1 rounded-full">
                  {review.highlight}
                </span>
              </div>
            </m.article>
          ))}
        </div>

        <m.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="text-center"
          data-testid="reviews-booking-cta"
        >
          <a
            href="https://www.booking.com/hotel/ro/domeniul-poiana-ursului.ro.html#tab-reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors duration-200 border border-border hover:border-gold/40 px-5 py-2.5 rounded-full"
          >
            <Star className="w-4 h-4 text-gold fill-gold" />
            {t.reviews.readAll}
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </m.div>
      </div>
    </section>
  );
}
