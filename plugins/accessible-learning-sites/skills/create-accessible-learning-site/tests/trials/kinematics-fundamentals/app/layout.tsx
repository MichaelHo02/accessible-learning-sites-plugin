import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kinematics: describing motion",
  description:
    "An accessibility-first first-year engineering lesson on one- and two-dimensional motion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
