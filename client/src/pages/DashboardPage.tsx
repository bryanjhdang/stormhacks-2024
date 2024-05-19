import { MouseEvent, MouseEventHandler, useState } from "react";
import { Button, Input, Text, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useFirebaseAuth } from "../contexts/FirebaseAuth.context";
import Header from "../components/header/Header";


function JoinButton() {
  const [inputValue, setInputValue] = useState('');

  const handleButtonClick = () => {
    console.log("Input Value: ", inputValue);
  };

  return (
    <div style={{ display: 'flex', gap: '10px' }}>
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
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingBottom: '30px' }}>
      <Text>Welcome, {currentUser?.displayName}!</Text>
      <div style={{ display: 'flex', gap: '10px' }}>
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

  // Some get function here returning a list of pools
  const temp_pools = ["abc123", "asdad", "anotherroom", "room3", "coolkids"];

  return (
    <>
      <Header />
      
      <HeadingDisplay goToCreatePage={goToCreatePage} currentUser={currentUser} />
      
      {temp_pools.map((id, index) => {
        return (
          <Text onClick={() => navigate(`/pool/${id}`)} key={index} style={{
            background: '#f0f0f0',
            marginBottom: '20px',
            cursor: 'pointer',
            padding: '30px', 
            borderRadius: '5px'
          }}>
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
