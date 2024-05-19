import { Box, Button, Flex, Stack, Table, Text, Title } from "@mantine/core";
import Header from "../components/header/Header";
import { useParams } from "react-router";
import { useState } from "react";
import { useFirebaseAuth } from "../contexts/FirebaseAuth.context";
import styles from './PoolPage.module.css';

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
    <div className={styles.poolResults}>
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
    </div>
  );
}

function PoolPage() {
  const { pool_id } = useParams<{ pool_id: string }>();

  const RoomCodeDisplay = () => {
    return (
      <Stack className={styles.roomCodeDisplay}>
        <Text>Room Code: {pool_id}</Text>
      </Stack>
    )
  }

  const PunishmentDisplay = () => {
    return (
      <Stack className={styles.punishmentDisplay}>
        <Text>Punishment: </Text>
      </Stack>
    )
  };

  const RewardDisplay = () => {
    return (
      <Stack className={styles.rewardDisplay}>
        <Text>Reward: </Text>
      </Stack>
    );
  }

  const Leaderboard = () => {
    // TODO : Change this with actual data later
    const leaderboardData = [
      { name: "Bob Gill", score: 120 },
      { name: "Brian Fraser", score: 95 },
      { name: "Joe Mama", score: 140 },
    ];
 
    leaderboardData.sort((a, b) => b.score - a.score);
    
    return (
      <Stack className={styles.leaderboardDisplay}>
        <Title order={3}>Leaderboard</Title>
        {leaderboardData.map((entry, index) => (
          <Box key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Text>{entry.name}</Text>
            <Text>{entry.score}</Text>
          </Box>
        ))}
      </Stack>
    );
  };

  return (
    <>
      <Header />
      <Flex
        gap="xl"
        direction="row"
      >
        <PoolResults pool_id={pool_id} />
        <Stack miw={'25%'}>
          <RoomCodeDisplay />
          <Leaderboard />
          <PunishmentDisplay />
          <RewardDisplay />
        </Stack>
      </Flex>
    </>
  );
}

export default PoolPage;
