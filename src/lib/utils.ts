import { Apod } from "@/types/apod";
import { Root } from "@/types/data";
import { clsx, type ClassValue } from "clsx";
import { ReadonlyURLSearchParams } from "next/navigation";
import useSWR from "swr";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetcher = (url: string) => fetch(url).then((r) => r.json());

export const useApod = (slug: string, searchParam: ReadonlyURLSearchParams) => {
  const { data, error, isLoading } = useSWR<Root<Apod>>(
    `http://localhost:5678/api/v1/search?search_query=${slug}&${searchParam.toString()}`,
    fetcher
  );

  return { data, error, isLoading };
};
