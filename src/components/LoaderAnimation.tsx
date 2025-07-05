import React from 'react';
import { useProgress } from '../hooks/useProgress';
import { meetColors, LOADER_DURATION, LOADER_STEPS } from '../constants/loader';

const LoaderAnimation: React.FC = () => {
  const progress = useProgress(LOADER_DURATION, LOADER_STEPS);

  return (
    <div className="fixed top-0 z-50 w-full">
      <div
        className="relative h-2 w-full overflow-hidden bg-gradient-to-r"
        style={{
          background: `linear-gradient(90deg, ${meetColors[0]}, ${meetColors[1]}, ${meetColors[2]}, ${meetColors[3]})`,
        }}
      >
        <div
          className="absolute top-0 left-0 h-full transition-all duration-75"
          style={{
            width: `${progress}%`,
            background: `linear-gradient(90deg, ${meetColors[0]}, ${meetColors[1]}, ${meetColors[2]}, ${meetColors[3]})`,
            boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)',
          }}
        >
          <div className="progress-stripes-bg-size animate-progress-stripes absolute inset-0 h-full w-full bg-[linear-gradient(135deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)]" />
          <span className="absolute top-1/2 right-2 -translate-y-1/2 text-xs text-white drop-shadow-sm select-none">
            {progress}%
          </span>
          {/* <div className="animate-progress-stripes absolute inset-0 h-full w-full bg-[linear-gradient(135deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] bg-[length:32px_32px]" />
          <span className="absolute top-1/2 right-2 -translate-y-1/2 text-xs text-white drop-shadow-sm select-none">
            {progress}%
          </span> */}
        </div>
      </div>
    </div>
  );
};

export default LoaderAnimation;
