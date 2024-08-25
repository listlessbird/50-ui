"use client";

import { AnimatePresence, motion, Variants } from "framer-motion";
import { useMemo, useState } from "react";
import useMeasure from "react-use-measure";

/*
    In case this doesnt work on other situatuations,
    ie, the exit animation is not working as expected and overflowing the parent container,
    set overflow to hidden on the parent container
    and also use relative position on the parent container
*/

const variant: Variants = {
  initial: (direction: number) => ({
    opacity: 0,
    x: `${direction * 100}%`,
    filter: "blur(10px)",
  }),
  animate: {
    opacity: 1,
    x: "0%",
    filter: "blur(0px)",
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: `${direction * -110}%`,
    filter: "blur(10px)",
  }),
};

export function MultiStep() {
  const [step, setStep] = useState(1);

  const [direction, setDirection] = useState(1);
  const [ref, { width, height }] = useMeasure();

  const steps = useMemo(() => {
    switch (step) {
      case 1:
        return <Step step={step} />;
      case 2:
        return <Step step={step} />;
      case 3:
        return <Step step={step} />;
    }
  }, [step]);

  function handleNext() {
    if (step < 3) {
      setStep(step + 1);
      setDirection(1);
      return;
    }

    // setStep(1);
  }

  function handleBack() {
    if (step > 1) {
      setStep(step - 1);
      setDirection(-1);
      return;
    }

    // setStep(1);
  }

  return (
    <motion.div
      className="bg-white text-black rounded-md min-h-[250px]  max-w-[500px]"
      animate={{ height: height }}
    >
      <div ref={ref} className="p-4">
        <AnimatePresence initial={false} mode="popLayout" custom={direction}>
          <motion.div
            // initial={{ opacity: 0, x: "100%", filter: "blur(10px)" }}
            // animate={{ opacity: 1, x: "0%", filter: "blur(0px)" }}
            // exit={{ opacity: 0, x: "-110%", filter: "blur(10px)" }}
            transition={{ duration: 0.5, type: "spring", bounce: 0 }}
            className="px-2 text-balance"
            key={step}
            variants={variant}
            custom={direction}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {steps}
          </motion.div>
        </AnimatePresence>
        <motion.div layout className="w-full flex justify-between px-2 mt-4">
          <button
            className="border-blue-400 bg-transparent rounded-2xl px-4 py-2 text-gray-400 hover:border-blue-600 disabled:border-gray-400 disabled:cursor-not-allowed border-2"
            onClick={handleBack}
            disabled={step === 1}
          >
            Back
          </button>
          <button
            className="bg-blue-400 rounded-2xl px-4 py-2 text-white hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
            onClick={handleNext}
            disabled={step === 3}
          >
            Next
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}

function Step({ step }: { step: number }) {
  return (
    <div>
      <h1 className="text-center font-semibold">Step {step}</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum quaerat
        assumenda, fugiat ducimus aperiam modi sit repellendus vel similique
        sapiente laborum. Iusto, corrupti? Lorem ipsum dolor sit, amet
        consectetur adipisicing elit. Tempore doloribus ex, sequi totam magnam
        voluptatibus, autem ratione facilis mollitia nemo ea asperiores
        reprehenderit.
        {step === 2 && (
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate,
            harum ducimus! Est corrupti quasi ratione neque necessitatibus
            dignissimos autem, nihil ad temporibus, sed inventore. Numquam culpa
            tempora cupiditate in itaque mollitia est tempore maxime! Incidunt
            omnis exercitationem aspernatur error molestiae.
          </p>
        )}
        {step === 3 && (
          <p>
            this is step 3 this is step 3 this is step 3 this is step 3 this is
            step 3 this is step 3 this is step 3 this is step 3 this is step 3
            this is step 3 this is step 3
          </p>
        )}
      </p>
    </div>
  );
}
