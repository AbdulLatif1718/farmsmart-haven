import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { corsHeaders } from '../_shared/cors.ts'

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { query, limit = 5 } = await req.json()
    
    if (!query) {
      return new Response(
        JSON.stringify({ error: 'Query parameter is required' }),
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

    const locationResponse = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=${limit}&appid=${apiKey}`
    )

    if (!locationResponse.ok) {
      return new Response(
        JSON.stringify({ error: 'Failed to fetch location data' }),
        { 
          status: locationResponse.status,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    const locationData = await locationResponse.json()

    return new Response(
      JSON.stringify(locationData),
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