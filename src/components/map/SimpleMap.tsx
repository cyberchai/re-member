"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";

export interface MapPin {
  id: string;
  position: [number, number];
  name: string;
  description?: string;
}

interface SimpleMapProps {
  pins: MapPin[];
  onAddPin: (pin: Omit<MapPin, 'id'>) => void;
  onRemovePin: (pinId: string) => void;
}

export default function SimpleMap({ pins, onAddPin, onRemovePin }: SimpleMapProps) {
  const [isAddingPin, setIsAddingPin] = useState(false);
  const [newPinPosition, setNewPinPosition] = useState<[number, number] | null>(null);
  const [pinName, setPinName] = useState("");
  const [pinDescription, setPinDescription] = useState("");
  const [mapInstance, setMapInstance] = useState<any>(null);
  const [mapKey, setMapKey] = useState(0);
  const mapRef = useRef<HTMLDivElement>(null);

  // Initialize map using direct Leaflet API - only once
  useEffect(() => {
    if (typeof window === 'undefined' || mapInstance) return;

    const initMap = async () => {
      try {
        // Dynamically import Leaflet only on client side
        const L = await import('leaflet');
        
        // Fix for default markers
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
          iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
          shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        });

        if (mapRef.current && !mapRef.current._leaflet_id) {
          const map = L.map(mapRef.current).setView([20, 0], 2);
          
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }).addTo(map);

          // Add click handler
          map.on('click', (e) => {
            if (isAddingPin) {
              const { lat, lng } = e.latlng;
              setNewPinPosition([lat, lng]);
            }
          });

          setMapInstance(map);
        }
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    initMap();
  }, []); // Empty dependency array - only run once

  // Reinitialize map when key changes (for retry functionality)
  useEffect(() => {
    if (mapKey > 0) {
      // Force reinitialization by resetting state
      setMapInstance(null);
    }
  }, [mapKey]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (mapInstance) {
        mapInstance.remove();
        setMapInstance(null);
      }
    };
  }, [mapInstance]);

  // Add markers when pins change
  useEffect(() => {
    if (!mapInstance) return;

    const updateMarkers = async () => {
      try {
        const L = await import('leaflet');
        
        // Clear existing markers (keep tile layers)
        mapInstance.eachLayer((layer: any) => {
          if (layer instanceof L.Marker) {
            mapInstance.removeLayer(layer);
          }
        });

        // Add new markers
        pins.forEach((pin) => {
          const marker = L.marker(pin.position).addTo(mapInstance);
          marker.bindPopup(`
            <div class="p-2">
              <h3 class="font-semibold text-lg">${pin.name}</h3>
              ${pin.description ? `<p class="text-sm text-gray-600 mt-1">${pin.description}</p>` : ''}
              <button onclick="window.removePin('${pin.id}')" class="mt-2 px-2 py-1 bg-red-500 text-white rounded text-sm">
                Remove
              </button>
            </div>
          `);
        });

        // Add temporary marker if adding pin
        if (isAddingPin && newPinPosition) {
          const tempMarker = L.marker(newPinPosition).addTo(mapInstance);
          tempMarker.bindPopup('<div class="p-2"><p class="text-sm text-gray-600">Click to add pin details</p></div>');
        }
      } catch (error) {
        console.error('Error updating markers:', error);
      }
    };

    updateMarkers();
  }, [mapInstance, pins, isAddingPin, newPinPosition]);

  // Expose removePin function globally
  useEffect(() => {
    (window as any).removePin = onRemovePin;
    return () => {
      delete (window as any).removePin;
    };
  }, [onRemovePin]);

  const handleAddPin = () => {
    if (newPinPosition && pinName.trim()) {
      onAddPin({
        position: newPinPosition,
        name: pinName.trim(),
        description: pinDescription.trim() || undefined,
      });
      setNewPinPosition(null);
      setPinName("");
      setPinDescription("");
      setIsAddingPin(false);
    }
  };

  const handleCancelAddPin = () => {
    setNewPinPosition(null);
    setPinName("");
    setPinDescription("");
    setIsAddingPin(false);
  };

  const handleRetryMap = () => {
    if (mapInstance) {
      try {
        mapInstance.remove();
      } catch (error) {
        console.error('Error removing map:', error);
      }
      setMapInstance(null);
    }
    // Force complete remount by changing the key
    setMapKey(prev => prev + 1);
  };

  return (
    <div className="w-full h-[600px] relative">
      <div 
        key={mapKey}
        ref={mapRef} 
        className="w-full h-full rounded-lg"
        style={{ height: "100%", width: "100%" }}
      />

      {/* Add Pin Controls */}
      <div className="absolute top-4 right-4 z-[1000]">
        <Card className="p-4">
          <CardContent className="p-0">
            {!isAddingPin ? (
              <div className="space-y-2">
                <Button
                  onClick={() => setIsAddingPin(true)}
                  className="w-full"
                  variant="default"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Add Pin
                </Button>
                <Button
                  onClick={handleRetryMap}
                  className="w-full"
                  variant="outline"
                  size="sm"
                >
                  Retry Map
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm font-medium">Click on the map to place a pin</p>
                {newPinPosition && (
                  <Dialog open={true} onOpenChange={handleCancelAddPin}>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Pin</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium">Pin Name *</label>
                          <Input
                            value={pinName}
                            onChange={(e) => setPinName(e.target.value)}
                            placeholder="Enter pin name..."
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Description (optional)</label>
                          <Input
                            value={pinDescription}
                            onChange={(e) => setPinDescription(e.target.value)}
                            placeholder="Enter description..."
                            className="mt-1"
                          />
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            onClick={handleAddPin}
                            disabled={!pinName.trim()}
                            className="flex-1"
                          >
                            Add Pin
                          </Button>
                          <Button
                            variant="outline"
                            onClick={handleCancelAddPin}
                            className="flex-1"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
                <Button
                  variant="outline"
                  onClick={handleCancelAddPin}
                  className="w-full"
                >
                  Cancel
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
