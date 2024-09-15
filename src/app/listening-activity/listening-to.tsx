"use client";
import {
  AnimatePresence,
  motion,
  Variants,
  useAnimationControls,
} from "framer-motion";
import Image from "next/image";
import Terminus from "@/assets/terminus.jpg";
import { Morph } from "@/app/listening-activity/morph";
import { Progress, ProgressBar } from "@/app/listening-activity/progress";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const discVariants: Variants = {
  pause: {
    borderRadius: "0%",
    bottom: "0%",
    top: "0%",

    transition: {
      //   delay: 4,
      type: "spring",
    },
  },
  play: {
    borderRadius: "50%",
    bottom: "50%",
    top: "-40%",
    transition: {
      //   duration: 4,
      type: "spring",
    },
  },
};

export function ListeningTo() {
  const [discClicked, setDiscClicked] = useState(false);

  const [isReversing, setIsReversing] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("showCover", discClicked);
  }, [discClicked]);

  const discControls = useAnimationControls();

  const handleDiscClick = () => {
    if (discClicked) {
      setDiscClicked(false);
      setIsReversing(true);
      discControls.start("play");
      setTimeout(() => setIsReversing(false), 1000);
    } else {
      setDiscClicked(true);
      setIsReversing(true);
      setTimeout(() => {
        setIsReversing(false);
        discControls.start("pause");
      }, 1000);
    }
  };
  return (
    <div
      className="rounded-[15%] w-[350px] h-[380px] overflow-hidden
        activity-root relative"
    >
      <div className="w-full h-[200px]">
        <motion.div
          className={cn(
            "transition-transform overflow-hidden aspect-square object-cover disc z-10 w-full shadow-xl",
            discClicked && "pause",
            isReversing && "reversing"
          )}
          style={{
            position: "absolute",
            borderRadius: "50%",
            bottom: "50%",
            // @ts-ignore
            "--dur": "4s",
          }}
          onClick={handleDiscClick}
          variants={discVariants}
          //   animate={"pause"}
          //   initial="play"
          animate={discControls}
          data-expanded={discClicked ? true : false}
          ref={ref}
        >
          <Image
            src={Terminus}
            alt="Terminus"
            layout="responsive"
            width={400}
            height={400}
            className={cn("aspect-square object-cover shadow-xl")}
          />
        </motion.div>
      </div>

      <div className="inner-data p-2 text-center space-y-2">
        <div className="w-full flex items-center justify-center">
          <Morph />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-black/30 text-lg font-semibold font-mono"
        >
          Devola
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-2xl font-semibold text-black/80 font-mono"
        >
          Terminus
        </motion.h1>
        <div className="w-full flex items-center justify-center">
          <ProgressBar initialTime="04:00" totalTime="05:00" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-black font-mono"
        >
          <Progress initialTime="04:00" totalTime="05:00" />
        </motion.div>
      </div>
    </div>
  );
}
