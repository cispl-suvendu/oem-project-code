import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories",
  description: "Categories description",
};
export default function Layout({ children }) {
  return <>{children}</>;
}
