import React, { Suspense } from "react";
import ShopWithSidebar from "@/components/ShopWithSidebar";
import { Metadata } from "next";
import LoadingFallback from "@/components/Common/LoadingFallback";

export const metadata: Metadata = {
  title: "Shop | Bend The Trend",
  description:
    "Discover the latest fashion, sneakers, slippers, and gadgets at Bend The Trend. Shop our exclusive collection of stylish products at great prices.",
  keywords: [
    "Bend The Trend",
    "Online Shop",
    "Fashion",
    "Sneakers",
    "Slippers",
    "Clothing",
    "Gadgets",
    "Women's Fashion",
    "Men's Fashion",
    "Affordable Fashion Ghana",
  ],
  openGraph: {
    title: "Shop | Bend The Trendd",
    description:
      "Explore trendy clothing, sneakers, slippers, and more — only at Bend The Trend.",
    url: "https://bendthetrendd.com/shop", // to be replaced with actual domain
    siteName: "Bend The Trend",
    type: "website",
  },
};

const ShopPage = () => {
  return (
    <main>
      <Suspense fallback={<LoadingFallback />}>
        <ShopWithSidebar />
      </Suspense>
    </main>
  );
};

export default ShopPage;
