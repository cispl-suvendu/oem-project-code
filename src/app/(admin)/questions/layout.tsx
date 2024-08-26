import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Questions",
  description: "questions description",
};
export default function Layout({ children }) {
  return <>{children}</>;
}
