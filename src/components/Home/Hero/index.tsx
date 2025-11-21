"use client";

import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <>
      <div className="overflow-hidden pb-10 lg:pb-12.5 pt-40 lg:pt-30 xl:pt-45 bg-[#ECEFF1]">
        <div className="max-w-[1170px] w-full mx-auto px-2 sm:px-8 xl:px-0">
          <div className="relative bg-white py-6 px-2 md:p-8 lg:p-12 rounded-lg shadow-sm overflow-hidden">
            {/* Background image spanning the white container */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/woman-1.png"
                alt="hero background"
                fill
                className="object-cover object-center"
                priority
              />
              {/* Dark overlay for better text readability */}
              <div className="absolute inset-0 bg-black/30"></div>
            </div>

            {/* Content on top */}
            <div className="relative z-10 container">
              <div className="-mx-4 flex flex-wrap">
                <div className="w-full px-4 lg:w-5/12">
                  <div className="hero-content">
                    <h1 className="mb-5 text-3xl font-bold !leading-[1.208] text-white sm:text-[42px] lg:text-[40px] xl:text-5xl">
                      <span className="inline-block px-3 pt-1 pb-3 bg-white text-[#007782] rounded-t-md shadow-lg relative">
                        Bend the Trend
                        <svg
                          className="absolute -bottom-1 left-0 w-full h-3"
                          viewBox="0 0 100 10"
                          preserveAspectRatio="none"
                        >
                          <path
                            d="M0,0 Q25,10 50,5 T100,0 L100,10 L0,10 Z"
                            fill="#007782"
                          />
                        </svg>
                      </span>
                      <br />
                      <span className="text-2xl sm:text-3xl lg:text-3xl xl:text-4xl">
                        with Confidence!
                      </span>
                    </h1>
                    <p className="mb-8 max-w-[520px] text-base text-white/90">
                      Discover fashion that defines your style — explore our
                      latest arrivals and elevate your wardrobe with exclusive
                      pieces made for you. From everyday essentials to standout
                      statement looks, find everything you need to express your
                      individuality with confidence.
                    </p>
                    <ul className="flex flex-wrap items-center">
                      <li>
                        <Link
                          href="/shop"
                          className="inline-flex items-center justify-center rounded-md bg-[#007782] px-5 py-3 lg:px-7 text-center text-base font-medium text-white hover:bg-opacity-90 "
                        >
                          Shop Now!
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/about"
                          className="inline-flex ml-3 border-2 border-white items-center justify-center rounded-md bg-white/10 backdrop-blur-sm px-5 py-2.5 lg:px-7 text-center text-base font-medium text-white hover:bg-white/20 "
                        >
                          About Us
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="hidden px-4 lg:block lg:w-1/12"></div>
                <div className="w-full px-4 lg:w-6/12">
                  {/* Empty space for layout balance */}
                </div>
              </div>
            </div>

            {/* Decorative dots */}
            <span className="absolute -bottom-8 -left-8 z-20">
              <svg
                width="93"
                height="93"
                viewBox="0 0 93 93"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="2.5" cy="2.5" r="2.5" fill="#007782" />
                <circle cx="2.5" cy="24.5" r="2.5" fill="#007782" />
                <circle cx="2.5" cy="46.5" r="2.5" fill="#007782" />
                <circle cx="2.5" cy="68.5" r="2.5" fill="#007782" />
                <circle cx="2.5" cy="90.5" r="2.5" fill="#007782" />
                <circle cx="24.5" cy="2.5" r="2.5" fill="#007782" />
                <circle cx="24.5" cy="24.5" r="2.5" fill="#007782" />
                <circle cx="24.5" cy="46.5" r="2.5" fill="#007782" />
                <circle cx="24.5" cy="68.5" r="2.5" fill="#007782" />
                <circle cx="24.5" cy="90.5" r="2.5" fill="#007782" />
                <circle cx="46.5" cy="2.5" r="2.5" fill="#007782" />
                <circle cx="46.5" cy="24.5" r="2.5" fill="#007782" />
                <circle cx="46.5" cy="46.5" r="2.5" fill="#007782" />
                <circle cx="46.5" cy="68.5" r="2.5" fill="#007782" />
                <circle cx="46.5" cy="90.5" r="2.5" fill="#007782" />
                <circle cx="68.5" cy="2.5" r="2.5" fill="#007782" />
                <circle cx="68.5" cy="24.5" r="2.5" fill="#007782" />
                <circle cx="68.5" cy="46.5" r="2.5" fill="#007782" />
                <circle cx="68.5" cy="68.5" r="2.5" fill="#007782" />
                <circle cx="68.5" cy="90.5" r="2.5" fill="#007782" />
                <circle cx="90.5" cy="2.5" r="2.5" fill="#007782" />
                <circle cx="90.5" cy="24.5" r="2.5" fill="#007782" />
                <circle cx="90.5" cy="46.5" r="2.5" fill="#007782" />
                <circle cx="90.5" cy="68.5" r="2.5" fill="#007782" />
                <circle cx="90.5" cy="90.5" r="2.5" fill="#007782" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
