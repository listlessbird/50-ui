"use client";

import { Button } from "@/components/ui/button";
import { useClickOutside } from "@/hooks/useClickOutside";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { ReactNode, useState } from "react";

export function FeedbackPopover() {
  const [hasClicked, setHasClicked] = useState(false);
  const [formState, setFormState] = useState<"success" | "submitting" | "idle">(
    "idle"
  );

  const [feedback, setFeedback] = useState("");

  const ref = useClickOutside(() => setHasClicked(false));

  return (
    <>
      <Button
        className="bg-white hover:bg-white/70 transition-colors"
        onClick={() => setHasClicked((p) => !p)}
        asChild
      >
        <motion.button layoutId="idle-to-form-btn">
          <motion.span layoutId="placeholder" className="block text-sm">
            Feedback
          </motion.span>
        </motion.button>
      </Button>
      <AnimatePresence>
        {hasClicked && (
          <motion.div
            layoutId="idle-to-form-btn"
            className="form-wrap bg-[#f5f6f7]  rounded-md  w-[500px] h-[300px] p-2 mt-2 flex absolute"
            ref={ref}
          >
            <div className="flex flex-col relative bg-white border-[#e6e7e8] border-solid border rounded-md w-full">
              <AnimatePresence initial={false}>
                {formState === "success" ? (
                  <motion.div
                    key={"form"}
                    initial={{ y: -32, opacity: 0, filter: "blur(4px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    transition={{ type: "spring", duration: 0.4, bounce: 0 }}
                    className="flex flex-col size-full text-black items-center justify-center"
                  >
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M27.6 16C27.6 17.5234 27.3 19.0318 26.717 20.4392C26.1341 21.8465 25.2796 23.1253 24.2025 24.2025C23.1253 25.2796 21.8465 26.1341 20.4392 26.717C19.0318 27.3 17.5234 27.6 16 27.6C14.4767 27.6 12.9683 27.3 11.5609 26.717C10.1535 26.1341 8.87475 25.2796 7.79759 24.2025C6.72043 23.1253 5.86598 21.8465 5.28302 20.4392C4.70007 19.0318 4.40002 17.5234 4.40002 16C4.40002 12.9235 5.62216 9.97301 7.79759 7.79759C9.97301 5.62216 12.9235 4.40002 16 4.40002C19.0765 4.40002 22.027 5.62216 24.2025 7.79759C26.3779 9.97301 27.6 12.9235 27.6 16Z"
                        fill="#2090FF"
                        fillOpacity="0.16"
                      />
                      <path
                        d="M12.1334 16.9667L15.0334 19.8667L19.8667 13.1M27.6 16C27.6 17.5234 27.3 19.0318 26.717 20.4392C26.1341 21.8465 25.2796 23.1253 24.2025 24.2025C23.1253 25.2796 21.8465 26.1341 20.4392 26.717C19.0318 27.3 17.5234 27.6 16 27.6C14.4767 27.6 12.9683 27.3 11.5609 26.717C10.1535 26.1341 8.87475 25.2796 7.79759 24.2025C6.72043 23.1253 5.86598 21.8465 5.28302 20.4392C4.70007 19.0318 4.40002 17.5234 4.40002 16C4.40002 12.9235 5.62216 9.97301 7.79759 7.79759C9.97301 5.62216 12.9235 4.40002 16 4.40002C19.0765 4.40002 22.027 5.62216 24.2025 7.79759C26.3779 9.97301 27.6 12.9235 27.6 16Z"
                        stroke="#2090FF"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <h3>Feedback received!</h3>
                    <p>Thanks for helping me improve Keeparr.</p>
                  </motion.div>
                ) : (
                  <motion.form
                    exit={{ y: 8, opacity: 0, filter: "blur(4px)" }}
                    transition={{ type: "spring", duration: 0.4, bounce: 0 }}
                    key={"form"}
                    className="flex flex-col size-full py-2"
                    onSubmit={(e) => {
                      e.preventDefault();
                      setFormState("submitting");
                      setTimeout(() => {
                        setFormState("success");
                      }, 1500);

                      setTimeout(() => {
                        setHasClicked(false);
                        setFormState("idle");
                      }, 3300);
                    }}
                  >
                    <motion.span
                      layoutId="placeholder"
                      data-feedback={feedback ? "true" : "false"}
                      className={cn(
                        "absolute text-neutral-600 left-2 top-[8px] opacity-100",
                        feedback && "!opacity-0"
                      )}
                    >
                      Feedback
                    </motion.span>
                    <textarea
                      className="size-full resize-none outline-none text-black px-2"
                      value={feedback}
                      // placeholder="Feedback"
                      onChange={(e) => setFeedback(e.target.value)}
                    ></textarea>
                    <div className="form-footer relative flex p-2 mt-auto">
                      <svg
                        className="dotted-line absolute -top-[1px] left-0 right-0 w-full"
                        width="500"
                        height="8"
                        viewBox="0 0 500 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0 1H500"
                          stroke="#E6E7E8"
                          strokeDasharray="4 4"
                        />
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
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
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
