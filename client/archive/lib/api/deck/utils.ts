import { CardAPI, Card, CardCode, Suit, Rank, Deck } from "./types";

export function parseCards(apiCards: CardAPI[]) {
  const cards: Card[] = [];
  for (const apiCard of apiCards) {
    const [rank, suit] = apiCard.code.split("");
    const card: Card = {
      code: apiCard.code as CardCode,
      image: apiCard.image,
      suit: suit as Suit,
      rank: rank as Rank,
    };
    cards.push(card);
  }
  return cards;
}

export function randomizeDeckDraws(count: number) {
  let sequence = [];
  for (let i = 0; i < count; i++) {
    let deck = Math.floor(Math.random() * 2) % 2;
    sequence.push(deck);
  }
  return sequence;
}

function shuffle(deck: Deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i - 1);
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}
