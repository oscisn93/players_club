import { createAuthClient } from "better-auth/react";
import { anonymousClient } from "better-auth/client/plugins";
import { env } from "@/env";

const authClient = createAuthClient({
  baseURL: env.BETTER_AUTH_URL,
  plugins: [anonymousClient()],
});

export const { signIn, signOut, signUp, useSession } = authClient;
