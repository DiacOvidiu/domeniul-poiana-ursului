import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

const BelowFold = lazy(() => import("@/components/BelowFold"));

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
      <Suspense fallback={<div className="min-h-[40vh]" aria-hidden />}>
        <BelowFold />
      </Suspense>
    </main>
  );
}
