"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Product } from "@/types/product";
import { PortableText } from "@portabletext/react";

interface ShopDetailsProps {
  product: Product;
}

const ShopDetails = ({ product }: ShopDetailsProps) => {
  const [activeColor, setActiveColor] = useState(product.colors?.[0] || "");
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");
  const [mainImage, setMainImage] = useState(product.mainImageUrl || "");

  const isAvailable = product.status === "available";
  const hasDiscount =
    product.discountPrice && product.discountPrice > product.price;
  const discountPercentage = hasDiscount
    ? Math.round(
        ((product.discountPrice - product.price) / product.discountPrice) * 100
      )
    : 0;

  return (
    <div className="bg-gray-100 pt-40 xl:pt-50 bg-[#f3f4f6] pb-7 px-3">
      <div className="container px-4 py-8 max-w-[1170px] w-full mx-auto">
        <div className="flex flex-wrap -mx-4">
          {/* Product Images */}
          <div className="w-full md:w-1/2 lg:w-[38%] px-4 mb-8">
            <div className="relative w-full max-w-md rounded-lg shadow-md mb-4 bg-white p-4">
              <Image
                src={mainImage || "/placeholder.jpg"}
                alt={product.name}
                width={400}
                height={400}
                className="w-full h-auto rounded-lg object-contain"
              />
            </div>

            {product.gallery && product.gallery.length > 0 && (
              <div className="flex gap-4 py-4 justify-center overflow-x-auto">
                {/* Main image thumbnail */}
                <Image
                  src={product.mainImageUrl || "/placeholder.jpg"}
                  alt={product.name}
                  width={80}
                  height={80}
                  className={`size-16 sm:size-20 object-cover rounded-md cursor-pointer transition duration-300 ${
                    mainImage === product.mainImageUrl
                      ? "opacity-100 ring-2 ring-blue"
                      : "opacity-60 hover:opacity-100"
                  }`}
                  onClick={() => setMainImage(product.mainImageUrl || "")}
                />
                {/* Gallery thumbnails */}
                {product.gallery.map((img, idx) => (
                  <Image
                    key={idx}
                    src={img.imageUrl}
                    alt={`${product.name} view ${idx + 1}`}
                    width={80}
                    height={80}
                    className={`size-16 sm:size-20 object-cover rounded-md cursor-pointer transition duration-300 ${
                      mainImage === img.imageUrl
                        ? "opacity-100 ring-2 ring-blue"
                        : "opacity-60 hover:opacity-100"
                    }`}
                    onClick={() => setMainImage(img.imageUrl)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="w-full md:w-1/2 lg:w-[60%] px-4">
            <h2 className="text-3xl font-bold mb-2 text-dark">
              {product.name}
            </h2>
            <p className="text-gray-600 mb-4">
              Status:{" "}
              <span
                className={`font-semibold ${
                  isAvailable ? "text-green" : "text-red"
                }`}
              >
                {isAvailable ? "In Stock" : "Sold Out"}
              </span>
            </p>

            <div className="mb-4">
              <span className="text-2xl font-bold mr-2 text-dark">
                ₵{product.price.toFixed(2)}
              </span>
              {hasDiscount && (
                <>
                  <span className="text-gray-500 line-through">
                    ₵{product.discountPrice?.toFixed(2)}
                  </span>
                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-blue text-white">
                    {Math.abs(discountPercentage)}% OFF
                  </span>
                </>
              )}
            </div>

            {product.description && Array.isArray(product.description) && (
              <div className="text-gray-700 mb-6 prose prose-sm max-w-none">
                <PortableText value={product.description} />
              </div>
            )}

            {/* Color, Size, and Quantity in flex row */}
            <div className="flex flex-wrap items-center gap-6 mb-6">
              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold text-dark whitespace-nowrap">
                    Color:
                  </h3>
                  <div className="flex space-x-2">
                    {product.colors.map((color, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveColor(color)}
                        className={`w-7 h-7 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all 
                        }`}
                        style={{ backgroundColor: color.toLowerCase() }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold text-dark whitespace-nowrap">
                    Size:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-1 border rounded-md transition-all ${
                          selectedSize === size
                            ? "bg-blue text-white border-blue"
                            : "bg-white text-dark border-gray-300 hover:border-blue"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="flex gap-3">
                <h3 className="text-lg font-semibold text-gray-800">
                  Quantity:
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="px-3 py-1 rounded-md border border-slate-100 bg-white text-black font-medium shadow-sm hover:border-blue-400 transition-all cursor-not-allowed"
                    disabled
                  >
                    1
                  </button>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="border-t pt-6">
              <p className="text-sm text-gray-600">
                Delivery fee not included in total price
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopDetails;
