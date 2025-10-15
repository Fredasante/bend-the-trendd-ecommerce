"use client";

import React from "react";
import { Product } from "@/types/product";
import { useModalContext } from "@/app/context/QuickViewModalContext";
import { updateQuickView } from "@/redux/features/quickView-slice";
import { addItemToCart } from "@/redux/features/cart-slice";
import { addItemToWishlist } from "@/redux/features/wishlist-slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import Link from "next/link";
import Image from "next/image";
import { Eye, Heart } from "lucide-react";
import StarRating from "../Common/StarRating";

const SingleGridItem = ({ item }: { item: Product }) => {
  const { openModal } = useModalContext();
  const dispatch = useDispatch<AppDispatch>();

  // 🟢 Update QuickView
  const handleQuickViewUpdate = () => {
    dispatch(updateQuickView({ ...item }));
  };

  // 🛒 Add to Cart
  const handleAddToCart = () => {
    dispatch(
      addItemToCart({
        _id: item._id,
        name: item.name,
        price: item.price,
        discountPrice: item.discountPrice,
        mainImageUrl: item.mainImageUrl || "",
        quantity: 1,
      })
    );
  };

  // 💖 Add to Wishlist
  const handleItemToWishList = () => {
    dispatch(
      addItemToWishlist({
        ...item,
        status: "available",
        quantity: 1,
      })
    );
  };

  return (
    <div className="group">
      <div className="relative overflow-hidden flex items-center justify-center rounded-lg bg-white shadow-1 w-full aspect-square sm:aspect-[250/270] mb-4">
        {/* ✅ Fallback for missing image */}
        <Image
          src={item.mainImageUrl || "/images/placeholder.png"}
          alt={item.name || "Product image"}
          fill
          className="object-contain"
        />

        {/* Hover buttons */}
        <div className="absolute left-0 bottom-0 translate-y-full w-full flex items-center justify-center gap-2.5 pb-5 ease-linear duration-200 group-hover:translate-y-0">
          {/* Quick View */}
          <button
            onClick={() => {
              openModal();
              handleQuickViewUpdate();
            }}
            aria-label="Quick view product"
            className="flex items-center justify-center w-9 h-9 rounded-[5px] shadow-1 ease-out duration-200 text-dark bg-white hover:text-blue"
          >
            <Eye className="w-4 h-4" />
          </button>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="inline-flex font-medium text-custom-sm py-[7px] px-5 rounded-[5px] bg-blue text-white ease-out duration-200 hover:bg-blue-dark"
          >
            Add to cart
          </button>

          {/* Add to Wishlist */}
          <button
            onClick={handleItemToWishList}
            aria-label="Add to wishlist"
            className="flex items-center justify-center w-9 h-9 rounded-[5px] shadow-1 ease-out duration-200 text-dark bg-white hover:text-blue"
          >
            <Heart className="w-4 h-4" />
          </button>
        </div>
      </div>

      <StarRating />

      {/* Product title */}
      <h3 className="font-medium text-dark ease-out duration-200 hover:text-blue mb-1.5 line-clamp-1">
        <Link href={`/shop/${item.slug?.current || item.slug}`}>
          {item.name}
        </Link>
      </h3>

      {/* Price */}
      <span className="flex items-center gap-2 font-medium text-lg">
        <span className="text-dark">₵{item.discountPrice ?? item.price}</span>
        {item.discountPrice && (
          <span className="text-dark-4 line-through">₵{item.price}</span>
        )}
      </span>
    </div>
  );
};

export default SingleGridItem;
