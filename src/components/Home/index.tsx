import React from "react";
import Hero from "./Hero";
import NewArrival from "./NewArrivals";
import NewsletterPopup from "./NewsLetterPopup";
import TestimonialsSection from "./Hero/Testimonials";

const Home = () => {
  return (
    <main>
      <NewsletterPopup />
      <Hero />
      <NewArrival />
      <TestimonialsSection />
    </main>
  );
};

export default Home;
