import { useCallback, useEffect, useMemo, useState } from "react";

export function ProgressBar({
  initialTime = "00:00",
  totalTime = "05:00",
}: {
  initialTime: string;
  totalTime: string;
}) {
  const parseTime = useCallback((time: string) => {
    const [minutes, seconds] = time.split(":").map(Number);
    return minutes * 60 + seconds;
  }, []);

  const initialTimeInSeconds = useMemo(
    () => parseTime(initialTime),
    [initialTime, parseTime]
  );

  const totalTimeInSeconds = useMemo(
    () => parseTime(totalTime),
    [totalTime, parseTime]
  );

  const [elapsed, setElapsed] = useState(initialTimeInSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsed((prevElapsed) => {
        if (prevElapsed >= totalTimeInSeconds) {
          clearInterval(timer);
          return prevElapsed;
        }
        return prevElapsed + 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [totalTimeInSeconds]);

  const progress = useMemo(() => {
    return totalTimeInSeconds > 0 ? (elapsed / totalTimeInSeconds) * 100 : 0;
  }, []);

  return (
    <div className="w-[50px] h-[2px] bg-black/20">
      <div className="h-full bg-black/60" style={{ width: `${progress}%` }} />
    </div>
  );
}
