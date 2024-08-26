import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { AuthProvider } from "./context/authcontext";
import { Toaster } from "react-hot-toast";
import { FilterProvider } from "./context/filterContext";

export const metadata: Metadata = {
  title: "CISPL-OEM",
  description: "Online Exam",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AuthProvider>
            <FilterProvider>
              <div className="toaster_prnt">
                <Toaster />
              </div>
              {children}
            </FilterProvider>
          </AuthProvider>
        </Providers>
        <div id="modal"></div>
      </body>
    </html>
  );
}
