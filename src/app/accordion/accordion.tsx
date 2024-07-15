"use client";

import { cn } from "@/lib/utils";
// import { Prettify } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import useMeasure from "react-use-measure";

// type expand = Prettify<ReturnType<typeof useMeasure>>;

export function Accordion({
  label,
  renderContent,
}: {
  label: string;
  renderContent: () => JSX.Element;
}) {
  const [ref, bounds] = useMeasure();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full p-4" data-open={isOpen}>
      <button
        className="flex justify-between gap-8 items-center text-lg w-full"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {label}
        <ChevronDown
          size={16}
          className={cn("arrow transition-transform rotate-0", {
            "rotate-180": isOpen,
          })}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            // transition={{ delay: 0.2 }}
            className="overflow-hidden"
          >
            <div ref={ref} className="p-4 text-muted">
              {renderContent()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Accordions() {
  return (
    <section className=" grid place-items-center h-screen max-w-xl container">
      <div className="bg-neutral-700 w-full rounded-lg">
        <Accordion
          label="Accordion 1"
          renderContent={() => (
            <p>
              lorem 23 words Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Nullam nec purus at ante tincidunt luctus. Nullam nec purus
              at ante tincidunt luctus Nullam nec purus at ante tincidunt
              luctus. Nullam nec purus at ante tincidunt luctus. Nullam nec
              purus at ante tincidunt luctus. Nullam nec purus at ante tincidunt
              luctus. Nullam nec purus at ante tincidunt luctus. Nullam nec
              purus at ante tincidunt luctus. Nullam
            </p>
          )}
        />
        <Accordion
          label="Accordion 2"
          renderContent={() => (
            <p>
              the quick brown fox jumps over the lazy dog the quick brown fox
              jumps over the lazy dog the quick brown fox jumps over the lazy
              dog the quick brown fox jumps over the lazy dog the quick brown
              fox jumps over the lazy dog the quick brown fox jumps over the
              lazy dog the quick brown fox jumps over the lazy dog the quick
              brown fox jumps over the lazy dog the quick brown fox jumps over
              the lazy dog
            </p>
          )}
        />
        <Accordion
          label="Accordion 3"
          renderContent={() => (
            <p>
              encoding is not the important part of the fansubbing process, but
              rather the translation itself. The translation should be as
              accurate as possible, and should be able to convey the original
              meaning of the dialogue. The translation should also be natural,
              and should sound like something that a native speaker would say.
              The translation should also be consistent, and should use the same
              terminology throughout the entire series. The translation should
              also be grammatically correct, and should use proper punctuation
              and capitalization. The translation should also be free of
              spelling errors, and should use the correct spelling of all words.
              The translation should also be free of typos, and should use the
              correct grammar and syntax. The translation should also be free of
              slang, and should use formal language. The translation should also
              be free of cultural references, and should use language that is
              appropriate for the target audience. The translation should also
              be free of any offensive language, and should use language that is
              respectful and appropriate. The translation should also be free of
              any political or religious references, and should use language
              that is neutral and non-controversial. <br /> <br />
              what in the copilot
            </p>
          )}
        />
      </div>
    </section>
  );
}
