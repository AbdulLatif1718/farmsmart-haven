import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, Search, Loader2, Navigation, ChevronDown } from 'lucide-react';
import { LocationCoords } from '@/services/weatherService';
import { useLocationSettings } from '@/hooks/useLocationSettings';
import { useToast } from '@/hooks/use-toast';
import { 
  GHANA_LOCATIONS, 
  getAllRegions, 
  getLocationsByRegion, 
  searchGhanaLocations, 
  toLocationCoords,
  GhanaLocation 
} from '@/data/ghanaLocations';

type SelectionMode = 'dropdown' | 'search' | 'gps';

export const LocationSettings = () => {
  const [selectionMode, setSelectionMode] = useState<SelectionMode>('dropdown');
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<GhanaLocation[]>([]);
  const [gettingLocation, setGettingLocation] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<'region' | 'location' | null>(null);
  
  const { location, setLocation, clearLocation } = useLocationSettings();
  const { toast } = useToast();

  const regions = getAllRegions();

  // Handle search as user types
  useEffect(() => {
    if (selectionMode === 'search' && searchQuery.trim()) {
      const results = searchGhanaLocations(searchQuery);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, selectionMode]);

  const handleSelectLocation = (ghanaLocation: GhanaLocation) => {
    const locationCoords = toLocationCoords(ghanaLocation);
    setLocation(locationCoords);
    setDropdownOpen(null);
    setSearchQuery('');
    setSearchResults([]);
    
    toast({
      title: "Location Set Successfully",
      description: `Farm location set to ${ghanaLocation.name}, ${ghanaLocation.region}`,
    });
  };

  const handleClearLocation = () => {
    clearLocation();
    setSelectedRegion('');
    setSearchQuery('');
    setSearchResults([]);
    toast({
      title: "Location Cleared",
      description: "Farm location has been cleared",
    });
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Geolocation Not Supported",
        description: "Your browser doesn't support location services.",
        variant: "destructive",
      });
      return;
    }

    setGettingLocation(true);
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          
          // Find the closest Ghana location
          let closestLocation = GHANA_LOCATIONS[0];
          let minDistance = Number.MAX_VALUE;
          
          GHANA_LOCATIONS.forEach(loc => {
            const distance = Math.sqrt(
              Math.pow(loc.lat - latitude, 2) + Math.pow(loc.lon - longitude, 2)
            );
            if (distance < minDistance) {
              minDistance = distance;
              closestLocation = loc;
            }
          });
          
          // If closest location is within reasonable distance (about 50km), use it
          if (minDistance < 0.5) {
            handleSelectLocation(closestLocation);
          } else {
            // Use GPS coordinates with reverse geocoding fallback
            try {
              const response = await fetch(
                `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=62e9fc4280bd6068531b09621a74a9b0`
              );
              
              if (response.ok) {
                const data = await response.json();
                if (data.length > 0) {
                  const locationData = data[0];
                  const currentLocation: LocationCoords = {
                    lat: latitude,
                    lon: longitude,
                    name: `${locationData.name}${locationData.state ? `, ${locationData.state}` : ''}, ${locationData.country === 'GH' ? 'Ghana' : locationData.country}`,
                    country: locationData.country,
                    state: locationData.state
                  };
                  
                  setLocation(currentLocation);
                  toast({
                    title: "Location Set Successfully",
                    description: `Using your current location: ${currentLocation.name}`,
                  });
                }
              } else {
                throw new Error('Reverse geocoding failed');
              }
            } catch (error) {
              // Final fallback with coordinates only
              const fallbackLocation: LocationCoords = {
                lat: latitude,
                lon: longitude,
                name: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
                country: 'Unknown'
              };
              
              setLocation(fallbackLocation);
              toast({
                title: "Location Set",
                description: "Using your GPS coordinates",
              });
            }
          }
        } catch (error) {
          console.error('Error processing location:', error);
          toast({
            title: "Error",
            description: "Failed to process your location. Please try manual selection.",
            variant: "destructive",
          });
        } finally {
          setGettingLocation(false);
        }
      },
      (error) => {
        setGettingLocation(false);
        let errorMessage = "Failed to get your location. ";
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage += "Please allow location access and try again.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage += "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage += "Location request timed out.";
            break;
          default:
            errorMessage += "An unknown error occurred.";
            break;
        }
        
        toast({
          title: "Location Error",
          description: errorMessage,
          variant: "destructive",
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000
      }
    );
  };

  const regionLocations = selectedRegion ? getLocationsByRegion(selectedRegion) : [];

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
              <div className="flex-1">
                <h4 className="font-medium text-green-800 dark:text-green-300 mb-1">Current Farm Location</h4>
                <p className="text-sm text-green-600 dark:text-green-400">{location.name}</p>
                <p className="text-xs text-green-500 dark:text-green-500">
                  Coordinates: {location.lat.toFixed(4)}, {location.lon.toFixed(4)}
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleClearLocation}
                className="border-green-200 text-green-700 hover:bg-green-100 dark:hover:bg-green-900/40"
              >
                Clear
              </Button>
            </div>
          </div>
        )}

        {/* Selection Mode Tabs */}
        <div className="flex space-x-2 bg-muted p-1 rounded-lg">
          <button
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              selectionMode === 'dropdown'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setSelectionMode('dropdown')}
          >
            Browse Locations
          </button>
          <button
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              selectionMode === 'search'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setSelectionMode('search')}
          >
            Search
          </button>
          <button
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              selectionMode === 'gps'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setSelectionMode('gps')}
          >
            GPS Location
          </button>
        </div>

        {/* Dropdown Selection Mode */}
        {selectionMode === 'dropdown' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Select Your Region</Label>
              <div className="relative">
                <button
                  className="w-full h-10 px-3 py-2 text-left bg-background border border-input rounded-md hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 flex items-center justify-between"
                  onClick={() => setDropdownOpen(dropdownOpen === 'region' ? null : 'region')}
                >
                  <span className={selectedRegion ? 'text-foreground' : 'text-muted-foreground'}>
                    {selectedRegion || 'Choose a region...'}
                  </span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${dropdownOpen === 'region' ? 'rotate-180' : ''}`} />
                </button>
                
                {dropdownOpen === 'region' && (
                  <div className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {regions.map((region) => (
                      <button
                        key={region}
                        className="w-full px-3 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        onClick={() => {
                          setSelectedRegion(region);
                          setDropdownOpen(null);
                        }}
                      >
                        {region}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {selectedRegion && (
              <div className="space-y-2">
                <Label>Select Your Town/City</Label>
                <div className="relative">
                  <button
                    className="w-full h-10 px-3 py-2 text-left bg-background border border-input rounded-md hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 flex items-center justify-between"
                    onClick={() => setDropdownOpen(dropdownOpen === 'location' ? null : 'location')}
                  >
                    <span className="text-muted-foreground">
                      Choose your town or city...
                    </span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${dropdownOpen === 'location' ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {dropdownOpen === 'location' && (
                    <div className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-md shadow-lg max-h-60 overflow-y-auto">
                      {regionLocations.map((location, index) => (
                        <button
                          key={`${location.name}-${index}`}
                          className="w-full px-3 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground flex items-center justify-between"
                          onClick={() => handleSelectLocation(location)}
                        >
                          <div>
                            <div className="font-medium">{location.name}</div>
                            <div className="text-xs text-muted-foreground capitalize">
                              {location.type === 'capital' ? 'Regional Capital' : 
                               location.type === 'major' ? 'Major Town' : 
                               location.type === 'town' ? 'Town' : 'Village'}
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {location.lat.toFixed(2)}, {location.lon.toFixed(2)}
                          </div>
                        </button>
                      ))}
                      
                      {regionLocations.length === 0 && (
                        <div className="px-3 py-2 text-sm text-muted-foreground">
                          No locations found for this region
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="text-sm text-muted-foreground bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-800 dark:text-blue-300 mb-1">Browse Locations:</p>
                  <ul className="text-xs space-y-1 text-blue-600 dark:text-blue-400">
                    <li>• First select your region from the dropdown</li>
                    <li>• Then choose your specific town or city</li>
                    <li>• All major farming areas in Ghana are included</li>
                    <li>• Locations are sorted by importance (capitals, major towns, towns)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search Mode */}
        {selectionMode === 'search' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="location-search">Search for your location</Label>
              <div className="relative">
                <Input
                  id="location-search"
                  placeholder="Type town, city, or region name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            {searchResults.length > 0 && (
              <div className="space-y-2">
                <Label>Search Results</Label>
                <div className="max-h-60 overflow-y-auto space-y-1 border rounded-md p-1">
                  {searchResults.map((result, index) => (
                    <button
                      key={`search-${result.name}-${index}`}
                      className="w-full p-3 text-left hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                      onClick={() => handleSelectLocation(result)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-sm">{result.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {result.region} • {result.type === 'capital' ? 'Regional Capital' : 
                             result.type === 'major' ? 'Major Town' : 
                             result.type === 'town' ? 'Town' : 'Village'}
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {result.lat.toFixed(2)}, {result.lon.toFixed(2)}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {searchQuery.trim() && searchResults.length === 0 && (
              <div className="text-center py-4 text-muted-foreground">
                <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No locations found matching "{searchQuery}"</p>
                <p className="text-xs mt-1">Try searching for a different town or region name</p>
              </div>
            )}

            <div className="text-sm text-muted-foreground bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-start">
                <Search className="h-4 w-4 mr-2 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-800 dark:text-blue-300 mb-1">Search Tips:</p>
                  <ul className="text-xs space-y-1 text-blue-600 dark:text-blue-400">
                    <li>• Type any town, city, or region name in Ghana</li>
                    <li>• Search works with partial names (e.g., "Kum" for Kumasi)</li>
                    <li>• Results show the most relevant locations first</li>
                    <li>• All major agricultural areas are included</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* GPS Mode */}
        {selectionMode === 'gps' && (
          <div className="space-y-4">
            <div className="text-center py-8">
              <Navigation className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-medium mb-2">Use Your Current Location</h3>
              <p className="text-sm text-muted-foreground mb-4">
                We'll detect your location and find the nearest farming area in Ghana
              </p>
              
              <Button
                onClick={getCurrentLocation}
                disabled={gettingLocation}
                className="bg-leaf-600 hover:bg-leaf-700"
                size="lg"
              >
                {gettingLocation ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Detecting Location...
                  </>
                ) : (
                  <>
                    <Navigation className="h-4 w-4 mr-2" />
                    Get My Location
                  </>
                )}
              </Button>
            </div>

            <div className="text-sm text-muted-foreground bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-start">
                <Navigation className="h-4 w-4 mr-2 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-800 dark:text-blue-300 mb-1">GPS Location:</p>
                  <ul className="text-xs space-y-1 text-blue-600 dark:text-blue-400">
                    <li>• Your browser will ask for location permission</li>
                    <li>• We'll find the closest farming area to your coordinates</li>
                    <li>• This works best when you're actually at your farm</li>
                    <li>• You can always change it later using the dropdown or search</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};