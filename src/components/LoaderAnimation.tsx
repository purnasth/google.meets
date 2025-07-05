import React from 'react';

const LoaderAnimation: React.FC = () => {
  return (
    <div className="relative flex h-40 w-72 items-center justify-center">
      {/* Car Body */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[speeder_0.4s_linear_infinite]">
        <div className="absolute top-[-19px] left-[60px] h-1.5 w-9 rounded-tl-[2px] rounded-tr-[10px] rounded-br-[1px] rounded-bl-[10px] bg-neutral-900" />
        <div className="absolute h-0 w-0 border-t-[6px] border-r-[100px] border-b-[6px] border-t-transparent border-r-neutral-900 border-b-transparent" />
        <div className="absolute top-[-16px] right-[-110px] h-[22px] w-[22px] rounded-full bg-neutral-900" />
        <div className="absolute top-[-16px] right-[-98px] h-0 w-0 border-t-0 border-r-[55px] border-b-[16px] border-t-transparent border-r-neutral-900 border-b-transparent" />
        <div className="absolute top-[-15px] right-[-125px] h-[12px] w-[20px] rotate-[-40deg] rounded-t-[20px] bg-neutral-900" />
        <div className="absolute top-[-8px] right-[-121px] h-[12px] w-[12px] rotate-[40deg] rounded-bl-[2px] bg-neutral-900" />
        {/* Fazer lines */}
        <div className="absolute top-[-19px] left-[60px]">
          <div className="absolute h-[1px] w-[30px] animate-[fazer1_0.2s_linear_infinite] bg-neutral-900" />
          <div className="absolute top-[3px] h-[1px] w-[30px] animate-[fazer2_0.4s_linear_infinite] bg-neutral-900" />
          <div className="absolute top-[1px] h-[1px] w-[30px] animate-[fazer3_0.4s_linear_infinite] bg-neutral-900 delay-1000" />
          <div className="absolute top-[4px] h-[1px] w-[30px] animate-[fazer4_1s_linear_infinite] bg-neutral-900 delay-1000" />
        </div>
      </div>
      {/* Longfazers */}
      <div className="absolute inset-0">
        <div className="absolute top-[20%] h-[2px] w-1/5 animate-[lf_0.6s_linear_infinite] bg-neutral-900 delay-5000" />
        <div className="absolute top-[40%] h-[2px] w-1/5 animate-[lf2_0.8s_linear_infinite] bg-neutral-900 delay-1000" />
        <div className="absolute top-[60%] h-[2px] w-1/5 animate-[lf3_0.6s_linear_infinite] bg-neutral-900" />
        <div className="absolute top-[80%] h-[2px] w-1/5 animate-[lf4_0.5s_linear_infinite] bg-neutral-900 delay-3000" />
      </div>
    </div>
  );
};

export default LoaderAnimation;
