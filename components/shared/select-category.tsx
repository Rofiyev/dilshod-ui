"use client";

import { useCallback, useState } from "react";
import { categoryItems } from "@/constants";
import { Card, CardHeader } from "@/components/ui/card";
import type { ICategoryItem } from "@/types";
import Image from "next/image";
import { cn } from "@/lib/utils";

const SelectCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleClick = useCallback((name: string) => {
    setSelectedCategory(name);
  }, []);

  return (
    <div
      className="
      grid
      grid-cols-1
      sm:grid-cols-2
      md:grid-cols-3
      gap-4
      "
    >
      <input type="hidden" name="category" value={selectedCategory} />
      {categoryItems.map(({ id, image, name, title }: ICategoryItem) => (
        <div key={`Category-item-${id}`} className="cursor-pointer">
          <Card
            onClick={() => handleClick(name)}
            className={cn(
              "border-2",
              selectedCategory === name && "border-sky-600"
            )}
          >
            <CardHeader>
              <Image
                src={image}
                alt={title}
                width={20}
                height={20}
                className="object-cover"
              />
              <h3 className="font-medium">{title}</h3>
            </CardHeader>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default SelectCategory;
