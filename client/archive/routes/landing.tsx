import {
  Box,
  Text,
  Flex,
  Link,
  Image,
  Button,
  Heading,
  AspectRatio,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

import { HiOutlineArrowCircleRight } from "react-icons/hi";

export default function Landing() {
  const navigate = useNavigate();
  return (
    <>
      <AspectRatio
        width="full"
        ratio={2 / 1}
        borderBottomWidth="thin"
        borderBottomColor="primaryComplement"
      >
        <Image
          src="https://github.com/user-attachments/assets/02d16127-5699-48e6-af73-c2749de8a9ba"
          alt="A playing card hand above a game table"
          objectFit="cover"
        />
      </AspectRatio>
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        height="2xl"
        width="full"
        bgColor="black"
        paddingY="8"
        gap="4"
      >
        <Box
          bgColor="primaryComplement/80"
          borderRadius="md"
          borderWidth="2px"
          borderColor="contrast"
          padding="4"
        >
          <Image src="https://github.com/user-attachments/assets/2450c871-bff5-4a31-a209-9b5b3bc3aef1" />
        </Box>
        <Heading>What is it?</Heading>
        <Text
          textAlign="center"
          fontSize="md"
          color="primaryComplement"
          fontWeight="bold"
          paddingBottom="8px"
        >
          A fun, contract-based, rummy-like card game, popular in South America!
        </Text>
      </Flex>
      <Flex
        borderTopWidth="thin"
        borderTopColor="contrast"
        bgGradient="to-b"
        gradientFrom="primaryComplement/40"
        gradientTo="black/20"
        justifyContent="center"
      >
        <Flex
          width="1/2"
          height="full"
          direction="column"
          alignItems="center"
          justifyContent="center"
          paddingY="8"
        >
          <Flex direction="column" gap="8px" alignItems="center">
            <Heading paddingY="4px" fontSize="lg" fontWeight="semibold">
              It's like Rummy, but with contracts... and chips... and more fun!
            </Heading>
            <Box color="green.300" marginBottom="4px" fontSize="md">
              The game is like classic Rummy, except it incorporates additional
              features which make it differentiable from other variants and adds
              an element of luck as well as additional strategies. unlike in
              Rummy where the first meld must always meet the same criteria, in
              Telefunke, each round get's increasingly challenging until either
              one wins or a fight ensues. Best of luck!!
            </Box>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        borderTopWidth="thin"
        borderTopColor="contrast"
        borderBottomWidth="thin"
        borderBottomColor="contrast"
        direction="column"
        alignItems="center"
        height="full"
        width="full"
        padding="4"
        textStyle="josefinSansFont"
        bgColor="black"
        gap="2"
        paddingBottom="24"
      >
        <Heading
          paddingTop="4px"
          fontSize="2xl"
          textStyle="josefinSansFont"
          color="primaryComplement"
          fontWeight="bold"
        >
          Want to learn more?
        </Heading>
        <Flex
          width="1/6"
          marginY="4px"
          padding="8px"
          borderRadius="sm"
          borderWidth="2px"
          borderColor="primaryComplement"
          bgColor="black"
          alignItems="center"
          justifyContent="center"
        >
          <Text>Read the instructions!</Text>
          <Link
            paddingLeft="8px"
            fontSize="2xl"
            color="primaryComplement/90"
            href="/rules"
          >
            <HiOutlineArrowCircleRight />
          </Link>
        </Flex>
        <Heading
          paddingTop="4px"
          fontSize="2xl"
          textStyle="josefinSansFont"
          color="primaryComplement"
          fontWeight="bold"
        >
          Ready to get started?
        </Heading>
        <Button
          textAlign="center"
          marginTop="16px"
          padding="32px"
          maxW="40%"
          height="70px"
          bgColor="secondary"
          color="contrast"
          borderWidth="1px"
          borderColor="contrast"
          fontWeight="800"
          fontSize="4xl"
          _hover={{
            padding: "18px",
            fontSize: "5xl",
            bgColor: "secondary/60",
            borderColor: "secondary",
            fontWeight: "black",
          }}
          transition="0.5s ease-in-out"
          onClick={() => navigate("/games")}
        >
          Let's Play!
        </Button>
      </Flex>
    </>
  );
}
