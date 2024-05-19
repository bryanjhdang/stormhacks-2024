import { MouseEvent, MouseEventHandler } from "react";
import { Button, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useFirebaseAuth } from "../contexts/FirebaseAuth.context";
import Header from "../components/header/Header";

interface HeadingDisplayProps {
  goToCreatePage: MouseEventHandler<HTMLButtonElement>;
  currentUser: any;
}

function HeadingDisplay({ goToCreatePage, currentUser }: HeadingDisplayProps) {
  return (
    <>
      <Text>Welcome, {currentUser?.displayName}!</Text>
      <Button onClick={goToCreatePage}>Create room</Button>
      <Button>Join room</Button>
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

  // Some get function here returning a list of pools
  const temp_pools = ["abc123", "asdad", "anotherroom", "room3", "coolkids"];

  return (
    <>
      <Header />
      <Text>Dashboard Page</Text>
      <HeadingDisplay goToCreatePage={goToCreatePage} currentUser={currentUser} />
      <Text>Pools display</Text>
      {temp_pools.map((id, index) => {
        return (
          <Text onClick={() => navigate(`/pool/${id}`)} key={index}>
            Room: {id}
          </Text>
        );
      })}
      {/* 
      // Display the current user id and name
      <div>{currentUser?.uid}</div>
      <div>{currentUser?.displayName}</div> */}
    </>
  );
}

export default DashboardPage;
