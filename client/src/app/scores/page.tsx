"use client";

import { useState, useEffect } from "react";
import { mockScores, type Score, mockGames } from "@/lib/mockData";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ScoresPage() {
  const [selectedGame, setSelectedGame] = useState<string>("All");
  const [filteredScores, setFilteredScores] = useState<Score[]>(mockScores);

  useEffect(() => {
    if (selectedGame === "All") {
      setFilteredScores(mockScores);
    } else {
      setFilteredScores(
        mockScores.filter((score) => score.game === selectedGame),
      );
    }
  }, [selectedGame]);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-4xl font-bold text-emerald-400">Leaderboard</h1>
      <div className="mb-6">
        <Select onValueChange={setSelectedGame}>
          <SelectTrigger className="w-[180px] bg-zinc-800 text-emerald-200">
            <SelectValue placeholder="Select Game" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-800 text-emerald-200">
            <SelectItem value="All">All Games</SelectItem>
            {mockGames.map((game) => (
              <SelectItem key={game.id} value={game.name}>
                {game.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Table className="overflow-hidden rounded-lg bg-zinc-800">
        <TableCaption>Top players across all card games</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-emerald-300">Rank</TableHead>
            <TableHead className="text-emerald-300">Username</TableHead>
            <TableHead className="text-emerald-300">Game</TableHead>
            <TableHead className="text-right text-emerald-300">Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredScores.map((score, index) => (
            <TableRow key={score.id}>
              <TableCell className="font-medium text-emerald-200">
                {index + 1}
              </TableCell>
              <TableCell className="text-emerald-200">
                {score.username}
              </TableCell>
              <TableCell className="text-emerald-200">{score.game}</TableCell>
              <TableCell className="text-right text-emerald-200">
                {score.score}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
