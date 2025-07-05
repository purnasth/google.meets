import React, { useEffect } from 'react';
import LoaderAnimation from './LoaderAnimation';

const GOOGLE_MEET_URL = import.meta.env.VITE_GOOGLE_MEET_URL as string;

const redirectText = 'Redirecting To Google Meets ....';

const GoogleMeetRedirect: React.FC = () => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      window.location.href = GOOGLE_MEET_URL;
    }, 2500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <main className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-neutral-100 select-none">
      <LoaderAnimation />
      <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center">
        <h1 className="mt-16 flex items-center justify-center text-xl font-bold tracking-widest text-neutral-900 uppercase sm:text-2xl">
          <span className="inline-block">
            {redirectText.split('').map((char, i) => (
              <span
                key={i}
                className="animate-fade-in inline-block opacity-0"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </span>
        </h1>
      </div>
      {/* Tailwind custom keyframes for animation */}
      <style>{`
        @keyframes speeder {
          0% { transform: translate(2px, 1px) rotate(0deg); }
          10% { transform: translate(-1px, -3px) rotate(-1deg); }
          20% { transform: translate(-2px, 0px) rotate(1deg); }
          30% { transform: translate(1px, 2px) rotate(0deg); }
          40% { transform: translate(1px, -1px) rotate(1deg); }
          50% { transform: translate(-1px, 3px) rotate(-1deg); }
          60% { transform: translate(-1px, 1px) rotate(0deg); }
          70% { transform: translate(3px, 1px) rotate(-1deg); }
          80% { transform: translate(-2px, -1px) rotate(1deg); }
          90% { transform: translate(2px, 1px) rotate(0deg); }
          100% { transform: translate(1px, -2px) rotate(-1deg); }
        }
        @keyframes fazer1 { 0% { left: 0; } 100% { left: -80px; opacity: 0; } }
        @keyframes fazer2 { 0% { left: 0; } 100% { left: -100px; opacity: 0; } }
        @keyframes fazer3 { 0% { left: 0; } 100% { left: -50px; opacity: 0; } }
        @keyframes fazer4 { 0% { left: 0; } 100% { left: -150px; opacity: 0; } }
        @keyframes lf { 0% { left: 200%; } 100% { left: -200%; opacity: 0; } }
        @keyframes lf2 { 0% { left: 200%; } 100% { left: -200%; opacity: 0; } }
        @keyframes lf3 { 0% { left: 200%; } 100% { left: -100%; opacity: 0; } }
        @keyframes lf4 { 0% { left: 200%; } 100% { left: -100%; opacity: 0; } }
        @keyframes fade-in { to { opacity: 1; transform: none; } }
        .animate-fade-in { animation: fade-in 1s cubic-bezier(0.23, 1, 0.32, 1) forwards; }
      `}</style>
    </main>
  );
};

export default GoogleMeetRedirect;
