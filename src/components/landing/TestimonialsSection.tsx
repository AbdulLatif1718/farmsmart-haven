
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Kwame Asante",
      location: "Ghana",
      role: "Youth Farmer",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      quote: "AgriVerse Africa gave me funding and smart tools. My cassava farm now feeds 500 families and generates 40% more income.",
      stars: 5
    },
    {
      name: "Fatima Ibrahim",
      location: "Nigeria",
      role: "Tech Investor",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      quote: "I invested in 10 farms through AgriVerse and achieved 120% ROI while supporting local communities. Amazing impact!",
      stars: 5
    },
    {
      name: "Joseph Mensah",
      location: "Kenya",
      role: "Agritech Partner",
      image: "https://randomuser.me/api/portraits/men/62.jpg", 
      quote: "Our partnership with AgriVerse expanded our reach across 15 countries. Innovation meets impact at scale.",
      stars: 5
    }
  ];

  const renderStars = (count: number) => {
    return Array(count).fill(0).map((_, i) => (
      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
    ));
  };

  return (
    <section id="testimonials" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-5">Success Stories</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">Success <span className="text-primary">Stories</span></h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real people, real impact. See how AgriVerse Africa is transforming lives across the continent.
          </p>
        </div>

        <div className="mb-12">
          <Carousel className="mx-auto max-w-5xl">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                 <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                   <Card className="border border-border bg-card shadow-lg h-full">
                     <CardContent className="pt-6 h-full flex flex-col">
                       <div className="flex items-center gap-2 mb-2">
                         {renderStars(testimonial.stars)}
                       </div>
                       <div className="relative mb-6 flex-grow">
                         <Quote className="h-8 w-8 text-primary/20 absolute -top-2 -left-2 opacity-50" />
                         <p className="italic text-card-foreground relative z-10">{testimonial.quote}</p>
                       </div>
                       <div className="flex items-center mt-auto">
                         <img 
                           src={testimonial.image} 
                           alt={testimonial.name} 
                           className="w-12 h-12 rounded-full mr-4 border-2 border-primary/20"
                         />
                         <div>
                           <p className="font-semibold text-card-foreground">{testimonial.name}</p>
                           <p className="text-sm text-primary font-medium">{testimonial.role}</p>
                           <p className="text-xs text-muted-foreground">{testimonial.location}</p>
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

        <div className="bg-card rounded-xl border border-border p-8 md:p-12 text-center max-w-3xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-card-foreground">Ready to Write Your Success Story?</h3>
          <p className="text-lg mb-8 text-muted-foreground">Join thousands of people transforming African agriculture</p>
          <button 
            className="bg-primary text-primary-foreground font-medium px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            onClick={() => document.getElementById('auth-section')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Start Your Journey Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
