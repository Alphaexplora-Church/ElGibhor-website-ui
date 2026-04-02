import React, { memo } from 'react';
import { Manifesto } from './Manifesto';
import { LeadershipSection } from './LeadershipSection';
import { DaughterChurchesSection } from './DaughterChurchesSection';

export const AboutUs: React.FC = memo(() => {
  return (
    <div className="bg-transparent flex flex-col w-full relative z-10 overflow-hidden pt-24">
      <Manifesto />
      <LeadershipSection />
      <DaughterChurchesSection />
    </div>
  );
});

AboutUs.displayName = "AboutUs";
