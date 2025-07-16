import { Apod } from "@/types/apod";
import { Root } from "@/types/data";
import { create } from "zustand";

type Store = {
  root: Root<Apod> | undefined;
  setRoot: (value: Root<Apod>) => void;
};

export const useStore = create<Store>()((set) => ({
  root: undefined,
  setRoot: (root) => set(() => ({ root })),
}));
