import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

export default function FeaturedTutorials() {
  const steps = [
    {
      number: 1,
      title: "Gather Your Materials",
      description: "You'll need 4 different colored threads, scissors, and tape!",
      bgClass: "bg-primary-pink"
    },
    {
      number: 2,
      title: "Cut and Arrange", 
      description: "Cut 4 pieces of thread, each 24 inches long. Tape them down!",
      bgClass: "bg-sunny-yellow"
    },
    {
      number: 3,
      title: "Start the Pattern",
      description: "Make forward knots with the first thread over all others!",
      bgClass: "bg-lime-green"
    },
    {
      number: 4,
      title: "Repeat and Enjoy!",
      description: "Keep going until your bracelet is the perfect length!",
      bgClass: "bg-royal-blue"
    }
  ];

  return (
    <section id="tutorials" className="py-16 bg-gradient-to-br from-soft-cream to-alice-blue">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-fredoka text-4xl md:text-5xl text-primary-pink mb-4">
            Step-by-Step Guides 📋
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Follow our easy visual guides with pictures for every step!
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <h3 className="font-fredoka text-3xl text-royal-blue mb-6" data-testid="text-tutorial-title">
                How to Make a Basic Friendship Bracelet
              </h3>
              
              <div className="space-y-6">
                {steps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-4" data-testid={`step-${step.number}`}>
                    <div className={`w-8 h-8 ${step.bgClass} rounded-full flex items-center justify-center flex-shrink-0`}>
                      <span className="text-white font-bold" data-testid={`step-number-${step.number}`}>
                        {step.number}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg text-gray-800 mb-2" data-testid={`step-title-${step.number}`}>
                        {step.title}
                      </h4>
                      <p className="text-gray-600" data-testid={`step-description-${step.number}`}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button
                data-testid="button-watch-tutorial"
                className="mt-8 w-full bg-gradient-to-r from-primary-pink to-deep-pink text-white py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform"
              >
                <Play className="mr-3 w-6 h-6" />
                Watch Video Tutorial
              </Button>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <img
              src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
              alt="Kids engaged in colorful crafting activities"
              className="w-full h-auto rounded-3xl shadow-xl"
              data-testid="img-tutorial-guide"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
