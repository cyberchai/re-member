"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { MapPin } from "./SimpleMap";
import "leaflet/dist/leaflet.css";

// Dynamically import the map component to prevent SSR issues
const SimpleMap = dynamic(() => import("./SimpleMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] flex items-center justify-center bg-gray-100 rounded-lg">
      <p className="text-gray-600">Loading map...</p>
    </div>
  ),
});

interface MapWrapperProps {
  pins: MapPin[];
  onAddPin: (pin: Omit<MapPin, 'id'>) => void;
  onRemovePin: (pinId: string) => void;
}

export default function MapWrapper({ pins, onAddPin, onRemovePin }: MapWrapperProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full h-[600px] flex items-center justify-center bg-gray-100 rounded-lg">
        <p className="text-gray-600">Loading map...</p>
      </div>
    );
  }

  return (
    <SimpleMap 
      pins={pins}
      onAddPin={onAddPin}
      onRemovePin={onRemovePin}
    />
  );
}
