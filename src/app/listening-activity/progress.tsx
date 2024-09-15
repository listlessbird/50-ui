import { AnimatedDigit } from "@/components/animated-digit";
import { useProgress } from "@/hooks/use-progress";
import { useCallback, useEffect, useMemo, useState } from "react";

export function ProgressBar({
  initialTime = "00:00",
  totalTime = "05:00",
}: {
  initialTime: string;
  totalTime: string;
}) {
  const { progressPercent } = useProgress({
    initialDuration: initialTime,
    totalDuration: totalTime,
  });

  return (
    <div className="w-[50px] h-[2px] bg-black/20">
      <div
        className="h-full bg-black/60"
        style={{ width: `${progressPercent}%` }}
      />
    </div>
  );
}

export function Progress({
  initialTime,
  totalTime,
}: {
  initialTime: string;
  totalTime: string;
}) {
  const { elapsed } = useProgress({
    initialDuration: initialTime,
    totalDuration: totalTime,
  });

  return (
    <div className="font-mono inline-flex font-semibold items-center justify-center">
      {/* <span className="text-black">{elapsed}</span> */}
      {elapsed.split("").map((digit, index) =>
        digit === ":" ? (
          <span key={index} className="mx-0.5">
            :
          </span>
        ) : (
          <AnimatedDigit key={index} value={+digit} />
        )
      )}
      <span className="text-black/50">/</span>
      <span className="text-black/50">{totalTime}</span>
    </div>
  );
}
