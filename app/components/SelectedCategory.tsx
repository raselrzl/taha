"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { categoryItems } from "../lib/categoryItems";
import Image from "next/image";
import { useState } from "react";

export function SelctetCategory() {
  const [selectedCategory, setSelectredCategory] = useState<string | undefined>(
    undefined
  );
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-8 mt-10 w-4/5 mx-auto mb-36 md:w-3/5">
      <input
        type="hidden"
        name="categoryName"
        value={selectedCategory ||"" as string}
      />
      {categoryItems.map((item) => (
        <div key={item.id} className="cursor-pointer text-xs md:text-base sm:text-base">
          <Card
            className={selectedCategory === item.name ? "border-primary" : ""}
            onClick={() => setSelectredCategory(item.name)}
          >
            <CardHeader>
              <Image
                src={item.imageUrl}
                alt={item.name}
                height={32}
                width={32}
                className="w-4 h-4 md:w-8 md:h-8"
              />

              <h3 className="font-bold">{item.title}</h3>
            </CardHeader>
          </Card>
        </div>
      ))}
    </div>
  );
}
