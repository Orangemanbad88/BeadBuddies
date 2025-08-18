import { Button } from "@/components/ui/button";
import { Star, Medal, Crown, ArrowRight } from "lucide-react";

export default function TutorialCategories() {
  const categories = [
    {
      title: "Beginner",
      description: "Perfect for first-time bracelet makers! Easy and fun projects.",
      icon: Star,
      bgClass: "bg-gradient-to-br from-lime-green to-electric-blue",
      buttonTextClass: "text-lime-green",
      testId: "button-beginner"
    },
    {
      title: "Intermediate", 
      description: "Ready for more patterns? Try these colorful designs!",
      icon: Medal,
      bgClass: "bg-gradient-to-br from-vibrant-orange to-primary-pink",
      buttonTextClass: "text-primary-pink",
      testId: "button-intermediate"
    },
    {
      title: "Advanced",
      description: "Master complex patterns and create amazing bracelets!",
      icon: Crown,
      bgClass: "bg-gradient-to-br from-electric-blue to-deep-pink",
      buttonTextClass: "text-electric-blue",
      testId: "button-advanced"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-fredoka text-4xl md:text-5xl text-center text-royal-blue mb-12">
          Choose Your Level! 🌟
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <div
                key={index}
                className={`card-hover ${category.bgClass} rounded-3xl p-8 text-center shadow-xl`}
                data-testid={`card-${category.title.toLowerCase()}`}
              >
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                  <IconComponent className={`${category.buttonTextClass} text-3xl w-8 h-8`} />
                </div>
                <h3 className="font-fredoka text-2xl text-white mb-4">{category.title}</h3>
                <p className="text-white/90 text-lg mb-6">{category.description}</p>
                <Button
                  data-testid={category.testId}
                  className={`bg-white ${category.buttonTextClass} px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform`}
                >
                  {category.title === "Beginner" ? "Start Here!" : 
                   category.title === "Intermediate" ? "Level Up!" : "Master It!"}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
