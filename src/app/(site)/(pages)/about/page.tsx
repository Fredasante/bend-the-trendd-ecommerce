import AboutUs from "@/components/AboutUs/AboutUs";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Contact Page | NextCommerce Nextjs E-commerce template",
  description: "This is Contact Page for NextCommerce Template",
};

const AboutUsPage = () => {
  return (
    <main>
      <AboutUs />
    </main>
  );
};

export default AboutUsPage;
