import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const legenda = localFont({
  src: "../../public/fonts/FirlestRegular.woff2",
  variable: "--font-legenda",
});

const sublegenda = localFont({
  src: "../../public/fonts/Mileast.woff2",
  variable: "--font-sublegenda",
})

export const metadata: Metadata = {
  title: "Comiculture Nusantara",
  description: "Pameran Seni Lukisan Comiculture Nusantara",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${legenda.variable} ${sublegenda.variable}`}
    >
      <body className="bg-[var(--color-background)] text-[var(--color-text)] font-[var(--font-sublegenda)] font-[var(--font-legenda)]">
        {children}
      </body>
    </html>
  );
}
