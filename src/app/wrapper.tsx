"use client";

import { useSidebarState } from "@/components/navbar";
import { cn } from "@/lib/utils";

export function Wrapper({ children }: { children: React.ReactNode }) {
  const { isExpanded } = useSidebarState();

  return (
    <div
      className={cn(
        "transition-all ease-[cubic-bezier(0.165,0.84,0.44,1)] duration-300",
        { "lg:pl-[250px]": isExpanded }
      )}
    >
      {children}
    </div>
  );
}
