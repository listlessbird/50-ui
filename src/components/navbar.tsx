"use client";

import { Button } from "@/components/ui/button";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useMemo,
  useState,
} from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const RootWrapperContext = createContext<{
  width: number;
  setWidth: Dispatch<SetStateAction<number>>;
} | null>(null);

export function RootWrapper({ children }: { children: React.ReactNode }) {
  const [width, setWidth] = useState(0);

  const value = useMemo(
    () => ({
      width,
      setWidth,
    }),
    [width]
  );

  return (
    <RootWrapperContext.Provider value={value}>
      {children}
    </RootWrapperContext.Provider>
  );
}

export function useRootWrapperValues() {
  const context = RootWrapperContext;
  if (context === null) {
    throw new Error("useRootWrapperValues must be used within a RootWrapper");
  }
  return context;
}

export function Navbar() {
  const [isExpanded, setExpanded] = useState(false);
  return (
    <nav
      className={cn("h-screen flex fixed top-0 bottom-0 left-0", {
        "-translate-x-full": !isExpanded,
        "translate-x-0": isExpanded,
      })}
    >
      <div className="bg-white/70 lg:w-64">
        <div>
          <a href="/" className="text-3xl lg:text-5xl font-bold">
            50 Days Of Interactive UI
          </a>
          <p className="pt-2 text-lg">
            This is a project to create 50 interactive UI components in 50 days.
            <br />
            I'll make 50 cool ui within next 50 days.
          </p>
        </div>
      </div>
      <Button
        className="absolute right-[-100px]"
        variant={"outline"}
        onClick={() => setExpanded((p) => !p)}
      >
        <ArrowRight />
      </Button>
    </nav>
  );
}
