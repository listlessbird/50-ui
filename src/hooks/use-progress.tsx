import { useCallback, useMemo, useState, useEffect } from "react";

type UseProgressReturn = {
  progress: number;
  elapsed: string;
  progressPercent: number;
};

export function useProgress({
  initialDuration,
  totalDuration,
}: {
  initialDuration: string;
  totalDuration: string;
}): UseProgressReturn {
  const parseTime = useCallback((time: string) => {
    const [minutes, seconds] = time.split(":").map(Number);
    return minutes * 60 + seconds;
  }, []);

  const formatTime = useCallback((seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  }, []);

  const initialTimeInSeconds = useMemo(
    () => parseTime(initialDuration),
    [initialDuration, parseTime]
  );

  const totalTimeInSeconds = useMemo(
    () => parseTime(totalDuration),
    [totalDuration, parseTime]
  );

  const [elapsed, setElapsed] = useState(initialTimeInSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsed((prevElapsed) => {
        if (prevElapsed >= totalTimeInSeconds) {
          clearInterval(timer);
          return prevElapsed;
        }
        const newElapsed = prevElapsed + 1;
        // console.log(newElapsed);
        return newElapsed;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [totalTimeInSeconds]);

  const elapsedFomatted = useMemo(() => {
    return formatTime(elapsed);
  }, [elapsed, formatTime]);

  const progress = useMemo(() => {
    return totalTimeInSeconds > 0 ? elapsed / totalTimeInSeconds : 0;
  }, []);

  const progressInPercent = useMemo(() => {
    const percent =
      totalTimeInSeconds > 0 ? (elapsed / totalTimeInSeconds) * 100 : 0;
    return percent;
  }, [elapsed, totalTimeInSeconds]);

  return {
    progressPercent: progressInPercent,
    elapsed: elapsedFomatted,
    progress,
  };
}
