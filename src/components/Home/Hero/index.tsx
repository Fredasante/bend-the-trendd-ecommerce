"use client";

import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <>
      <section className="relative h-screen min-h-[600px] w-full overflow-hidden">
        {/* Background Image with sepia/brown tone overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/model-2.jpg"
            alt="Hero background - Fashion collection"
            fill
            className="object-cover object-center"
            priority
            quality={95}
          />
          {/* Brown/sepia overlay to match StaySixteen aesthetic */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-amber-950/40 to-black/60"></div>
        </div>

        {/* Content Container - Centered */}
        <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-5xl mx-auto pt-15">
            {/* Main Heading - Large, Bold, Centered */}
            <h1 className="mb-8 text-white">
              <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-none">
                The Curated Luxe Edit
              </span>
            </h1>

            {/* CTA Button - White background, centered */}
            <Link
              href="/shop"
              className="inline-block bg-white text-black px-10 sm:px-12 py-3.5 sm:py-4 text-sm sm:text-base font-medium uppercase tracking-wider hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Shop Now
            </Link>
          </div>
        </div>

        {/* Optional: Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="animate-bounce">
            <svg
              className="w-6 h-6 text-white/80"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
