import "../styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "ToDo App",
  description: "A simple todo list application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="w-[1440px] h-[1024px] mx-auto bg-[#1A1A1A] overflow-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
