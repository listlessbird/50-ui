"use client";

import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { ReactNode, useState } from "react";

export function FeedbackPopover() {
  const [hasClicked, setHasClicked] = useState(false);
  const [formState, setFormState] = useState<"success" | "submitting" | "idle">(
    "idle"
  );

  return (
    <div className="feedback-wrapper">
      <Button
        className="bg-white hover:bg-white/70 transition-colors"
        onClick={() => setHasClicked((p) => !p)}
      >
        Feedback
      </Button>

      {hasClicked && (
        <div className="form-wrap bg-[#f5f6f7] w-full rounded-md  min-w-[300px] min-h-[300px] p-2 mt-2 flex">
          <div className="flex flex-col relative bg-white border-[#e6e7e8] border-solid border rounded-md w-full">
            <form
              className="flex flex-col size-full py-2"
              onSubmit={(e) => {
                e.preventDefault();
                setFormState("submitting");
                setTimeout(() => {
                  setFormState("success");
                }, 1500);

                // setTimeout(() => {
                //   setHasClicked(false);
                // }, 3300);
              }}
            >
              <textarea
                className="size-full resize-none outline-none text-black px-2"
                placeholder="Feedback goes here"
              ></textarea>
              <div className="form-footer relative flex p-2 mt-auto">
                <svg
                  className="dotted-line absolute -top-[1px] left-0 right-0 w-full"
                  width="352"
                  height="2"
                  viewBox="0 0 352 2"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 1H352" stroke="#E6E7E8" strokeDasharray="4 4" />
                </svg>
                <div className="half-circle-left absolute -translate-y-1/2 left-[-1px] top-0">
                  <svg
                    width="6"
                    height="12"
                    viewBox="0 0 6 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_2029_22)">
                      <path
                        d="M0 2C0.656613 2 1.30679 2.10346 1.91341 2.30448C2.52005 2.5055 3.07124 2.80014 3.53554 3.17157C3.99982 3.54301 4.36812 3.98396 4.6194 4.46927C4.87067 4.95457 5 5.47471 5 6C5 6.52529 4.87067 7.04543 4.6194 7.53073C4.36812 8.01604 3.99982 8.45699 3.53554 8.82843C3.07124 9.19986 2.52005 9.4945 1.91341 9.69552C1.30679 9.89654 0.656613 10 0 10V6V2Z"
                        fill="#F5F6F7"
                      />
                      <path
                        d="M1 12V10C2.06087 10 3.07828 9.57857 3.82843 8.82843C4.57857 8.07828 5 7.06087 5 6C5 4.93913 4.57857 3.92172 3.82843 3.17157C3.07828 2.42143 2.06087 2 1 2V0"
                        stroke="#E6E7E8"
                        strokeWidth="1"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_2029_22">
                        <rect width="6" height="12" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>

                <div className="half-circle-right absolute -translate-y-1/2 right-[-1px] top-0 rotate-180">
                  <svg
                    width="6"
                    height="12"
                    viewBox="0 0 6 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_2029_22)">
                      <path
                        d="M0 2C0.656613 2 1.30679 2.10346 1.91341 2.30448C2.52005 2.5055 3.07124 2.80014 3.53554 3.17157C3.99982 3.54301 4.36812 3.98396 4.6194 4.46927C4.87067 4.95457 5 5.47471 5 6C5 6.52529 4.87067 7.04543 4.6194 7.53073C4.36812 8.01604 3.99982 8.45699 3.53554 8.82843C3.07124 9.19986 2.52005 9.4945 1.91341 9.69552C1.30679 9.89654 0.656613 10 0 10V6V2Z"
                        fill="#F5F6F7"
                      />
                      <path
                        d="M1 12V10C2.06087 10 3.07828 9.57857 3.82843 8.82843C4.57857 8.07828 5 7.06087 5 6C5 4.93913 4.57857 3.92172 3.82843 3.17157C3.07828 2.42143 2.06087 2 1 2V0"
                        stroke="#E6E7E8"
                        strokeWidth="1"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_2029_22">
                        <rect width="6" height="12" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <Button className="h-6 self-end bg-blue-500 hover:bg-blue-400 ml-auto w-[100px]">
                  <AnimatedState state={formState}>
                    {formState === "submitting" ? (
                      <Loader2
                        className="animate-spin text-white"
                        height={16}
                      />
                    ) : (
                      <span className="text-white/80">Submit</span>
                    )}
                  </AnimatedState>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function AnimatedState({
  state,
  children,
}: {
  state: string;
  children: ReactNode;
}) {
  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.span
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -25 }}
        key={state}
        transition={{
          type: "spring",
          duration: 0.3,
          bounce: 0,
        }}
      >
        {children}
      </motion.span>
    </AnimatePresence>
  );
}
