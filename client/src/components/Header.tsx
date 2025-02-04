"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon, Spade } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import type { User } from "@/lib/mockData";

export default function Header() {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Simulating user authentication
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Rules", href: "/rules" },
    { name: "Scores", href: "/scores" },
    { name: "About", href: "/about" },
    { name: "About", href: "/about" }
  ];

  const authenticatedNavItems = [
    { name: "Play", href: "/matchmaking" },
    { name: "Profile", href: "/profile" }
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <header className="border-b border-zinc-600 flex justify-evenly">
      <div className="container flex items-center justify-between px-2 py-3">
        <div className="flex items-center space-x-2">
          <Spade className="h-6 w-6 text-emerald-400" />
          <span className="text-xl font-bold text-emerald-400">
            CardMaster
          </span>
        </div>
        <nav className="sm:hidden">
          <ul className="flex space-x-6">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`text-emerald-200 transition-colors hover:text-emerald-400 ${
                    pathname === item.href ? "text-emerald-400" : ""
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            {user &&
              authenticatedNavItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`text-emerald-200 transition-colors hover:text-emerald-400 ${
                      pathname === item.href ? "text-emerald-400" : ""
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
        <div className="flex space-x-4 xs:hidden lg:contents">
          {user ? (
            <>
              <span className="text-emerald-200">Welcome, {user.username}</span>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-zinc-900"
              >
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button
                  variant="outline"
                  className="border-slate-800 text-slate-100 bg-emerald-500 font-bold hover:font-extrabold hover:bg-emerald-200 hover:text-zinc-900"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  variant="outline"
                  className="border-slate-800 text-slate-100 bg-emerald-500 font-bold hover:font-extrabold hover:bg-emerald-200 hover:text-zinc-900"
                >
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
        <button className="md:hidden">
          <MenuIcon className="w-8 h-8 text-emerald-400" />
        </button>
      </div>
    </header>
  );
}
