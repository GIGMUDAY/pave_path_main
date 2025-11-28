'use client';

import TestimonialSlider from '@/components/ui/TestimonialSlider';

export default function Testimonials() {
  const testimonials = [
    {
      quote: "PavePath Design asked me to dream. No consultant had ever asked me to do that before. With that question, PavePath Design helped more than this project; they helped all of Orange County's incident response team.",
      name: "Adel W. Malek",
      role: "California DOT (Caltrans), District 12"
    },
    {
      quote: "Too often the highest visions do not come fully to life. This one does. I have worked with active transportation in 4,700 communities in North America rating streets for their support of safety, comfort, performance, and welcoming features. I was able to visit and evaluate [the Central Avenue] project in mid-April following its completion. Of the now tens of thousands of roadways I have evaluated, I now consider this the best remade street in North America…including narrow traffic lanes (now down to 10 feet), buffered bike lanes, inset parking, the most perfect driveway entry I have come across ever, the well-designed roundabouts, the lane dedications crossing the Tamiami Trail, among many others.",
      name: "Dan Burden",
      role: "Blue Zones, LLC"
    },
    {
      quote: "Regardless of project type, all PavePath Design projects are managed as a team effort and all member firms of the team are fully integrated into the overall delivery plan. When working on a PavePath Design project, your professional approach to project delivery makes us feel as if we are the surveying and mapping department situated just down the hall from the planning and design groups. We've enjoyed partnering with you for the past five years and look forward to working together for many years to come.",
      name: "David \"Charlie\" Rice",
      role: "Rice Associates, Inc."
    },
    {
      quote: "Having worked with PavePath Design professionals from multiple offices, I have been impressed with the consistency and professionalism of the PavePath Design team. Regardless of which office I call, I can rely on you to deliver. It's been great partnering with you and I look forward to opportunities to work together again.",
      name: "Chris Beynon",
      role: "MIG, Inc."
    }
  ];

  return (
    <section className="py-16 bg-white pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TestimonialSlider 
          testimonials={testimonials}
          autoRotate={true}
          duration={5}
        />
      </div>
    </section>
  );
}
