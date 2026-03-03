import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Edge-Case Routing Failures in Intent-Based Support AI",
  description:
    "A technical teardown of an infinite context loop and intent bypass in a production food delivery support chatbot. Analyzing NLP decision trees, VoIP callback failures, and context window drops.",
  openGraph: {
    title: "Edge-Case Routing Failures in Intent-Based Support AI",
    description:
      "A technical teardown of an infinite context loop and intent bypass in a production food delivery support chatbot.",
    type: "article",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
