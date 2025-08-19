const OPENWEATHER_API_KEY = '62e9fc4280bd6068531b09621a74a9b0';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export interface WeatherData {
  location: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  rainChance: number;
  icon: string;
  soilMoisture?: number;
}

export interface ForecastData {
  date: string;
  temperature: number;
  description: string;
  icon: string;
}

export interface LocationCoords {
  lat: number;
  lon: number;
  name: string;
}

export const searchLocation = async (query: string): Promise<LocationCoords[]> => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${OPENWEATHER_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to search location');
    }
    
    const data = await response.json();
    return data.map((item: any) => ({
      lat: item.lat,
      lon: item.lon,
      name: `${item.name}${item.state ? `, ${item.state}` : ''}, ${item.country}`
    }));
  } catch (error) {
    console.error('Error searching location:', error);
    throw error;
  }
};

export const getCurrentWeather = async (lat: number, lon: number): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    
    const data = await response.json();
    
    return {
      location: data.name,
      temperature: Math.round(data.main.temp),
      description: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
      rainChance: data.clouds.all, // Using cloudiness as rain probability
      icon: data.weather[0].icon,
      soilMoisture: Math.round(data.main.humidity * 0.6) // Estimate based on humidity
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export const getWeatherForecast = async (lat: number, lon: number): Promise<ForecastData[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch forecast data');
    }
    
    const data = await response.json();
    
    // Get one forecast per day for the next 7 days
    const dailyForecasts: ForecastData[] = [];
    const processedDates = new Set();
    
    data.list.forEach((item: any) => {
      const date = new Date(item.dt * 1000);
      const dateString = date.toDateString();
      
      if (!processedDates.has(dateString) && dailyForecasts.length < 7) {
        processedDates.add(dateString);
        dailyForecasts.push({
          date: dateString,
          temperature: Math.round(item.main.temp),
          description: item.weather[0].description,
          icon: item.weather[0].icon
        });
      }
    });
    
    return dailyForecasts;
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    throw error;
  }
};

export const getWeatherIcon = (iconCode: string): string => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};