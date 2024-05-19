import { MouseEvent, MouseEventHandler, useEffect, useState } from "react";
import { Button, Input, Table, Text, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useFirebaseAuth } from "../contexts/FirebaseAuth.context";
import Header from "../components/header/Header";
import styles from "./DashboardPage.module.css";
import { getAllEnteredPools, getPoolByCode } from "../classes/HTTPhelpers";

function JoinButton() {
  const [inputValue, setInputValue] = useState("");

  const { currentUser } = useFirebaseAuth();
  const navigate = useNavigate();


  const handleButtonClick = async () => {
    let result = await getPoolByCode(currentUser?.uid, inputValue);
    navigate(`/pool/${inputValue}`);
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
      <Title order={2}>Welcome, {currentUser?.displayName}!</Title>
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
      <div className={styles.dashboardPage}>
        <HeadingDisplay goToCreatePage={goToCreatePage} currentUser={currentUser} />
        <Table striped highlightOnHover>
          <thead>
            <tr>
              <th>Pool Name</th>
              <th>Room Code</th>
              <th>Teams</th>
            </tr> 
          </thead>
          <tbody>
            {pools.map((pool: any, index) => (
              <tr
                key={index}
                onClick={() => {
                  navigate(`/pool/${pool.roomCode}`);
                }}
              >
                <td>{pool.name}</td>
                <td>{pool.roomCode}</td>
                <td>{pool.teams}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default DashboardPage;
