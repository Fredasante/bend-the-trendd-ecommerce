import React from "react";
import { Wishlist } from "@/components/Wishlist";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wishlist | Bend the Trendd",
  description:
    "View and manage your favorite products saved on Bend the Trendd.",
  robots: {
    index: false,
    follow: false,
  },
};

const WishlistPage = () => {
  return (
    <main>
      <Wishlist />
    </main>
  );
};

export default WishlistPage;
