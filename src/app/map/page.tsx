import Image from "next/image";
import MainLayout from "@/components/layouts/MainLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function MapPage() {
  const mapImage = PlaceHolderImages.find(img => img.id === 'world-map');

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="font-headline text-4xl font-bold mb-2">Re-membering on the Map</h1>
          <p className="text-xl text-muted-foreground">Where is your heart connected?</p>
        </div>

        <Card className="max-w-2xl mx-auto mb-8 shadow-lg">
          <CardHeader>
            <CardTitle>Pin a Memory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex w-full items-center space-x-2">
              <Input type="text" placeholder="Enter a city, state, or country..." />
              <Button type="submit" variant="default">View Map</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardContent className="p-0 relative">
            {mapImage && (
              <Image
                src={mapImage.imageUrl}
                alt={mapImage.description}
                width={1200}
                height={800}
                className="w-full h-auto object-cover"
                data-ai-hint={mapImage.imageHint}
              />
            )}
            {/* Example Pins */}
            <div className="absolute top-[30%] left-[20%]">
              <MapPin className="h-8 w-8 text-accent drop-shadow-lg animate-pulse" />
            </div>
            <div className="absolute top-[50%] left-[55%]">
              <MapPin className="h-8 w-8 text-accent drop-shadow-lg animate-pulse" style={{animationDelay: '0.5s'}} />
            </div>
            <div className="absolute top-[65%] left-[80%]">
              <MapPin className="h-8 w-8 text-accent drop-shadow-lg animate-pulse" style={{animationDelay: '1s'}} />
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
