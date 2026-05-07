import { useState, useEffect } from "react";
import { Menu, X, TreePine, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Navbar() {
  const { t, lang, setLang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "#despre", label: t.nav.despre },
    { href: "#camere", label: t.nav.camere },
    { href: "#facilitati", label: t.nav.facilitati },
    { href: "#tarife", label: t.nav.tarife },
    { href: "#locatie", label: t.nav.locatie },
    { href: "#contact", label: t.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const toggleLang = () => setLang(lang === "ro" ? "en" : "ro");

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass shadow-lg" : "bg-transparent"
      }`}
      data-testid="navbar"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 group"
          data-testid="navbar-logo"
          aria-label="Domeniul Poiana Ursului - Acasă"
        >
          <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center">
            <TreePine className="w-4 h-4 text-background" />
          </div>
          <span className="font-serif text-lg text-foreground leading-tight hidden sm:block">
            Domeniul <span className="text-gold">Poiana Ursului</span>
          </span>
          <span className="font-serif text-sm text-foreground sm:hidden">
            <span className="text-gold">Poiana Ursului</span>
          </span>
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6 lg:gap-7" role="navigation">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleNavClick(link.href)}
                className="text-xs text-muted-foreground hover:text-gold transition-colors duration-200 tracking-wide uppercase font-medium cursor-pointer"
                data-testid={`nav-link-${link.href.replace("#", "")}`}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Right side: lang toggle + CTA */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language toggle */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 glass px-3 py-1.5 rounded-full text-xs font-semibold text-muted-foreground hover:text-gold border border-transparent hover:border-gold/30 transition-all duration-200"
            data-testid="lang-toggle"
            aria-label="Toggle language"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{lang === "ro" ? "EN" : "RO"}</span>
          </button>

          <a
            href="https://www.booking.com/hotel/ro/domeniul-poiana-ursului.ro.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gold text-background px-4 py-2 rounded-full text-sm font-semibold hover:brightness-110 transition-all duration-200 shadow-lg"
            data-testid="navbar-cta"
          >
            {t.nav.rezerva}
          </a>
        </div>

        {/* Mobile: lang toggle + menu */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleLang}
            className="flex items-center gap-1 glass px-2.5 py-1.5 rounded-full text-xs font-semibold text-muted-foreground hover:text-gold transition-all duration-200"
            data-testid="mobile-lang-toggle"
          >
            <Globe className="w-3 h-3" />
            {lang === "ro" ? "EN" : "RO"}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 text-foreground"
            aria-label="Meniu mobil"
            data-testid="mobile-menu-toggle"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden glass border-t border-border overflow-hidden grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
          menuOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
        data-testid="mobile-menu"
        aria-hidden={!menuOpen}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                tabIndex={menuOpen ? 0 : -1}
                className="w-full text-left px-4 py-3 text-foreground hover:text-gold hover:bg-muted/30 rounded-lg transition-colors text-sm tracking-wide uppercase font-medium"
                data-testid={`mobile-nav-link-${link.href.replace("#", "")}`}
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2">
              <a
                href="https://www.booking.com/hotel/ro/domeniul-poiana-ursului.ro.html"
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={menuOpen ? 0 : -1}
                className="block text-center bg-gold text-background px-4 py-3 rounded-full text-sm font-semibold"
                data-testid="mobile-cta"
              >
                {t.nav.rezerva}
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
