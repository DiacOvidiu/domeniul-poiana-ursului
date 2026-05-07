import { useEffect, useRef, useState } from "react";
import { m } from "framer-motion";
import { MapPin, Phone, Mail, Clock, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const contactIcons = [MapPin, Phone, Mail, Clock];
const contactLinks: (string | null)[] = [
  "https://maps.google.com/?q=Domeniul+Poiana+Ursului+Dumbraveni+Sibiu",
  "tel:+40754775329",
  "mailto:diacovidiu15@gmail.com",
  null,
];
// tel:/mailto: links open in same tab; only http(s) links should target=_blank
const isExternal = (url: string | null) =>
  !!url && (url.startsWith("http://") || url.startsWith("https://"));

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    setInView(true);
  }, []);
  return { ref, inView };
}

export default function Contact() {
  const { t } = useLanguage();
  const { ref, inView } = useInView();

  return (
    <section
      id="contact"
      className="py-24 lg:py-32 bg-card"
      aria-label="Contact și rezervări"
      data-testid="contact-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="text-center mb-16">
          <m.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5 }}
            className="text-gold text-sm tracking-widest uppercase font-medium mb-4"
          >
            {t.contact.badge}
          </m.p>
          <m.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-4xl sm:text-5xl text-foreground mb-4"
          >
            {t.contact.title}
          </m.h2>
          <div className="divider-gold mb-6" />
          <m.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground max-w-xl mx-auto"
          >
            {t.contact.subtitle}
          </m.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {t.contact.items.map(({ title, content, linkLabel }, i) => {
            const Icon = contactIcons[i];
            const link = contactLinks[i];
            return (
              <m.div
                key={title}
                initial={{ opacity: 0, y: 25 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
                className="rounded-2xl p-6 bg-background border border-border card-hover"
                data-testid={`contact-item-${i}`}
              >
                <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-gold" />
                </div>
                <h3 className="font-serif text-base text-foreground mb-2">
                  {title}
                </h3>
                <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed mb-4">
                  {content}
                </p>
                {link && linkLabel && (
                  <a
                    href={link}
                    {...(isExternal(link)
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="inline-flex items-center gap-1.5 text-xs text-gold hover:text-gold/80 transition-colors duration-200 font-medium"
                    data-testid={`contact-link-${i}`}
                  >
                    {linkLabel}
                    {isExternal(link) && <ExternalLink className="w-3 h-3" />}
                  </a>
                )}
              </m.div>
            );
          })}
        </div>

        <m.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative rounded-3xl overflow-hidden"
          data-testid="contact-cta-banner"
        >
          <picture>
            <source
              type="image/avif"
              srcSet="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=55&fm=avif 600w, https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=900&q=55&fm=avif 900w, https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&q=58&fm=avif 1200w"
              sizes="(min-width: 1024px) 1024px, 100vw"
            />
            <source
              type="image/webp"
              srcSet="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=65&fm=webp 600w, https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=900&q=65&fm=webp 900w, https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&q=68&fm=webp 1200w"
              sizes="(min-width: 1024px) 1024px, 100vw"
            />
            <img
              src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&q=68&fm=webp"
              alt="Rezervați cazare Domeniul Poiana Ursului"
              className="w-full h-72 object-cover"
              loading="lazy"
              decoding="async"
              width={1200}
              height={300}
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/30" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-lg px-8 sm:px-12">
              <h3 className="font-serif text-3xl sm:text-4xl text-foreground mb-3">
                {t.contact.cta.title1}
                <br />
                <span className="text-gradient-gold italic">
                  {t.contact.cta.title2}
                </span>
              </h3>
              <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                {t.contact.cta.desc}
              </p>
              <a
                href="https://www.booking.com/hotel/ro/domeniul-poiana-ursului.ro.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gold text-background px-8 py-4 rounded-full font-semibold text-sm hover:brightness-110 transition-all duration-300 shadow-xl shadow-amber-900/30"
                data-testid="contact-cta-book"
              >
                {t.contact.cta.btn}
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
}
