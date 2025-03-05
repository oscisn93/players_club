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
import { gameRules as games } from "@/lib/constants";

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
    <div className="min-h-screen bg-zinc-950 text-emerald-50">
      <main>
        <section className="flex min-h-[500px] flex-col items-center justify-center border-b border-emerald-900 bg-gradient-to-br from-emerald-800 from-5% via-slate-950 via-25% to-emerald-950 to-80% text-center">
          <h1 className="mb-6 text-5xl font-bold text-emerald-400">
            Welcome to PlayersClub.
            <br />
            Where players play.
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-slate-300">
            Dive into a world of card game strategy, build up your skills, and enjoy playing your favorite classics or feel the thrill of discovering and mastering new favorites.
          </p>
          <Link href="/signup">
            <Button className="rounded bg-emerald-500 px-6 py-3 text-lg font-bold text-zinc-900 hover:bg-emerald-600">
              Start Playing Now
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </section>

        <section className="min-h-[500px] bg-[url(/player-cards.jpg)] bg-cover py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center">
              <h2 className="mb-12 rounded-sm border border-zinc-400 bg-gradient-to-b from-slate-950 to-slate-800 px-4 py-2 text-center text-3xl font-bold text-emerald-300">
                Featured Games
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {games.map((game, index) => (
                <Card
                  key={index}
                  className="border border-emerald-700 bg-gradient-to-b from-black to-zinc-900 font-semibold"
                >
                  <CardContent className="p-6">
                    <h3 className="mb-4 text-2xl font-bold text-emerald-400">
                      {game.name}
                    </h3>
                    <p className="mb-4 text-slate-300">
                      Experience the competitive thrill of{" "}
                      {game.name.toLowerCase()} with your friends online. AI
                      agents (single player mode) coming soon.
                    </p>
                    <Button
                      variant="default"
                      className="border border-zinc-600 font-bold text-emerald-400 hover:border-emerald-300 hover:bg-emerald-700 hover:text-white"
                    >
                      Play {game.name}
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
              Why Choose PlayersClub?
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
              No downloads required, mobile app coming soon!
            </p>
            <Link 
              href="/signup"
              className="rounded bg-zinc-950 px-8 py-4 text-lg font-bold text-emerald-400 hover:bg-slate-900"
            >
              Create Free Account
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
