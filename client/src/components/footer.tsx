import { Heart, Home, Play, Images, Book } from "lucide-react";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-r from-primary-pink to-deep-pink py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center animate-bounce-gentle">
              <Heart className="text-primary-pink text-xl w-6 h-6" />
            </div>
            <h3 className="font-fredoka text-3xl text-white" data-testid="text-footer-title">
              Tied Together
            </h3>
          </div>
          
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto" data-testid="text-footer-description">
            Creating beautiful friendships, one bracelet at a time! 💖
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <button
              onClick={scrollToTop}
              className="text-white hover:text-sunny-yellow transition-colors text-lg font-semibold flex items-center"
              data-testid="link-footer-home"
            >
              <Home className="mr-2 w-5 h-5" />
              Home
            </button>
            <button
              onClick={() => scrollToSection('videos')}
              className="text-white hover:text-sunny-yellow transition-colors text-lg font-semibold flex items-center"
              data-testid="link-footer-videos"
            >
              <Play className="mr-2 w-5 h-5" />
              Videos
            </button>
            <button
              onClick={() => scrollToSection('gallery')}
              className="text-white hover:text-sunny-yellow transition-colors text-lg font-semibold flex items-center"
              data-testid="link-footer-gallery"
            >
              <Images className="mr-2 w-5 h-5" />
              Gallery
            </button>
            <button
              onClick={() => scrollToSection('tutorials')}
              className="text-white hover:text-sunny-yellow transition-colors text-lg font-semibold flex items-center"
              data-testid="link-footer-tutorials"
            >
              <Book className="mr-2 w-5 h-5" />
              Tutorials
            </button>
          </div>
          
          <div className="border-t border-white/20 pt-6">
            <p className="text-white/70" data-testid="text-copyright">
              © 2024 Tied Together. Made with ❤️ for creative kids everywhere!
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
