import { Flex, Box, Image, Link } from "@chakra-ui/react";
import { HiQuestionMarkCircle } from "react-icons/hi";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <Flex height="100dvh" direction="column" alignItems="center">
      <Flex
        alignItems="center"
        justifyContent="space-between"
        padding="2"
        width="full"
        height="16"
        bgColor="black"
        borderBottomColor="primaryComplement"
        borderBottomWidth="thin"
      >
        <Link height="4/5" href="/">
          <Image
            src="https://github.com/user-attachments/assets/2450c871-bff5-4a31-a209-9b5b3bc3aef1"
            height="4/5"
          />
        </Link>
        <Box height="1/2">
          <HiQuestionMarkCircle size="100%" />
        </Box>
      </Flex>
      <Outlet />
    </Flex>
  );
}
