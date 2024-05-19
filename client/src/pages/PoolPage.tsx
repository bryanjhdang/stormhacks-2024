import { Text } from "@mantine/core"
import Header from "../components/Header"

function PoolResults() {
	return (
		<>
			<Text>Pools results</Text>
		</>
	)
}

function RoomCodeDisplay() {
	return (
		<>
			<Text>Room Code:</Text>
		</>
	)
}

function PunishmentDisplay() {
	return (
		<>
			<Text>Punishment</Text>
		</>
	)
}

function RewardDisplay() {
	return (
		<>
			<Text>Rewards</Text>
		</>
	)
}

function Leaderboard() {
	return (
		<>
			<Text>Leaderboard</Text>
		</>
	)
}

function PoolPage() {
	return (
		<>
			<Text>Pool page</Text>
			{/* Header */}
			<Header />
			{/* Left side */}
				<PoolResults />
				{/* Pool result */}
			{/* Right side */}
				{/* Code */}
				<RoomCodeDisplay/>
				{/* Punishment and reward */}
				<PunishmentDisplay />
				<RewardDisplay />
				{/* Leaderboard */}
				<Leaderboard />
		</>
	)
}

export default PoolPage