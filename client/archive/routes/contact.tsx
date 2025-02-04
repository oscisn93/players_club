import {
  Button,
  Box,
  Center,
  Field,
  Fieldset,
  Grid,
  GridItem,
  Heading,
  Image,
  Input,
  Flex,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";

import yugi from "@/assets/yugu.jpg";

export default function Contact() {
  return (
    <>
      <Grid
        height="full"
        templateColumns="repeat(3, 1fr)"
        gap="5"
        textStyle="josefinSansFont"
      >
        <GridItem height="full" rowSpan={2}>
          <Flex
            height="full"
            direction="column"
            gap="4"
            alignItems="center"
            justifyContent="center"
            fontSize="4xl"
            padding="4"
          >
            <Text>How it feels</Text>
            <Image borderRadius="sm" src={yugi} alt="smiling at last card" />
            <Box textAlign="center">
              <Text>When you have</Text>
              <Text>one card left</Text>
            </Box>
          </Flex>
        </GridItem>
        <GridItem colSpan={2}>
          <Center>
            <Flex
              direction="column"
              gap="4"
              alignItems="center"
              justifyContent="center"
              padding="8"
              width="2/3"
            >
              <Box>
                <Heading size="3xl" padding="4">
                  Contact Us
                </Heading>
                <Text fontSize="md" fontWeight="light">
                  Use this form to provide the developer with feedback on
                  potential improvements or bugs in the game that should be
                  addressed or feature requests that you'd like to make!
                </Text>
              </Box>
              <Fieldset.Root>
                <Stack>
                  <Fieldset.Legend>Contact Details</Fieldset.Legend>
                  <Fieldset.HelperText>
                    Please provide your contact information below
                  </Fieldset.HelperText>
                </Stack>

                <Fieldset.Content>
                  <Field.Root required>
                    <Field.Label>
                      Fullname
                      <Field.RequiredIndicator />
                    </Field.Label>
                    <Input variant="subtle" name="name" />
                  </Field.Root>

                  <Field.Root required>
                    <Field.Label>
                      Email
                      <Field.RequiredIndicator />
                    </Field.Label>
                    <Input variant="subtle" placeholder="gamer@email.com" />
                  </Field.Root>

                  <Field.Root required>
                    <Field.Label>
                      Phone Number
                      <Field.RequiredIndicator />
                    </Field.Label>
                    <Input variant="subtle" placeholder="800555555" />
                  </Field.Root>

                  <Field.Root required>
                    <Field.Label>
                      Message
                      <Field.RequiredIndicator />
                    </Field.Label>
                    <Textarea
                      placeholder="What feedback would you like to provide..."
                      autoresize
                      variant="subtle"
                    />
                  </Field.Root>
                </Fieldset.Content>

                <Button type="submit">Submit Feedback</Button>
              </Fieldset.Root>
            </Flex>
          </Center>
        </GridItem>
      </Grid>
    </>
  );
}
