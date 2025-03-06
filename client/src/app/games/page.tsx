import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const gameVariations = [
  {
    name: "poker",
    coverURL: "",
  },
  {
    name: "blackjack",
    coverURL: "",
  },
  {
    name: "rummy",
    coverURL: "",
  },
];

function Games() {
  return (
    <div className="flex flex-col justify-center py-2">
      <h1>What game would you like to play?</h1>
      {gameVariations.map((game) => (
        <Link href={`/games/matches/${game.name}`}>
          <Card>
            <CardTitle>{game.name}</CardTitle>
            <CardContent>
              <Image src={game.coverURL} alt={game.name} />
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
