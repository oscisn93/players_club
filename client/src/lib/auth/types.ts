import type { User, Session } from "better-auth";
import type { UserWithAnonymous } from "better-auth/plugins/anonymous";
import type { WithArbitraryProps } from "../types";

export type UserWithSession = {
  user: WithArbitraryProps<User | UserWithAnonymous>;
  session: WithArbitraryProps<Session>;
};

export type OnLinkAnonymousDiff = {
  anonymousUser: UserWithSession;
  newUser: UserWithSession;
};
