import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-zinc-800 py-12 text-slate-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-bold text-emerald-400">
              CardMaster
            </h3>
            <p className="text-sm">
              The ultimate destination for card game enthusiasts.
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-lg font-bold text-emerald-400">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-emerald-400"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="transition-colors hover:text-emerald-400"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/rules"
                  className="transition-colors hover:text-emerald-400"
                >
                  Rules
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="transition-colors hover:text-emerald-400"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-lg font-bold text-emerald-400">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="transition-colors hover:text-emerald-400"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="transition-colors hover:text-emerald-400"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="transition-colors hover:text-emerald-400"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-lg font-bold text-emerald-400">Connect</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="transition-colors hover:text-emerald-400"
                >
                  Twitter
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="transition-colors hover:text-emerald-400"
                >
                  Facebook
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="transition-colors hover:text-emerald-400"
                >
                  Instagram
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="transition-colors hover:text-emerald-400"
                >
                  Discord
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-zinc-700 pt-8 text-center">
          <p>
            &copy; {new Date().getFullYear()} CardMaster. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
