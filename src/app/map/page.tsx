"use client";

import { useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "@/components/map/SimpleMap";
import MapWrapper from "@/components/map/MapWrapper";

export default function MapPage() {
  const [pins, setPins] = useState<MapPin[]>([
    // Example pins to start with
    {
      id: "1",
      position: [40.7128, -74.0060],
      name: "New York City",
      description: "Where I first fell in love with the city"
    },
    {
      id: "2", 
      position: [51.5074, -0.1278],
      name: "London",
      description: "My favorite place to visit"
    },
    {
      id: "3",
      position: [35.6762, 139.6503],
      name: "Tokyo",
      description: "Amazing food and culture"
    }
  ]);

  const handleAddPin = (newPin: Omit<MapPin, 'id'>) => {
    const pin: MapPin = {
      ...newPin,
      id: Date.now().toString(), // Simple ID generation
    };
    setPins(prev => [...prev, pin]);
  };

  const handleRemovePin = (pinId: string) => {
    setPins(prev => prev.filter(pin => pin.id !== pinId));
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="font-headline text-4xl font-bold mb-2">Re-membering on the Map</h1>
          <p className="text-xl text-muted-foreground">Where is your heart connected?</p>
        </div>

        <Card className="max-w-4xl mx-auto mb-8 shadow-lg">
          <CardHeader>
            <CardTitle>Interactive Memory Map</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Click "Add Pin" and then click anywhere on the map to place a memory marker. 
              You can name your pins and add descriptions to remember special places.
            </p>
            <MapWrapper 
              pins={pins}
              onAddPin={handleAddPin}
              onRemovePin={handleRemovePin}
            />
          </CardContent>
        </Card>

        {pins.length > 0 && (
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle>Your Memory Pins ({pins.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pins.map((pin) => (
                  <div key={pin.id} className="p-4 border rounded-lg">
                    <h3 className="font-semibold">{pin.name}</h3>
                    {pin.description && (
                      <p className="text-sm text-muted-foreground mt-1">{pin.description}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-2">
                      {pin.position[0].toFixed(4)}, {pin.position[1].toFixed(4)}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
}
