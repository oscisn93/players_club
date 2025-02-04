import { gameRules as games } from "@/lib/constants";

export default function RulesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-4xl font-bold text-emerald-400">Game Rules</h1>
      <div className="space-y-12">
        {games.map((game) => (
          <div key={game.name} className="rounded-lg bg-zinc-800 p-6">
            <h2 className="mb-4 text-2xl font-bold text-emerald-300">
              {game.name}
            </h2>
            <ul className="list-inside list-disc space-y-2 text-slate-300">
              {game.rules.map((rule, index) => (
                <li key={index}>{rule}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
