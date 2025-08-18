import { Button } from "@/components/ui/button";
import { Heart, Play, Images, Book, Menu } from "lucide-react";

export default function Navigation() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-lg border-b-4 border-primary-pink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-pink to-deep-pink rounded-full flex items-center justify-center animate-wiggle">
              <Heart className="text-white text-xl" />
            </div>
            <h1 className="font-fredoka text-3xl md:text-4xl text-primary-pink">
              Tied Together
            </h1>
          </div>
          
          <div className="hidden md:flex space-x-6">
            <Button
              data-testid="button-nav-videos"
              onClick={() => scrollToSection('videos')}
              className="nav-bubble text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform"
            >
              <Play className="mr-2 w-4 h-4" />
              Videos
            </Button>
            <Button
              data-testid="button-nav-gallery"
              onClick={() => scrollToSection('gallery')}
              className="nav-bubble text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform"
            >
              <Images className="mr-2 w-4 h-4" />
              Gallery
            </Button>
            <Button
              data-testid="button-nav-tutorials"
              onClick={() => scrollToSection('tutorials')}
              className="nav-bubble text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform"
            >
              <Book className="mr-2 w-4 h-4" />
              Tutorials
            </Button>
          </div>
          
          <Button
            data-testid="button-mobile-menu"
            className="md:hidden nav-bubble text-white p-3 rounded-full"
            size="icon"
          >
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
