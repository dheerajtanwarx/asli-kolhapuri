import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import MensCollection from "../components/MensCollection";
import WomensCollection from "../components/WomensCollection";
import ArtisanStory from "../components/ArtisanStory";
import HowItsMade from "../components/HowItsMade";
import StatsBanner from "../components/StatsBanner";
import Testimonials from "../components/Testimonials";
import Sustainability from "../components/Sustainability";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Marquee />
      <MensCollection />
      <WomensCollection />
      <ArtisanStory />
      <HowItsMade />
      <StatsBanner />
      <Testimonials />
      <Sustainability />
      <Footer />
    </main>
  );
}
