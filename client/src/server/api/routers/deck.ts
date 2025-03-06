import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { deck } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const deckRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        size: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(deck).values({
        id: input.id,
        count: input.size,
        size: input.size,
      });
    }),
  updateCount: protectedProcedure
    .input(z.object({ id: z.string(), updatedCount: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(deck)
        .set({ count: input.updatedCount })
        .where(eq(deck.id, input.id));
    }),
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const gameDeck = await ctx.db.query.deck.findFirst({
        where: (deck, { eq }) => eq(deck.id, input.id),
      });
      return gameDeck ?? null;
    }),
});
