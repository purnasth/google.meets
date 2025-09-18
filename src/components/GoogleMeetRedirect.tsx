import React from 'react';
// import { MdPhone } from 'react-icons/md';

import purna from '../assets/hero.webp';
import meets from '../assets/meets.svg';
import { GOOGLE_MEET_URL } from '../constants/env';
import { LOADER_DURATION } from '../constants/loader';

import Gradient from './ui/Gradient';
import LoaderAnimation from './LoaderAnimation';

import { useRedirect } from '../hooks/useRedirect';


const GoogleMeetRedirect: React.FC = () => {
  useRedirect(GOOGLE_MEET_URL, LOADER_DURATION);

  return (
    <main className="flex h-svh w-full flex-col items-center justify-center overflow-hidden bg-[#f8f2f8] py-12 text-black">
      <div className="container flex flex-col items-center justify-start gap-2 text-center">
        <div className="relative -mb-2 inline-flex items-center justify-center gap-2 rounded-full border border-black/20 bg-white px-4 py-1 text-[0.65rem] font-medium tracking-wider text-gray-700 uppercase backdrop-blur sm:text-sm md:text-sm">
          <div className="animate-progress-stripes absolute inset-0 h-full w-full bg-[linear-gradient(135deg,rgba(255,255,255,0.25)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.25)_50%,rgba(255,255,255,0.25)_75%,transparent_75%,transparent)] bg-[length:32px_32px]" />
          <img
            src={meets}
            alt="Google Meet Icon"
            className="size-2.5 object-contain sm:size-4"
          />
          <span>Redirecting to Google Meet</span>
        </div>
        <h1 className="mt-4 text-3xl font-bold uppercase md:text-4xl lg:text-8xl lg:leading-tight">
          Welcome to
          <br />
          <strong className="[animation:var(--animate-google-gradient)] [background-image:var(--google-gradient)] [background-size:200%_200%] bg-clip-text text-5xl font-bold text-transparent lg:text-9xl">
            Meet with Purna!
          </strong>
        </h1>
        {/* <p className="font-body max-w-md text-sm opacity-80 sm:text-sm md:text-sm md:opacity-60">
          You're about to join a Google Meet with Purna. Please get comfortable
          and we'll take you there in just a moment. Grab your coffee, fix your
          hair, and get ready for some virtual magic.
        </p> */}
      </div>

      <div className="mt-16">
        <img
          src={purna}
          alt="Purna's Meeting Portal"
          className="mx-auto size-72 rounded-[20%] border-6 border-white bg-white/60 object-cover object-center shadow-xl"
        />
        {/* <p className="mx-2 mt-4 rounded-3xl bg-black px-4 py-2 text-center text-lg font-normal tracking-wider text-white/80 uppercase shadow">
          <MdPhone className="-mt-1 mr-2 inline size-5" />
          Call Directly
        </p> */}
      </div>

      <LoaderAnimation />

      <Gradient />
    </main>
  );
};

export default GoogleMeetRedirect;
