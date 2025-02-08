import { betterAuth } from "better-auth";
import { anonymous } from "better-auth/plugins/anonymous";
import { nextCookies } from "better-auth/next-js";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "@/server/db";
import { secondaryStorage } from "./secondary";
import { onLinkAccountCallback } from "./utils";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
  }),
  secondaryStorage,
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: "GITHUB_CLIENT_ID",
      clientSecret: "GITHUB_CLIENT_SECRET",
    },
    // // temporarily disable for testing
    // discord: {
    //   clientId: "DISCORD_CLIENT_ID",
    //   clientSecret: "DISCORD_CLIENT_SECRET",
    // },
  },
  plugins: [
    nextCookies(),
    anonymous({
      onLinkAccount: onLinkAccountCallback,
    }),
  ],
});
