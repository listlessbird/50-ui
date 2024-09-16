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

export function ListeningTo() {
  const [discClicked, setDiscClicked] = useState(false);
  const [reversing, setReversing] = useState(false);
  return (
    <div
      className="rounded-[15%] w-[350px] h-[380px] overflow-hidden
        activity-root relative"
    >
      <div className="w-full h-[200px]">
        <motion.div
          className={cn(
            "transition-transform overflow-hidden aspect-square object-cover disc z-10 w-full shadow-2xl cursor-pointer border-2 border-[#a89f9f]"
          )}
          initial={{ rotate: 0, y: "-45%" }}
          style={{
            position: "absolute",
            borderRadius: "50%",
            // bottom: "50%",
            scale: 1,
          }}
          animate={
            discClicked
              ? {
                  rotate: 0,
                  borderRadius: 0,
                  y: 0,
                  border: 0,
                  width: "100%",
                  height: "100%",
                  transition: {
                    duration: 1.8,
                    type: "spring",
                    bounce: 0,
                  },
                }
              : {
                  rotate: 360,
                  transition: {
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }
          }
          data-expanded={discClicked ? true : false}
          whileHover={{ scale: 1.05 }}
          onClick={() => {
            setDiscClicked((p) => {
              if (p) {
                setReversing(true);
                setTimeout(() => {
                  setReversing(false);
                }, 1800);
              }
              return !p;
            });
          }}
        >
          <Image
            src={Terminus}
            alt="Terminus"
            width={400}
            height={400}
            className={cn("aspect-square object-cover shadow-xl size-full")}
          />
        </motion.div>
      </div>
      <motion.div
        animate={discClicked ? { opacity: 0 } : {}}
        className="absolute left-1/2 -top-[3%] z-[11] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
      >
        <div className="size-[150px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-500/20 backdrop-blur-sm" />
        <div className="size-[143px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-[5px] border-dotted border-gray-200/10" />
        <div className="size-[127px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-white bg-[#9799a5]" />
        <div className="size-[85px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c9c2c7]" />
        <div className="size-[70px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c9c2c7]" />
        <div className="size-[67px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e3dee4]" />
        <div className="size-[60px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#a6a4a5] bg-[#bebcba] shadow-[0_0_24px_-12px_rgba(0,0,0,0.25)_inset]" />
      </motion.div>
      <motion.div
        className="inner-data p-2 text-center space-y-2"
        animate={discClicked || reversing ? { filter: "blur(4px)" } : {}}
      >
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
      </motion.div>
    </div>
  );
}
