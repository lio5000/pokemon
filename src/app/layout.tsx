import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";

export const metadata: Metadata = {
  title: "PokéApp - TanStack Query & Next.js",
  description:
    "Optimización de transferencia de datos con TanStack Query y Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
