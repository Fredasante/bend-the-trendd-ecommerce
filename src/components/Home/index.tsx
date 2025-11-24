import React from "react";
import Hero from "./Hero";
import NewArrival from "./NewArrivals";
import NewsletterPopup from "./NewsLetterPopup";

const Home = () => {
  return (
    <main>
      <NewsletterPopup />
      <Hero />
      <NewArrival />
    </main>
  );
};

export default Home;
