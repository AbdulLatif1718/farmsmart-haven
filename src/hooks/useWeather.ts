import { useState, useEffect } from 'react';
import { WeatherData, ForecastData, getCurrentWeather, getWeatherForecast } from '@/services/weatherService';

interface UseWeatherResult {
  weather: WeatherData | null;
  forecast: ForecastData[];
  loading: boolean;
  error: string | null;
  refreshWeather: () => void;
}

export const useWeather = (lat?: number, lon?: number): UseWeatherResult => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = async () => {
    if (!lat || !lon) return;

    setLoading(true);
    setError(null);

    try {
      const [weatherData, forecastData] = await Promise.all([
        getCurrentWeather(lat, lon),
        getWeatherForecast(lat, lon)
      ]);

      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, [lat, lon]);

  const refreshWeather = () => {
    fetchWeatherData();
  };

  return {
    weather,
    forecast,
    loading,
    error,
    refreshWeather
  };
};