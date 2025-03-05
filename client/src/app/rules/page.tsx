import { gameRules as games } from "@/lib/constants";

export default function RulesPage() {
  return (
    <div className="flex flex-col items-center mb-16">
      <h1 className="m-8 text-4xl font-bold text-emerald-500">Game Rules</h1>
      <div className="flex flex-col gap-8 justify-center">
        {games.map((game) => (
          <div id={game.name} key={game.name} className="max-w-[800px] rounded-md bg-gradient-to-r from-zinc-950 to-slate-900 border border-emerald-500 p-6">
            <h2 className="mb-4 text-3xl font-bold text-emerald-500">
              {game.name}
            </h2>
            <ul className="list-inside list-decimal space-y-2 text-zinc-400 font-semibold">
              {game.rules.map((rule, index) => (
                <li className="text-lg" key={index}>{rule}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
