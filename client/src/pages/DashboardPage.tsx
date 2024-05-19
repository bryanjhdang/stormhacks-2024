import { MouseEvent, MouseEventHandler } from "react";
import { Button, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useFirebaseAuth } from "../contexts/FirebaseAuth.context";
import Header from "../components/header/Header";

interface HeadingDisplayProps {
  goToCreatePage: MouseEventHandler<HTMLButtonElement>;
}

function HeadingDisplay({ goToCreatePage }: HeadingDisplayProps) {
  return (
    <>
      <Text>Welcome, [name]</Text>
      <Button onClick={goToCreatePage}>Create room</Button>
      <Button>Join room</Button>
    </>
  );
}

function PoolsDisplay() {
  return (
    <>
      <Text>Pools display</Text>
    </>
  );
}

function DashboardPage() {
  const navigate = useNavigate();
  const { currentUser } = useFirebaseAuth();

  const goToCreatePage = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate("/create");
  };

  return (
    <>
      <Header />
      <Text>Dashboard Page</Text>
      <HeadingDisplay goToCreatePage={goToCreatePage} />
      <PoolsDisplay />
      {/* 
      // Display the current user id and name
      <div>{currentUser?.uid}</div>
      <div>{currentUser?.displayName}</div> */}
    </>
  );
}

export default DashboardPage;
