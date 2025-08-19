import { useState, useEffect } from 'react';
import { LocationCoords } from '@/services/weatherService';

const LOCATION_STORAGE_KEY = 'farmLocation';

interface UseLocationSettingsResult {
  location: LocationCoords | null;
  setLocation: (location: LocationCoords) => void;
  clearLocation: () => void;
}

export const useLocationSettings = (): UseLocationSettingsResult => {
  const [location, setLocationState] = useState<LocationCoords | null>(null);

  useEffect(() => {
    // Load saved location from localStorage
    const savedLocation = localStorage.getItem(LOCATION_STORAGE_KEY);
    if (savedLocation) {
      try {
        setLocationState(JSON.parse(savedLocation));
      } catch (error) {
        console.error('Error parsing saved location:', error);
        localStorage.removeItem(LOCATION_STORAGE_KEY);
      }
    }
  }, []);

  const setLocation = (newLocation: LocationCoords) => {
    setLocationState(newLocation);
    localStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(newLocation));
  };

  const clearLocation = () => {
    setLocationState(null);
    localStorage.removeItem(LOCATION_STORAGE_KEY);
  };

  return {
    location,
    setLocation,
    clearLocation
  };
};