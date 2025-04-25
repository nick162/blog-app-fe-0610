"use client";
import { useAuthStore } from "@/store/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const { user, clearAuth } = useAuthStore();

  const logout = () => {
    clearAuth();
    router.push("/login");
  };
  return (
    <nav className="bg-slate-400">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2">
          <Link href="/">Logo</Link>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-xl font-semibold hover:cursor-pointer"
            >
              Home
            </Link>
            {!!user && (
              <Link
                href="/write"
                className="text-xl font-semibold hover:cursor-pointer"
              >
                Write
              </Link>
            )}
            {user ? (
              <p
                onClick={logout}
                className="text-xl font-semibold hover:cursor-pointer"
              >
                Logout
              </p>
            ) : (
              <Link
                href="/login"
                className="text-xl font-semibold hover:cursor-pointer"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
