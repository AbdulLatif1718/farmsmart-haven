import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { corsHeaders } from '../_shared/cors.ts'

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { lat, lon } = await req.json()
    
    if (!lat || !lon) {
      return new Response(
        JSON.stringify({ error: 'Latitude and longitude are required' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    const apiKey = Deno.env.get('OPENWEATHER_API_KEY')
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'Weather API key not configured' }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    )

    if (!weatherResponse.ok) {
      return new Response(
        JSON.stringify({ error: 'Failed to fetch weather data' }),
        { 
          status: weatherResponse.status,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    const weatherData = await weatherResponse.json()

    return new Response(
      JSON.stringify(weatherData),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})