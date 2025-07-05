import { useEffect } from 'react';

export function useRedirect(url: string, delay: number) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      window.location.href = url;
    }, delay);
    return () => clearTimeout(timeout);
  }, [url, delay]);
}
