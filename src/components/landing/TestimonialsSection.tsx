
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Kofi Mensah",
      location: "Ashanti Region",
      role: "Maize Farmer",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      quote: "Since using AgriAI, my maize yields have increased by 40%. The weather alerts have saved my crops multiple times during unexpected rains. I'm now able to provide better for my family.",
      stars: 5
    },
    {
      name: "Ama Darko",
      location: "Eastern Region",
      role: "Vegetable Grower",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      quote: "The marketplace feature has connected me with buyers who pay fair prices. I no longer have to sell at low prices to middlemen. My income has doubled in just six months.",
      stars: 5
    },
    {
      name: "Kwame Owusu",
      location: "Central Region",
      role: "Cassava Farmer",
      image: "https://randomuser.me/api/portraits/men/62.jpg", 
      quote: "The transport booking system has solved my biggest challenge - getting my produce to market. Now I can find reliable trucks with just a few clicks. No more waiting days for transport.",
      stars: 5
    },
    {
      name: "Grace Amoah",
      location: "Volta Region",
      role: "Rice Farmer",
      image: "https://randomuser.me/api/portraits/women/58.jpg",
      quote: "The knowledge hub has taught me new rice farming techniques that are more resistant to changing weather patterns. My crops are now more resilient and my yields are much higher.",
      stars: 5
    },
    {
      name: "Ibrahim Yakubu",
      location: "Northern Region",
      role: "Sorghum Farmer",
      image: "https://randomuser.me/api/portraits/men/77.jpg",
      quote: "AgriAI's soil analysis feature helped me understand why my yields were declining. With their recommendations, I've restored my soil's health and my harvests are better than ever.",
      stars: 4
    }
  ];

  const renderStars = (count: number) => {
    return Array(count).fill(0).map((_, i) => (
      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
    ));
  };

  return (
    <section id="testimonials" className="py-20 bg-wheat-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-leaf-100 text-leaf-700 font-medium text-sm mb-5">Success Stories</span>
          <h2 className="text-3xl font-bold mb-4 text-soil-800">Hear from Our Farmers</h2>
          <p className="text-xl text-soil-700 max-w-2xl mx-auto">
            Discover how AgriAI-Ghana is transforming agriculture across the country.
          </p>
        </div>

        <div className="mb-12">
          <Carousel className="mx-auto max-w-5xl">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                  <Card className="border-none bg-white shadow-md h-full">
                    <CardContent className="pt-6 h-full flex flex-col">
                      <div className="flex items-center gap-2 mb-2">
                        {renderStars(testimonial.stars)}
                      </div>
                      <div className="relative mb-6 flex-grow">
                        <Quote className="h-8 w-8 text-leaf-200 absolute -top-2 -left-2 opacity-50" />
                        <p className="italic text-soil-700 relative z-10">{testimonial.quote}</p>
                      </div>
                      <div className="flex items-center mt-auto">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name} 
                          className="w-12 h-12 rounded-full mr-4"
                        />
                        <div>
                          <p className="font-semibold text-soil-800">{testimonial.name}</p>
                          <p className="text-sm text-soil-600">{testimonial.role}, {testimonial.location}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="left-0 -translate-x-1/2" />
              <CarouselNext className="right-0 translate-x-1/2" />
            </div>
          </Carousel>
        </div>

        <div className="bg-leaf-600 rounded-xl text-white p-8 md:p-12 text-center max-w-3xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Join 10,000+ Farmers Already Growing with AgriAI</h3>
          <p className="text-lg mb-8 text-white/90">Start transforming your farming practices today</p>
          <button 
            className="bg-white text-leaf-700 font-medium px-6 py-3 rounded-lg hover:bg-wheat-100 transition-colors"
            onClick={() => document.getElementById('auth-section')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get Started For Free
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
