import React, { memo, useState } from 'react';
import { HeroSection } from './HeroSection';
import { WelcomeGrid } from './WelcomeGrid';
import { StrategyCards } from './StrategyCards';
import { WelcomeVideo } from './WelcomeVideo';
import { WhatToExpect } from './WhatToExpect';
import { AltarCallCTA } from './AltarCallCTA';

// Import ang shared centralized modal
import { PlanVisitModal } from '../../../shared/components/planVisit/PlanVisitModal';

export const Home: React.FC = memo(() => {
  const [isPlanVisitOpen, setIsPlanVisitOpen] = useState(false);

  return (
    <div className="bg-transparent flex flex-col w-full relative z-10 overflow-hidden">
      <HeroSection />
      <WelcomeGrid />
      <StrategyCards />
      <WelcomeVideo />
      <WhatToExpect />

      {/* "THE ALTAR CALL" — Split-Verse Editorial CTA */}
      <AltarCallCTA onOpenVisitModal={() => setIsPlanVisitOpen(true)} />

      {/* COMPANION ENGINE MODAL */}
      <PlanVisitModal
        isOpen={isPlanVisitOpen}
        onClose={() => setIsPlanVisitOpen(false)}
      />
    </div>
  );
});

Home.displayName = "Home";