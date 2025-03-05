// import { Card, CardAPI, CardCode, Deck, Rank, Suit } from "./types";

// export function parseCards(apiCards: CardAPI[]) {
//   const cards: Card[] = [];
//   for (const apiCard of apiCards) {
//     const [rank, suit] = apiCard.code.split("");
//     const card: Card = {
//       code: apiCard.code as CardCode,
//       image: apiCard.image,
//       suit: suit as Suit,
//       rank: rank as Rank,
//     };
//     cards.push(card);
//   }
//   return cards;
// }
