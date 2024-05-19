import { MouseEvent, MouseEventHandler, useEffect, useState } from "react";
import { Button, Input, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useFirebaseAuth } from "../contexts/FirebaseAuth.context";
import Header from "../components/header/Header";
import { getAllEnteredPools } from "../classes/HTTPhelpers";

function JoinButton() {
  const [inputValue, setInputValue] = useState("");

  const handleButtonClick = () => {
    console.log("Input Value: ", inputValue);
  };

  return (
    <>
      <Input
        placeholder="Code"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button onClick={handleButtonClick}>Join pool</Button>
    </>
  );
}
interface HeadingDisplayProps {
  goToCreatePage: MouseEventHandler<HTMLButtonElement>;
  currentUser: any;
}

function HeadingDisplay({ goToCreatePage, currentUser }: HeadingDisplayProps) {
  return (
    <>
      <Text>Welcome, {currentUser?.displayName}!</Text>
      <Button onClick={goToCreatePage}>Create pool</Button>
      <JoinButton />
    </>
  );
}

function DashboardPage() {
  const navigate = useNavigate();
  const { currentUser } = useFirebaseAuth();
  const [pools, setPools] = useState([]);

  const goToCreatePage = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate("/create");
  };

  useEffect(() => {
    getAllEnteredPools(currentUser?.uid).then((data) => {
      setPools(data);
    });
  }, []);

  return (
    <>
      <Header />
      <Text>Dashboard Page</Text>
      <HeadingDisplay goToCreatePage={goToCreatePage} currentUser={currentUser} />
      <Text>Pools display</Text>
      {pools.map((id, index) => {
        return (
          <Text onClick={() => navigate(`/pool/${id}`)} key={index}>
            Room: {id}
          </Text>
        );
      })}

      <Text>THSIDF JKSDNFNK: JSNDFKJ NKSD</Text>
      {/* 
      // Display the current user id and name
      <div>{currentUser?.uid}</div>
      <div>{currentUser?.displayName}</div> */}
    </>
  );
}

export default DashboardPage;
