import { getAvailableGames } from "@/lib/api/games";
// import { useLoaderData } from "react-router-dom";
import { Flex, Text, Heading, AccordionRoot, AccordionItem, Box } from "@chakra-ui/react";

export async function loader() {
    return getAvailableGames();
}

type GameSummary = {
  id: string;
  createdAt: string;
  updatedAt: string;
  joined: number;
}

function handleItemClick(id: string, joined: number) {
  if (joined === 4) {
    alert('cannot join that game, it is full')
    return;
  }
  alert(`Joining game with id: ${id}`);
}

export default function Games() {
  // const games = useLoaderData<GameSummary[]>();
  const games: GameSummary[] = [
    {
      id: "1",
      createdAt: "today",
      updatedAt: "just now",
      joined: 0
    },
    {
      id: "2",
      createdAt: "yesterday",
      updatedAt: "not now",
      joined: 4
    }
  ]
  return (
    <Flex direction="column" alignItems="center" justifyContent="center" width="full" height="full">
      <Box>
        <Heading size="4xl">Available Games</Heading>
      </Box>
        <AccordionRoot
          bgColor="black"
          color="primaryComplement"
          width="xl"
          variant="subtle"
        >
          {games.map(game => 
            <AccordionItem
              key={game.id} 
              value={game.id} 
              padding="4"
              width="full"
              onClick={() => handleItemClick(game.id, game.joined)}
            >
              <Flex width="full" alignItems="center" justifyContent="space-evenly">
                  <Text>GameID: {game.id}</Text>
                  <Text>Joined: {game.joined}/4</Text>
                  <Box 
                    paddingX="2"
                    paddingY="1"
                    borderRadius="md"
                    bgColor="primaryComplement"
                    color="contrast"
                    fontWeight="extrabold"
                    fontSize="lg"
                  >
                    Join
                  </Box>
              </Flex>
            </AccordionItem>
          )}
        </AccordionRoot>
    </Flex>
  ); 
}
