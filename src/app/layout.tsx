import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vaya — Travel, Slowly",
  description:
    "A travel guide trained on real taste, not algorithms. Discover places only locals know to recommend.",
};

export const viewport: Viewport = {
  themeColor: "#F5EFE6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-sand">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
