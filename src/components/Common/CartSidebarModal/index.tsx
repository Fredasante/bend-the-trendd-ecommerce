"use client";
import React, { useEffect } from "react";
import { useCartModalContext } from "@/app/context/CartSidebarModalContext";
import { useAppSelector } from "@/redux/store";
import { selectTotalPrice } from "@/redux/features/cart-slice";
import SingleItem from "./SingleItem";
import Link from "next/link";
import EmptyCart from "./EmptyCart";

const CartSidebarModal = () => {
  const { isCartModalOpen, closeCartModal } = useCartModalContext();
  const cartItems = useAppSelector((state) => state.cartReducer.items);
  const totalPrice = useAppSelector(selectTotalPrice);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        !event.target ||
        !(event.target as HTMLElement).closest(".modal-content")
      ) {
        closeCartModal();
      }
    }

    if (isCartModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCartModalOpen, closeCartModal]);

  const formatCedis = (amount: number) => `₵ ${amount.toFixed(2)}`;

  return (
    <div
      className={`fixed top-0 left-0 z-99999 overflow-y-auto no-scrollbar w-full h-screen bg-dark/70 ease-linear duration-300 ${
        isCartModalOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-end">
        <div className="w-full max-w-[500px] shadow-1 bg-white px-4 sm:px-7.5 lg:px-11 relative modal-content">
          {/* Header */}
          <div className="sticky top-0 bg-white flex items-center justify-between pb-7 pt-4 sm:pt-7.5 lg:pt-11 border-b border-gray-3 mb-7.5">
            <h2 className="font-medium text-dark text-lg sm:text-2xl">
              Cart View
            </h2>
            <button
              onClick={closeCartModal}
              aria-label="Close cart modal"
              className="flex items-center justify-center ease-in duration-150 bg-meta text-dark-5 hover:text-dark"
            >
              ✕
            </button>
          </div>

          {/* Cart Items */}
          <div className="h-[66vh] overflow-y-auto no-scrollbar">
            <div className="flex flex-col gap-6">
              {cartItems.length > 0 ? (
                cartItems.map((item, index) => (
                  <SingleItem key={item._id || index} item={item} />
                ))
              ) : (
                <EmptyCart />
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-3 bg-white pt-5 pb-4 sm:pb-7.5 lg:pb-11 mt-7.5 sticky bottom-0">
            <div className="flex items-center justify-between gap-5 mb-6">
              <p className="font-medium text-xl text-dark">Subtotal:</p>
              <p className="font-medium text-xl text-dark">
                {formatCedis(totalPrice)}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Link
                onClick={closeCartModal}
                href="/cart"
                className="w-full flex justify-center font-medium text-white bg-blue py-[13px] px-6 rounded-md ease-out duration-200 hover:bg-blue-dark"
              >
                View Cart
              </Link>

              <Link
                href="/checkout"
                className="w-full flex justify-center font-medium text-white bg-dark py-[13px] px-6 rounded-md ease-out duration-200 hover:bg-opacity-95"
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSidebarModal;
