import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TF PRD Lab 2026",
  description: "Product research sandbox for rapid experimentation",
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
