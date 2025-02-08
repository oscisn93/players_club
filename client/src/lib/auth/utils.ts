import type { OnLinkAnonymousDiff } from "./types";
import { signIn, signUp } from "./client";

/**
 * The following callback is called when an anonymous user
 * decides to link their existing session to an account
 */
export async function onLinkAccountCallback(diff: OnLinkAnonymousDiff) {
  console.log(diff);
  // TODO: link data created while anonymous to profile.
  // perhaps we could start with determining what type of
  // account is being linked: email or social.
}

/**
 * Wrap the client functions and export. 
 * Log responses to server, for testing.
 * NOTE: the following are client-only functions!
 */

export async function signInAnonymously() {
  const { data, error } = await signIn.anonymous();
  if (error) {
    console.error(error);
  }
  else console.log(data);
}


export async function signUpUser(
  email: string,
  password: string,
  name: string,
  image?: string,
  callbackURL?: string
) {
  const { data, error } = await signUp.email({
    email,
    password,
    name,
    image,
    callbackURL
  });
  if (error) {
    console.error(error)
  }
  else console.log(data)
}

export async function signInWithEmailAndPassword(
  email: string,
  password: string,
  callbackURL: string = "/",
  rememberMe: boolean = false,
) {
  const { data, error } = await signIn.email({
    email,
    password,
    callbackURL,
    rememberMe,
  });
  if (error) {
    console.error(error);
  }
  else console.log(data)
}

// export async function signInWithDiscord() {
//   const response = await signIn.social({
//     provider: "discord",
//   });
//   console.log(response);
// }

export async function signInWithGitHub(callbackURL: string = "/") {
  const { data, error } = await signIn.social({
    provider: "github",
    callbackURL,
    newUserCallbackURL: "/profile"
  });
  if (error) {
    console.error(error);
  }
  else console.log(data);
}
