import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PicUp - Thai AI Generated Video Platform",
  description: "แพลตฟอร์มวิดีโอ AI สำหรับคนไทย",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
