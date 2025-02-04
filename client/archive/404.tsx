import { Flex, Heading, Text } from "@chakra-ui/react";
import { useRouteError } from "react-router-dom";

export default function NotFound() {
  const error = useRouteError() as { message?: string; statusText?: string };
  console.error(error);

  return (
    <Flex
      width="100dvw"
      height="100dvh"
      gap="24px"
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Heading
        fontSize="6xl"
        paddingBottom="8px"
        color="skyblue"
        fontWeight="700"
      >
        Oops!!!
      </Heading>
      <Text fontSize="3xl">Sorry, an unexpected error has occured...</Text>
      <Text fontSize="xl" fontStyle="italic" fontWeight="700" color="gray">
        {error.statusText || error.message}
      </Text>
    </Flex>
  );
}
