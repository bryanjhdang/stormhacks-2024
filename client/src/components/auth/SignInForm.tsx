import { Title, TextInput, Button, PasswordInput, rem } from "@mantine/core";
import { IconLock, IconUser } from "@tabler/icons-react";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useInputState } from "@mantine/hooks";
import { useFirebaseAuth } from "../../contexts/FirebaseAuth.context";

export function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useInputState("");
  const [buttonIdle, setButtonIdle] = useState(false);
  const { firebaseSignIn } = useFirebaseAuth();

  let navigate = useNavigate();

  async function signin() {
    setButtonIdle(true);

    try {
      await firebaseSignIn(email, password);
      // console.log(userCredential.user)
      navigate("/dashboard");
    } catch (e: any) {
      setButtonIdle(false);
      alert(e.message);
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signin();
  };

  const signinForm = () => {
    const iconUser = <IconUser style={{ width: rem(18), height: rem(18) }} stroke={1.5} />;
    const iconLock = <IconLock style={{ width: rem(18), height: rem(18) }} stroke={1.5} />;

    return (
      <>
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Email"
            value={email}
            onChange={(event) => setEmail(event.currentTarget.value)}
            leftSection={iconUser}
            required
          />
          <PasswordInput
            label="Password"
            id="your-password"
            leftSection={iconLock}
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
            required
          />
          <Button color="gray" mt={12} type="submit" disabled={buttonIdle} loading={buttonIdle}>
            Sign in
          </Button>
        </form>
      </>
    );
  };

  return (
    <>
      <p className="designHeading">Sign in</p>
      <Title order={1}>SFU Collaborative Learning Platform</Title>
      {signinForm()}
    </>
  );
}
