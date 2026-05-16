import React from 'react';
import { Contact } from '../../contact/views/Contact';
import { Serve } from './Serve';

export const Engage: React.FC = () => {
  return (
    <div className="flex flex-col w-full bg-background-dark min-h-screen">
      {/* 
        This is the main container for the /engage route.
        It stacks the Serve component and the Contact component.
        Since they both have their own IDs, anchor links like /engage#serve 
        and /engage#contact will work out of the box with the SmoothScroller.
      */}

      {/* 1. Serve Opportunities Component */}
      <Serve />

      {/* Gradient bridge: blends Serve's #0C0515 into Contact's #180D24 */}
      <div
        className="w-full h-32 sm:h-40 md:h-48 relative z-10"
        style={{ background: 'linear-gradient(to bottom, #0C0515, #180D24)' }}
      />

      {/* 2. Contact Component */}
      {/* <Contact />*/}

    </div>
  );
};
