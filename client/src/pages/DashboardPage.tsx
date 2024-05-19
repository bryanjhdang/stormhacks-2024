import { MouseEvent, MouseEventHandler } from 'react';
import { Button, Text } from "@mantine/core"
import Header from "../components/header/Header"
import { useNavigate } from "react-router-dom"

interface HeadingDisplayProps {
  goToCreatePage: MouseEventHandler<HTMLButtonElement>;
}

function HeadingDisplay({ goToCreatePage }: HeadingDisplayProps) {
  return (
    <>
      <Text>Welcome, [name]</Text>
      <Button onClick={goToCreatePage}>Create room</Button>
      <Button>Join room</Button>
    </>
  )
}

function PoolsDisplay() {
	return (
		<>
			<Text>Pools display</Text>
		</>
	)
}

function DashboardPage() {
  const navigate = useNavigate();

  const goToCreatePage = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate('/create');
  };

  return (
    <>
      <Header />
      <Text>Dashboard Page</Text>
      <HeadingDisplay goToCreatePage={goToCreatePage} />
      <PoolsDisplay />
    </>
  )
}

export default DashboardPage
