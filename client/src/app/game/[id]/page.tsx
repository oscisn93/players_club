"use client";

import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { type User, mockGames } from "@/lib/mockData";

export default function GamePage() {
  const params = useParams();
  const gameId = Number.parseInt(params.id as string);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const game = mockGames.find((g) => g.id === Math.abs(gameId));

  if (!game) {
    return <div>Game not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-4xl font-bold text-emerald-400">{game.name}</h1>
      <div className="rounded-lg bg-zinc-800 p-8">
        <p className="mb-4 text-slate-300">Welcome to {game.name}!</p>
        {user ? (
          <>
            <p className="mb-4 text-slate-300">
              You are playing as {user.username}.
            </p>
            <p className="mb-4 text-slate-300">Your current stats:</p>
            <ul className="mb-4 list-inside list-disc text-slate-300">
              <li>Games Played: {user.gamesPlayed}</li>
              <li>Wins: {user.wins}</li>
              <li>Losses: {user.losses}</li>
            </ul>
          </>
        ) : (
          <p className="mb-4 text-slate-300">
            You are playing as an anonymous user. Sign up to track your
            progress!
          </p>
        )}
        <p className="mb-4 text-slate-300">
          Game difficulty: {game.difficulty}
        </p>
        <p className="mb-4 text-slate-300">Number of players: {game.players}</p>
        <Button className="bg-emerald-500 text-zinc-900 hover:bg-emerald-600">
          Start Game
        </Button>
      </div>
    </div>
  );
}
