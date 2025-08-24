import { supabase } from '@/integrations/supabase/client';

const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

export interface WeatherData {
  location: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  rainChance: number;
  icon: string;
  soilMoisture?: number;
  uvIndex?: number;
  pressure: number;
  visibility: number;
  dewPoint: number;
  feelsLike: number;
}

export interface ForecastData {
  date: string;
  temperature: number;
  minTemp: number;
  maxTemp: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  rainChance: number;
}

export interface LocationCoords {
  lat: number;
  lon: number;
  name: string;
  country: string;
  state?: string;
}

// Enhanced location search with Ghana-specific improvements
export const searchLocation = async (query: string): Promise<LocationCoords[]> => {
  try {
    // First, try searching with Ghana as country context
    let searchQuery = query.trim();
    
    // Add Ghana context if not already specified
    if (!searchQuery.toLowerCase().includes('ghana') && !searchQuery.toLowerCase().includes('gh')) {
      searchQuery = `${searchQuery}, Ghana`;
    }

    const { data, error } = await supabase.functions.invoke('get-location', {
      body: { query: searchQuery, limit: 10 }
    });

    if (error) {
      throw new Error(`Failed to search location: ${error.message}`);
    }
    
    // Filter and prioritize Ghana locations
    const ghanaLocations = data.filter((item: any) => 
      item.country === 'GH' || item.country === 'Ghana'
    );
    
    // If we have Ghana locations, prioritize them
    const locations = ghanaLocations.length > 0 ? ghanaLocations : data;
    
    return locations.map((item: any) => ({
      lat: item.lat,
      lon: item.lon,
      name: formatLocationName(item),
      country: item.country,
      state: item.state
    })).slice(0, 5); // Limit to 5 results
    
  } catch (error) {
    console.error('Error searching location:', error);
    
    // Fallback: try searching without Ghana context
    try {
      const { data: fallbackData, error: fallbackError } = await supabase.functions.invoke('get-location', {
        body: { query, limit: 5 }
      });
      
      if (!fallbackError) {
        return fallbackData.map((item: any) => ({
          lat: item.lat,
          lon: item.lon,
          name: formatLocationName(item),
          country: item.country,
          state: item.state
        }));
      }
    } catch (fallbackError) {
      console.error('Fallback search also failed:', fallbackError);
    }
    
    throw error;
  }
};

// Helper function to format location names nicely
const formatLocationName = (item: any): string => {
  let name = item.name;
  
  // Add region/state if available and different from name
  if (item.state && item.state !== item.name) {
    name += `, ${item.state}`;
  }
  
  // Add country for non-Ghana locations
  if (item.country !== 'GH' && item.country !== 'Ghana') {
    name += `, ${getCountryName(item.country)}`;
  } else {
    name += ', Ghana';
  }
  
  return name;
};

// Helper function to get full country names
const getCountryName = (countryCode: string): string => {
  const countryNames: { [key: string]: string } = {
    'GH': 'Ghana',
    'NG': 'Nigeria',
    'CI': 'Côte d\'Ivoire',
    'BF': 'Burkina Faso',
    'TG': 'Togo',
    'ML': 'Mali',
    'US': 'United States',
    'GB': 'United Kingdom',
    // Add more as needed
  };
  
  return countryNames[countryCode] || countryCode;
};

// Enhanced weather data fetching
export const getCurrentWeather = async (lat: number, lon: number): Promise<WeatherData> => {
  try {
    const { data, error } = await supabase.functions.invoke('get-weather', {
      body: { lat, lon }
    });

    if (error) {
      throw new Error(`Failed to fetch weather data: ${error.message}`);
    }

    const weatherData = data;
    
    // Calculate UV index estimation (since UV endpoint may not be available)
    let uvIndex = Math.round((weatherData.main.temp / 30) * 11);

    return {
      location: formatWeatherLocation(weatherData),
      temperature: Math.round(weatherData.main.temp),
      feelsLike: Math.round(weatherData.main.feels_like),
      description: capitalizeFirstLetter(weatherData.weather[0].description),
      humidity: weatherData.main.humidity,
      windSpeed: Math.round(weatherData.wind.speed * 3.6), // Convert m/s to km/h
      rainChance: calculateRainChance(weatherData),
      icon: weatherData.weather[0].icon,
      soilMoisture: calculateSoilMoisture(weatherData),
      uvIndex: Math.max(0, Math.min(11, uvIndex)),
      pressure: weatherData.main.pressure,
      visibility: weatherData.visibility ? Math.round(weatherData.visibility / 1000) : 10, // Convert to km
      dewPoint: Math.round(weatherData.main.temp - ((100 - weatherData.main.humidity) / 5))
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

// Enhanced forecast data
export const getWeatherForecast = async (lat: number, lon: number): Promise<ForecastData[]> => {
  try {
    const { data, error } = await supabase.functions.invoke('get-forecast', {
      body: { lat, lon }
    });

    if (error) {
      throw new Error(`Failed to fetch forecast data: ${error.message}`);
    }
    
    // Group forecasts by day and get daily min/max temperatures
    const dailyForecasts = new Map<string, any[]>();
    
    data.list.forEach((item: any) => {
      const date = new Date(item.dt * 1000);
      const dateString = date.toDateString();
      
      if (!dailyForecasts.has(dateString)) {
        dailyForecasts.set(dateString, []);
      }
      
      dailyForecasts.get(dateString)!.push(item);
    });

    const result: ForecastData[] = [];
    
    // Process each day (limit to 7 days)
    for (const [dateString, dayItems] of Array.from(dailyForecasts.entries()).slice(0, 7)) {
      const temps = dayItems.map(item => item.main.temp);
      const humidities = dayItems.map(item => item.main.humidity);
      const windSpeeds = dayItems.map(item => item.wind.speed);
      
      // Find the item closest to midday for representative weather
      const middayItem = dayItems.reduce((closest, current) => {
        const currentHour = new Date(current.dt * 1000).getHours();
        const closestHour = new Date(closest.dt * 1000).getHours();
        
        return Math.abs(currentHour - 12) < Math.abs(closestHour - 12) ? current : closest;
      });

      result.push({
        date: dateString,
        temperature: Math.round(middayItem.main.temp),
        minTemp: Math.round(Math.min(...temps)),
        maxTemp: Math.round(Math.max(...temps)),
        description: capitalizeFirstLetter(middayItem.weather[0].description),
        icon: middayItem.weather[0].icon,
        humidity: Math.round(humidities.reduce((a, b) => a + b) / humidities.length),
        windSpeed: Math.round((windSpeeds.reduce((a, b) => a + b) / windSpeeds.length) * 3.6),
        rainChance: calculateRainChance(middayItem)
      });
    }

    return result;
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    throw error;
  }
};

// Helper functions
const formatWeatherLocation = (weatherData: any): string => {
  return `${weatherData.name}, ${weatherData.sys.country === 'GH' ? 'Ghana' : weatherData.sys.country}`;
};

const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const calculateRainChance = (weatherData: any): number => {
  // More accurate rain chance calculation
  const clouds = weatherData.clouds?.all || 0;
  const weatherId = weatherData.weather[0].id;
  
  // Weather IDs for rain/precipitation
  if (weatherId >= 200 && weatherId < 300) return 90; // Thunderstorm
  if (weatherId >= 300 && weatherId < 400) return 70; // Drizzle
  if (weatherId >= 500 && weatherId < 600) return 85; // Rain
  if (weatherId >= 600 && weatherId < 700) return 80; // Snow
  
  // Base on cloudiness
  if (clouds > 80) return 60;
  if (clouds > 60) return 40;
  if (clouds > 30) return 20;
  
  return 10;
};

const calculateSoilMoisture = (weatherData: any): number => {
  // Estimate soil moisture based on humidity, recent rain, and temperature
  const humidity = weatherData.main.humidity;
  const temp = weatherData.main.temp;
  const weatherId = weatherData.weather[0].id;
  
  let baseMoisture = Math.round(humidity * 0.6);
  
  // Adjust based on weather conditions
  if (weatherId >= 200 && weatherId < 600) {
    baseMoisture += 20; // Recent precipitation
  }
  
  // Adjust for temperature (higher temp = more evaporation)
  if (temp > 30) {
    baseMoisture -= 10;
  } else if (temp < 20) {
    baseMoisture += 5;
  }
  
  return Math.max(0, Math.min(100, baseMoisture));
};

// Ghana-specific weather utilities
export const getGhanaRegionWeather = async (region: string): Promise<WeatherData[]> => {
  const regionCities: { [key: string]: { lat: number, lon: number, name: string }[] } = {
    'Greater Accra': [
      { lat: 5.6037, lon: -0.1870, name: 'Accra' },
      { lat: 5.6500, lon: -0.0833, name: 'Tema' }
    ],
    'Ashanti': [
      { lat: 6.6885, lon: -1.6244, name: 'Kumasi' },
      { lat: 6.7500, lon: -1.2833, name: 'Ejisu' }
    ],
    'Northern': [
      { lat: 9.4034, lon: -0.8424, name: 'Tamale' },
      { lat: 10.7889, lon: -0.8393, name: 'Bolgatanga' }
    ],
    'Volta': [
      { lat: 6.1022, lon: 0.2486, name: 'Ho' },
      { lat: 6.5833, lon: 0.0833, name: 'Keta' }
    ]
  };
  
  const cities = regionCities[region] || [];
  const weatherPromises = cities.map(city => 
    getCurrentWeather(city.lat, city.lon).catch(error => {
      console.error(`Failed to fetch weather for ${city.name}:`, error);
      return null;
    })
  );
  
  const results = await Promise.all(weatherPromises);
  return results.filter(result => result !== null) as WeatherData[];
};

export const getWeatherIcon = (iconCode: string): string => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

// Agricultural-specific weather insights
export interface AgricultureInsight {
  type: 'irrigation' | 'planting' | 'harvesting' | 'pest_control' | 'fertilizing';
  priority: 'low' | 'medium' | 'high';
  title: string;
  description: string;
  recommendation: string;
}

export const getAgricultureInsights = (weather: WeatherData, forecast: ForecastData[]): AgricultureInsight[] => {
  const insights: AgricultureInsight[] = [];
  
  // Check for irrigation needs
  if (weather.rainChance < 30 && weather.humidity < 60) {
    insights.push({
      type: 'irrigation',
      priority: 'high',
      title: 'Irrigation Recommended',
      description: `Low rain chance (${weather.rainChance}%) and humidity (${weather.humidity}%)`,
      recommendation: 'Consider irrigating crops, especially during early morning or evening hours.'
    });
  }
  
  // Check for pest control timing
  if (weather.humidity > 80 && weather.temperature > 25) {
    insights.push({
      type: 'pest_control',
      priority: 'medium',
      title: 'Monitor for Pests',
      description: 'High humidity and warm temperatures favor pest development',
      recommendation: 'Increase pest monitoring and consider preventive treatments.'
    });
  }
  
  // Check upcoming rain for planting
  const upcomingRain = forecast.slice(0, 3).some(day => day.rainChance > 60);
  if (upcomingRain && weather.rainChance < 40) {
    insights.push({
      type: 'planting',
      priority: 'medium',
      title: 'Good Planting Window',
      description: 'Rain expected in the coming days with current dry conditions',
      recommendation: 'Consider planting now to take advantage of upcoming rainfall.'
    });
  }
  
  return insights;
};