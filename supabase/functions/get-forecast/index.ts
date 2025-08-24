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

    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    )

    if (!forecastResponse.ok) {
      return new Response(
        JSON.stringify({ error: 'Failed to fetch forecast data' }),
        { 
          status: forecastResponse.status,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    const forecastData = await forecastResponse.json()

    return new Response(
      JSON.stringify(forecastData),
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