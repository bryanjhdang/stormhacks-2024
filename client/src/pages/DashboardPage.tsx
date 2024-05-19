import { MouseEvent, MouseEventHandler, useState } from "react";
import { Button, Input, Text, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useFirebaseAuth } from "../contexts/FirebaseAuth.context";
import Header from "../components/header/Header";
import styles from './DashboardPage.module.css';

function JoinButton() {
  const [inputValue, setInputValue] = useState('');

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

  const goToCreatePage = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate("/create");
  };

  const temp_pools = ["abc123", "asdad", "anotherroom", "room3", "coolkids"];

  return (
    <>
      <Header />
      
      <HeadingDisplay goToCreatePage={goToCreatePage} currentUser={currentUser} />
      
      {temp_pools.map((id, index) => (
        <Text onClick={() => navigate(`/pool/${id}`)} key={index} className={styles.poolText}>
          Room: {id}
        </Text>
      ))}
    </>
  );
}

export default DashboardPage;
