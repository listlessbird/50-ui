"use client";
import { PickerList } from "@/app/time-picker-compact/pickerlist";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion, MotionConfig, Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import useMeasure from "react-use-measure";

export default function Page() {
  return (
    <main className="flex min-h-screen pt-40 container">
      <Picker />
    </main>
  );
}

const rollVariants: Variants = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -20, opacity: 0 },
};

export function Picker() {
  const [open, setOpen] = useState(false);

  const [ref, bounds] = useMeasure();
  const [hasSelected, setHasSelected] = useState(false);
  const [selectedTime, setSelectedTime] = useState({
    hour: 0,
    minute: 0,
    period: "AM",
  });

  useEffect(() => {
    console.table(selectedTime);
  }, [selectedTime]);

  return (
    <div className="container h-full">
      <div className="flex w-full p-4 border border-gray-300 bg-neutral-950 rounded-md">
        <Button
          className="self-stretch rounded-none bg-transparent flex-col w-full hover:bg-transparent items-start"
          onClick={() => {
            setOpen((p) => !p);
            setHasSelected(true);
          }}
        >
          <div className="flex flex-col items-center">
            <div className="text-white">Pick time</div>

            <div className="text-muted-foreground/60 tabular-nums flex">
              <AnimatePresence initial={false}>
                {!hasSelected ? (
                  <motion.p
                    initial={{ filter: "blur(8px)" }}
                    animate={{ filter: "blur(0px)" }}
                    exit={{ opacity: 0 }}
                  >
                    goggg
                  </motion.p>
                ) : (
                  <MotionConfig transition={{ duration: 0.2 }}>
                    <motion.div
                      className="flex relative gap-[3px] items-center justify-center"
                      initial={{ filter: "blur(8px)" }}
                      animate={{ filter: "blur(0px)" }}
                    >
                      <motion.p
                        key={selectedTime.hour + "hr"}
                        variants={rollVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="w-[2ch]"
                      >
                        {selectedTime.hour}
                      </motion.p>
                      <span>:</span>
                      <motion.p
                        key={selectedTime.minute + "min"}
                        variants={rollVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="w-[2ch]"
                      >
                        {selectedTime.minute.toString().padStart(2, "0")}
                      </motion.p>
                      <motion.p
                        className="w-[2ch]"
                        key={selectedTime.period + "period"}
                        variants={rollVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                      >
                        {selectedTime.period}
                      </motion.p>
                    </motion.div>
                  </MotionConfig>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Button>
      </div>
      <div className="relative w-full">
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              className="mt-3"
              initial={{ height: 0, opacity: 0, y: 20 }}
              animate={{ height: bounds.height, opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: 20 }}
              style={{ borderRadius: "2rem" }}
            >
              <div ref={ref}>
                <div className="bg-stone-800 flex w-full justify-between px-4">
                  <Button className="bg-transparent hover:bg-transparent text-lime-900">
                    Cancel
                  </Button>
                  <Button className="bg-transparent hover:bg-transparent text-lime-900">
                    Ok
                  </Button>
                </div>
                <div className="bg-stone-800/60 grid grid-cols-3 h-[256px] relative snap-y snap-mandatory">
                  <div className="selector w-full absolute bg-stone-800 left-0 right-0 top-1/2 -translate-y-1/2 h-8 -z-50 p-4" />

                  <PickerList
                    data={Array.from({ length: 12 }, (_, i) => i)}
                    renderItem={(item) => item}
                    selected={selectedTime.hour}
                    onSelect={(val) =>
                      setSelectedTime((prev) => ({ ...prev, hour: val }))
                    }
                  />

                  <PickerList
                    data={Array.from({ length: 12 }, (_, i) => i)}
                    renderItem={(item) => item}
                    selected={selectedTime.minute}
                    onSelect={(val) =>
                      setSelectedTime((prev) => ({ ...prev, minute: val }))
                    }
                  />

                  <PickerList
                    data={["AM", "PM"]}
                    renderItem={(item) => item}
                    selected={selectedTime.period}
                    onSelect={(val) =>
                      setSelectedTime((prev) => ({ ...prev, period: val }))
                    }
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div>
        <pre>
          <code>{JSON.stringify(bounds, null, 2)}</code>
        </pre>
      </div>
    </div>
  );
}
