"use client";

import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();
  const placeholders = [
    "Which planet is known as the Red Planet?",
    "How many moons does Jupiter have?",
    "What is the hottest planet in the Solar System?",
    "Which planet has the shortest day?",
    "How far is Earth from the Sun?",
    "What are Saturn's rings made of?",
    "Which planet has the strongest gravity?",
    "Is Pluto still considered a planet?",
    "What is the largest planet in the Solar System?",
    "Which planet could float in water due to its low density?",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const value = formData.get("query") as string;

    if (value) {
      router.push("/planets/" + value);
    }
  };

  return (
    <main className="h-full w-full flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="flex flex-col justify-center items-center px-4"
      >
        <h2 className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl dark:text-white text-black">
          Ask anything about the planet
        </h2>
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={handleChange}
          onSubmit={onSubmit}
        />
      </motion.div>
    </main>
  );
}
