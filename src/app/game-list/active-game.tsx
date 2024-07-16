import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { forwardRef } from "react";

export type Game = {
  title: string;
  description: string;
  longDescription: string;
  image: string;
};

export const ActiveGame = forwardRef<HTMLDivElement, { game: Game }>(
  function ActiveGame(props, ref) {
    const { game } = props;

    return (
      <>
        <div className="absolute inset-0 bg-background/20" />
        <motion.div
          layoutId={`${game.title}-wrapper`}
          className="p-4 bg-background/90 rounded-lg flex flex-col max-w-xl absolute w-full border border-white/20"
          ref={ref}
        >
          <div className="game flex gap-8 items-center">
            <motion.img
              layoutId={`${game.image}`}
              src={game.image}
              className="rounded-xl size-[55px] md:size-[70px] aspect-square object-cover"
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
          </div>
          <motion.p
            // layout
            key={`${game}-long-desc`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="long-description"
          >
            {game.longDescription}
          </motion.p>
        </motion.div>
      </>
    );
  }
);
