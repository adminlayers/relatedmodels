import type { Metadata } from "next";
import "./globals.css";
import { Header, Footer } from "@/components/layout";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
  title: "Related Models | AI & LLM Comparison Platform",
  description: "Compare AI models side-by-side with ModelMix. Your hub for LLM insights, tech news, tutorials, and AI resources.",
  keywords: ["AI", "LLM", "machine learning", "model comparison", "GPT", "Claude", "Gemini", "artificial intelligence"],
  authors: [{ name: "Related Models" }],
  openGraph: {
    title: "Related Models | AI & LLM Comparison Platform",
    description: "Compare AI models side-by-side with ModelMix. Your hub for LLM insights and AI resources.",
    url: "https://relatedmodels.com",
    siteName: "Related Models",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Related Models | AI & LLM Comparison Platform",
    description: "Compare AI models side-by-side with ModelMix.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <TooltipProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </TooltipProvider>
      </body>
    </html>
  );
}
