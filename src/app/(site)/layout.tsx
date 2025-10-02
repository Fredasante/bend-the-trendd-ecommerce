import "../css/euclid-circular-a-font.css";
import "../css/style.css";
import type { Metadata } from "next";
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
  title: "Bend the Trendd | Fashion & Lifestyle Ecommerce",
  description:
    "Discover the latest fashion, lifestyle, and trendsetting products at Bend the Trendd. Shop quality apparel, accessories, and more.",
  icons: {
    icon: "/bend-the-trendd-logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
