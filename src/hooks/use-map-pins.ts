import { useState, useEffect } from 'react';
import { collection, addDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { initializeFirebase, useMemoFirebase } from '@/firebase';
import { useCollection } from '@/firebase/firestore/use-collection';
import { useAuth } from '@/firebase/provider';

export interface MapPin {
  id: string;
  position: [number, number];
  name: string;
  description?: string;
  createdAt: any;
  updatedAt: any;
}

export interface NewMapPin {
  position: [number, number];
  name: string;
  description?: string;
}

export function useMapPins() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();

  // Create memoized collection reference under user path
  const pinsCollection = useMemoFirebase(() => {
    try {
      if (!user?.uid) {
        console.log('No authenticated user, cannot access map pins');
        return null;
      }
      const { firestore } = initializeFirebase();
      return collection(firestore, `users/${user.uid}/mapPins`);
    } catch (error) {
      console.error('Failed to initialize Firebase:', error);
      return null;
    }
  }, [user?.uid]);

  // Use the collection hook to get real-time data
  const { data: pins, isLoading: isCollectionLoading, error: collectionError } = useCollection<Omit<MapPin, 'id'>>(pinsCollection);

  // Debug logging
  useEffect(() => {
    console.log('Pins collection state:', { pins, isLoading: isCollectionLoading, error: collectionError });
  }, [pins, isCollectionLoading, collectionError]);

  // Add a new pin
  const addPin = async (pin: NewMapPin): Promise<void> => {
    try {
      if (!user?.uid) {
        throw new Error('User must be authenticated to add pins');
      }
      
      console.log('Adding pin to Firestore:', pin);
      const { firestore } = initializeFirebase();
      setIsLoading(true);
      setError(null);

      const docRef = await addDoc(collection(firestore, `users/${user.uid}/mapPins`), {
        ...pin,
        userId: user.uid, // Include userId for security rules
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      
      console.log('Pin added successfully with ID:', docRef.id);
    } catch (err) {
      console.error('Error adding pin to Firestore:', err);
      const error = err instanceof Error ? err : new Error('Failed to add pin');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Remove a pin
  const removePin = async (pinId: string): Promise<void> => {
    try {
      if (!user?.uid) {
        throw new Error('User must be authenticated to remove pins');
      }
      
      const { firestore } = initializeFirebase();
      setIsLoading(true);
      setError(null);

      await deleteDoc(doc(firestore, `users/${user.uid}/mapPins`, pinId));
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to remove pin');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    pins: pins || [],
    isLoading: isLoading || isCollectionLoading,
    error: error || collectionError,
    addPin,
    removePin,
  };
}
