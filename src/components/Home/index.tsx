import React from "react";
import Hero from "./Hero";
import NewsletterPopup from "./NewsLetterPopup";
import TestimonialsSection from "./Hero/Testimonials";
import CategoryGrid from "./CategoryGrid";

const Home = () => {
  return (
    <main>
      <NewsletterPopup />
      <Hero />
      <CategoryGrid />
      <TestimonialsSection />
    </main>
  );
};

export default Home;
