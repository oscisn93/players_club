export type BaseCard = {
  rank: string;
  suit: string;
};

export type DeckType = "STANDARD" | "DOUBLE_DECK";

export type GameConfig = {
  minPlayers: number;
  maxPlayers: number;
  deckType: DeckType;
  jokersEnabled: boolean;
  suits: {
    variations: string[];
    parity: (suit: string) => number | number;
  };
  ranks: {
    variations: string[];
    order: (rank: string) => number;
  };
  rankedHands: boolean;
  rankings: (cards: BaseCard[]) => number;
  betting: boolean;
  bidding: boolean;
};
