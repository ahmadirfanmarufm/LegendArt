import type { Metadata } from "next";
import localFont from "next/font/local";
import { Cinzel_Decorative, Lora } from "next/font/google";
import "./globals.css";

const legenda = localFont({
  src: "../../public/fonts/FirlestRegular.woff2",
  variable: "--font-legenda",
});

const sublegenda = localFont({
  src: "../../public/fonts/MileastItalic.otf",
  variable: "--font-sublegenda",
})

const cinzel = Cinzel_Decorative({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-cinzel",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lora",
});

export const metadata: Metadata = {
  title: "Legenda Nusantara",
  description: "Pameran Seni Lukisan Legenda Indonesia",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${legenda.variable} ${sublegenda.variable} ${cinzel.variable} ${lora.variable}`}
    >
      <body className="bg-[var(--color-background)] text-[var(--color-text)] font-[var(--font-sublegenda)] font-[var(--font-legenda)]">
        {children}
      </body>
    </html>
  );
}
