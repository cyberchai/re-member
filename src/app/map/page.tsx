"use client";

import { useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "@/components/map/SimpleMap";
import MapWrapper from "@/components/map/MapWrapper";
import { useMapPins, NewMapPin } from "@/hooks/use-map-pins";

export default function MapPage() {
  const { pins, isLoading, error, addPin, removePin } = useMapPins();

  const handleAddPin = async (newPin: NewMapPin) => {
    try {
      console.log('Map page: Attempting to add pin:', newPin);
      await addPin(newPin);
      console.log('Map page: Pin added successfully');
    } catch (error) {
      console.error('Map page: Failed to add pin:', error);
    }
  };

  const handleRemovePin = async (pinId: string) => {
    try {
      await removePin(pinId);
    } catch (error) {
      console.error('Failed to remove pin:', error);
    }
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
