import { Rank, Suit } from "@/lib/types";

// Configurations values for the card suits
// standard suit counts
const STANDARD_SUIT_COUNT = 13;
const STANDARD_WILD_SUIT_COUNT = 1;

// in a standard deck no suit is greater than any other so they all have a relative strength vaue of 0
const STANDARD_SUIT_VALUE = 0;

// example function to pass to configure how what the relative value of each suit in the deck is
export const standardSuitValueFn = (_suit: string) => STANDARD_SUIT_VALUE;

// example function to pass to configure how many of each suit are in the deck
export const standardSuitCountFn = (suit: string) => {
  if (suit === "1" || suit === "2") {
    return STANDARD_WILD_SUIT_COUNT;
  }
  return STANDARD_SUIT_COUNT;
};

// configuration values for card ranks
// standard rank counts
const STANDARD_BASE_RANK_COUNT = 4;
const STANDARD_WILD_RANK_COUNT = 2;

// example card rank counts
export function standardRankCountFn(rank: string) {
  if (rank === "JOKER") {
    return STANDARD_WILD_RANK_COUNT;
  }
  return STANDARD_BASE_RANK_COUNT;
}

// example function to cofigure the values of each rank
export function standardRankValueFn(rank: string) {
  switch (rank) {
    case "X":
      return 15;
    case "A":
      return 14;
    case "K":
      return 13;
    case "Q":
      return 12;
    case "J":
      return 11;
    case "0":
      return 10;
    default:
      return parseInt(rank);
  }
}

// NOTE: The folllowing is a sample configuration for the
// standard playing deck, it will be followed by two more for
// telefunken and pinocle to lead to the development of a sufficiently
// flexible but precise deck definintion object model.

export type SuitConfig = {};

// stuitValue: standardSuitValueFn,
// suitCount: standardSuitCountFn

export const deckConfig = {
  suits: {
    clubs: {
      name: "CLUBS",
      code: "C",
      isWild: false,
    },
    hearts: {
      name: "HEARTS",
      code: "H",
      isWild: false,
    },
    spades: {
      name: "SPADES",
      code: "S",
      isWild: false,
    },
    diamonds: {
      name: "DIAMONDS",
      code: "D",
      isWild: false,
    },
    black: {
      name: "BLACK",
      code: "1",
      isWild: true,
    },
    red: {
      name: "RED",
      code: "2",
      isWild: true,
    },
  },
  ranks: {
    A: {
      name: "ACE",
      code: "A",
      isWild: false,
    },
    "1": {
      name: "ONE",
      code: "1",
      isWild: false,
    },
    "2": {
      name: "TWO",
      code: "2",
      isWild: false,
    },
    "3": {
      name: "THREE",
      code: "3",
      isWild: false,
    },
    "4": {
      name: "FOUR",
      code: "4",
      isWild: false,
    },
    "5": {
      name: "FIVE",
      code: "5",
      isWild: false,
    },
    "6": {
      name: "SIX",
      code: "6",
      isWild: false,
    },
    "7": {
      name: "SEVEN",
      code: "7",
      isWild: false,
    },
    "8": {
      name: "EIGHT",
      code: "8",
      isWild: false,
    },
    "9": {
      name: "NINE",
      code: "9",
      isWild: false,
    },
    "0": {
      name: "TEN",
      code: "0",
      isWild: false,
    },
    J: {
      name: "JACK",
      code: "J",
      isWild: false,
    },
    Q: {
      name: "QUEEN",
      code: "Q",
      isWild: false,
    },
    K: {
      name: "KING",
      code: "K",
      isWild: false,
    },
    X: {
      name: "JOKER",
      code: "X",
      isWild: true,
    },
  },
  rankValue: standardRankValueFn,
  rankCount: standardRankCountFn,
};

export const rankToNameMap: Record<Rank, string> = {
  A: "ACE",
  "2": "TWO",
  "3": "THREE",
  "4": "FOUR",
  "5": "FIVE",
  "6": "SIX",
  "7": "SEVEN",
  "8": "EIGHT",
  "9": "NINE",
  "10": "TEN",
  J: "JACK",
  Q: "QUEEN",
  K: "KING",
  X: "JOKER",
};

export const nameToRankMap: Record<string, Rank> = {
  ACE: "A",
  TWO: "2",
  THREE: "3",
  FOUR: "4",
  FIVE: "5",
  SIX: "6",
  SEVEN: "7",
  EIGHT: "8",
  NINE: "9",
  TEN: "10",
  JACK: "J",
  QUEEN: "Q",
  KING: "K",
  JOKER: "X",
};

export const suitToName: Record<Suit, string> = {
  S: "SPADES",
  H: "HEARTS",
  C: "CLUBS",
  D: "DIAMONDS",
  "1": "BLACK",
  "2": "RED",
};

export const nameToSuit: Record<string, Suit> = {
  SPADES: "S",
  HEARTS: "H",
  CLUBS: "C",
  DIAMONDS: "D",
  BLACK: "1",
  RED: "2",
};

export const rankToPenalty = (rank: Rank) => {
  switch (rank) {
    case "X":
      return 15;
    case "A":
      return 11;
    case "J":
    case "Q":
    case "K":
      return 10;
    default:
      return parseInt(rank);
  }
};

// NOTE:
// we will still sue this API endpoint to manage the deck as it would
// improve development velocity, however may need to implement our own playingcards
// especially if a more generic version is required to expand this app
// to allow users to play multiple games with various decks
export const API_URL = "https://deckofcardsapi.com/api";

export const games = {
  "1": {
    players: [
      {
        uid: "UUID",
        username: "String",
        avatar: "ImageURL",
        scores: [],
      },
    ],
    deckID: "1",
    decks: ["stringone", "stringtwo"],
    round: 1,
    leaderboard: [],
  },
};
