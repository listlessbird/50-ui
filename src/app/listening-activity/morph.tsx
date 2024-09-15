"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function Morph() {
  const [scales, setScales] = useState([1, 1, 1, 1, 1, 1]);

  useEffect(() => {
    const interval = setInterval(() => {
      setScales((prevScales) => prevScales.map(() => getRandomInt(1, 3)));
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-1 justify-center items-center h-[30px]">
        {scales.map((scale, i) => (
          <motion.div
            key={i}
            animate={{ scaleY: scale }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{ originY: 0.5 }}
            className="bg-black/30 w-1 h-[10px]"
          />
        ))}
      </div>
    </div>
  );
}
