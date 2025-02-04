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
