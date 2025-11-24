"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const testimonials = [
    {
      id: 1,
      name: "Mary Inkoom",
      image: "/images/review-5.jpg",
      message:
        "“Bend the trendd????? Omg!!!!! love the dress so much, looks so much prettier than the one in the video, omg, thanks a lot.",
      rating: 5,
    },
    {
      id: 2,
      name: "Jennifer Ayittey",
      image: "/images/review-4.jpg",
      message:
        "Hello dear, I just received the items and they are sooo beautiful — the quality is amazing, you never disappoint.",
      rating: 5,
    },
    {
      id: 3,
      name: "Jacqueline Asamoah",
      image: "/images/review-3.jpg",
      message:
        "Best online shopping experience I've had! The products exceeded my expectations and the prices are unbeatable. A+ service!",
      rating: 5,
    },
    {
      id: 4,
      name: "Joyce Mensah",
      image: "/images/review-2.jpg",
      message: "You always deliver the quality and exactly what we order.",
      rating: 5,
    },
    {
      id: 5,
      name: "Diana Somuah",
      image: "/images/review-1.jpg",
      message:
        "Wow, bend the trendd thank you. I'm obsessed with my new purchases!",
      rating: 5,
    },
  ];

  const nextTestimonial = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }
  };

  const prevTestimonial = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex(
        (prev) => (prev - 1 + testimonials.length) % testimonials.length
      );
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 500);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  // Auto-scroll every 5 seconds
  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#fef4f4] py-5 lg:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our happy customers
          </p>
        </div>

        {/* Testimonial Container */}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className={`transition-all duration-500 ease-out ${
                isAnimating
                  ? "opacity-0 translate-y-4"
                  : "opacity-100 translate-y-0"
              }`}
            >
              <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  {/* Image */}
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden ring-4 ring-[#f79898] ring-offset-4">
                        <img
                          src={testimonials[currentIndex].image}
                          alt={testimonials[currentIndex].name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-[#f79898] text-white rounded-full p-2 shadow-lg">
                        <Star className="w-5 h-5 fill-current" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 text-center md:text-left">
                    {/* Stars */}
                    <div className="flex justify-center md:justify-start gap-1 mb-4">
                      {[...Array(testimonials[currentIndex].rating)].map(
                        (_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 fill-[#f79898] text-[#f79898]"
                          />
                        )
                      )}
                    </div>

                    {/* Message */}
                    <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed italic">
                      "{testimonials[currentIndex].message}"
                    </p>

                    {/* Name */}
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">
                        {testimonials[currentIndex].name}
                      </h4>
                      <p className="text-gray-500">Verified Customer</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            disabled={isAnimating}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white hover:bg-[#f79898] text-gray-800 hover:text-white rounded-full p-3 shadow-lg transition-all duration-300 disabled:opacity-50 group"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextTestimonial}
            disabled={isAnimating}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white hover:bg-[#f79898] text-gray-800 hover:text-white rounded-full p-3 shadow-lg transition-all duration-300 disabled:opacity-50 group"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isAnimating) {
                  setIsAnimating(true);
                  setCurrentIndex(index);
                }
              }}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? "w-8 h-3 bg-[#f79898]"
                  : "w-3 h-3 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Counter */}
        <div className="text-center mt-6">
          <p className="text-gray-500 font-medium">
            {currentIndex + 1} / {testimonials.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
