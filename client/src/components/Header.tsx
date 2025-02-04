"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Spade } from "lucide-react";
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
    { name: "About", href: "/about" },
    { name: "Rules", href: "/rules" },
    { name: "Scores", href: "/scores" },
    { name: "Contact", href: "/contact" },
  ];

  const authenticatedNavItems = [
    { name: "Play", href: "/matchmaking" },
    { name: "Profile", href: "/profile" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <header className="border-b border-zinc-800">
      <div className="container mx-auto flex items-center justify-between px-4 py-6">
        <div className="flex items-center space-x-2">
          <Spade className="h-8 w-8 text-emerald-400" />
          <span className="text-2xl font-bold text-emerald-400">
            CardMaster
          </span>
        </div>
        <nav>
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
        <div className="flex space-x-4">
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
                  className="border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-zinc-900"
                >
                  Log In
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-emerald-500 text-zinc-900 hover:bg-emerald-600">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
