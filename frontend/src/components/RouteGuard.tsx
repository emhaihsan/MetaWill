"use client";

import { useAccount } from "wagmi";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function RouteGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useAccount();
  const pathname = usePathname();
  const router = useRouter();
  const isMounted = useRef(false);

  const isProtectedRoute = pathname.startsWith("/dashboard");

  useEffect(() => {
    // Setelah render pertama, jika kita berada di rute yang dilindungi dan koneksi terputus, alihkan.
    if (isMounted.current && isProtectedRoute && status === "disconnected") {
      router.push("/");
    }
    isMounted.current = true;
  }, [status, isProtectedRoute, router]);

  // Tampilkan layar pemuatan untuk rute yang dilindungi hingga statusnya 'connected'.
  if (isProtectedRoute && status !== "connected") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-orange-500 mx-auto"></div>
          <p className="text-white mt-4 text-lg">
            Verifying Wallet Connection...
          </p>
        </div>
      </div>
    );
  }

  // Tampilkan konten untuk rute publik, atau untuk rute yang dilindungi saat terhubung.
  return <>{children}</>;
}
