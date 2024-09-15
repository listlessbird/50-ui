import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  motion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect } from "react";

export function AnimatedDigit({ value }: { value: number }) {
  const spring = useSpring(value);
  const display = useTransform(spring, (value) =>
    Math.round(value).toLocaleString()
  );

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return (
    <div className="relative w-[1cap] h-[1.5cap] overflow-hidden">
      <AnimatePresence mode="popLayout" key={value}>
        <motion.div
          key={value}
          initial={{ y: 100, filter: "blur(10px)" }}
          animate={{ y: 0, filter: "blur(0px)" }}
          exit={{ y: -100, filter: "blur(10px)" }}
          transition={{ duration: 0.5, type: "spring" }}
          className="absolute inset-0 flex items-center justify-center tabular-nums"
        >
          {value}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
