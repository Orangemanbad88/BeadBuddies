import { Button } from "@/components/ui/button";
import { Play, Images } from "lucide-react";
import DogMascotSVG from "./dog-mascot-svg";

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-r from-vibrant-orange/30 to-electric-blue/30 mascot-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="mb-8 animate-bounce-gentle">
          <DogMascotSVG
            className="w-32 h-32 md:w-40 md:h-40 mx-auto drop-shadow-xl"
            data-testid="img-hero-mascot"
          />
        </div>
        
        <h1 className="font-fredoka text-5xl md:text-7xl lg:text-8xl text-white mb-6 drop-shadow-lg">
          Welcome to<br />
          <span className="text-sunny-yellow">Tied Together!</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto font-semibold">
          Learn to make amazing bracelets with our fun tutorials! 
          <span className="text-sunny-yellow"> Follow our friendly dog mascot</span> 
          and create beautiful friendship bracelets! 🎨✨
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            data-testid="button-start-learning"
            onClick={() => scrollToSection('videos')}
            className="btn-bounce bg-gradient-to-r from-royal-blue to-turquoise text-white px-8 py-4 rounded-full text-xl font-bold shadow-xl hover:shadow-2xl transition-all"
          >
            <Play className="mr-3 w-6 h-6" />
            Start Learning!
          </Button>
          <Button
            data-testid="button-view-gallery"
            onClick={() => scrollToSection('gallery')}
            className="btn-bounce bg-gradient-to-r from-lime-green to-sunny-yellow text-white px-8 py-4 rounded-full text-xl font-bold shadow-xl hover:shadow-2xl transition-all"
          >
            <Images className="mr-3 w-6 h-6" />
            View Gallery
          </Button>
        </div>
      </div>
    </section>
  );
}
