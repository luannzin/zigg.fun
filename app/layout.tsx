import type { Metadata } from "next";
import { Roboto, Comic_Neue } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  display: "swap",
  weight: ["400", "700"],
  subsets: ["latin"],
});

const comicNeue = Comic_Neue({
  display: "swap",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "zigg.fun - Showcase your projects",
  description: "Showcase your funniest web development projects at zigg.fun",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} ${comicNeue.className} antialiased w-screen h-screen overflow-x-hidden flex justify-center`}
      >
        <main className="w-[1200px] h-full">{children}</main>
      </body>
    </html>
  );
}
