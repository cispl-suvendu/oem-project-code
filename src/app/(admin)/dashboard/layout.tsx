import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Admin Dashboard",
};
export default function Layout({ children }) {
  return <>{children}</>;
}
