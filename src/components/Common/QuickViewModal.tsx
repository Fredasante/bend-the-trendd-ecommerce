"use client";
import React, { useEffect, useState } from "react";

import { useModalContext } from "@/app/context/QuickViewModalContext";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { addItemToCart } from "@/redux/features/cart-slice";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { usePreviewSlider } from "@/app/context/PreviewSliderContext";
import { resetQuickView } from "@/redux/features/quickView-slice";
import { updateproductDetails } from "@/redux/features/product-details";

const QuickViewModal = () => {
  const { isModalOpen, closeModal } = useModalContext();
  const { openPreviewModal } = usePreviewSlider();
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch<AppDispatch>();

  // get the product data
  const product = useAppSelector((state) => state.quickViewReducer.value);

  const [activePreview, setActivePreview] = useState(0);

  // preview modal
  const handlePreviewSlider = () => {
    dispatch(updateproductDetails(product));

    openPreviewModal();
  };

  // add to cart
  const handleAddToCart = () => {
    addItemToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      discountPrice: product.discountPrice,
      mainImageUrl: product.mainImageUrl || "",
      quantity,
    });
    closeModal();
  };

  useEffect(() => {
    // closing modal while clicking outside
    function handleClickOutside(event) {
      if (!event.target.closest(".modal-content")) {
        closeModal();
      }
    }

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);

      setQuantity(1);
    };
  }, [isModalOpen, closeModal]);

  return (
    <div
      className={`${
        isModalOpen ? "z-99999" : "hidden"
      } fixed top-0 left-0 overflow-y-auto no-scrollbar w-full h-screen sm:py-20 xl:py-25 2xl:py-[230px] bg-dark/70 sm:px-8 px-4 py-5`}
    >
      <div className="flex items-center justify-center ">
        <div className="w-full max-w-[1100px] rounded-xl shadow-3 bg-white p-7.5 relative modal-content">
          <button
            onClick={() => closeModal()}
            aria-label="button for close modal"
            className="absolute top-0 right-0 sm:top-6 sm:right-6 flex items-center justify-center w-10 h-10 rounded-full ease-in duration-150 bg-meta text-body hover:text-dark"
          >
            <svg
              className="fill-current"
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.3108 13L19.2291 8.08167C19.5866 7.72417 19.5866 7.12833 19.2291 6.77083C19.0543 6.59895 18.8189 6.50262 18.5737 6.50262C18.3285 6.50262 18.0932 6.59895 17.9183 6.77083L13 11.6892L8.08164 6.77083C7.90679 6.59895 7.67142 6.50262 7.42623 6.50262C7.18104 6.50262 6.94566 6.59895 6.77081 6.77083C6.41331 7.12833 6.41331 7.72417 6.77081 8.08167L11.6891 13L6.77081 17.9183C6.41331 18.2758 6.41331 18.8717 6.77081 19.2292C7.12831 19.5867 7.72414 19.5867 8.08164 19.2292L13 14.3108L17.9183 19.2292C18.2758 19.5867 18.8716 19.5867 19.2291 19.2292C19.5866 18.8717 19.5866 18.2758 19.2291 17.9183L14.3108 13Z"
                fill=""
              />
            </svg>
          </button>

          <div className="flex flex-wrap items-center gap-12.5">
            {/* Main Image */}
            <div className="max-w-[526px] w-full">
              <div className="relative z-1 overflow-hidden flex items-center justify-center w-full sm:min-h-[508px] bg-gray-1 rounded-lg border border-gray-3">
                <div>
                  <button
                    onClick={handlePreviewSlider}
                    aria-label="button for zoom"
                    className="gallery__Image w-10 h-10 rounded-[5px] bg-white shadow-1 flex items-center justify-center ease-out duration-200 text-dark hover:text-blue absolute top-4 lg:top-8 right-4 lg:right-8 z-50"
                  >
                    {/* Zoom Icon SVG */}
                  </button>

                  {product?.mainImageUrl ? (
                    <Image
                      src={product.mainImageUrl}
                      alt={product.name || "product-details"}
                      width={400}
                      height={400}
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-[400px] h-[400px] flex items-center justify-center bg-gray-200 rounded">
                      <span>No Image</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="max-w-[445px] w-full">
              <h3 className="font-semibold text-xl xl:text-heading-5 text-dark mb-4">
                {product.name || "Untitled Product"}
              </h3>

              <p>{product.description || "No description available."}</p>

              <div className="flex flex-wrap justify-between gap-5 mt-6 mb-7.5">
                <div>
                  <h4 className="font-semibold text-lg text-dark mb-3.5">
                    Price
                  </h4>
                  <span className="flex items-center gap-2">
                    <span className="font-semibold text-dark text-xl xl:text-heading-4">
                      ${product.discountPrice || product.price || "0.00"}
                    </span>
                    {product.discountPrice && (
                      <span className="font-medium text-dark-4 text-lg xl:text-2xl line-through">
                        ${product.price}
                      </span>
                    )}
                  </span>
                </div>

                <div>
                  <h4 className="font-semibold text-lg text-dark mb-3.5">
                    Quantity
                  </h4>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-20 h-10 rounded-[5px] border border-gray-4 bg-white font-medium text-dark">
                      {quantity}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={handleAddToCart}
                  className="inline-flex font-medium text-white bg-blue py-3 px-7 rounded-md hover:bg-blue-dark"
                >
                  Add to Cart
                </button>

                <button className="inline-flex items-center gap-2 font-medium text-white bg-dark py-3 px-6 rounded-md hover:bg-opacity-95">
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
