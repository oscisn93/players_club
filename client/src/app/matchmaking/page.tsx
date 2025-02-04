"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { mockGames, type User } from "@/lib/mockData";
import { useRouter } from "next/navigation";

export default function MatchmakingPage() {
  const [selectedGame, setSelectedGame] = useState<number | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleGameSelect = (gameId: number) => {
    if (user) {
      setSelectedGame(gameId);
    } else {
      // For anonymous users, we'll use a negative ID to indicate it's an anonymous game
      setSelectedGame(-gameId);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-4xl font-bold text-emerald-400">Find a Game</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockGames.map((game) => (
          <Card
            key={game.id}
            className={`border-2 bg-zinc-800 ${Math.abs(selectedGame || 0) === game.id ? "border-emerald-500" : "border-zinc-700"}`}
          >
            <CardHeader>
              <CardTitle className="text-emerald-300">{game.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300">Players: {game.players}</p>
              <p className="text-slate-300">Difficulty: {game.difficulty}</p>
              <Button
                onClick={() => handleGameSelect(game.id)}
                className={`mt-4 w-full ${
                  Math.abs(selectedGame || 0) === game.id
                    ? "bg-emerald-500 text-zinc-900 hover:bg-emerald-600"
                    : "bg-zinc-700 text-emerald-300 hover:bg-zinc-600"
                }`}
              >
                {Math.abs(selectedGame || 0) === game.id
                  ? "Selected"
                  : "Select"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      {selectedGame && (
        <div className="mt-8 text-center">
          <Link href={`/game/${selectedGame}`}>
            <Button className="bg-emerald-500 px-8 py-3 text-lg text-zinc-900 hover:bg-emerald-600">
              Start Game
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
