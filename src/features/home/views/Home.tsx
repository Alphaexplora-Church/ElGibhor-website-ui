import React, { memo } from 'react';
import { HeroSection } from './HeroSection';
import { WelcomeGrid } from './WelcomeGrid';
import { StrategyCards } from './StrategyCards';
import { WelcomeVideo } from './WelcomeVideo';
import { WhatToExpect } from './WhatToExpect';
import { PlanVisitForm } from './PlanVisitForm';
import { FooterCTA } from './FooterCTA';

export const Home: React.FC = memo(() => {
  return (
    <div className="bg-transparent flex flex-col w-full relative z-10 overflow-hidden">
      <HeroSection />
      <WelcomeGrid />
      <StrategyCards />
      <WelcomeVideo />
      <WhatToExpect />
      <PlanVisitForm />

    </div>
  );
});

Home.displayName = "Home";