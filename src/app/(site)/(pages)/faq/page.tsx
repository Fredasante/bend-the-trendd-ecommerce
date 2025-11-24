"use client";

import Breadcrumb from "@/components/Common/Breadcrumb";
import React, { useState } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is Bend the Trendd?",
      answer:
        "Bend the Trendd is an online clothing store specializing in carefully curated dresses that make a statement. We blend contemporary trends with timeless elegance to create unique styles that empower you to express yourself. Founded with a passion for distinctive fashion, we focus on quality, craftsmanship, and helping you find pieces that make you feel amazing.",
    },
    {
      question: "What makes your dresses different from other stores?",
      answer:
        "Every dress in our collection is handpicked to ensure it meets our high standards of style, comfort, and quality. We don't just follow trends – we redefine them. Each piece is tested and approved before it reaches you, ensuring that fashion is both beautiful and wearable. We focus on creating trendsetting designs that stand out while remaining versatile enough for your everyday wardrobe.",
    },
    {
      question: "What types of dresses do you offer?",
      answer:
        "We offer diverse designs for every occasion, from casual everyday wear to elegant special event dresses. Our curated collections feature unique styles that blend quality craftsmanship with contemporary design. Whether you're looking for something comfortable for daily wear or a statement piece for a special moment, we have carefully selected options to suit your needs.",
    },
    {
      question: "How long does delivery take?",
      answer:
        "Our standard delivery is fast, reliable, and designed to get your dress to you within 1 to 2 working days. Once your order is processed, it is carefully packaged and dispatched right away to ensure it reaches you on time. You will receive detailed tracking information as soon as your order ships, allowing you to follow its journey every step of the way until it arrives at your doorstep.",
    },
    {
      question: "What is your return policy?",
      answer:
        "Your satisfaction is our top priority. If you're not completely happy with your purchase, we're here to help. Please contact our customer service team for information about returns and exchanges. We're dedicated to ensuring you have an exceptional shopping experience from browsing to delivery.",
    },
    {
      question: "How can I contact customer support?",
      answer:
        "Our dedicated customer service team is always ready to assist you with any questions or concerns. Whether you need help finding the perfect dress, have questions about your order, or need assistance with sizing, we're here for you. You can reach us through our contact page, and we'll respond as quickly as possible.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "We're working to expand our shipping options to serve customers worldwide. Please contact our customer service team with your location, and we'll let you know if we can ship to your area. We're constantly growing our shipping capabilities to bring Bend the Trendd fashion to more customers.",
    },
    {
      question: "How do you ensure quality?",
      answer:
        "Quality is our first priority. Each dress is selected for its exceptional quality and craftsmanship. We personally test and approve every piece before adding it to our collection. Only the finest materials and craftsmanship make it into our store, ensuring you receive fashion that's worth investing in.",
    },
    {
      question: "What is your promise to customers?",
      answer:
        "When you shop at Bend the Trendd, you're not just buying a dress – you're investing in quality, style, and confidence. We promise to deliver fashion that makes you feel amazing, with service that exceeds your expectations. Your satisfaction and style confidence are our top priorities, and we're committed to providing an exceptional shopping experience every step of the way.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Breadcrumb title={"FAQ"} pages={["faq"]} />

      <section className="overflow-hidden py-10 bg-[#fef4f4] md:pb-10 lg:pb-20">
        <div className="max-w-[970px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="font-bold text-2xl md:text-4xl text-dark mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Have questions? We&apos;ve got answers! Find everything you need
              to know about Bend the Trendd.
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="bg-white rounded-xl shadow-1 overflow-hidden">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border-b border-gray-200 last:border-b-0"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left p-6 sm:p-7.5 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors duration-200"
                >
                  <h3 className="font-semibold text-base sm:text-lg text-dark pr-4">
                    {faq.question}
                  </h3>
                  <div className="shrink-0">
                    <svg
                      className={`transform transition-transform duration-300 ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 9L12 15L18 9"
                        stroke="#007782"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="px-6 sm:px-7.5 pb-6 sm:pb-7.5">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-12 text-center bg-white rounded-xl shadow-1 p-8">
            <h3 className="font-semibold text-xl text-dark mb-3">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Can&apos;t find the answer you&apos;re looking for? Our customer
              support team is here to help!
            </p>
            <button className="bg-[#202020] text-white font-medium px-8 py-3 rounded-lg hover:bg-opacity-90 transition-colors duration-200">
              Contact Support
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQ;
