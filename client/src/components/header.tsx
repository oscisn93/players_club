"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { MenuIcon, Spade } from "lucide-react";
import { Button } from "@/components/ui/button";
import auth from "@/lib/auth/client";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const session = auth.useSession();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Rules", href: "/rules" },
    { name: "Scores", href: "/scores" },
    { name: "About", href: "/about" },
  ];

  const authenticatedNavItems = [
    { name: "Play", href: "/matchmaking" },
    { name: "Profile", href: "/profile" },
  ];

  const handleLogout = () => {
    auth.signOut();
    router.push("/");
  };

  return (
    <header className="flex items-center justify-between border-b border-zinc-800 p-2">
      <Link
        className="flex items-center justify-center px-1 drop-shadow-[3px_5px_30px_rgba(0,140,160,0.8)]"
        href="/"
      >
        <span className="mr-2 text-2xl font-bold text-emerald-500">Players</span>
        <button className="h-12 w-12 rounded-md bg-slate-900">
          <Spade className="mx-auto bg-slate-900 text-emerald-400" />
        </button>
        <span className="ml-2 text-2xl font-bold text-emerald-500">Club</span>
      </Link>
      <nav className="collapse md:visible">
        <ul className="flex items-center space-x-6">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`text-slate-100 transition-colors hover:text-emerald-400 ${
                  pathname === item.href
                    ? "text-xl font-extrabold text-emerald-500"
                    : ""
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
          {session &&
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
      <div className="flex">
        <div className="invisible md:visible">
          {session ? (
            <>
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
              <Button
                variant="outline"
                className="w-full border-slate-800 bg-emerald-500 font-bold text-slate-100 hover:bg-emerald-200 hover:font-extrabold hover:text-zinc-900"
                onClick={() => router.push("/login")}
              >
                Sign In
              </Button>
            </>
          )}
        </div>
        <button className="visible md:collapse">
          <MenuIcon className="h-8 w-8 text-emerald-400" />
        </button>
      </div>
    </header>
  );
}
