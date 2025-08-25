import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import VideoTutorials from "@/components/video-tutorials";
import PhotoGallery from "@/components/photo-gallery";
import FeaturedTutorials from "@/components/featured-tutorials";
import Footer from "@/components/footer";
import WalkingMascot from "@/components/walking-mascot";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-vibrant-orange to-electric-blue">
      <Navigation />
      <HeroSection />
      <VideoTutorials />
      <PhotoGallery />
      <FeaturedTutorials />
      <Footer />
      <WalkingMascot />
      
      {/* Floating Help Button */}
      <Button
        data-testid="button-help"
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-lime-green to-turquoise rounded-full shadow-xl text-white text-2xl animate-bounce-gentle hover:scale-110 transition-transform z-50"
        size="icon"
      >
        <HelpCircle className="w-8 h-8" />
      </Button>
    </div>
  );
}
