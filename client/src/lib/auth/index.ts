import { type User, type Session, betterAuth } from "better-auth";
import { UserWithAnonymous, anonymous } from "better-auth/plugins/anonymous";
import { nextCookies } from "better-auth/next-js";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { secondaryStorage } from "./secondary-storage";
import type { WithArbitraryProps } from "@/lib/types";
import { db } from "@/server/db";
import { env } from "@/env";
import { account, user, verification } from "@/server/db/schema/auth";

// some utility types that may help with debugging
export type UserWithSession = {
  user: WithArbitraryProps<User | UserWithAnonymous>;
  session: WithArbitraryProps<Session>;
};
type OnLinkAnonymousDiff = {
  anonymousUser: UserWithSession;
  newUser: UserWithSession;
};
// TODO: link data created while anonymous to profile.
async function onLinkAccountCallback(diff: OnLinkAnonymousDiff) {
  console.log(diff);
}

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: {
      user,
      account,
      verification,
    },
  }),
  secondaryStorage,
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
  },
  plugins: [
    nextCookies(),
    anonymous({
      onLinkAccount: onLinkAccountCallback,
    }),
  ],
});
