"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Terminus from "@/assets/terminus.jpg";
import { Morph } from "@/app/listening-activity/morph";

export function ListeningTo() {
  return (
    <div
      className="rounded-md w-[350px] h-[300px] overflow-hidden
        activity-root
    "
    >
      <div className="w-full relative h-[150px]">
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
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-2xl font-bold text-white font-mono"
        >
          Terminus
        </motion.h1>
        <div className="w-full flex items-center justify-center">
          <Morph />
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
