import { TextInput, Button, Title, PasswordInput, rem } from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFirebaseAuth } from "../../contexts/FirebaseAuth.context";
import { UserCredential } from "firebase/auth";
// import { useInputState } from "@mantine/hooks";
import { IconLock, IconUser, IconMail } from "@tabler/icons-react";

export function SignUpForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setloading] = useState(false);
  const { firebaseSignUp } = useFirebaseAuth();
  let navigate = useNavigate();

  async function signup() {
    setloading(true);

    try {
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      const userCredential: UserCredential = await firebaseSignUp(email, password);

      // NOTE: make call to backend to create account (for unique email logging) (or use firebase)
      // const response = await createAccount(username, email, password)

      const user = userCredential.user;
      const jwt = await user.getIdToken();
      sessionStorage.setItem("token", jwt);
      setloading(false);
      navigate("/dashboard");
    } catch (e: any) {
      setloading(false);
      alert(e.message);
    }
  }

  const accountSetupForm = () => {
    const iconUser = <IconUser style={{ width: rem(18), height: rem(18) }} stroke={1.5} />;
    const iconLock = <IconLock style={{ width: rem(18), height: rem(18) }} stroke={1.5} />;
    const iconMail = <IconMail style={{ width: rem(18), height: rem(18) }} stroke={1.5} />;
    return (
      <>
        <TextInput
          label="SFU Email"
          placeholder="example@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          leftSection={iconMail}
          required
        />
        <TextInput
          label="Username"
          value={username}
          required
          leftSection={iconUser}
          onChange={(e) => setUsername(e.target.value)}
        />
        <PasswordInput
          label="Password"
          leftSection={iconLock}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <PasswordInput
          label="Confirm Password"
          leftSection={iconLock}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <Button color="gray" mt={12} onClick={signup} loading={loading}>
          Sign up
        </Button>
      </>
    );
  };

  return (
    <>
      <p className="designHeading">Sign up</p>
      <Title order={1}>SFU Collaborative Learning Platform</Title>
      {accountSetupForm()}
    </>
  );
}
