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
  const itemsRef = useRef<Map<T, HTMLDivElement>>(new Map());

  useEffect(() => {
    const handleScroll = () => {
      if (!listRef.current) return;

      const listRect = listRef.current.getBoundingClientRect();
      const overlayCenter = listRect.top + listRect.height / 2;

      let closestIndex: T | null = null;
      let minDistance = Infinity;

      itemsRef.current.forEach((item, contentAsKey) => {
        const itemBounds = item.getBoundingClientRect();
        const itemCenter = itemBounds.top + itemBounds.height / 2;

        const d = Math.abs(overlayCenter - itemCenter);

        if (d < minDistance) {
          minDistance = d;
          closestIndex = contentAsKey;
        }
      });

      if (closestIndex !== null && closestIndex !== selected) {
        onSelect(closestIndex);
      }
    };

    const list = listRef.current;

    list?.addEventListener("scroll", handleScroll);

    // handleScroll();

    return () => {
      list?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const selectedElement = itemsRef.current.get(selected);
    if (selectedElement && listRef.current) {
      const listRect = listRef.current.getBoundingClientRect();
      const itemRect = selectedElement.getBoundingClientRect();
      const scrollTop = listRef.current.scrollTop;
      const targetScrollTop =
        scrollTop +
        (itemRect.top - listRect.top) -
        (listRect.height - itemRect.height) / 2;

      listRef.current.scrollTo({
        top: targetScrollTop,
        behavior: "smooth",
      });
    }
  }, [selected]);

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
        {/* <div className="h-48" /> */}
        <div className="h-[calc(50%-2rem)]" />
        {data.map((d, idx) => (
          <div
            ref={(el) => {
              if (el) itemsRef.current.set(d, el);
            }}
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
        {/* <div className="h-48" /> */}
        <div className="h-[calc(50%-2rem)]" />
      </div>
    </div>
  );
}
