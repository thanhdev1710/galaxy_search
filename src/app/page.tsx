"use client";

import { motion } from "motion/react";
import Link from "next/link";

export default function Page() {
  return (
    <main className="h-full w-full flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="font-mono relative flex flex-col gap-4 items-center justify-center px-4 text-center"
      >
        <div className="text-2xl md:text-4xl font-bold text-white dark:text-white">
          Explore the Solar System, One Planet at a Time
        </div>
        <div className="font-extralight text-base md:text-xl text-neutral-200 dark:text-neutral-200 py-4 max-w-2xl">
          Discover detailed information about every planet — from size,
          distance, surface conditions, to the latest scientific missions.
        </div>
        <Link
          href="/planets"
          className="bg-white dark:bg-white rounded-full w-fit text-black px-6 py-3 font-medium hover:scale-105 transition shadow-lg"
        >
          Start Exploring
        </Link>
      </motion.div>
    </main>
  );
}
