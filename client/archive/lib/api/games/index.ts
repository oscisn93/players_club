import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function getAvailableGames() {
  const querySnapshot = await getDocs(collection(db, "games"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data}`);
  });
}

export async function 
