import { Button, Table, Text } from "@mantine/core";
import Header from "../components/header/Header";
import { useParams } from "react-router";
import { useState } from "react";
import { useFirebaseAuth } from "../contexts/FirebaseAuth.context";

// TODO THIS IS STUB DATA HERE KJLANSKJD KJASDKJ ASKJND K:JASNDKJ KJASDKJLASKJLDNKJLANSDLKJ:NASKJD:NKJL
interface Game {
  date: string;
  homeTeam: string;
  awayTeam: string;
}
const data: Game[] = [
  { date: "2024-05-01", homeTeam: "Team A", awayTeam: "Team B" },
  { date: "2024-05-02", homeTeam: "Team C", awayTeam: "Team D" },
  { date: "2024-05-03", homeTeam: "Team E", awayTeam: "Team F" },
];

function PoolResults(pool_id: any) {
  const [guesses, setGuesses] = useState<{ [key: number]: string }>({});
  const { currentUser } = useFirebaseAuth();

  const uid = currentUser?.uid;

  // get potential existing guesses for a user

  // const hasMadeBet = // check for non zero data from guess??

  const handleGuessChange = (index: number, guess: string) => {
    setGuesses((prevGuesses) => ({
      ...prevGuesses,
      [index]: guess,
    }));
  };

  const getBackgroundColor = (index: number, team: "home" | "away") => {
    return guesses[index] === team ? "lightgreen" : "transparent";
  };

  return (
    <>
      <Text size="xl" mb="md">
        Pool Results
      </Text>
      <Table striped highlightOnHover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Home Team</th>
            <th>Away Team</th>
          </tr>
        </thead>
        <tbody>
          {data.map((game, index) => (
            <tr key={index}>
              <td>{game.date}</td>
              <td
                style={{ backgroundColor: getBackgroundColor(index, "home") }}
                onClick={() => {
                  handleGuessChange(index, "home");
                }}
              >
                {game.homeTeam}
              </td>
              <td
                style={{ backgroundColor: getBackgroundColor(index, "away") }}
                onClick={() => {
                  handleGuessChange(index, "away");
                }}
              >
                {game.awayTeam}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button
        onClick={() => {
          console.log(guesses);
        }}
      >
        Confirm Bets
      </Button>
    </>
  );
}

function PunishmentDisplay() {
  return (
    <>
      <Text>Punishment</Text>
    </>
  );
}

function RewardDisplay() {
  return (
    <>
      <Text>Rewards</Text>
    </>
  );
}

function Leaderboard() {
  return (
    <>
      <Text>Leaderboard</Text>
    </>
  );
}

function PoolPage() {
  const { pool_id } = useParams<{ pool_id: string }>();

  return (
    <>
      {/* Header */}
      <Header />
      <div>You are currently in pool: {pool_id}</div>
      {/* Left side */}
      <PoolResults pool_id={pool_id} />
      {/* Pool result */}
      {/* Right side */}
      {/* Code */}
      <Text>Room Code: {pool_id}</Text>
      {/* Punishment and reward */}
      <PunishmentDisplay />
      <RewardDisplay />
      {/* Leaderboard */}
      <Leaderboard />
    </>
  );
}

export default PoolPage;
