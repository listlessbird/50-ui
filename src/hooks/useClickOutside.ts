import { useCallback, useEffect, useRef } from "react";

export function useClickOutside(callback: () => void) {
  const ref = useRef<HTMLDivElement>(null);

  const handleClick = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    },
    [callback]
  );

  useEffect(() => {
    const handleMouseClick = (e: MouseEvent) => handleClick(e);
    const handleTouchEnd = (e: TouchEvent) => handleClick(e);

    document.addEventListener("click", handleMouseClick);
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("click", handleMouseClick);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleClick]);

  return ref;
}
