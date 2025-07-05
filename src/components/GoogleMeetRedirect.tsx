import React from 'react';
import LoaderAnimation from './LoaderAnimation';
import { GOOGLE_MEET_URL } from '../constants/env';
import { LOADER_DURATION } from '../constants/loader';
import { useRedirect } from '../hooks/useRedirect';

import purna from '../assets/hero.webp';
import meets from '../assets/meets.svg';
import Gradient from './ui/Gradient';

const GoogleMeetRedirect: React.FC = () => {
  useRedirect(GOOGLE_MEET_URL, LOADER_DURATION);

  return (
    <main className="flex h-svh w-full flex-col items-center justify-start overflow-hidden bg-white py-12">
      <div className="container flex max-w-4xl flex-col items-center justify-start gap-2 text-center text-blue-50">
        <div className="relative inline-flex items-center justify-center gap-2 rounded-full border border-gray-600/30 px-4 py-1 text-xs font-medium tracking-wide text-gray-700 shadow-sm backdrop-blur sm:text-sm md:text-sm">
          <div className="animate-progress-stripes absolute inset-0 h-full w-full bg-[linear-gradient(135deg,rgba(255,255,255,0.25)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.25)_50%,rgba(255,255,255,0.25)_75%,transparent_75%,transparent)] bg-[length:32px_32px]" />
          <img
            src={meets}
            alt="Google Meet Icon"
            className="size-4 object-contain"
          />
          <span>Redirecting to Google Meet</span>
        </div>
        <h1 className="mt-4 text-2xl leading-snug font-bold capitalize mix-blend-difference md:text-4xl md:leading-snug lg:text-5xl lg:leading-snug">
          Welcome to Meet with Purna!
        </h1>
        <p className="font-body max-w-xl text-sm opacity-80 mix-blend-difference sm:text-sm md:text-base md:opacity-60">
          You're about to join a Google Meet with Purna. Please get comfortable
          and we'll take you there in just a moment. Grab your coffee, fix your
          hair, and get ready for some virtual magic.
        </p>
      </div>

      {/* <img
        src={purna}
        alt="Purna's Meeting Portal"
        className="absolute inset-0 h-full w-auto mx-auto object-cover opacity-10 blur-sm brightness-50"
      /> */}

      <LoaderAnimation />
      <div className="absolute inset-0 z-0 flex items-center justify-center md:-z-10">
        <img
          src={purna}
          alt="Purna's Meeting Portal"
          className="mx-auto mt-auto h-96 w-auto object-cover opacity-100 mix-blend-color md:h-[75%]"
        />
      </div>

      <Gradient />
    </main>
  );
};

export default GoogleMeetRedirect;
