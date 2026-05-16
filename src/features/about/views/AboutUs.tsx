import React, { memo } from 'react';
import { Manifesto } from './Manifesto';
import { AlterOne } from './alterone';
import { AlterTwo } from './altertwo';

export const AboutUs: React.FC = memo(() => {
  return (
    <div className="bg-transparent flex flex-col w-full relative z-10 overflow-hidden">
      <Manifesto />
      <AlterOne />
      <AlterTwo />
    </div>
  );
});

AboutUs.displayName = "AboutUs";
