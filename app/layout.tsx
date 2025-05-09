import type { Metadata } from "next";
import { Source_Sans_3 as FontSans } from "next/font/google";
import "./globals.css";

const fontSans = FontSans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900']
});

export const metadata: Metadata = {
  title: "ConciseAI - AI-Powered PDF Summarization",
  description: "ConciseAI is an AI-powered PDF summarizer that transforms lengthy documents into clear, concise summaries in seconds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontSans.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
