import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { ThemeToggle } from "@/components/ThemeToggle";

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
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
        <header className="fixed top-4 right-4 z-50">
          <ThemeToggle />
        </header>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
