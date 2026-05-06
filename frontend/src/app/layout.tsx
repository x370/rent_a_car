import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LuxeDrive | Premium Car Rental",
  description: "Rent the best cars with the best price and quality service.",
  keywords: "car rental, luxury cars, rent a car, premium cars, car hire",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
