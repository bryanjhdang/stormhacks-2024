import { ActionIcon, Box, Button, Flex, Group, Stack, Table, Text, Title } from "@mantine/core";
import Header from "../components/header/Header";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useFirebaseAuth } from "../contexts/FirebaseAuth.context";
import styles from "./PoolPage.module.css";
import { IconCopy } from "@tabler/icons-react";
import { getPoolByCode, placeBets } from "../classes/HTTPhelpers";

function PoolResults(props: any) {
  const [guesses, setGuesses] = useState<{ [key: number]: string }>({});
  const [poolData, setPoolData] = useState<any>({ games: [] });

  const { currentUser } = useFirebaseAuth();

  useEffect(() => {
    getPoolByCode(currentUser?.uid, props.pool_id).then((data) => {
      setPoolData(data[0]);
    });
  }, []);

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
            <th style={{ textAlign: 'center' }}>Date</th>
            <th style={{ textAlign: 'center' }}>Game Name</th>
            <th style={{ textAlign: 'center' }}>Home Team</th>
            <th style={{ textAlign: 'center' }}>Away Team</th>
          </tr>
        </thead>
        <tbody>
          {poolData.games.map((game: any, index: any) => (
            <tr key={index}>
              <td style={{ textAlign: 'center' }}>{game.gameTime}</td>
              <td style={{ textAlign: 'center' }}>{game.name}</td>
              <td
                style={{ backgroundColor: getBackgroundColor(index, "home"), textAlign: 'center' }}
                onClick={() => {
                  handleGuessChange(index, "home");
                }}
              >
                {game.homeTeam}
              </td>
              <td
                style={{ backgroundColor: getBackgroundColor(index, "away"), textAlign: 'center' }}
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
        onClick={async () => {
          let keys = Object.keys(guesses).map(key => Number(key));
          let guessToGame = keys.map(key => ({
            gameId: poolData.games[key].id,
            result: guesses[key]
          }));
          
          let result = await placeBets(currentUser?.uid, props.pool_id, guessToGame);
          console.log(({
            userId: currentUser?.uid,
            poolId: props.pool_id,
            guesses: guessToGame
          }))
        }}
      >
        Confirm Bets
      </Button>
    </div>
  );
}

function PoolPage() {
  const { pool_id } = useParams<{ pool_id: string }>();

  const CopyRoomCode = () => {
    if (pool_id) {
      navigator.clipboard.writeText(pool_id);
    }
  };

  const RoomCodeDisplay = () => {
    return (
      <Group
        className={styles.roomCodeDisplay}
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Text>Room Code: {pool_id}</Text>
        <ActionIcon variant="transparent" color="rgba(0, 0, 0, 1)" onClick={CopyRoomCode}>
          <IconCopy />
        </ActionIcon>
      </Group>
    );
  };

  const PunishmentDisplay = () => {
    return (
      <Stack className={styles.punishmentDisplay}>
        <Text>Punishment: </Text>
      </Stack>
    );
  };

  const RewardDisplay = () => {
    return (
      <Stack className={styles.rewardDisplay}>
        <Text>Reward: </Text>
      </Stack>
    );
  };

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
          <Box key={index} style={{ display: "flex", justifyContent: "space-between" }}>
            <Text>{entry.name}</Text>
            <Text>{entry.score}</Text>
          </Box>
        ))}
      </Stack>
    );
  };

  return (
    <div>
      <Header />
      <div className={styles.poolPage}>
        <Flex gap="xl" direction="row">
          <PoolResults pool_id={pool_id} />
          <Stack miw={"25%"}>
            <RoomCodeDisplay />
            <Leaderboard />
            <PunishmentDisplay />
            <RewardDisplay />
          </Stack>
        </Flex>
      </div>
    </div>
  );
}

export default PoolPage;
