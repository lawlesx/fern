import type { Metadata } from "next";
import { Audiowide, Exo_2, Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const audiowide = Audiowide({
  variable: "--font-audiowide",
  subsets: ["latin"],
  weight: ["400"],
});

const exo2 = Exo_2({
  variable: "--font-exo-2",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const SITE_URL = "https://fern-five.vercel.app/";
const CUSTOM_OG_IMAGE =
  "https://res.cloudinary.com/dk7dt0kk3/image/upload/v1787391765/Gemini_Generated_Image_23lj9x23lj9x23lj_zuknod.png";

export const metadata: Metadata = {
  title: {
    default: "Fern | Voice-Powered Expense Tracker",
    template: "%s | Fern",
  },
  description:
    "Effortlessly track your daily spending with Fern. Just speak to log your expenses instantly using AI.",
  applicationName: "Fern",
  authors: [{ name: "Aniruddha Sil", url: "https://lawlesx.vercel.app/" }],
  keywords: [
    "expense tracker",
    "AI finance",
    "voice assistant",
    "personal finance",
  ],
  openGraph: {
    title: "Fern | Voice-Powered Expense Tracker",
    description:
      "Track your daily spending with just your voice. Fast, private, and AI-powered.",
    url: SITE_URL,
    siteName: "Fern",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: CUSTOM_OG_IMAGE, // Your specific Cloudinary image
        width: 1200, // Explicit dimensions for optimal social sharing
        height: 630,
        alt: "Fern Voice Expense Tracker - App Preview showing futuristic UI and glowing microphone",
      },
    ],
  },

  // 4. Added Twitter Metadata for consistent large image previews
  twitter: {
    card: "summary_large_image",
    title: "Fern | Voice-Powered Expense Tracker",
    description:
      "Effortlessly log expenses with your voice using AI. Fast, private, and smart.",
    images: [CUSTOM_OG_IMAGE],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${audiowide.variable} ${exo2.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <h1 className="text-3xl text-white font-audiowide p-4 absolute">
          FERN
        </h1>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
