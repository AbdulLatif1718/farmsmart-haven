export interface GhanaLocation {
  name: string;
  region: string;
  lat: number;
  lon: number;
  type: 'capital' | 'major' | 'town' | 'village';
}

export const GHANA_LOCATIONS: GhanaLocation[] = [
  // Greater Accra Region
  { name: 'Accra', region: 'Greater Accra', lat: 5.6037, lon: -0.1870, type: 'capital' },
  { name: 'Tema', region: 'Greater Accra', lat: 5.6500, lon: -0.0833, type: 'major' },
  { name: 'Madina', region: 'Greater Accra', lat: 5.6833, lon: -0.1667, type: 'town' },
  { name: 'Adenta', region: 'Greater Accra', lat: 5.7167, lon: -0.1833, type: 'town' },
  { name: 'Kasoa', region: 'Greater Accra', lat: 5.5333, lon: -0.4167, type: 'town' },
  { name: 'Weija', region: 'Greater Accra', lat: 5.5667, lon: -0.3333, type: 'town' },
  { name: 'Dansoman', region: 'Greater Accra', lat: 5.5333, lon: -0.2500, type: 'town' },
  { name: 'Lapaz', region: 'Greater Accra', lat: 5.6167, lon: -0.2500, type: 'town' },
  { name: 'Achimota', region: 'Greater Accra', lat: 5.6333, lon: -0.2167, type: 'town' },
  { name: 'Teshie', region: 'Greater Accra', lat: 5.5833, lon: -0.1000, type: 'town' },
  { name: 'Nungua', region: 'Greater Accra', lat: 5.6000, lon: -0.0833, type: 'town' },
  { name: 'Prampram', region: 'Greater Accra', lat: 5.7167, lon: 0.1000, type: 'town' },
  { name: 'Ada', region: 'Greater Accra', lat: 5.7833, lon: 0.6333, type: 'town' },
  { name: 'Dodowa', region: 'Greater Accra', lat: 5.8833, lon: -0.0833, type: 'town' },

  // Ashanti Region
  { name: 'Kumasi', region: 'Ashanti', lat: 6.6885, lon: -1.6244, type: 'capital' },
  { name: 'Obuasi', region: 'Ashanti', lat: 6.2026, lon: -1.6640, type: 'major' },
  { name: 'Ejisu', region: 'Ashanti', lat: 6.7500, lon: -1.2833, type: 'town' },
  { name: 'Mampong', region: 'Ashanti', lat: 7.0667, lon: -1.4000, type: 'town' },
  { name: 'Konongo', region: 'Ashanti', lat: 6.6167, lon: -1.2167, type: 'town' },
  { name: 'Offinso', region: 'Ashanti', lat: 7.4000, lon: -1.7667, type: 'town' },
  { name: 'Bekwai', region: 'Ashanti', lat: 6.4500, lon: -1.5833, type: 'town' },
  { name: 'Juaso', region: 'Ashanti', lat: 6.8333, lon: -1.1167, type: 'town' },
  { name: 'Tepa', region: 'Ashanti', lat: 7.1500, lon: -2.2833, type: 'town' },
  { name: 'Agona', region: 'Ashanti', lat: 6.8167, lon: -1.5500, type: 'town' },
  { name: 'Kumawu', region: 'Ashanti', lat: 6.9167, lon: -1.2333, type: 'town' },
  { name: 'Asante Mampong', region: 'Ashanti', lat: 7.0667, lon: -1.4000, type: 'town' },

  // Northern Region
  { name: 'Tamale', region: 'Northern', lat: 9.4034, lon: -0.8424, type: 'capital' },
  { name: 'Yendi', region: 'Northern', lat: 9.4426, lon: -0.0074, type: 'major' },
  { name: 'Savelugu', region: 'Northern', lat: 9.6333, lon: -0.8333, type: 'town' },
  { name: 'Gushegu', region: 'Northern', lat: 9.9667, lon: -0.4667, type: 'town' },
  { name: 'Salaga', region: 'Northern', lat: 8.5500, lon: -0.5167, type: 'town' },
  { name: 'Bimbilla', region: 'Northern', lat: 9.0667, lon: -0.4667, type: 'town' },
  { name: 'Zabzugu', region: 'Northern', lat: 9.3000, lon: -0.2000, type: 'town' },
  { name: 'Kpandai', region: 'Northern', lat: 8.4833, lon: -0.0167, type: 'town' },

  // Volta Region
  { name: 'Ho', region: 'Volta', lat: 6.6022, lon: 0.4719, type: 'capital' },
  { name: 'Keta', region: 'Volta', lat: 5.9167, lon: 0.9833, type: 'major' },
  { name: 'Hohoe', region: 'Volta', lat: 7.1500, lon: 0.4667, type: 'town' },
  { name: 'Kpando', region: 'Volta', lat: 6.9833, lon: 0.2833, type: 'town' },
  { name: 'Aflao', region: 'Volta', lat: 6.1167, lon: 1.1833, type: 'town' },
  { name: 'Dzodze', region: 'Volta', lat: 6.1000, lon: 0.9167, type: 'town' },
  { name: 'Akatsi', region: 'Volta', lat: 6.1333, lon: 0.8000, type: 'town' },
  { name: 'Denu', region: 'Volta', lat: 6.0833, lon: 1.1333, type: 'town' },
  { name: 'Anloga', region: 'Volta', lat: 5.7833, lon: 0.8833, type: 'town' },
  { name: 'Sogakope', region: 'Volta', lat: 6.0167, lon: 0.6000, type: 'town' },

  // Central Region
  { name: 'Cape Coast', region: 'Central', lat: 5.1058, lon: -1.2455, type: 'capital' },
  { name: 'Takoradi', region: 'Central', lat: 4.8845, lon: -1.7554, type: 'major' },
  { name: 'Winneba', region: 'Central', lat: 5.3500, lon: -0.6167, type: 'town' },
  { name: 'Saltpond', region: 'Central', lat: 5.2000, lon: -1.0667, type: 'town' },
  { name: 'Elmina', region: 'Central', lat: 5.0833, lon: -1.3500, type: 'town' },
  { name: 'Mankessim', region: 'Central', lat: 5.2833, lon: -1.0333, type: 'town' },
  { name: 'Swedru', region: 'Central', lat: 5.5333, lon: -0.7000, type: 'town' },
  { name: 'Dunkwa', region: 'Central', lat: 5.9667, lon: -1.7833, type: 'town' },
  { name: 'Kasoa', region: 'Central', lat: 5.5333, lon: -0.4167, type: 'town' },

  // Western Region
  { name: 'Sekondi', region: 'Western', lat: 4.9344, lon: -1.7033, type: 'capital' },
  { name: 'Tarkwa', region: 'Western', lat: 5.3000, lon: -1.9833, type: 'major' },
  { name: 'Axim', region: 'Western', lat: 4.8667, lon: -2.2333, type: 'town' },
  { name: 'Half Assini', region: 'Western', lat: 4.6667, lon: -2.8000, type: 'town' },
  { name: 'Prestea', region: 'Western', lat: 5.4333, lon: -2.1333, type: 'town' },
  { name: 'Bogoso', region: 'Western', lat: 5.5833, lon: -2.1833, type: 'town' },
  { name: 'Enchi', region: 'Western', lat: 6.1667, lon: -2.8000, type: 'town' },
  { name: 'Wiawso', region: 'Western', lat: 6.2167, lon: -2.4833, type: 'town' },

  // Eastern Region
  { name: 'Koforidua', region: 'Eastern', lat: 6.0942, lon: -0.2594, type: 'capital' },
  { name: 'Akropong', region: 'Eastern', lat: 5.9500, lon: -0.0833, type: 'major' },
  { name: 'Nkawkaw', region: 'Eastern', lat: 6.5500, lon: -0.7667, type: 'town' },
  { name: 'Mpraeso', region: 'Eastern', lat: 6.5833, lon: -0.7333, type: 'town' },
  { name: 'Somanya', region: 'Eastern', lat: 6.0333, lon: -0.0167, type: 'town' },
  { name: 'Begoro', region: 'Eastern', lat: 6.3833, lon: -0.3833, type: 'town' },
  { name: 'Akim Oda', region: 'Eastern', lat: 5.9333, lon: -0.9833, type: 'town' },
  { name: 'Kyebi', region: 'Eastern', lat: 6.0500, lon: -0.6500, type: 'town' },

  // Western North Region
  { name: 'Sefwi Wiawso', region: 'Western North', lat: 6.2167, lon: -2.4833, type: 'capital' },
  { name: 'Bibiani', region: 'Western North', lat: 6.4667, lon: -2.3167, type: 'major' },
  { name: 'Aowin', region: 'Western North', lat: 6.2500, lon: -2.8000, type: 'town' },
  { name: 'Akontombra', region: 'Western North', lat: 5.9167, lon: -2.6167, type: 'town' },

  // Ahafo Region
  { name: 'Goaso', region: 'Ahafo', lat: 6.7500, lon: -2.5333, type: 'capital' },
  { name: 'Bechem', region: 'Ahafo', lat: 7.0833, lon: -2.0333, type: 'major' },
  { name: 'Duayaw Nkwanta', region: 'Ahafo', lat: 7.2667, lon: -2.1000, type: 'town' },
  { name: 'Kenyase', region: 'Ahafo', lat: 6.9333, lon: -2.3333, type: 'town' },

  // Bono Region
  { name: 'Sunyani', region: 'Bono', lat: 7.3364, lon: -2.3270, type: 'capital' },
  { name: 'Berekum', region: 'Bono', lat: 7.4500, lon: -2.5833, type: 'major' },
  { name: 'Dormaa Ahenkro', region: 'Bono', lat: 7.3000, lon: -3.0000, type: 'town' },
  { name: 'Wenchi', region: 'Bono', lat: 7.7333, lon: -2.1000, type: 'town' },
  { name: 'Techiman', region: 'Bono', lat: 7.5833, lon: -1.9333, type: 'town' },

  // Bono East Region
  { name: 'Techiman', region: 'Bono East', lat: 7.5833, lon: -1.9333, type: 'capital' },
  { name: 'Nkoranza', region: 'Bono East', lat: 7.5500, lon: -1.6833, type: 'major' },
  { name: 'Kintampo', region: 'Bono East', lat: 8.0500, lon: -1.7333, type: 'town' },
  { name: 'Atebubu', region: 'Bono East', lat: 7.7667, lon: -1.0167, type: 'town' },

  // Oti Region
  { name: 'Dambai', region: 'Oti', lat: 8.0667, lon: 0.5333, type: 'capital' },
  { name: 'Jasikan', region: 'Oti', lat: 7.4500, lon: 0.5167, type: 'major' },
  { name: 'Kadjebi', region: 'Oti', lat: 7.1333, lon: 0.4333, type: 'town' },
  { name: 'Nkwanta', region: 'Oti', lat: 8.0500, lon: 0.1667, type: 'town' },

  // Upper East Region
  { name: 'Bolgatanga', region: 'Upper East', lat: 10.7889, lon: -0.8393, type: 'capital' },
  { name: 'Navrongo', region: 'Upper East', lat: 10.8953, lon: -1.0944, type: 'major' },
  { name: 'Bawku', region: 'Upper East', lat: 11.0500, lon: -0.2333, type: 'town' },
  { name: 'Zebilla', region: 'Upper East', lat: 11.0333, lon: -0.5833, type: 'town' },
  { name: 'Paga', region: 'Upper East', lat: 10.9833, lon: -1.1167, type: 'town' },

  // Upper West Region
  { name: 'Wa', region: 'Upper West', lat: 10.0608, lon: -2.5074, type: 'capital' },
  { name: 'Lawra', region: 'Upper West', lat: 10.6500, lon: -2.8833, type: 'major' },
  { name: 'Jirapa', region: 'Upper West', lat: 10.9500, lon: -2.6167, type: 'town' },
  { name: 'Tumu', region: 'Upper West', lat: 10.9167, lon: -2.2000, type: 'town' },
  { name: 'Hamile', region: 'Upper West', lat: 10.8833, lon: -2.8833, type: 'town' },

  // North East Region
  { name: 'Nalerigu', region: 'North East', lat: 10.5333, lon: -0.3667, type: 'capital' },
  { name: 'Gambaga', region: 'North East', lat: 10.5167, lon: -0.2167, type: 'major' },
  { name: 'Walewale', region: 'North East', lat: 10.3167, lon: -0.8333, type: 'town' },

  // Savannah Region
  { name: 'Damongo', region: 'Savannah', lat: 9.0833, lon: -1.8167, type: 'capital' },
  { name: 'Bole', region: 'Savannah', lat: 9.0333, lon: -2.4833, type: 'major' },
  { name: 'Salaga', region: 'Savannah', lat: 8.5500, lon: -0.5167, type: 'town' },
  { name: 'Sawla', region: 'Savannah', lat: 9.2667, lon: -2.2167, type: 'town' }
];

// Helper function to get locations by region
export const getLocationsByRegion = (region: string): GhanaLocation[] => {
  return GHANA_LOCATIONS.filter(location => location.region === region)
    .sort((a, b) => {
      // Sort by type priority (capital, major, town, village) then by name
      const typeOrder = { capital: 0, major: 1, town: 2, village: 3 };
      const typeCompare = typeOrder[a.type] - typeOrder[b.type];
      return typeCompare !== 0 ? typeCompare : a.name.localeCompare(b.name);
    });
};

// Get all unique regions
export const getAllRegions = (): string[] => {
  const regions = [...new Set(GHANA_LOCATIONS.map(location => location.region))];
  return regions.sort();
};

// Search locations by name
export const searchGhanaLocations = (query: string): GhanaLocation[] => {
  if (!query.trim()) return [];
  
  const searchTerm = query.toLowerCase().trim();
  return GHANA_LOCATIONS
    .filter(location => 
      location.name.toLowerCase().includes(searchTerm) ||
      location.region.toLowerCase().includes(searchTerm)
    )
    .sort((a, b) => {
      // Prioritize exact matches and type
      const aExact = a.name.toLowerCase() === searchTerm ? 0 : 1;
      const bExact = b.name.toLowerCase() === searchTerm ? 0 : 1;
      const exactCompare = aExact - bExact;
      
      if (exactCompare !== 0) return exactCompare;
      
      const typeOrder = { capital: 0, major: 1, town: 2, village: 3 };
      const typeCompare = typeOrder[a.type] - typeOrder[b.type];
      return typeCompare !== 0 ? typeCompare : a.name.localeCompare(b.name);
    })
    .slice(0, 10); // Limit results
};

// Convert GhanaLocation to LocationCoords format
export const toLocationCoords = (ghanaLocation: GhanaLocation): import('@/services/weatherService').LocationCoords => {
  return {
    lat: ghanaLocation.lat,
    lon: ghanaLocation.lon,
    name: `${ghanaLocation.name}, ${ghanaLocation.region}, Ghana`,
    country: 'GH',
    state: ghanaLocation.region
  };
};