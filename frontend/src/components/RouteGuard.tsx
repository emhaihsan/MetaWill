"use client";

import { useAccount } from "wagmi";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RouteGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isConnected, isConnecting } = useAccount();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Jangan lakukan apa-apa saat koneksi sedang diproses
    if (isConnecting) return;

    // Jika pengguna tidak terhubung dan mencoba mengakses rute yang dilindungi
    if (!isConnected && pathname.startsWith("/dashboard")) {
      // Alihkan ke halaman utama
      router.push("/");
    }
  }, [isConnected, isConnecting, pathname, router]);

  // Selama koneksi, kita bisa menampilkan layar loading atau null
  if (isConnecting) {
    return null; // atau komponen loading
  }

  return <>{children}</>;
}
