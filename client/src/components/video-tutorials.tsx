import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Play, Plus } from "lucide-react";
import { useState } from "react";
import VideoModal from "./video-modal";
import type { Tutorial } from "@shared/schema";

export default function VideoTutorials() {
  const [selectedVideo, setSelectedVideo] = useState<Tutorial | null>(null);
  const { data: tutorials = [], isLoading } = useQuery<Tutorial[]>({
    queryKey: ["/api/tutorials"],
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner": return "bg-lime-green text-white";
      case "intermediate": return "bg-sunny-yellow text-white";
      case "advanced": return "bg-royal-blue text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  if (isLoading) {
    return (
      <section id="videos" className="py-16 bg-gradient-to-br from-vibrant-orange/10 to-electric-blue/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-fredoka text-4xl md:text-5xl text-primary-pink mb-4">
              Video Tutorials 📹
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Watch step-by-step videos and follow along to create beautiful bracelets!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-3xl overflow-hidden shadow-xl">
                <Skeleton className="h-48 w-full" />
                <div className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="videos" className="py-16 bg-gradient-to-br from-vibrant-orange/10 to-electric-blue/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-fredoka text-4xl md:text-5xl text-primary-pink mb-4">
            Video Tutorials 📹
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Watch step-by-step videos and follow along to create beautiful bracelets!
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tutorials.map((tutorial) => (
            <div 
              key={tutorial.id}
              className="card-hover bg-white rounded-3xl overflow-hidden shadow-xl"
              data-testid={`card-tutorial-${tutorial.id}`}
            >
              <div className="video-thumbnail h-48 flex items-center justify-center relative">
                <img 
                  src={tutorial.imageUrl}
                  alt={tutorial.title}
                  className="w-full h-full object-cover"
                  data-testid={`img-tutorial-${tutorial.id}`}
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <Button
                    data-testid={`button-play-${tutorial.id}`}
                    size="icon"
                    className="w-16 h-16 bg-white/90 rounded-full text-primary-pink hover:bg-white"
                    onClick={() => setSelectedVideo(tutorial)}
                  >
                    <Play className="w-6 h-6 ml-1" />
                  </Button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-fredoka text-xl text-royal-blue mb-2" data-testid={`text-title-${tutorial.id}`}>
                  {tutorial.title}
                </h3>
                <p className="text-gray-600 mb-4" data-testid={`text-description-${tutorial.id}`}>
                  {tutorial.description}
                </p>
                <div className="flex items-center justify-between">
                  <Badge 
                    className={`${getDifficultyColor(tutorial.difficulty)} px-3 py-1 rounded-full text-sm font-semibold capitalize`}
                    data-testid={`badge-difficulty-${tutorial.id}`}
                  >
                    {tutorial.difficulty}
                  </Badge>
                  <span className="text-gray-500 text-sm" data-testid={`text-duration-${tutorial.id}`}>
                    {tutorial.duration}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button
            data-testid="button-load-more-videos"
            className="btn-bounce bg-gradient-to-r from-primary-pink to-deep-pink text-white px-8 py-4 rounded-full text-xl font-bold shadow-xl"
          >
            <Plus className="mr-3 w-6 h-6" />
            Load More Videos
          </Button>
        </div>
      </div>
      
      {selectedVideo && (
        <VideoModal
          isOpen={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
          videoUrl={selectedVideo.videoUrl}
          title={selectedVideo.title}
        />
      )}
    </section>
  );
}
