
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Kofi Mensah",
      location: "Ashanti Region",
      quote: "Since using AgriAI, my maize yields have increased by 40%. The weather alerts have saved my crops multiple times during unexpected rains."
    },
    {
      name: "Ama Darko",
      location: "Eastern Region",
      quote: "The marketplace feature has connected me with buyers who pay fair prices. I no longer have to sell at low prices to middlemen."
    },
    {
      name: "Kwame Owusu",
      location: "Central Region",
      quote: "The transport booking system has solved my biggest challenge - getting my produce to market. Now I can find reliable trucks with just a few clicks."
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-wheat-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 text-soil-800">Hear from Our Farmers</h2>
          <p className="text-xl text-soil-700 max-w-2xl mx-auto">
            Discover how AgriAI-Ghana is transforming agriculture across the country.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-none bg-white shadow-md">
              <CardContent className="pt-6">
                <p className="mb-6 italic text-soil-700">&ldquo;{testimonial.quote}&rdquo;</p>
                <div>
                  <p className="font-semibold text-soil-800">{testimonial.name}</p>
                  <p className="text-sm text-soil-600">{testimonial.location}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
