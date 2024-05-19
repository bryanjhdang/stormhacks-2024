import { MouseEvent, MouseEventHandler, useEffect, useState } from "react";
import { Button, Input, Text, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useFirebaseAuth } from "../contexts/FirebaseAuth.context";
import Header from "../components/header/Header";
import styles from "./DashboardPage.module.css";
import { getAllEnteredPools } from "../classes/HTTPhelpers";

function JoinButton() {
  const [inputValue, setInputValue] = useState("");

  const handleButtonClick = () => {
    console.log("Input Value: ", inputValue);
  };

  return (
    <div className={styles.joinButtonContainer}>
      <Button onClick={handleButtonClick}>Join pool</Button>
      <Input
        placeholder="Code"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </div>
  );
}

interface HeadingDisplayProps {
  goToCreatePage: MouseEventHandler<HTMLButtonElement>;
  currentUser: any;
}

function HeadingDisplay({ goToCreatePage, currentUser }: HeadingDisplayProps) {
  return (
    <div className={styles.headingContainer}>
      <Text>Welcome, {currentUser?.displayName}!</Text>
      <div className={styles.buttonGroup}>
        <Button onClick={goToCreatePage}>Create pool</Button>
        <JoinButton />
      </div>
    </div>
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

      <HeadingDisplay goToCreatePage={goToCreatePage} currentUser={currentUser} />
      <Text>Pools display</Text>
      {/* {pools.map((id, index) => {
        return (
          <Text onClick={() => navigate(`/pool/${id}`)} key={index}>
            Room: {id}
          </Text>
        );
      })} */}

      <Text>THSIDF JKSDNFNK: JSNDFKJ NKSD</Text>
      {/* 
      // Display the current user id and name
      <div>{currentUser?.uid}</div>
      <div>{currentUser?.displayName}</div> */}
    </>
  );
}

export default DashboardPage;
