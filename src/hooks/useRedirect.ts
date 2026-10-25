import { useCallback, useEffect, useState } from 'react';

/** Pausable countdown that navigates to `url` once `duration` ms have elapsed, starting after `delay` ms. */
export function useRedirect(url: string, duration: number, delay = 0) {
  const [elapsed, setElapsed] = useState(-delay);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    let last: number | undefined;
    let raf = requestAnimationFrame(function tick(now) {
      const delta = now - (last ?? now);
      setElapsed((e) => Math.min(e + delta, duration));
      last = now;
      raf = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(raf);
  }, [paused, duration]);

  useEffect(() => {
    if (elapsed >= duration) window.location.assign(url);
  }, [elapsed, duration, url]);

  const counted = Math.max(0, elapsed);

  return {
    progress: counted / duration,
    remaining: Math.ceil((duration - counted) / 1000),
    paused,
    togglePause: useCallback(() => setPaused((p) => !p), []),
    join: useCallback(() => window.location.assign(url), [url]),
  };
}
