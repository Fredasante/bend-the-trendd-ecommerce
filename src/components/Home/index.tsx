import React from "react";
import Hero from "./Hero";
import NewArrival from "./NewArrivals";
import PromoBanner from "./PromoBanner";
import HeaderHero from "../Header/HeaderHero";

const Home = () => {
  return (
    <main>
      {/* <HeaderHero /> */}
      <Hero />
      <NewArrival />
      <PromoBanner />
    </main>
  );
};

export default Home;
