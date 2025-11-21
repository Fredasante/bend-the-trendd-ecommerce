import React from "react";
import Checkout from "@/components/Checkout";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout | Bend the Trendd",
  description:
    "Complete your purchase securely and effortlessly on Bend the Trendd. Review your items and finalize your order today!",
  robots: {
    index: false,
    follow: false,
  },
};

const CheckoutPage = () => {
  return (
    <main>
      <Checkout />
    </main>
  );
};

export default CheckoutPage;
