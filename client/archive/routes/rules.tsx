import {
  Button,
  Flex,
  Heading,
  Separator,
  Table,
  Text,
} from "@chakra-ui/react";

const contracts = [
  "Three cards of the same value. No Jokers allowed.",
  "Two sets of three cards of the same value",
  "Four cards of the same value",
  "Two sets of four cards of the same value",
  "Five cards of the same value",
  "Two sets of five cards of the same value",
  "A seven card run (a straight flush in Poker)",
];

const cardPenalties = [
  { faceValue: "2-9", penaltyPoints: "face value" },
  { faceValue: "10, J, Q, K", penaltyPoints: "10" },
  { faceValue: "A", penaltyPoints: "13" },
  { faceValue: "Joker", penaltyPoints: "15" },
];

export default function Rules() {
  return (
    <>
      <Flex direction="column" width="full" alignItems="center">
        <Heading>Rules of the Game</Heading>
        <Flex direction="column" textAlign="left" width="2/3" paddingY="4">
          <Heading>Requirements</Heading>
          <Text>
            Requires 2 to 4 players as well as a two standard decks with a set
            of Jokers each (total 4 jokers).
          </Text>
          <Separator size="md" marginY="2" />
          <Heading>Objectives</Heading>
          <Text>
            The objective of the game is to finish with the least amount of
            penalty points. In each round the player who gets rid of all of
            their cards first gets zero points while everyone else gets the sum
            of the values of the cards in their hands.
          </Text>
          <Separator size="md" marginY="2" />
          <Heading>Rounds</Heading>
          <Text>
            A round starts with a freshly shuffled deck, each player gets dealt
            11 total cards, with one additional card placed in the middle of the
            table next to the deck. Players can get rid of their hand cards by
            creating melds (either 3 or more of the same card or 3 or more
            in-order cards of the same suit). However, the first meld each
            player puts down MUST satisfy that round's contract!
          </Text>
          <Separator size="md" marginY="2" />
          <Heading>Contracts</Heading>
          <Text>
            Contracts are a minimum characteristic that a player's first meld of
            that round must meet to unlock the rest of the possible melds in
            their hand. Below is the list of rounds and their corresponding
            contract requirements:
          </Text>
          <Table.Root size="sm" margin="4" striped>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader textAlign="center">
                  Round
                </Table.ColumnHeader>
                <Table.ColumnHeader textAlign="center">
                  Contract Requirement
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {contracts.map((contract: string, index: number) => (
                <Table.Row>
                  <Table.Cell textAlign="center">{index + 1}</Table.Cell>
                  <Table.Cell textAlign="center">{contract}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
          <Separator size="md" marginY="2" />
          <Heading>Card Penalty Points</Heading>
          <Text>
            Each card has a value associated with it thtat counts against the
            player who is still holding it at the end of a round. The table
            below summarizes these values:
          </Text>
          <br />
          <Table.Root size="sm" margin="4" striped>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader textAlign="center">
                  face value
                </Table.ColumnHeader>
                <Table.ColumnHeader textAlign="center">
                  penalty points
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {cardPenalties.map(({ faceValue, penaltyPoints }) => (
                <Table.Row>
                  <Table.Cell textAlign="center">{faceValue}</Table.Cell>
                  <Table.Cell textAlign="center">{penaltyPoints}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
          <Separator size="md" marginY="2" />
          <Heading>Chips</Heading>
          <Text>
            Additionally, each player gets a total of 7 chips to buy cards from
            the discard pile. Players may only use a maximum of one chip per
            round, except on the last round.
          </Text>
        </Flex>
        <Flex
          direction="column"
          gap="2"
          alignItems="center"
          justifyContent="center"
          padding="4"
        >
          <Heading>Ready to play now? Click the button below!</Heading>
          <Button
            bgColor="red.600"
            color="contrast"
            fontWeight="extrabold"
            fontSize="xl"
          >
            Start Playing
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
