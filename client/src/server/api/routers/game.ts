import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { game } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const gameRouter = createTRPCRouter({
  getByHandle: publicProcedure
    .input(z.object({ handle: z.string() }))
    .query(async ({ ctx, input }) => {
      const games = await ctx.db.query.game.findMany({
        where: (game, { eq }) => eq(game.variation, input.handle),
      });
      return games ?? [];
    }),
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const game = await ctx.db.query.game.findFirst({
        where: (game, { eq }) => eq(game.id, input.id),
      });
      return game ?? null;
    }),
  updateGamePlayers: protectedProcedure
    .input(z.object({ id: z.string(), userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const gameRef = await ctx.db
        .select({
          gameId: game.id,
          gameState: game.state,
        })
        .from(game)
        .where(eq(game.id, input.id));

      if (!gameRef[0]) {
        return null;
      }
      const gameState = gameRef[0].gameState
        ? gameRef[0].gameState
        : {
            remainingPlayers: 0,
            toMove: "",
            lastMove: -1,
          };
      gameState.remainingPlayers++;
      const result = await ctx.db
        .update(game)
        .set({ state: gameState })
        .where(eq(game.id, input.id));
      const ref = result.toJSON();
    }),
});
