"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Terminus from "@/assets/terminus.jpg";
import { Morph } from "@/app/listening-activity/morph";
import { ProgressBar } from "@/app/listening-activity/progress-bar";

export function ListeningTo() {
  return (
    <div
      className="rounded-md w-[350px] h-[350px] overflow-hidden
        activity-root
    "
    >
      <div className="w-full relative h-[200px]">
        <Image
          src={Terminus}
          alt="Terminus"
          layout="responsive"
          width={400}
          height={400}
          className="rounded-[50%] aspect-square object-cover absolute -translate-y-1/2 bottom-[10%]"
        />
      </div>

      <div className="inner-data p-2 text-center">
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
          <ProgressBar initialTime="04:30" totalTime="05:00" />
        </div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-white font-mono"
        >
          A podcast about the people who build and use the web.
        </motion.p>
      </div>
    </div>
  );
}
