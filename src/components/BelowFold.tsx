import { LazyMotion, domAnimation } from "framer-motion";
import About from "@/components/About";
import Rooms from "@/components/Rooms";
import Facilities from "@/components/Facilities";
import Pricing from "@/components/Pricing";
import Distances from "@/components/Distances";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function BelowFold() {
  return (
    <LazyMotion features={domAnimation} strict>
      <About />
      <Rooms />
      <Facilities />
      <Pricing />
      <Distances />
      <Reviews />
      <FAQ />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </LazyMotion>
  );
}
