import { GameConfig } from "../types";
import { getOrderFromRank, handRanks } from "./hand-ranks";

export const pokerConfig: GameConfig = {
  minPlayers: 2,
  maxPlayers: 7,
  deckType: "STANDARD",
  jokersEnabled: false,
  suits: {
    variations: ["S", "H", "C", "D"],
    parity: () => 0,
  },
  ranks: {
    variations: [
      "A",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      "J",
      "Q",
      "K",
    ],
    order: getOrderFromRank,
  },
  rankedHands: true,
  rankings: handRanks,
  betting: true,
  bidding: false,
};
