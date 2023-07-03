"use client";

import Link from "next/link";
import "./globals.css";
import { Inter } from "next/font/google";

import { createContext, useState } from "react";
import Menu from "./menu";

const inter = Inter({ subsets: ["latin"] });

export const AppContext = createContext(null);

export default function RootLayout({ children }) {
  const [account, setAccount] = useState("");
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppContext.Provider value={{ account, setAccount }}>
          <div>
            <div className="flex flex-col font-semibold text-lg">
              <Menu />
            </div>
          </div>
          {children}
        </AppContext.Provider>
      </body>
    </html>
  );
}
