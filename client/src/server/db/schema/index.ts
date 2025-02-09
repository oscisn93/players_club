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

export const card = sqliteTable("card", {
  id: text("id").primaryKey(),
  rank: text("rank").notNull(),
  suit: text("suit").notNull(),
  value: int("value").default(0).notNull(),
  imageURL: text("image_url").notNull(),
});

export type InsertCard = InferInsertModel<typeof card>;
export type Card = InferSelectModel<typeof card>;

export const pile = sqliteTable("pile", {
  id: text("id").primaryKey(),
  count: integer("count").default(0).notNull(),
  variation: text("variation"),
  createdAt: int("created_at", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdate(
    () => new Date(),
  ),
});

export type InsertPile = InferInsertModel<typeof pile>;
export type Pile = InferSelectModel<typeof pile>;

export const game = sqliteTable("game", {
  id: text("id").primaryKey(),
  variation: text("variation").default("standard").notNull(),
  deckId: text("deck_id")
    .notNull()
    .references(() => deck.id),
  createdAt: int("created_at", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdate(
    () => new Date(),
  ),
});

export type InsertGame = InferInsertModel<typeof game>;
export type Game = InferSelectModel<typeof game>;

export type GenericPlayerState = {
  cards: Card[];
  points: number;
  status: string;
};

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
    displayName: text("display_name").notNull(),
    state: blob("state", { mode: "json" }).$type<GenericPlayerState>(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.gameId] }),
  }),
);

export type InsertPlayer = InferInsertModel<typeof player>;
export type Player = InferSelectModel<typeof player>;
