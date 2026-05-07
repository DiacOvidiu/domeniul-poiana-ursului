import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const WHATSAPP_NUMBER = "40754775329";

export default function WhatsAppButton() {
  const { t } = useLanguage();
  const [showTooltip, setShowTooltip] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const message = encodeURIComponent(t.whatsapp.message);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Tooltip bubble */}
      <AnimatePresence>
        {showTooltip && !dismissed && (
          <m.div
            initial={{ opacity: 0, scale: 0.85, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 8 }}
            transition={{ duration: 0.2 }}
            className="glass border border-green-500/20 rounded-2xl px-4 py-3 max-w-[240px] shadow-xl relative"
            data-testid="whatsapp-tooltip"
          >
            <button
              onClick={() => setDismissed(true)}
              className="absolute -top-2 -right-2 w-5 h-5 bg-muted border border-border rounded-full flex items-center justify-center hover:bg-card transition-colors"
              aria-label="Închide"
            >
              <X className="w-3 h-3 text-muted-foreground" />
            </button>
            <p className="text-xs text-foreground leading-snug">
              {t.whatsapp.tooltip}
            </p>
          </m.div>
        )}
      </AnimatePresence>

      {/* WhatsApp button */}
      <m.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-2xl relative"
        style={{ background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)" }}
        aria-label={t.whatsapp.tooltip}
        data-testid="whatsapp-button"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full animate-ping bg-green-500 opacity-20" />
        <MessageCircle className="w-6 h-6 text-white fill-white/20" />
      </m.a>
    </div>
  );
}
