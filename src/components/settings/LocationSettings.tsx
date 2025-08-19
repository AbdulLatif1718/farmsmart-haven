import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, Search, Loader2 } from 'lucide-react';
import { searchLocation, LocationCoords } from '@/services/weatherService';
import { useLocationSettings } from '@/hooks/useLocationSettings';
import { useToast } from '@/hooks/use-toast';

export const LocationSettings = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<LocationCoords[]>([]);
  const [searching, setSearcing] = useState(false);
  const { location, setLocation, clearLocation } = useLocationSettings();
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setSearcing(true);
    try {
      const results = await searchLocation(searchQuery);
      setSearchResults(results);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to search location. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSearcing(false);
    }
  };

  const handleSelectLocation = (selectedLocation: LocationCoords) => {
    setLocation(selectedLocation);
    setSearchResults([]);
    setSearchQuery('');
    toast({
      title: "Success",
      description: `Farm location set to ${selectedLocation.name}`,
    });
  };

  const handleClearLocation = () => {
    clearLocation();
    toast({
      title: "Success",
      description: "Farm location cleared",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <MapPin className="h-5 w-5 mr-2 text-leaf-600" />
          Farm Location Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {location && (
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-green-800 dark:text-green-300">Current Farm Location</h4>
                <p className="text-sm text-green-600 dark:text-green-400">{location.name}</p>
                <p className="text-xs text-green-500 dark:text-green-500">
                  Coordinates: {location.lat.toFixed(4)}, {location.lon.toFixed(4)}
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleClearLocation}
                className="border-green-200 text-green-700 hover:bg-green-100"
              >
                Clear
              </Button>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="location-search">Search for your farm location</Label>
          <div className="flex gap-2">
            <Input
              id="location-search"
              placeholder="Enter city, region, or coordinates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button 
              onClick={handleSearch} 
              disabled={searching || !searchQuery.trim()}
              className="bg-leaf-600 hover:bg-leaf-700"
            >
              {searching ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {searchResults.length > 0 && (
          <div className="space-y-2">
            <Label>Search Results</Label>
            <div className="max-h-48 overflow-y-auto space-y-1">
              {searchResults.map((result, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start text-left h-auto p-3"
                  onClick={() => handleSelectLocation(result)}
                >
                  <div>
                    <div className="font-medium">{result.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {result.lat.toFixed(4)}, {result.lon.toFixed(4)}
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        )}

        <div className="text-sm text-muted-foreground">
          <p>Set your farm location to get accurate weather data and personalized agricultural insights.</p>
        </div>
      </CardContent>
    </Card>
  );
};