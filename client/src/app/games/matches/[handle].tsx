"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import { useState } from "react";
import auth from "@/lib/auth/client";
import { toast } from "sonner";
import { TriangleAlert } from "lucide-react";

type Props = {
  handle: string;
};

export default async function Matches({ params }: { params: Promise<Props> }) {
  const query = await params;
  const router = useRouter();
  const [userId, setUserId] = useState<string>("");
  const [selectedGame, setSelectedGame] = useState<string>("");

  function handleGameSelect(id: string) {
    if (selectedGame !== id) setSelectedGame(id);
    setSelectedGame("");
  }

  const session = auth.useSession();
  if (!session.data) {
    router.push("/signin");
  } else {
    setUserId(session.data.user.id);
  }

  const { data } = api.games.getByHandle.useQuery(query);
  const utils = api.useUtils();
  const addSelfToMatch = api.games.updateGamePlayers.useMutation({
    onSuccess: async () => {
      await utils.games.invalidate();
    },
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-4xl font-bold text-emerald-400">Find a Game</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data?.map((game) => (
          <Card
            key={game.id}
            className={`border-2 bg-zinc-800 ${selectedGame === game.id ? "border-emerald-500" : "border-zinc-700"}`}
          >
            <CardHeader>
              <CardTitle className="text-emerald-300">
                {game.variation}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300">
                Players: {game.state!.remainingPlayers}
              </p>
              <Button
                onClick={() => handleGameSelect(game.id)}
                className={`mt-4 w-full ${
                  selectedGame === game.id
                    ? "bg-emerald-500 text-zinc-900 hover:bg-emerald-600"
                    : "bg-zinc-700 text-emerald-300 hover:bg-zinc-600"
                }`}
              >
                {selectedGame === game.id ? "Selected" : "Select"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      {selectedGame && (
        <div className="mt-8 text-center">
          <Link href={`/game/${selectedGame}`}>
            <Button
              onClick={(e) => {
                e.preventDefault();
                if (!selectedGame) {
                  toast("No Game Selected", {
                    className: "bg-red-950 border border-red-200",
                    description: "You must choose a game if you want to play!",
                    duration: 1000,
                    icon: <TriangleAlert />
                  });
                  return;
                }
                addSelfToMatch.mutate({ id: selectedGame, userId });
              }}
              className="bg-emerald-500 px-8 py-3 text-lg text-zinc-900 hover:bg-emerald-600"
            >
              Start Game
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
