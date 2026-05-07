import { TreePine, MapPin, ExternalLink, Facebook, Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const navHrefs = ["#despre", "#camere", "#facilitati", "#tarife", "#locatie", "#recenzii", "#faq", "#contact"];

const externalLinks = [
  { label: "Booking.com", href: "https://www.booking.com/hotel/ro/domeniul-poiana-ursului.ro.html", icon: Star },
  { label: "Facebook", href: "https://www.facebook.com/p/Domeniul-Poiana-Ursului-100063592174049/", icon: Facebook },
];

export default function Footer() {
  const { t } = useLanguage();

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-background border-t border-border" aria-label="Footer" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full bg-gold flex items-center justify-center">
                <TreePine className="w-4 h-4 text-background" />
              </div>
              <div>
                <p className="font-serif text-base text-foreground leading-none">Domeniul</p>
                <p className="font-serif text-base text-gold leading-none">Poiana Ursului</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-xs">{t.footer.description}</p>
            <div className="flex items-start gap-2 text-xs text-muted-foreground">
              <MapPin className="w-3.5 h-3.5 text-gold mt-0.5 shrink-0" />
              <span className="whitespace-pre-line">{t.footer.address}</span>
            </div>
          </div>

          {/* Nav links */}
          <div>
            <h4 className="font-serif text-base text-foreground mb-4">{t.footer.nav}</h4>
            <ul className="space-y-2">
              {t.footer.navLinks.map((label, i) => (
                <li key={label}>
                  <button
                    onClick={() => scrollTo(navHrefs[i])}
                    className="text-sm text-muted-foreground hover:text-gold transition-colors duration-200 cursor-pointer"
                    data-testid={`footer-link-${navHrefs[i].replace("#", "")}`}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* External & Info */}
          <div>
            <h4 className="font-serif text-base text-foreground mb-4">{t.footer.bookings}</h4>
            <div className="space-y-3 mb-6">
              {externalLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-gold transition-colors duration-200 group"
                  data-testid={`footer-external-${label.toLowerCase()}`}
                >
                  <Icon className="w-4 h-4 text-gold" />
                  {label}
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
            <div className="rounded-xl bg-gold/5 border border-gold/20 p-4">
              <p className="text-xs text-muted-foreground mb-1">{t.footer.schedule}</p>
              <p className="text-sm text-foreground">{t.footer.checkin}</p>
              <p className="text-sm text-foreground">{t.footer.checkout}</p>
              <p className="text-xs text-muted-foreground mt-2">{t.footer.payment}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
            <p>© {new Date().getFullYear()} {t.footer.copyright}</p>
            <div className="flex items-center space-x-2 text-gray-400 text-xs sm:text-sm">
              <span>{t.footer.devBy}</span>
              <span className="text-red-500">❤️</span>
              <a
                href="https://www.diacovidiu.ro"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors duration-200 cursor-pointer"
                data-testid="footer-developer-link"
              >
                Diac Ovidiu
              </a>
              <span className="text-blue-400">🌐</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
