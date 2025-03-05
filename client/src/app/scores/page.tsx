"use client";

import { useState } from "react";
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
            <span>Thanks for selecting me.</span> 
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
          some data...
        </TableBody>
      </Table>
    </div>
  );
}
