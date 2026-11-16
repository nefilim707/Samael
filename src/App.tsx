import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutAndLoreSection } from './components/AboutAndLoreSection';
import { HierarchyAndQuotasSection } from './components/HierarchyAndQuotasSection';
import { PointsAndRewardsSection } from './components/PointsAndRewardsSection';
import { RankProgressionSection } from './components/RankProgressionSection';
import { TeaCeremonySection } from './components/TeaCeremonySection';
import { Footer } from './components/Footer';
import { MusicPlayer } from './components/MusicPlayer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0A080C] text-[#F3EEF7] flex flex-col">
      <Navbar />

      <main className="flex-1">
        <HeroSection />
        <AboutAndLoreSection />
        <HierarchyAndQuotasSection />
        <PointsAndRewardsSection />
        <RankProgressionSection />
        <TeaCeremonySection />
      </main>

      <Footer />

      <MusicPlayer />
    </div>
  );
}
