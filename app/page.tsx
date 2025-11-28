import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Markets from '@/components/Markets';
import Solutions from '@/components/Solutions';
import Testimonials from '@/components/Testimonials';
import JoinTeam from '@/components/JoinTeam';
import InternationalForm from '@/components/InternationalForm';
import Footer from '@/components/Footer';
import Balatro from '@/components/ui/Balatro';

export default function Home() {
  return (
    <div className="min-h-screen bg-white relative">
      <Balatro 
        color1="#1D4E89"
        color2="#4CB276"
        color3="#162325"
        spinRotation={-2.0}
        spinSpeed={7.0}
        contrast={3.5}
        lighting={0.4}
        mouseInteraction={true}
      />
      <div className="relative z-10">
        <Navigation />
        <Hero />
        <Markets />
        <Solutions />
        <Testimonials />
        <JoinTeam />
        <InternationalForm />
        <Footer />
      </div>
    </div>
  );
}
