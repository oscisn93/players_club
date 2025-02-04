// TODO: Ensure that all type updates are enforcwed by removing
// ts-ignores wherever the code snippets containing them survive
// @ts-ignore
import { v4 as uuid } from "uuid";

import { DeckAPI, DeckDrawAPI } from "./types";
import { Deck } from "@/lib/types";
import { parseCards } from "./utils";
import { API_URL } from "./constants";

export async function fetchDeckFromAPI(): Promise<Deck | undefined> {
  const deckEnpointURL = `${API_URL}/deck/new/shuffle/?jokers_enabled=true`;
  let deckID = uuid();
  let gameDeck;
  try {
    const decks = ["", ""];
    let count = 0;
    for (let i = 0; i < 2; i++) {
      const response = await fetch(deckEnpointURL, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { success, deck_id, remaining }: DeckAPI = await response.json();
      if (!success) {
        throw new Error(
          "Failed to generate a new deck. Please try again later.",
        );
      }
      decks[i] = deck_id;
      count += remaining;
    }
    gameDeck = {
      // @ts-ignore
      id: deckID,
      decks: decks as [string, string],
      remaining: count
    };
  } catch (err) {
    console.error(err);
  }
  return gameDeck;
}

export async function fetchDeckById(id: string): Promise<Deck | undefined> {
  const deckEnpointURL = `${API_URL}/deck/${id}/shuffle/?remaining=true`;
  let gameDeck;
  try {
    const decks = ["", ""];
    let count = 0;
    for (let i = 0; i < 2; i++) {
      const response = await fetch(deckEnpointURL, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { success, deck_id, remaining }: DeckAPI = await response.json();
      if (!success) {
        throw new Error(
          "Failed to generate a new deck. Please try again later.",
        );
      }
      decks[i] = deck_id;
      count += remaining;
    }
    gameDeck = {
      // @ts-ignore
      id: deckID,
      decks: decks as [string, string],
      remaining: count,
    };
  } catch (err) {
    console.error(err);
  }
  return gameDeck;
}

// @ts-ignore
export async function reshuffleDeck(gameID: string): Promise<Deck | undefined> {
  // @ts-ignore
  const [idOne, idTwo] = games;
  const reshuffleEnpointURLs = [
    `${API_URL}/deck/${idOne}/shuffle/`,
    `${API_URL}/deck/${idTwo}/shuffle/`,
  ];
  let gameDeck;
  try {
    let count = 0;
    for (let i = 0; i < 2; i++) {
      const response = await fetch(reshuffleEnpointURLs[i], {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { success, deck_id, remaining }: DeckAPI = await response.json();
      if (!success) {
        throw new Error(
          "Failed to shuffle the exisiting deck. Please try again later.",
        );
      }
      // @ts-ignore
      decks[i] = deck_id;
      count += remaining;
    }
    gameDeck = {
      // @ts-ignore
      id: deckID,
      // @ts-ignore
      decks: decks as [string, string],
      remaining: count,
    };
  } catch (err) {
    console.error(err);
  }
  return gameDeck;
}

export async function drawCards(
  deckID: string,
  count: number,
  // @ts-ignore
): Promise<Draw | undefined> {
  const drawEnpointURL = `${API_URL}/deck/${deckID}/draw/?count=${count}`;
  let draw;
  try {
    const response = await fetch(drawEnpointURL);
    const { success, cards, remaining }: DeckDrawAPI = await response.json();
    if (!success) {
      throw new Error(
        "Failed to draw a hand from the deck. Please try again later.",
      );
    }
    draw = {
      cards: parseCards(cards),
      count,
      remaining,
    };
  } catch (err) {
    console.error(err);
  }
  return draw;
}
