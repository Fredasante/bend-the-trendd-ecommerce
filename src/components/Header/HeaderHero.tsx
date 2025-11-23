"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { menuData } from "./menuData";
import { useAppSelector } from "@/redux/store";
import { useSelector } from "react-redux";
import { selectTotalPrice } from "@/redux/features/cart-slice";
import { useCartModalContext } from "@/app/context/CartSidebarModalContext";
import Image from "next/image";
import AuthDropdown from "../Auth/AuthDropdown";
import { useUser } from "@clerk/nextjs";
import {
  Search,
  X,
  Menu as MenuIcon,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const HeaderNew = () => {
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);
  const { openCartModal } = useCartModalContext();
  const navRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const product = useAppSelector((state) => state.cartReducer.items);
  const totalPrice = useSelector(selectTotalPrice);
  const { user, isSignedIn } = useUser();

  const handleOpenCartModal = () => {
    openCartModal();
  };

  // Close mobile nav
  const closeNavigation = () => {
    setNavigationOpen(false);
  };

  // Sticky menu
  const handleStickyMenu = () => {
    if (window.scrollY >= 80) {
      setStickyMenu(true);
    } else {
      setStickyMenu(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyMenu);

    // Close navigation when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navigationOpen &&
        navRef.current &&
        !navRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest("#Toggle")
      ) {
        closeNavigation();
      }

      // Close search when clicking outside
      if (
        searchOpen &&
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearchOpen(false);
      }
    };

    if (navigationOpen || searchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      window.removeEventListener("scroll", handleStickyMenu);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navigationOpen, searchOpen]);

  // Split menu items for left and right of logo (adjust based on your menuData length)
  const leftMenuItems = menuData.slice(0, 3);
  const rightMenuItems = menuData.slice(3);

  return (
    <header className="fixed left-0 top-0 w-full z-9999 transition-all ease-in-out duration-300 bg-[#382423] backdrop-blur-sm">
      {/* Announcement Bar */}
      <div className="bg-[#fee3e3] text-black text-center py-2.5 text-xs sm:text-sm border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 flex items-center justify-center gap-4">
          <button
            className="hover:opacity-75 transition-opacity hidden sm:block"
            aria-label="Previous announcement"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="tracking-wide text-xs uppercase">
            Standard Delivery Within 1 to 2 Working Days
          </span>
          <button
            className="hover:opacity-75 transition-opacity hidden sm:block"
            aria-label="Next announcement"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-7.5 xl:px-8">
        <div className="flex items-center justify-between py-4 sm:py-5">
          {/* Left: Search Icon + Left Menu Items (Desktop) */}
          <div className="flex items-center gap-6 lg:gap-8">
            {/* Search Icon */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="transition-colors text-white hover:text-gray-200 "
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Left Navigation - Desktop Only */}
            <nav className="hidden xl:flex items-center gap-6">
              {leftMenuItems.map((menuItem, i) => (
                <Link
                  key={i}
                  href={menuItem.path}
                  className="text-sm font-medium uppercase tracking-wider transition-colors text-white hover:text-gray-200"
                >
                  {menuItem.title}
                </Link>
              ))}
            </nav>
          </div>

          {/* Center: Logo */}
          <Link
            href="/"
            className="flex-shrink-0 absolute left-1/2 -translate-x-1/2"
          >
            <Image
              src="/bend-the-trendd-logo.png"
              alt="Bend the Trendd Logo"
              width={100}
              height={30}
              className="transition-all"
            />
          </Link>

          {/* Right: Right Menu Items + Auth + Cart (Desktop) / Mobile Menu */}
          <div className="flex items-center gap-5 lg:gap-8">
            {/* Right Navigation - Desktop Only */}
            <nav className="hidden xl:flex items-center gap-6">
              {rightMenuItems.map((menuItem, i) => (
                <Link
                  key={i}
                  href={menuItem.path}
                  className="text-sm font-medium uppercase tracking-wider transition-colors text-white hover:text-gray-200"
                >
                  {menuItem.title}
                </Link>
              ))}
            </nav>

            {/* Auth Dropdown */}
            <div className="hidden sm:block">
              <AuthDropdown user={user} isSignedIn={isSignedIn} />
            </div>

            {/* Cart */}
            <button
              onClick={handleOpenCartModal}
              className="relative transition-colors text-white hover:text-gray-200"
              aria-label="Shopping cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {product.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-[#382423] text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {product.length}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              id="Toggle"
              aria-label="Toggle menu"
              className="xl:hidden transition-colors text-white"
              onClick={() => setNavigationOpen(!navigationOpen)}
            >
              {navigationOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <MenuIcon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Search Dropdown */}
      {searchOpen && (
        <div
          ref={searchRef}
          className="bg-white border-t border-gray-200 shadow-lg"
        >
          <div className="max-w-[1440px] mx-auto px-4 sm:px-7.5 xl:px-8 py-6">
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full px-6 py-4 border-2 border-gray-300 rounded-full text-base focus:outline-none focus:border-[#007782] transition-colors"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const query = (e.target as HTMLInputElement).value;
                      if (query.trim()) {
                        window.location.href = `/search?q=${encodeURIComponent(query)}`;
                      }
                    }
                  }}
                />
                <button
                  onClick={() => {
                    const input = searchRef.current?.querySelector("input");
                    const query = input?.value;
                    if (query?.trim()) {
                      window.location.href = `/shop?search=${encodeURIComponent(query)}`;
                    }
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#007782] text-white px-6 py-2 rounded-full hover:bg-[#006670] transition-colors text-sm font-medium"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Navigation */}
      {navigationOpen && (
        <div
          ref={navRef}
          className="xl:hidden bg-white border-t border-gray-200 shadow-lg"
        >
          <nav className="max-w-[1440px] mx-auto px-4 py-4">
            <ul className="space-y-1">
              {menuData.map((menuItem, i) => (
                <li key={i}>
                  <Link
                    href={menuItem.path}
                    onClick={closeNavigation}
                    className="block text-sm font-medium uppercase tracking-wide text-gray-900 hover:text-white/90 hover:bg-gray-50 py-3 px-4 rounded transition-colors"
                  >
                    {menuItem.title}
                  </Link>
                </li>
              ))}
              <li className="pt-4 border-t border-gray-200 sm:hidden">
                <div className="px-4 py-3">
                  <AuthDropdown user={user} isSignedIn={isSignedIn} />
                </div>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default HeaderNew;
