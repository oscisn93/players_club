import { auth } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

interface AuthProvider {
  userId: string | null;
  registerUser(email: string, password: string): Promise<void>;
  logInUser(email: string, password: string): Promise<void>;
  logOut(): Promise<void>;
}

export const authProvider: AuthProvider = {
  userId: null,
  async registerUser(email: string, password: string) {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const userId = result.user.uid;
    authProvider.userId = userId;
  },
  async logInUser(email: string, password: string) {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const userId = result.user.uid;
    authProvider.userId = userId;
  },
  async logOut() {
    await signOut(auth);
    authProvider.userId = null;
  },
};
