import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "User",
  description: "Manage User",
};
export default function Layout({ children }) {
  return <>{children}</>;
}
