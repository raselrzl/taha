"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import { categoryItems } from "../lib/categoryItems";

export function MapFilterItems() {
  const searchParams = useSearchParams();
  const search = searchParams.get("filter");
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      containerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative">
      {/* Container: Scrollable with visible scrollbar */}
      <div
        className="flex gap-x-10 mt-5 w-full overflow-x-scroll px-12 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
        ref={containerRef}
      >
        {categoryItems.map((item) => (
          <Link
            key={item.id}
            href={pathname + "?" + createQueryString("filter", item.name)}
            className={cn(
              search === item.name
                ? "border-b-2 border-black pb-2 flex-shrink-0"
                : "opacity-70 flex-shrink-0",
              "flex flex-col gap-y-3 items-center mb-2"
            )}
          >
            <div className="relative w-6 h-6">
              <Image
                src={item.imageUrl}
                alt="Category image"
                className="w-6 h-6"
                width={24}
                height={24}
              />
            </div>
            <p className="text-xs font-medium">{item.title}</p>
          </Link>
        ))}
      </div>

      {/* Left Scroll Button */}
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10"
        onClick={() => scroll("left")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Right Scroll Button */}
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10"
        onClick={() => scroll("right")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
}
