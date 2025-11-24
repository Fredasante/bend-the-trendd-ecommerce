"use client";

import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";

const NewsletterPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    interest: "",
  });
  const firstNameRef = useRef(null);

  useEffect(() => {
    if (isOpen && firstNameRef.current) {
      firstNameRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    // TESTING MODE: Always show popup after 2 seconds
    // TODO: Remove this comment and uncomment the code below when ready for production
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 2000);

    return () => clearTimeout(timer);

    // PRODUCTION CODE: Uncomment this when ready
    /*
    const hasSeenPopup = localStorage.getItem('hasSeenNewsletterPopup');
    
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
    */
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        alert("Thank you for subscribing!");
        setIsOpen(false);
        // Save to localStorage so the popup won't show again
        // localStorage.setItem("hasSeenNewsletterPopup", "true");
      } else {
        alert("Failed to subscribe. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again later.");
    }
  };

  const handleClose = () => {
    // TESTING MODE: Comment this out to keep showing popup
    // localStorage.setItem('hasSeenNewsletterPopup', 'true');
    setIsOpen(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black bg-opacity-50"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 md:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Hey Gorgeous!</h2>
          <p className="text-gray-600 text-sm">
            Subscribe to receive early access to new arrivals, exclusive
            discounts and timeless pieces curated for the woman who sets the
            tone, not the trend.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name */}
          <div>
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              value={formData.firstName}
              onChange={handleChange}
              ref={firstNameRef}
              required
              className="w-full px-4 py-3 border shadow-sm border-gray-4 rounded-lg focus:outline-none focus:border-2 focus:border-pink-600 transition"
            />
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border shadow-sm border-gray-4 rounded-lg focus:outline-none focus:border-2 focus:border-pink-600 transition"
            />
          </div>

          {/* Interest */}
          <div>
            <input
              type="text"
              name="interest"
              placeholder="What are you interested in? (e.g., Dresses, Casual wear, etc.)"
              value={formData.interest}
              onChange={handleChange}
              className="w-full px-4 py-3 border shadow-sm border-gray-4 rounded-lg focus:outline-none focus:border-2 focus:border-pink-600 transition"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#382423] text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition"
          >
            Submit
          </button>

          {/* Terms */}
          <p className="text-xs text-gray-500 text-center">
            By signing up, you agree to receive updates, offers, and marketing
            emails.
          </p>
        </form>
      </div>
    </div>
  );
};

export default NewsletterPopup;
