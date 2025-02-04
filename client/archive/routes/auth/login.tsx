import { authProvider } from "@/lib/api/auth";
import { Button, Center, Field, Fieldset, Input, Text } from "@chakra-ui/react";
import {
  Form,
  LoaderFunctionArgs,
  redirect,
  useActionData,
  useLocation,
  useNavigation,
} from "react-router-dom";

export async function loginAction({ request }: LoaderFunctionArgs) {
  let formData = await request.formData();
  let email = formData.get("email") as string | null;
  let password = formData.get("password") as string | null;
  if (!email || !password) {
    return {
      error: "You must provide an email and password to log in",
    };
  }
  try {
    await authProvider.logInUser(email, password);
  } catch (error) {
    return {
      error: "Invalid login credentials. Please try again.",
    };
  }
}

export async function loginLoader() {
  if (authProvider.isAuthenticated) {
    return redirect("/");
  }
  return null;
}

export default function Login() {
  let location = useLocation();
  let params = new URLSearchParams(location.search);
  let from = params.get("from") || "/";

  let navigation = useNavigation();
  let isLoggingIn =
    navigation.formData?.get("email") != null &&
    navigation.formData?.get("password") != null;

  let actionData = useActionData() as { error: string } | undefined;
  return (
    <Center>
      <Text>You must be logged in to view the page at {from}.</Text>
      <Form method="post">
        <Fieldset.Root>
          <Input type="hidden" name="redirectTo" value={from} />
          <Field.Root required>
            <Field.Label>Email</Field.Label>
            <Field.RequiredIndicator />
          </Field.Root>
          <Input name="email" type="password" />
          <Field.Root required>
            <Field.Label>Password</Field.Label>
            <Input name="password" type="password" />
          </Field.Root>
        </Fieldset.Root>
        <Button type="submit">
          {isLoggingIn ? "Log In" : "Logging In..."}
        </Button>
        {actionData && actionData.error ? <Field.ErrorText /> : null}
      </Form>
    </Center>
  );
}
