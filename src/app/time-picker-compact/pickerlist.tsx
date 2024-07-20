import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

type PickerListProps<T> = {
  data: T[];
  renderItem: (item: T) => React.ReactNode;
  onSelect: (val: T) => void;
  selected: T;
};

export function PickerList<T>({
  data,
  onSelect,
  renderItem,
  selected,
}: PickerListProps<T>) {
  const listRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!listRef.current) return;

      const listRect = listRef.current.getBoundingClientRect();
      const overlayCenter = listRect.top + listRect.height / 2;

      let closestIndex = 0;
      let minDistance = Infinity;

      itemsRef.current.forEach((item, index) => {
        const itemBounds = item.getBoundingClientRect();
        const itemCenter = itemBounds.top + itemBounds.height / 2;

        const d = Math.abs(overlayCenter - itemCenter);

        if (d < minDistance) {
          minDistance = d;
          closestIndex = index;
        }
      });
      onSelect(data[closestIndex]);
    };

    const list = listRef.current;

    list?.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      list?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="size-full relative overflow-hidden">
      <div
        className="absolute inset-0 snap-y  snap-mandatory overflow-y-scroll h-[256px] scroll-smooth scrollbar scrollbar-track-[#232E33] scrollbar-thumb-[#595a5a] [--scrollbar-width:8px] [--scrollbar-thumb-radius:8px]"
        ref={listRef}
        style={{
          //   "--scrollbar-thumb-radius": "8px",
          //   "--scrollbar"
          maxHeight: "256px",
          scrollPaddingBlock: `calc(50% - 2rem)`,
        }}
      >
        <div className="h-48" />
        {data.map((d, idx) => (
          <div
            ref={(el) => (itemsRef.current[idx] = el)}
            key={idx}
            className={cn(
              "bg-transparent hover:bg-transparent text-white h-16 snap-center flex items-center justify-center p-2 tabular-nums transition-all opacity-30 ",
              {
                "text-white opacity-1": data[idx] === selected,
              }
            )}
          >
            {renderItem(d)}
          </div>
        ))}
        <div className="h-48" />
      </div>
    </div>
  );
}
