"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

export default function Page() {
  return (
    <main className="grid min-h-screen pt-40 container">
      <Picker />
    </main>
  );
}

export function Picker() {
  const [open, setOpen] = useState(true);

  const refs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];

  useEffect(() => {
    if (!open) return;

    const rowHeight = 33;
  }, [open]);

  return (
    <div className="container">
      <div className="flex w-full p-4 border border-gray-300 bg-neutral-950 rounded-md">
        <Button
          className="self-stretch rounded-none bg-transparent flex-col w-full hover:bg-transparent items-start"
          onClick={() => setOpen((p) => !p)}
        >
          <div className="text-white">Pick date and time</div>
          <p className="text-muted-foreground/60">leading small</p>
        </Button>
      </div>
      {open && (
        <div className="mt-3">
          <div className="bg-stone-800 flex w-full justify-between px-4">
            <Button className="bg-transparent hover:bg-transparent text-lime-900">
              Cancel
            </Button>
            <Button className="bg-transparent hover:bg-transparent text-lime-900">
              Ok
            </Button>
          </div>
          <div className="bg-stone-800/60 grid grid-cols-3 h-[256px] relative snap-y snap-mandatory">
            <div className="selector w-full absolute bg-stone-800 left-0 right-0 top-1/2 h-[33px] -z-50" />

            {[0, 1, 2].map((i, idx) => (
              <PickerList
                data={Array.from({ length: 12 }, (_, i) => i)}
                key={i}
                renderItem={(item) => item}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

type PickerListProps<T> = {
  data: T[];
  renderItem: (item: T) => React.ReactNode;
};

function PickerList2<T>({ data, renderItem }: PickerListProps<T>) {
  const itemsLength = data.length;
  const totalHeight = data.length * 33;

  const rowHeight = 33;

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const middleIndex = Math.floor(itemsLength / 2);
    const scrollOffset = middleIndex * (rowHeight / 2);
    ref.current.scrollTop = scrollOffset;
  }, [itemsLength, rowHeight]);

  const handleScroll = () => {
    if (!ref.current) return;
  };

  return (
    <div
      className="snap-y snap-proximity flex flex-col overflow-y-scroll"
      ref={ref}
      onScroll={handleScroll}
    >
      <div style={{ paddingTop: `${totalHeight / 2}px` }} />
      {data.map((d, idx) => (
        <Button
          key={idx}
          className="bg-transparent hover:bg-transparent text-lime-900 h-[33px] snap-center"
        >
          {renderItem(d)}
        </Button>
      ))}
      <div style={{ paddingBottom: `${totalHeight / 2}px` }} />
    </div>
  );
}
function PickerList<T>({ data, renderItem }: PickerListProps<T>) {
  const itemsLength = data.length;
  const rowHeight = 33;
  const totalContentHeight = itemsLength * rowHeight;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const containerHeight = ref.current.clientHeight;
    const middleIndex = Math.floor(itemsLength / 2);
    const scrollOffset =
      middleIndex * rowHeight - containerHeight / 2 + rowHeight / 2;
    ref.current.scrollTop = scrollOffset;
  }, [itemsLength, rowHeight]);

  const handleScroll = () => {
    if (!ref.current) return;
    console.log(`current: ${ref.current.scrollTop}`);
    const containerHeight = ref.current.clientHeight;
    const minScrollTop = 0;
    const maxScrollTop = totalContentHeight - rowHeight;

    if (ref.current.scrollTop < minScrollTop) {
      ref.current.scrollTop = minScrollTop;
    } else if (ref.current.scrollTop > maxScrollTop) {
      ref.current.scrollTop = maxScrollTop;
    }
  };

  return (
    <div
      className="snap-y flex flex-col overflow-y-scroll h-[256px] scroll-smooth"
      ref={ref}
      onScroll={handleScroll}
    >
      <div style={{ paddingTop: `${128}px` }} />
      {data.map((d, idx) => (
        <Button
          key={idx}
          className="bg-transparent hover:bg-transparent text-lime-900 h-[33px] snap-start"
        >
          {renderItem(d)}
        </Button>
      ))}
      <div style={{ paddingBottom: `${128}px` }} />
    </div>
  );
}
