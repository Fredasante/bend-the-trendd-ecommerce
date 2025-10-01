import React from "react";
import Link from "next/link";
import { useCartModalContext } from "@/app/context/CartSidebarModalContext";

const EmptyCart = () => {
  const { closeCartModal } = useCartModalContext();

  return (
    <div className="text-center">
      <div className="mx-auto pb-7.5">
        <svg
          className="mx-auto"
          width="100"
          height="100"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="50" fill="#F3F4F6" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M36.1693 36.2421C35.6126 36.0565..."
            fill="#8D93A5"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M40.4375 60.625C40.4375 62.3855..."
            fill="#8D93A5"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M56.375 63.8126C54.6146 63.8126..."
            fill="#8D93A5"
          />
        </svg>
      </div>

      <p className="pb-6">Your cart is empty!</p>

      <Link
        onClick={() => closeCartModal()}
        href="/shop-with-sidebar"
        className="w-full lg:w-10/12 mx-auto flex justify-center font-medium text-white bg-dark py-[13px] px-6 rounded-md ease-out duration-200 hover:bg-opacity-95"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default EmptyCart;
