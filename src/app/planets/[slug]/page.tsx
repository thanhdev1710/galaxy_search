"use client";

import CreativeCards from "@/components/shared/CreativeCards";
import { SearchControls } from "@/components/shared/SearchControls";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

import { useRouter, useSearchParams } from "next/navigation";
import { use } from "react";

export default function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
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
      router.push("/planets/" + value + "?" + searchParams.toString());
    }
  };

  return (
    <main className="flex flex-col pt-4 h-svh">
      <div className="px-2">
        <PlaceholdersAndVanishInput
          defaultValue={decodeURIComponent(slug)}
          placeholders={placeholders}
          onChange={handleChange}
          onSubmit={onSubmit}
        />
      </div>
      <SearchControls />

      <CreativeCards params={params} />
    </main>
  );
}
