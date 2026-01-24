import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | ポートフォリオ",
    default: "Sho Suzaku - ポートフォリオ",
  },
  description: "A GitHub-styled personal portfolio showcasing projects and experience.",
  openGraph: {
    title: "Sho Suzaku - ポートフォリオ",
    description: "A GitHub-styled personal portfolio showcasing projects and experience.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-github-canvas-default text-github-fg-default min-h-screen">
        {children}
      </body>
    </html>
  );
}
