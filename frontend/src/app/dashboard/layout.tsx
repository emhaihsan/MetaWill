"use client";

// Semua logika otentikasi dan pengalihan sekarang ditangani oleh RouteGuard.
// Layout ini hanya bertanggung jawab untuk menyediakan struktur untuk halaman dasbor.
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
