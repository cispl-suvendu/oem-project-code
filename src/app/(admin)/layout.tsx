import AdminWrapper from "../components/AdminWrapper/AdminWrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard description",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="container-xxl position-relative d-flex p-0 main-container">
      <div className="container-fluid pt-4 px-4">
        <AdminWrapper>{children}</AdminWrapper>
      </div>
    </div>
  );
}
