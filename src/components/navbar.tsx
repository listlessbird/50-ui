"use client";

import { Button } from "@/components/ui/button";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

import { motion } from "framer-motion";
import Link from "next/link";
import { useClickOutside } from "@/hooks/useClickOutside";

const SidebarStateContext = createContext<{
  isExpanded: boolean;
  setExpanded: Dispatch<SetStateAction<boolean>>;
} | null>(null);

export function SidebarStateContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isExpanded, setExpanded] = useState(false);

  const value = useMemo(
    () => ({
      isExpanded,
      setExpanded,
    }),
    [isExpanded]
  );

  return (
    <SidebarStateContext.Provider value={value}>
      {children}
    </SidebarStateContext.Provider>
  );
}

export function useSidebarState() {
  const context = useContext(SidebarStateContext);
  if (context === null) {
    throw new Error("useSidebarState must be used within a SidebarState");
  }
  return context;
}

export function NavItem({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <div className="flex items-center justify-start hover:bg-zinc-500/60 text-lg rounded-lg p-2">
      <Link href={href}>{children}</Link>
    </div>
  );
}

export function Navbar({
  items,
}: {
  items: { label: string; href: string }[];
}) {
  const { isExpanded, setExpanded } = useSidebarState();

  const ref = useClickOutside(() => setExpanded(false));

  return (
    <nav
      className={cn(
        "h-screen flex fixed top-0 bottom-0 left-0 transition-transform ease-[cubic-bezier(0.165,0.84,0.44,1)] duration-300 p-4",
        {
          "-translate-x-full": !isExpanded,
          "translate-x-0": isExpanded,
        }
      )}
    >
      <div
        className="bg-slate-600/40 w-48 md:w-64 rounded-xl text-white p-2 shadow-lg z-10 shadow-white/20"
        ref={ref}
      >
        {items.map((item) => (
          <NavItem key={item.label} href={item.href}>
            {item.label}
          </NavItem>
        ))}
      </div>
      <Button
        className="absolute top-4 right-[-65px] bg-white/20 text-black"
        variant={"outline"}
        onClick={() => setExpanded((p) => !p)}
        asChild
      >
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <ArrowRight
            className={cn("arrow transition-transform duration-300", {
              "rotate-180 ": isExpanded,
            })}
          />
        </motion.button>
      </Button>
    </nav>
  );
}
