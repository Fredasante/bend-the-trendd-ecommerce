"use client";
import React from "react";
import Image from "next/image";
import { Product } from "@/types/product";
import { useModalContext } from "@/app/context/QuickViewModalContext";
import { updateQuickView } from "@/redux/features/quickView-slice";
import { addItemToCart } from "@/redux/features/cart-slice";
import { addItemToWishlist } from "@/redux/features/wishlist-slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import Link from "next/link";
import { updateProductDetails } from "@/redux/features/product-details";
import StarRating from "./StarRating";
import { Eye, Heart } from "lucide-react";
import { toast } from "sonner";

const ProductItem = ({ item }: { item: Product }) => {
  const { openModal } = useModalContext();

  const dispatch = useDispatch<AppDispatch>();

  // update the QuickView state
  const handleQuickViewUpdate = () => {
    dispatch(updateQuickView({ ...item }));
  };

  // add to cart
  const handleAddToCart = () => {
    const selectedSize = item.sizes?.[0] || null;
    const selectedColor = item.colors?.[0] || null;

    dispatch(
      addItemToCart({
        ...item,
        quantity: 1,
        size: selectedSize,
        color: selectedColor,
      })
    );
    toast.success("Added to cart!");
  };

  const handleItemToWishList = () => {
    dispatch(
      addItemToWishlist({
        ...item,
        status: "available",
        quantity: 1,
      })
    );
    toast.success("Added to wishlist!");
  };

  const handleProductDetails = () => {
    dispatch(updateProductDetails({ ...item }));
  };

  return (
    <div className="group">
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg bg-white shadow-1 mb-4 flex items-center justify-center">
        <Image
          src={item.mainImageUrl || "/images/placeholder.png"}
          alt={item.name || "Product image"}
          fill
          className="object-contain object-center p-3"
        />

        <div className="absolute left-0 bottom-0 translate-y-full w-full flex items-center justify-center gap-2.5 pb-5 ease-linear duration-200 group-hover:translate-y-0">
          <button
            onClick={() => {
              openModal();
              handleQuickViewUpdate();
            }}
            id="newOne"
            aria-label="button for quick view"
            className="flex items-center justify-center w-9 h-9 rounded-[5px] shadow-1 ease-out duration-200 text-dark bg-white hover:text-blue"
          >
            <Eye className="w-4 h-4" />
          </button>

          <button
            onClick={() => handleAddToCart()}
            className="inline-flex font-medium text-custom-sm py-[4px] md:py-[7px] px-1.5 md:px-5 rounded-[5px] bg-blue text-white ease-out duration-200 hover:bg-blue-dark"
          >
            Add to cart
          </button>

          <button
            onClick={() => handleItemToWishList()}
            aria-label="button for favorite select"
            id="favOne"
            className="flex items-center justify-center w-9 h-9 rounded-[5px] shadow-1 ease-out duration-200 text-dark bg-white hover:text-blue"
          >
            <Heart className="w-4 h-4" />
          </button>
        </div>
      </div>

      <StarRating />

      <h3
        className="font-medium text-dark ease-out duration-200 hover:text-blue mb-1.5"
        onClick={() => handleProductDetails()}
      >
        <Link href={`/shop/${item.slug.current}`} className="line-clamp-1">
          {item.name}
        </Link>
      </h3>

      <span className="flex items-center gap-2 font-medium text-lg">
        {item.discountPrice && item.discountPrice > 0 ? (
          <>
            <span className="text-dark">₵{item.discountPrice}</span>
            <span className="text-dark-4 line-through">₵{item.price}</span>
          </>
        ) : (
          <span className="text-dark">₵{item.price}</span>
        )}
      </span>
    </div>
  );
};

export default ProductItem;
