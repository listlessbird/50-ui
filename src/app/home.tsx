"use client";

import { Button } from "@/components/ui/button";
import { motion, Variants } from "framer-motion";

const introVariants: Variants = {
  hidden: { y: 40, opacity: 0 },
  animate: { y: 0, opacity: 1 },
};

export function Home() {
  return (
    <div className="space-y-3 max-w-7xl px-4">
      <div>
        <motion.h1
          className="text-3xl lg:text-5xl font-bold"
          variants={introVariants}
          initial="hidden"
          animate="animate"
          transition={{ duration: 0.6, type: "tween", ease: "easeInOut" }}
        >
          50 Days Of Interactive UI
        </motion.h1>
        <motion.p
          className="pt-2 text-lg"
          variants={introVariants}
          initial="hidden"
          animate="animate"
          transition={{ duration: 0.6, type: "tween", ease: "easeInOut" }}
        >
          This is a project to create 50 interactive UI components in 50 days.
          <br />
          I'll make 50 cool ui within next 50 days.
        </motion.p>
      </div>
      <Button asChild>
        <motion.button
          className="text-lg"
          variants={introVariants}
          initial="hidden"
          animate="animate"
          transition={{ duration: 0.6, type: "tween", ease: "easeInOut" }}
        >
          Get Started
        </motion.button>
      </Button>
    </div>
  );
}
