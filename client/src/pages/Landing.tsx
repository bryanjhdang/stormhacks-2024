import { Flex, Text, Anchor } from "@mantine/core";
import { useState } from "react";
import { SignInForm } from "../components/auth/SignInForm";
import { SignUpForm } from "../components/auth/SignUpForm";

export function LandingPage() {
  const [hasAccount, setHasAccount] = useState(true);
  return (
    <div id="signupPage">
      <section className="cover"></section>
      <section>
        <div className="form-container">
          {hasAccount && <SignInForm />}
          {!hasAccount && <SignUpForm />}
          <Flex direction={"row"} gap={"xs"}>
            <Text size="xs">
              {hasAccount ? "Don't have an account?" : "Already have an account?"}
            </Text>
            <Anchor onClick={() => setHasAccount(!hasAccount)} size="xs">
              {hasAccount ? "Sign Up" : "Sign In"}
            </Anchor>
          </Flex>
        </div>
      </section>
    </div>
  );
}
