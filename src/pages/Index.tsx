import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { WhatWeDo } from '@/components/WhatWeDo';
import { EngineerFocus } from '@/components/EngineerFocus';
import { WhyPavePath } from '@/components/WhyPavePath';
import { HowItWorks } from '@/components/HowItWorks';
import { WorkflowCTA } from '@/components/WorkflowCTA';
import { Services } from '@/components/Services';
// import { Industries } from '@/components/Industries';
import { EngagementModels } from '@/components/EngagementModels';
import { CaseScenarios } from '@/components/CaseScenarios';
import { About, MissionBanner } from '@/components/About';
import { Blog } from '@/components/Blog';
import { CTA } from '@/components/CTA';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <WhatWeDo />
        <EngineerFocus />
        <WhyPavePath />
        <HowItWorks />
        <Services />
        <WorkflowCTA />
        {/* <Industries /> */}
        <EngagementModels />
        <About />
        <MissionBanner />
        <CaseScenarios />
        <Blog />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
