import { InferInsertModel, InferSelectModel, sql } from "drizzle-orm";
import {
  int,
  integer,
  text,
  primaryKey,
  sqliteTable,
  blob,
} from "drizzle-orm/sqlite-core";

import { user } from "./auth";

export const card = sqliteTable("card", {
  id: text("id").primaryKey(),
  rank: text("rank").notNull(),
  order: int("order").notNull(),
  suit: text("suit").notNull(),
  value: int("value").default(0).notNull(),
  imageURL: text("image_url").notNull(),
});

export type InsertCard = InferInsertModel<typeof card>;
export type Card = InferSelectModel<typeof card>;

export const deck = sqliteTable("deck", {
  id: text("id").primaryKey(),
  count: integer("count").notNull(),
  size: integer("size").notNull(),
  createdAt: int("created_at", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdate(
    () => new Date(),
  ),
});

export type InsertDeck = InferInsertModel<typeof deck>;
export type Deck = InferSelectModel<typeof deck>;

export const deckCard = sqliteTable("deck_card", {
  deckId: text("deck_id")
    .notNull()
    .references(() => deck.id),
  cardId: text("card_id")
    .notNull()
    .references(() => card.id),
});

export const pile = sqliteTable("pile", {
  id: text("id").primaryKey(),
  deckId: text("deck_id")
    .notNull()
    .references(() => deck.id),
  variation: text("variation"),
  count: integer("count").default(0).notNull(),
  createdAt: int("created_at", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdate(
    () => new Date(),
  ),
});

export const pileCard = sqliteTable(
  "pile_card",
  {
    pileId: text("id")
      .notNull()
      .references(() => pile.id, { onDelete: "cascade" }),
    cardId: text("id")
      .notNull()
      .references(() => card.id, {}),
  },
  (t) => [primaryKey({ columns: [t.pileId, t.cardId] })],
);

export type InsertPile = InferInsertModel<typeof pile>;
export type Pile = InferSelectModel<typeof pile>;

type GenericGameState = {
  remainingPlayers: number;
  toMove: string;
  lastMove: Date | number;
};

export const game = sqliteTable("game", {
  id: text("id").primaryKey(),
  state: blob("state", { mode: "json" }).$type<GenericGameState>(),
  variation: text("variation").default("standard").notNull(),
  createdAt: int("created_at", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdate(
    () => new Date(),
  ),
});

export type InsertGame = InferInsertModel<typeof game>;
export type Game = InferSelectModel<typeof game>;

export const player = sqliteTable(
  "player",
  {
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onUpdate: "cascade", onDelete: "cascade" }),
    gameId: text("game_id").references(() => game.id, {
      onUpdate: "cascade",
      onDelete: "set null",
    }),
    points: integer("points").default(0),
    status: text("status").default("idle"),
    displayName: text("display_name").notNull(),
  },
  (t) => [primaryKey({ columns: [t.userId, t.gameId] })],
);

export type InsertPlayer = InferInsertModel<typeof player>;
export type Player = InferSelectModel<typeof player>;

export const playerCard = sqliteTable("player_card", {
  playerId: text("player_id")
    .notNull()
    .references(() => player.userId, { onDelete: 'cascade', onUpdate: 'cascade' }),
  cardId: text("card_id")
    .notNull()
    .references(() => card.id)
});
