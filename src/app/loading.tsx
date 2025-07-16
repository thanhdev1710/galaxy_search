import { SVGLoader } from "@/components/ui/loader";
import React from "react";

export default function loading() {
  return (
    <main className="h-full w-full flex items-center justify-center">
      <SVGLoader />
    </main>
  );
}
