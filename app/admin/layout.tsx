import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin - Inscritos Webinar FUNDEB | APM + i10",
  robots: "noindex",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
