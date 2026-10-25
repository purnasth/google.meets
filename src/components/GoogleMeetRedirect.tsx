import React, { useCallback, useEffect, useRef, useState } from 'react';
import { HiArrowRight, HiMicrophone, HiPause, HiPlay } from 'react-icons/hi2';

import purna from '../assets/purna.jpg';
import meets from '../assets/meets.svg';
import { GOOGLE_MEET_URL } from '../constants/env';
import {
  INTRO_DURATION,
  LOADER_DURATION,
  meetColors,
} from '../constants/loader';
import { useRedirect } from '../hooks/useRedirect';

const PURNA_TZ = 'Asia/Kathmandu';
const clock = (timeZone?: string) =>
  new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
  });
const purnaClock = clock(PURNA_TZ);
const localClock = clock();
const localZone = new Intl.DateTimeFormat('en-US', { timeZoneName: 'short' })
  .formatToParts()
  .find((p) => p.type === 'timeZoneName')?.value;

/** Human label for how far Purna's clock is from the viewer's, e.g. "Purna is 5h 45m ahead". */
function zoneGap(now: Date) {
  const at = (timeZone?: string) =>
    new Date(now.toLocaleString('en-US', { timeZone })).getTime();
  const mins = Math.round((at(PURNA_TZ) - at()) / 900000) * 15;
  if (!mins) return "You're in Purna's time zone";
  const h = Math.floor(Math.abs(mins) / 60);
  const m = Math.abs(mins) % 60;
  const span = [h && `${h}h`, m && `${m}m`].filter(Boolean).join(' ');
  return `Purna is ${span} ${mins > 0 ? 'ahead' : 'behind'}`;
}

const corners = [
  'top-3 left-3 border-t-2 border-l-2 rounded-tl-[14px]',
  'top-3 right-3 border-t-2 border-r-2 rounded-tr-[14px]',
  'bottom-3 left-3 border-b-2 border-l-2 rounded-bl-[14px]',
  'bottom-3 right-3 border-b-2 border-r-2 rounded-br-[14px]',
];

const rise = 'motion-safe:animate-rise';
const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

const GoogleMeetRedirect: React.FC = () => {
  const { progress, remaining, paused, togglePause, join } = useRedirect(
    GOOGLE_MEET_URL,
    LOADER_DURATION,
    INTRO_DURATION,
  );
  const [launching, setLaunching] = useState(false);
  const [now, setNow] = useState(() => new Date());
  const card = useRef<HTMLDivElement>(null);

  const launch = useCallback(() => {
    setLaunching(true);
    setTimeout(join, 450);
  }, [join]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === 'Enter') launch();
      if (e.key === 'Escape') togglePause();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [launch, togglePause]);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 10000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (
      !matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)')
        .matches
    )
      return;
    const onMove = (e: PointerEvent) => {
      const el = card.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      el.style.setProperty('--rx', `${(0.5 - y) * 6}deg`);
      el.style.setProperty('--ry', `${(x - 0.5) * 8}deg`);
      el.style.setProperty('--mx', `${x * 100}%`);
      el.style.setProperty('--my', `${y * 100}%`);
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  const leaving = launching || (!paused && progress > 0.92);
  const deg = progress * 360;
  const charge = `conic-gradient(from 0deg, ${meetColors[0]} 0deg, ${meetColors[1]} ${deg / 3}deg, ${meetColors[2]} ${(deg * 2) / 3}deg, ${meetColors[3]} ${deg}deg, rgba(255,255,255,0.08) ${deg}deg)`;

  return (
    <main
      className={`relative isolate flex min-h-dvh w-full flex-col overflow-hidden bg-[#05060a] px-4 text-white max-sm:h-dvh sm:px-8 ${launching ? 'cursor-progress' : ''}`}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="motion-safe:animate-blob absolute top-[-15%] left-[-10%] size-[40vmax] rounded-full bg-[#2684FC] opacity-30 blur-[110px]" />
        <div className="motion-safe:animate-blob absolute top-[5%] right-[-15%] size-[34vmax] rounded-full bg-[#E94235] opacity-20 blur-[110px] [animation-delay:-5s]" />
        <div className="motion-safe:animate-blob absolute bottom-[-25%] left-[15%] size-[36vmax] rounded-full bg-[#00AC47] opacity-20 blur-[110px] [animation-delay:-10s]" />
        <div className="motion-safe:animate-blob absolute right-[10%] bottom-[-20%] size-[28vmax] rounded-full bg-[#FFBA00] opacity-15 blur-[110px] [animation-delay:-15s]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 [mask-image:linear-gradient(to_top,black,transparent)] [perspective:500px]">
          <div className="motion-safe:animate-grid absolute -inset-x-1/2 inset-y-0 origin-bottom [transform:rotateX(65deg)] bg-[linear-gradient(rgba(255,255,255,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.09)_1px,transparent_1px)] bg-[size:56px_56px]" />
        </div>
      </div>

      <header className="flex items-center justify-between gap-2 py-3 font-mono text-[0.65rem] tracking-[0.12em] whitespace-nowrap text-white/60 uppercase sm:py-5 sm:text-xs sm:tracking-[0.2em]">
        <span
          className={`glass flex items-center gap-2 rounded-full px-3 py-2 sm:px-4 ${rise}`}
        >
          <img src={meets} alt="" className="size-4" />
          meets.purnashrestha
        </span>
        <span
          className={`glass rounded-full px-3 py-2 sm:px-4 ${rise}`}
          style={delay(60)}
        >
          <span className="hidden sm:inline">Purna's time · </span>
          {purnaClock.format(now)} NPT
        </span>
      </header>

      <section
        className={`flex min-h-0 flex-1 items-center justify-center pb-3 transition duration-500 ease-in max-sm:items-stretch sm:pb-8 ${leaving ? 'scale-110 opacity-0 blur-md' : ''}`}
      >
        <div
          className={`w-full max-w-xl [perspective:1400px] max-sm:flex lg:max-w-5xl ${rise}`}
          style={delay(80)}
        >
          <div
            ref={card}
            className="glass relative grid [transform:rotateX(var(--rx,0))_rotateY(var(--ry,0))] gap-2 rounded-[2.5rem] p-3 transition-transform duration-500 ease-out max-sm:flex max-sm:flex-1 max-sm:flex-col max-sm:justify-end lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[2.5rem] bg-[radial-gradient(500px_circle_at_var(--mx,50%)_var(--my,50%),rgba(255,255,255,0.09),transparent_45%)]"
            />
            <div className="relative max-sm:absolute max-sm:inset-3 sm:aspect-[3/2] lg:aspect-[4/5]">
              <div
                aria-hidden
                className="absolute -inset-1 rounded-[2rem] opacity-60 blur-xl"
                style={{ background: charge }}
              />
              <div
                className="motion-safe:animate-curtain absolute inset-0 rounded-[1.75rem] p-[2px]"
                style={{ background: charge, ...delay(200) }}
              >
                <div className="relative size-full overflow-hidden rounded-[calc(1.75rem-2px)] bg-black">
                  <img
                    src={purna}
                    alt="Purna Shrestha"
                    className="motion-safe:animate-settle absolute inset-0 size-full object-cover object-[center_25%] max-sm:aspect-square max-sm:h-auto max-sm:min-h-[60%] max-sm:object-[center_20%]"
                    style={delay(200)}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,6,10,0.9),transparent_50%),radial-gradient(ellipse_at_center,transparent_55%,rgba(5,6,10,0.55))]" />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,#05060a_42%,rgba(5,6,10,0.75)_58%,transparent_78%)] sm:hidden" />
                  <div className="motion-safe:animate-scan absolute inset-x-0 top-0 h-1/6 bg-[linear-gradient(to_bottom,transparent,rgba(120,180,255,0.18),transparent)]" />
                  {corners.map((c, i) => (
                    <span
                      key={c}
                      className={`absolute size-6 border-white/70 max-sm:hidden ${c} ${rise}`}
                      style={delay(650 + i * 40)}
                    />
                  ))}

                  <span
                    className={`glass absolute top-6 left-6 flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[0.6rem] tracking-widest uppercase max-sm:top-3 max-sm:left-3 ${rise}`}
                    style={delay(750)}
                  >
                    <span className="relative flex size-1.5">
                      <span className="absolute inset-0 animate-ping rounded-full bg-[#00AC47]" />
                      <span className="size-1.5 rounded-full bg-[#00AC47]" />
                    </span>
                    Room live
                  </span>
                  <span
                    className={`glass absolute bottom-6 left-6 flex items-center gap-2 rounded-full py-1.5 pr-4 pl-1.5 text-sm font-medium max-sm:hidden ${rise}`}
                    style={delay(800)}
                  >
                    <span className="grid size-7 place-items-center rounded-full bg-white text-neutral-900">
                      <HiMicrophone className="size-3.5" />
                    </span>
                    Purna Shrestha
                  </span>
                </div>
              </div>
            </div>

            <div className="relative flex flex-col justify-center gap-5 p-4 max-sm:gap-4 max-sm:px-5 max-sm:pb-5 sm:p-8 lg:p-10">
              <span
                className={`glass flex w-fit items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[0.65rem] tracking-widest text-white/70 uppercase max-sm:hidden ${rise}`}
                style={delay(280)}
              >
                <img src={meets} alt="" className="size-3.5" />
                Google Meet · Ready
              </span>
              <div>
                <p
                  className={`font-mono text-xs tracking-[0.4em] text-white/50 uppercase ${rise}`}
                  style={delay(340)}
                >
                  Welcome to
                </p>
                <h1 className="font-display mt-2 text-[2rem] leading-[0.95] font-bold tracking-tight min-[400px]:text-[2.25rem] sm:text-6xl">
                  {['Meet', 'with'].map((w, i) => (
                    <span
                      key={w}
                      className={`inline-block ${rise}`}
                      style={delay(400 + i * 70)}
                    >
                      {w}&nbsp;
                    </span>
                  ))}
                  <span className={`inline-block ${rise}`} style={delay(540)}>
                    <span className="[animation:var(--animate-google-gradient)] [background-image:var(--google-gradient)] [background-size:200%_200%] bg-clip-text text-transparent">
                      Purna
                    </span>
                  </span>
                </h1>
              </div>

              <div
                className={`border-t border-white/10 pt-5 max-sm:pt-4 ${rise}`}
                style={delay(620)}
              >
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p
                      aria-live="polite"
                      className="font-mono text-[0.65rem] tracking-widest text-white/50 uppercase"
                    >
                      {paused
                        ? 'Redirect paused'
                        : 'Redirecting to Google Meet'}
                    </p>
                    <p className="mt-1.5 text-sm text-white/70">
                      {paused
                        ? 'Join whenever you are ready.'
                        : 'Get comfy, the call opens automatically.'}
                    </p>
                  </div>
                  <p
                    className={`font-mono text-5xl leading-none font-medium tabular-nums transition sm:text-6xl ${paused ? 'text-white/30' : ''}`}
                  >
                    {String(remaining).padStart(2, '0')}
                    <span className="text-lg text-white/40">s</span>
                  </p>
                </div>
                <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/10 max-sm:mt-3">
                  <div
                    className="h-full origin-left rounded-full"
                    style={{
                      transform: `scaleX(${progress})`,
                      background: `linear-gradient(90deg, ${meetColors.join(', ')})`,
                    }}
                  />
                </div>
              </div>

              <div
                className={`flex items-center gap-3 ${rise}`}
                style={delay(680)}
              >
                <button
                  onClick={launch}
                  title="Join now (Enter)"
                  className="group flex items-center justify-between gap-3 rounded-full bg-white py-2.5 pr-2.5 pl-6 font-semibold text-black shadow-[0_0_40px_rgba(255,255,255,0.25)] transition hover:shadow-[0_0_60px_rgba(255,255,255,0.45)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white active:scale-95 max-sm:flex-1"
                >
                  Join now
                  <span className="grid size-8 place-items-center rounded-full bg-black text-white transition group-hover:translate-x-0.5">
                    <HiArrowRight />
                  </span>
                </button>
                <button
                  onClick={togglePause}
                  title={`${paused ? 'Resume' : 'Pause'} (Esc)`}
                  className="glass flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white active:scale-95"
                >
                  {paused ? <HiPlay /> : <HiPause />}
                  {paused ? 'Resume' : 'Pause'}
                </button>
              </div>

              <div
                className={`border-t border-white/10 pt-4 text-[0.8125rem] text-white/60 max-sm:pt-3 ${rise}`}
                style={delay(740)}
              >
                <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="font-mono text-[0.65rem] tracking-widest text-white/40 uppercase">
                    Your time
                  </span>
                  <span className="font-mono text-white/90 tabular-nums">
                    {localClock.format(now)}
                  </span>
                  <span className="font-mono text-xs text-white/50">
                    {localZone}
                  </span>
                  <span aria-hidden className="hidden text-white/30 sm:inline">
                    ·
                  </span>
                  <span className="basis-full sm:basis-auto">
                    {zoneGap(now)}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default GoogleMeetRedirect;
