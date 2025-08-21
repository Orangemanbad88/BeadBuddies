import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Camera } from "lucide-react";
import type { GalleryItem } from "@shared/schema";

export default function PhotoGallery() {
  const { data: galleryItems = [], isLoading } = useQuery<GalleryItem[]>({
    queryKey: ["/api/gallery"],
  });

  const getGradientClass = (index: number) => {
    const gradients = [
      "bg-gradient-to-br from-primary-pink to-deep-pink",
      "bg-gradient-to-br from-lime-green to-turquoise",
      "bg-gradient-to-br from-sunny-yellow to-primary-pink",
      "bg-gradient-to-br from-royal-blue to-deep-pink",
      "bg-gradient-to-br from-turquoise to-lime-green",
      "bg-gradient-to-br from-deep-pink to-royal-blue"
    ];
    return gradients[index % gradients.length];
  };

  if (isLoading) {
    return (
      <section id="gallery" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-fredoka text-4xl md:text-5xl text-royal-blue mb-4">
              Gallery of Creations 📸
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Get inspired by amazing bracelet designs from our community!
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="rounded-2xl overflow-hidden shadow-lg">
                <Skeleton className="w-full h-48" />
                <div className="p-4">
                  <Skeleton className="h-4 w-3/4 mb-1" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="gallery" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-fredoka text-4xl md:text-5xl text-royal-blue mb-4">
            Gallery of Creations 📸
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Get inspired by amazing bracelet designs from our community!
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              className={`card-hover ${getGradientClass(index)} rounded-2xl overflow-hidden shadow-lg`}
              data-testid={`card-gallery-${item.id}`}
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-48 object-cover"
                data-testid={`img-gallery-${item.id}`}
              />
              <div className="p-4">
                <h3 className="font-fredoka text-white text-lg" data-testid={`text-title-${item.id}`}>
                  {item.title}
                </h3>
                <p className="text-white/80 text-sm" data-testid={`text-description-${item.id}`}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button
            data-testid="button-upload-creation"
            className="btn-bounce bg-gradient-to-r from-lime-green to-turquoise text-white px-8 py-4 rounded-full text-xl font-bold shadow-xl"
          >
            <Camera className="mr-3 w-6 h-6" />
            Upload Your Creation!
          </Button>
        </div>
      </div>
    </section>
  );
}
