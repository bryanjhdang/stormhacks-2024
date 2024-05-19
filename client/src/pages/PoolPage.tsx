import { Text } from "@mantine/core";
import Header from "../components/header/Header";
import { useParams } from "react-router";

function PoolResults() {
  return (
    <>
      <Text>Pools results</Text>
    </>
  );
}

function RoomCodeDisplay() {
  return (
    <>
      <Text>Room Code:</Text>
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
      <Text>Pool page</Text>

      <div>You are currently in pool: {pool_id}</div>
      {/* Header */}
      <Header />
      {/* Left side */}
      <PoolResults />
      {/* Pool result */}
      {/* Right side */}
      {/* Code */}
      <RoomCodeDisplay />
      {/* Punishment and reward */}
      <PunishmentDisplay />
      <RewardDisplay />
      {/* Leaderboard */}
      <Leaderboard />
    </>
  );
}

export default PoolPage;
