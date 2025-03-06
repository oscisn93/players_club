import { createAuthClient } from "better-auth/react";
import { anonymousClient } from "better-auth/client/plugins";
import { env } from "@/env";

const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_BETTER_AUTH_URL,
  plugins: [anonymousClient()],
});

/**
 * Wrap the client functions and export.
 * Log responses to server, for testing.
 * NOTE: the following are client-only functions!
 */
async function signInAnonymously() {
  const { data, error } = await authClient.signIn.anonymous();
  if (error) {
    console.error(error);
  } else return data;
}

async function signInWithEmailAndPassword(
  email: string,
  password: string,
  callbackURL: string = "/",
  rememberMe: boolean = false,
) {
  const { data, error } = await authClient.signIn.email({
    email,
    password,
    callbackURL,
    rememberMe,
  });
  if (error) {
    console.error(error);
  } else return data;
}

async function signInWithGitHub() {
  const { data, error } = await authClient.signIn.social({
    provider: "github",
  });
  if (error) {
    console.error(error);
  } else return data;
}
const auth = {
  signInWithEmailAndPassword,
  signInAnonymously,
  signInWithGitHub,
  useSession: authClient.useSession,
  signUp: authClient.signUp,
  signOut: authClient.signOut,
  updateUser: authClient.updateUser,
}
export default auth;  