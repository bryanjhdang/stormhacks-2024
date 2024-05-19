import { Button, Text } from "@mantine/core"
import Header from "../components/Header"

function DashboardPage() {

	const HeadingDisplay = () => {
		return (
			<>
				<Text>Heading display</Text>
				<Button>Create room</Button>
				<Button>Join room</Button>
			</>
		)
	}

	// This should take in an array
	const PoolsDisplay = () => {
		return (
			<Text>Pools display</Text>
		)
	}

	return (
		<>
			<Header />
			<Text>Dashboard Page</Text>
			<HeadingDisplay />
			<PoolsDisplay />
		</>
	)
}

export default DashboardPage