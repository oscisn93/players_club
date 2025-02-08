export type WithArbitraryProps<T> = T & Record<string, string>;

export type GenericPlayerState = {
  cards: Card[];
  points: number;
  status: string;
};



export interface CardAPI {
  code: string;
  image: string;
}

export interface DeckDrawAPI {
  success: boolean;
  deck_id: string;
  cards: CardAPI[];
  remaining: number;
}

export interface DeckAPI {
  success: boolean;
  deck_id: string;
  remaining: number;
}

export type Suit = "S" | "H" | "C" | "D" | "1" | "2";
export type Rank =
  | "A"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "J"
  | "Q"
  | "K"
  | "X";

export type CardCode = `${Rank}${Suit}`;
export type Card = {
  code: CardCode;
  image: string;
  suit: Suit;
  rank: Rank;
};
export type Meld = {
  pile: Card[];
  hasJoker: boolean;
};
export type Contract = {
  minSize: number;
  pure: boolean;
};
export type GameStatus = "CREATED" | "PENDING" | "ACTIVE" | "IDLE" | "ENDED";
export interface DataStore {
  users: User[];
  games: Game[];
  decks: Deck[];
  players: Player[];
}
export interface User {
  uid: string;
  email: string;
  username: string;
  avatar_url: string;
}

export interface Game {
  id: string;
  status: GameStatus;
  players: string[];
  toMove: string;
  deck_id: string;
  round: {
    no: number;
    contract: Contract;
  };
  created_at: number;
}

export interface Deck {
  status: string;
  cards: [string, string];
  remaining: number;
  discard: any[];
  melds: any[];
  order: any[];
}

export interface Player {
  cards: any[];
  chips: number;
  scores: any[];
  total_points: number;
}
