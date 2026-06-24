import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/auth/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Customer Compass — Microsoft Support Intelligence",
    template: "%s · Customer Compass",
  },
  description:
    "AI-powered support intelligence that turns Microsoft's incident history into clear, trustworthy customer communication — with Entra ID single sign-on.",
  applicationName: "Customer Compass",
  keywords: [
    "Microsoft",
    "Azure AI",
    "customer support",
    "Entra ID",
    "incident analysis",
    "customer trust",
  ],
};

export const viewport: Viewport = {
  themeColor: "#0f6cbd",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
