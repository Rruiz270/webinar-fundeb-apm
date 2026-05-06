import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Urgency from "@/components/Urgency";
import Topics from "@/components/Topics";
import WebinarDetails from "@/components/WebinarDetails";
import Speakers from "@/components/Speakers";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Urgency />
        <Topics />
        <WebinarDetails />
        <Speakers />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
