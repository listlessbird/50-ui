"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function Morph() {
  const [heights, setHeights] = useState([10, 10, 10, 10]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeights((prevHeights) => prevHeights.map(() => getRandomInt(10, 50)));
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-1 justify-center items-end h-[50px]">
        {heights.map((height, i) => (
          <motion.div
            key={i}
            animate={{ height }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-black/30 w-1 rounded-t-full"
          />
        ))}
      </div>
    </div>
  );
}
