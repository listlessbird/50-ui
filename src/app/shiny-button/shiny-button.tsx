"use client";
import { motion } from "framer-motion";
import "./style.css";
export function ShinyButton() {
  return (
    <motion.button
      initial={{ "--x": "100%", scale: 1 }}
      animate={{ "--x": "-100%" }}
      className="px-6 py-2 rounded-md rad-grad relative"
      whileTap={{ scale: 0.95 }}
      transition={{
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 1,
        type: "spring",
        stiffness: 20,
        damping: 15,
        mass: 2,
        scale: {
          type: "spring",
          stiffness: 10,
          damping: 5,
          mass: 0.1,
        },
      }}
    >
      <span className="text-neutral-100 tracking-wide font-light size-full block relative lin-mask">
        I'm a shiny mf
      </span>
      <span className="block absolute inset-0 rounded-md p-px shiny-border" />
    </motion.button>
  );
}
