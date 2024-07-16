"use client";

import { Button } from "@/components/ui/button";
import { useClickOutside } from "@/hooks/useClickOutside";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ActiveGame, Game } from "./active-game";
export function GameList({ games }: { games: Game[] }) {
  const [activeGame, setActiveGame] = useState<Game | null>(null);

  const ref = useClickOutside(() => {
    setActiveGame(null);

    console.log(activeGame);
  });

  return (
    <>
      <AnimatePresence>
        {activeGame ? <ActiveGame game={activeGame} ref={ref} /> : null}
      </AnimatePresence>
      <ul className="flex flex-col w-full space-y-4 justify-center items-center">
        {games.map((game, idx) => (
          <motion.li
            layoutId={`${game.title}-wrapper`}
            className="flex gap-8 items-center w-full max-w-xl cursor-pointer"
            key={game.title}
            onClick={() => setActiveGame(game)}
          >
            <motion.img
              layoutId={`${game.image}`}
              src={game.image}
              className="rounded-xl size-[55px] md:size-[70px] aspect-square object-cover shrink-0"
            />
            <div className="flex items-center flex-1 justify-between border-b border-zinc-300/20">
              <div className="flex flex-col py-4">
                <motion.h2 layoutId={`${game.title}`} className="text-lg">
                  {game.title}
                </motion.h2>
                <motion.p
                  layoutId={`${game.title}-desc-sm`}
                  className="text-sm text-white/60"
                >
                  {game.description}
                </motion.p>
              </div>
              <Button className="rounded-full" asChild>
                <motion.button layoutId={`${game.title}-btn`}>
                  Get
                </motion.button>
              </Button>
            </div>
          </motion.li>
        ))}
      </ul>
    </>
  );
}
