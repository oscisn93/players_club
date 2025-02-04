export default function RulesPage() {
  const games = [
    {
      name: "Poker",
      rules: [
        "The game is played with a standard 52-card deck.",
        "Players are dealt two cards face down (hole cards).",
        "Five community cards are dealt face up in the middle of the table.",
        "Players make the best five-card hand using any combination of their hole cards and the community cards.",
        "Betting rounds occur after the hole cards are dealt, after the first three community cards (the flop), after the fourth community card (the turn), and after the fifth community card (the river).",
        "The player with the best hand at showdown wins the pot.",
      ],
    },
    {
      name: "Blackjack",
      rules: [
        "The goal is to beat the dealer's hand without going over 21.",
        "Face cards are worth 10. Aces are worth 1 or 11, whichever makes a better hand.",
        "Each player starts with two cards, one of the dealer's cards is hidden until the end.",
        "To 'Hit' is to ask for another card. To 'Stand' is to hold your total and end your turn.",
        "If you go over 21 you bust, and the dealer wins regardless of the dealer's hand.",
        "Dealer will hit until their cards total 17 or higher.",
      ],
    },
    {
      name: "Bridge",
      rules: [
        "Played with four players in two competing partnerships.",
        "Uses a standard 52-card deck.",
        "The game consists of two phases: bidding and playing.",
        "During bidding, partnerships compete to win the contract, which sets the trump suit and the number of tricks that must be won.",
        "The playing phase involves winning tricks, with the goal of fulfilling the contract.",
        "Scoring is based on the number of tricks won in relation to the contract.",
      ],
    },
  ];

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
