import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChevronRight,
  Spade,
  Diamond,
  Club,
  Heart,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

type MarketingFeature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const marketingFeatures: MarketingFeature[] = [
  {
    icon: Diamond,
    title: "Premium Experience",
    description: "Enjoy high-quality graphics and smooth gameplay",
  },
  {
    icon: Club,
    title: "Diverse Game Selection",
    description: "From classics to modern favorites, we have it all",
  },
  {
    icon: Heart,
    title: "Active Community",
    description: "Connect with players from around the world",
  },
  {
    icon: Spade,
    title: "Fair Play Guaranteed",
    description: "Advanced anti-cheat systems ensure a level playing field",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-900 text-emerald-50">
      <main>
        <section className="py-20 text-center">
          <h1 className="mb-6 text-5xl font-bold text-emerald-400">
            Master the Art of Card Games
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-slate-300">
            Dive into a world of strategy, skill, and excitement. Play classic
            card games or discover new favorites.
          </p>
          <Button className="rounded-full bg-emerald-500 px-6 py-3 text-lg font-bold text-zinc-900 hover:bg-emerald-600">
            Start Playing Now
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </section>

        <section className="bg-zinc-800 py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold text-emerald-300">
              Featured Games
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {["Poker", "Blackjack", "Bridge"].map((game, index) => (
                <Card
                  key={index}
                  className="border border-emerald-500 bg-zinc-700"
                >
                  <CardContent className="p-6">
                    <h3 className="mb-4 text-2xl font-bold text-emerald-400">
                      {game}
                    </h3>
                    <p className="mb-4 text-slate-300">
                      Experience the thrill of {game.toLowerCase()} with our
                      advanced AI opponents or play with friends online.
                    </p>
                    <Button
                      variant="outline"
                      className="border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-zinc-900"
                    >
                      Play {game}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-8 text-3xl font-bold text-emerald-300">
              Why Choose CardMaster?
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {marketingFeatures.map((feature: MarketingFeature, index) => (
                <div key={index} className="flex flex-col items-center">
                  <feature.icon className="mb-4 h-12 w-12 text-emerald-400" />
                  <h3 className="mb-2 text-xl font-bold text-emerald-200">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-emerald-600 py-16 text-zinc-900">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-6 text-3xl font-bold">Ready to Play?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-xl">
              Join thousands of players and start your card game journey today.
              No downloads required!
            </p>
            <Button className="rounded-full bg-zinc-900 px-6 py-3 text-lg font-bold text-emerald-400 hover:bg-zinc-800">
              Create Free Account
            </Button>
          </div>
        </section>
      </main>

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
                    href="#"
                    className="transition-colors hover:text-emerald-400"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="transition-colors hover:text-emerald-400"
                  >
                    Games
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="transition-colors hover:text-emerald-400"
                  >
                    Leaderboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="transition-colors hover:text-emerald-400"
                  >
                    FAQ
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
              <h4 className="mb-4 text-lg font-bold text-emerald-400">
                Connect
              </h4>
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
    </div>
  );
}
