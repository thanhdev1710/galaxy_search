"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useStore } from "@/store/store";

export function SearchControls() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const root = useStore((state) => state.root);

  const [year, setYear] = useState(searchParams.get("y") || "all");
  const [itemsPerPage, setItemsPerPage] = useState(
    Number(searchParams.get("ipp")) || 50
  );
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("p")) || 1
  );

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil((root?.data.total.value || 0) / itemsPerPage)),
    [root?.data.total.value, itemsPerPage]
  );

  useEffect(() => {
    const safePage = Math.min(Math.max(currentPage, 1), totalPages);

    // ✅ Cập nhật currentPage nếu vượt quá giới hạn
    if (safePage !== currentPage) {
      setCurrentPage(safePage);
      return; // Ngăn router.push xảy ra khi state đang cập nhật
    }

    const params = new URLSearchParams();
    if (year) params.set("y", year);
    if (itemsPerPage) params.set("ipp", itemsPerPage.toString());
    params.set("p", safePage.toString());

    const newParams = params.toString();
    const currentParams = searchParams.toString();

    if (newParams !== currentParams) {
      router.push(`${pathname}?${newParams}`);
    }
  }, [
    year,
    itemsPerPage,
    currentPage,
    totalPages,
    pathname,
    router,
    searchParams,
  ]);

  return (
    <div className="w-full max-w-4xl mx-auto px-2 py-4 z-50">
      <div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-zinc-800 rounded-lg text-zinc-100">
        {/* Left Controls */}
        <div className="flex items-center gap-2 text-xs">
          {/* Year */}
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="h-6 w-[80px] text-xs border-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {root?.doc_per_year.map((year) => (
                <SelectItem key={year.key_as_string} value={year.key_as_string}>
                  {year.key_as_string} ({year.doc_count})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="w-px h-4 bg-slate-200"></div>

          {/* Items per page */}
          <Select
            value={itemsPerPage.toString()}
            onValueChange={(v) => setItemsPerPage(Number(v))}
          >
            <SelectTrigger className="h-6 w-[68px] text-xs border-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {["10", "20", "50", "100"].map((val) => (
                <SelectItem key={val} value={val}>
                  {val}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Center Info */}
        <div className="text-xs font-mono">
          {currentPage}/{totalPages}
        </div>

        {/* Right Pagination */}
        <div className="flex items-center gap-0.5">
          <Button
            variant="ghost"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(1)}
            className="h-6 w-6 p-0"
          >
            <ChevronsLeft className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="h-6 w-6 p-0"
          >
            <ChevronLeft className="h-3 w-3" />
          </Button>

          {/* Pages */}
          <div className="flex gap-0.5 mx-1">
            {[
              currentPage - 2,
              currentPage - 1,
              currentPage,
              currentPage + 1,
              currentPage + 2,
            ]
              .filter((p) => p >= 1 && p <= totalPages)
              .map((p) => (
                <Button
                  key={p}
                  variant={currentPage === p ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setCurrentPage(p)}
                  className={`h-6 w-6 p-0 text-xs ${
                    currentPage === p
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "hover:bg-slate-100 hover:text-black"
                  }`}
                >
                  {p}
                </Button>
              ))}
          </div>

          <Button
            variant="ghost"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="h-6 w-6 p-0"
          >
            <ChevronRight className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(totalPages)}
            className="h-6 w-6 p-0"
          >
            <ChevronsRight className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}
