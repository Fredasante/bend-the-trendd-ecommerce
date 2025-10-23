"use client";
import React, { useState } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import Shipping from "./Shipping";
import ShippingMethod from "./ShippingMethod";
import PaymentMethod from "./PaymentMethod";
import Coupon from "./Coupon";
import Billing from "./Billing";
import { useAppSelector } from "@/redux/store";
import { useSelector } from "react-redux";
import { selectCartItems, selectTotalPrice } from "@/redux/features/cart-slice";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { ClipLoader } from "react-spinners";

const Checkout = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const cartItems = useAppSelector(selectCartItems);
  const subtotal = useSelector(selectTotalPrice);
  const [shippingFee] = useState(15.0);
  const [discount, setDiscount] = useState(0);
  const [checkoutMode, setCheckoutMode] = useState<"guest" | "account">(
    isSignedIn ? "account" : "guest"
  );

  // Calculate total
  const total = subtotal + shippingFee - discount;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(e.target as HTMLFormElement);
    const orderData = {
      // Customer info
      fullName: formData.get("fullName"),
      phone: formData.get("phone"),
      email: formData.get("email") || user?.primaryEmailAddress?.emailAddress,

      // Delivery info
      region: formData.get("region"),
      city: formData.get("city"),
      address: formData.get("address"),
      notes: formData.get("notes"),

      // Order details
      items: cartItems,
      subtotal,
      shippingFee,
      discount,
      total,

      // User info
      userId: user?.id || null,
      checkoutMode,
      createAccount: formData.get("createAccount") === "on",
    };

    console.log("Processing order:", orderData);

    // TODO:
    // 1. Create order in Sanity
    // 2. If guest + createAccount checked, create Clerk account
    // 3. Process payment (MoMo/Card)
    // 4. Send confirmation email/SMS
    // 5. Clear cart and redirect to success page
  };

  // Show loading while checking authentication
  if (!isLoaded) {
    return (
      <>
        <Breadcrumb title={"Checkout"} pages={["checkout"]} />
        <section className="overflow-hidden py-20 bg-gray-2">
          <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
            <div className="flex justify-center items-center min-h-[400px]">
              <ClipLoader size={33} color="#000080" />
            </div>
          </div>
        </section>
      </>
    );
  }

  // If cart is empty, show message
  if (cartItems.length === 0) {
    return (
      <>
        <Breadcrumb title={"Checkout"} pages={["checkout"]} />
        <section className="overflow-hidden py-20 bg-gray-2">
          <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
            <div className="bg-white shadow-1 rounded-[10px] p-8 text-center">
              <h3 className="text-2xl font-semibold mb-4">
                Your cart is empty
              </h3>
              <p className="text-gray-600 mb-6">
                Add some products to your cart before proceeding to checkout.
              </p>
              <Link
                href="/shop"
                className="inline-block font-medium text-white bg-blue py-3 px-8 rounded-md ease-out duration-200 hover:bg-blue-dark"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Breadcrumb title={"Checkout"} pages={["checkout"]} />
      <section className="overflow-hidden py-10 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          {/* Account Status Banner */}
          {!isSignedIn && (
            <div className="bg-white border border-slate-50 shadow-sm rounded-lg p-5 mb-7.5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-4">
                <div className="flex-1 mt-2">
                  <h3 className="font-semibold text-dark mb-1.5">
                    Checkout as Guest or Sign In
                  </h3>
                  <p className="text-sm text-gray-600">
                    You can complete your order as a guest, or sign in to track
                    orders and save your details
                  </p>
                </div>

                <div className="flex flex-wrap gap-2.5 sm:gap-3 mt-2">
                  <Link
                    href="/signin?redirect_url=/checkout"
                    className="inline-flex font-medium text-white bg-blue py-2.5 px-4.5 text-sm sm:text-base rounded-md hover:bg-blue-dark transition-colors"
                  >
                    Sign In
                  </Link>

                  <Link
                    href="/signup?redirect_url=/checkout"
                    className="inline-flex items-center gap-2 font-medium text-white bg-dark py-2.5 px-4.5 text-sm sm:text-base rounded-md hover:bg-opacity-95 transition-colors"
                  >
                    Create Account
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Signed In User Welcome */}
          {isSignedIn && user && (
            <div className="bg-green-light-6 border border-green-light-4 rounded-lg p-5 mb-7.5">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-dark mb-1">
                    Welcome back, {user.firstName || user.username}!
                  </h3>
                  <p className="text-sm text-gray-600">
                    You&apos;re signed in. Your order will be saved to your
                    account.
                  </p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col lg:flex-row gap-7.5 xl:gap-11">
              {/* Checkout Left */}
              <div className="lg:max-w-[670px] w-full">
                <Billing isGuest={!isSignedIn} />

                {/* Order Notes */}
                <div className="bg-white shadow-1 rounded-[10px] p-4 sm:p-8.5 mt-7.5">
                  <div>
                    <label htmlFor="notes" className="block mb-2.5">
                      Order Notes{" "}
                      <span className="text-dark-5">(Optional)</span>
                    </label>
                    <textarea
                      name="notes"
                      id="notes"
                      rows={4}
                      placeholder="Any special instructions for your order? (e.g., preferred delivery time, gate color, etc.)"
                      className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full p-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                    />
                  </div>
                </div>
              </div>

              {/* Checkout Right - Order Summary */}
              <div className="max-w-[455px] w-full mt-5 lg:mt-20">
                <div className="bg-white shadow-1 rounded-[10px]">
                  <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
                    <h3 className="font-medium text-xl text-dark">
                      Order Summary
                    </h3>
                  </div>

                  <div className="pt-2.5 pb-8.5 px-4 sm:px-8.5">
                    <div className="flex items-center justify-between py-5 border-b border-gray-3">
                      <h4 className="font-medium text-dark">Product</h4>
                      <h4 className="font-medium text-dark">Subtotal</h4>
                    </div>

                    {/* Cart Items */}
                    {cartItems.map((item) => {
                      const itemPrice = item.discountPrice ?? item.price;
                      const itemTotal = itemPrice * item.quantity;

                      return (
                        <div
                          key={item._id}
                          className="flex items-center justify-between gap-4 py-5 border-b border-gray-3"
                        >
                          <div className="flex items-center gap-3 flex-1">
                            {item.mainImageUrl && (
                              <div className="relative w-12 h-12 flex-shrink-0">
                                <Image
                                  src={item.mainImageUrl}
                                  alt={item.name}
                                  fill
                                  className="object-cover rounded"
                                />
                              </div>
                            )}
                            <div className="flex-1">
                              <p className="text-dark text-sm font-medium">
                                {item.name}
                              </p>
                              {item.quantity > 1 && (
                                <p className="text-xs text-gray-600">
                                  ₵{itemPrice.toFixed(2)} × {item.quantity}
                                </p>
                              )}
                            </div>
                          </div>
                          <p className="text-dark font-medium">
                            ₵{itemTotal.toFixed(2)}
                          </p>
                        </div>
                      );
                    })}

                    {/* Subtotal */}
                    <div className="flex items-center justify-between py-5 border-b border-gray-3">
                      <p className="text-dark">Subtotal</p>
                      <p className="text-dark">₵{subtotal.toFixed(2)}</p>
                    </div>

                    {/* Shipping Fee */}
                    <div className="flex items-center justify-between py-5 border-b border-gray-3">
                      <p className="text-dark">Delivery Fee</p>
                      <p className="text-dark">₵{shippingFee.toFixed(2)}</p>
                    </div>

                    {/* Discount */}
                    {discount > 0 && (
                      <div className="flex items-center justify-between py-5 border-b border-gray-3">
                        <p className="text-green-600">Discount</p>
                        <p className="text-green-600">
                          -₵{discount.toFixed(2)}
                        </p>
                      </div>
                    )}

                    {/* Total */}
                    <div className="flex items-center justify-between pt-5">
                      <p className="font-semibold text-lg text-dark">Total</p>
                      <p className="font-semibold text-lg text-dark">
                        ₵{total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>

                <Coupon onApplyCoupon={setDiscount} />

                <PaymentMethod />

                <button
                  type="submit"
                  className="w-full flex justify-center font-medium text-white bg-blue py-3.5 px-6 rounded-md ease-out duration-200 hover:bg-blue-dark mt-7.5"
                >
                  Complete Order
                </button>

                <p className="text-xs text-center text-gray-600 mt-4">
                  By placing your order, you agree to our terms and conditions
                </p>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Checkout;
