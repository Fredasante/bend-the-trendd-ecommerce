"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Category {
  id: string;
  title: string;
  value: string;
  image: string;
}

const categories: Category[] = [
  {
    id: "1",
    title: "Accessories",
    value: "acessories", // Matching your Sanity schema typo
    image: "/images/categories/accessories.jpg",
  },
  {
    id: "2",
    title: "Clothing",
    value: "clothing",
    image: "/images/categories/clothing.jpg",
  },
  {
    id: "3",
    title: "Bags",
    value: "bags",
    image: "/images/categories/bags.jpg",
  },
  {
    id: "4",
    title: "Shoes",
    value: "shoes",
    image: "/images/categories/shoes.jpg",
  },
];

export default function CategoryGrid() {
  const router = useRouter();

  const handleCategoryClick = (categoryValue: string) => {
    // Navigate to search page with category filter
    router.push(`/search?category=${categoryValue}`);
  };

  return (
    <section className="py-12 lg:py-20 bg-[#fef4f4]">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <div className="text-center mb-10">
          <h2 className="text-[26px] md:text-3xl lg:text-4xl font-bold text-dark mb-2.5">
            Shop by Category
          </h2>
          <p className="text-gray-600 text-base md:text-lg text-gray-600">
            Browse our collection by category
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.value)}
              className="group relative cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-[3/4] bg-gray-200">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium uppercase tracking-wider rounded mb-2">
                    {category.title}
                  </span>
                  <h3 className="text-white text-xl lg:text-2xl font-bold">
                    {category.title}
                  </h3>
                </div>
              </div>

              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#007782] transition-colors duration-300 rounded-lg pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
