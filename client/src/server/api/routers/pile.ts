import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { pile } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const pileRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        deckId: z.string(),
        count: z.number().optional(),
        variation: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(pile).values({
        id: input.id,
        deckId: input.deckId,
        count: input.count,
        variation: input.variation,
      });
    }),
  updateCount: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        updatedCount: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.update(pile).set({ count: input.updatedCount });
    }),
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const gamePile = await ctx.db.query.pile.findFirst({
        where: (pile, { eq }) => eq(pile.id, input.id),
      });
      return gamePile ?? null;
    }),
  getDeckPiles: protectedProcedure
    .input(z.object({ deckId: z.string() }))
    .query(async ({ ctx, input }) => {
      const deckPiles = await ctx.db.query.pile.findMany({
        where: (pile, { eq }) => eq(pile.deckId, input.deckId),
      });
      return deckPiles;
    }),
  deletePile: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(pile).where(eq(pile.id, input.id));
    }),
});
