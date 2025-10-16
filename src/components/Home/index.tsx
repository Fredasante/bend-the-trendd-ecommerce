import React, { Suspense } from "react";
import Hero from "./Hero";
import NewArrival from "./NewArrivals";
import PromoBanner from "./PromoBanner";
import LoadingFallback from "../Common/LoadingFallback";

const Home = () => {
  return (
    <main>
      <Hero />
      <Suspense fallback={<LoadingFallback />}>
        <NewArrival />
      </Suspense>
      <PromoBanner />
    </main>
  );
};

export default Home;
