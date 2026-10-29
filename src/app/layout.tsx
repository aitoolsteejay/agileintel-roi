import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AgileIntel Research | Offshore Team Savings & Capacity Calculator",
  description:
    "Scale your events, not your cost base. Salary savings calculator for B2B events and conference organisers, from AgileIntel Research in partnership with The Maze.",
  keywords: [
    "AgileIntel",
    "AgileIntel Research",
    "The Maze",
    "B2B Events Offshoring",
    "Event Operations Offshore",
    "ROI Calculator",
    "India Delivery Team",
  ],
  authors: [{ name: "AgileIntel Research & The Maze" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  );
}
