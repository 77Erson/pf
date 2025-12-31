import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Work } from "@/components/sections/work";
import { Testimonials } from "@/components/sections/testimonials";
import { Contact } from "@/components/sections/contact";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { CookieConsent } from "@/components/ui/cookie-consent";
import { OfflineIndicator } from "@/components/ui/offline-indicator";
import { PageLoader } from "@/components/ui/page-loader";

export default function Home() {
  return (
    <>
      <PageLoader />
      <main className="relative overflow-hidden">
        <Navbar />
        <Hero />
        <About />
        <Work />
        <Skills />
        <Testimonials />
        <Contact />
        <Footer />
      </main>
      <ScrollToTop />
      <CookieConsent />
      <OfflineIndicator />
    </>
  );
}
