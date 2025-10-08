import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversationHistory } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const systemPrompt = `You are an expert agricultural investment advisor for Ghana and West Africa. Your role is to:

1. Help new investors understand agricultural investments
2. Explain different project types (crop farming, livestock, processing)
3. Provide insights on market trends and seasonal patterns
4. Assess investment risks and opportunities
5. Recommend suitable projects based on risk tolerance
6. Educate about Ghana's agricultural sectors

Guidelines:
- Be friendly, educational, and encouraging
- Use Ghanaian cedi (GH₵) for currency
- Reference local crops: maize, cassava, yam, rice, cocoa, etc.
- Discuss seasonal farming cycles in Ghana
- Explain ROI expectations realistically (15-45% typical range)
- Mention risk factors: weather, market prices, farm management
- Encourage diversification across different projects
- Keep responses concise and actionable

Current context: You're assisting an investor on the AgriVerse Africa platform.`;

    const messages = [
      { role: "system", content: systemPrompt },
      ...(conversationHistory || []).slice(-10), // Keep last 10 messages for context
      { role: "user", content: message }
    ];

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages,
        temperature: 0.7,
        max_tokens: 800
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content || "I apologize, but I couldn't generate a response. Please try again.";

    return new Response(
      JSON.stringify({ response: aiResponse }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  } catch (error) {
    console.error('Error in investor-ai-assistant:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});
