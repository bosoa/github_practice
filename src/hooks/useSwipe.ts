import { useRef, useCallback } from 'react';

interface SwipeHandlers {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

export function useSwipe({ onSwipeLeft, onSwipeRight }: SwipeHandlers) {
  const touchStartX = useRef<number | null>(null);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartX.current === null) return;
      const delta = e.changedTouches[0].clientX - touchStartX.current;
      touchStartX.current = null;
      if (Math.abs(delta) < 50) return;
      if (delta < 0) onSwipeLeft?.();
      else onSwipeRight?.();
    },
    [onSwipeLeft, onSwipeRight]
  );

  return { onTouchStart, onTouchEnd };
}
