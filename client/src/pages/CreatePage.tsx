import { Button, Group, MultiSelect, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import Header from "../components/header/Header";
import { useNavigate } from "react-router";
import { postPool } from "../classes/HTTPhelpers";
import { useFirebaseAuth } from "../contexts/FirebaseAuth.context";
import styles from "./CreatePage.module.css";

const hockeyTeams: string[] = [
  "Anaheim Ducks (ANA)",
  "Arizona Coyotes (ARI)",
  "Boston Bruins (BOS)",
  "Buffalo Sabres (BUF)",
  "Calgary Flames (CGY)",
  "Carolina Hurricanes (CAR)",
  "Chicago Blackhawks (CHI)",
  "Colorado Avalanche (COL)",
  "Columbus Blue Jackets (CBJ)",
  "Dallas Stars (DAL)",
  "Detroit Red Wings (DET)",
  "Edmonton Oilers (EDM)",
  "Florida Panthers (FLA)",
  "Los Angeles Kings (LAK)",
  "Minnesota Wild (MIN)",
  "Montreal Canadiens (MTL)",
  "Nashville Predators (NSH)",
  "New Jersey Devils (NJD)",
  "New York Islanders (NYI)",
  "New York Rangers (NYR)",
  "Ottawa Senators (OTT)",
  "Philadelphia Flyers (PHI)",
  "Pittsburgh Penguins (PIT)",
  "San Jose Sharks (SJS)",
  "Seattle Kraken (SEA)",
  "St. Louis Blues (STL)",
  "Tampa Bay Lightning (TBL)",
  "Toronto Maple Leafs (TOR)",
  "Vancouver Canucks (VAN)",
  "Vegas Golden Knights (VGK)",
  "Washington Capitals (WSH)",
  "Winnipeg Jets (WPG)",
];

interface PoolFormData {
  name: string;
  teams: string[];
  reward: string;
  punishment: string;
}

function CreatePage() {
  const { currentUser } = useFirebaseAuth();
  const navigate = useNavigate();

  const form = useForm<PoolFormData>({
    initialValues: {
      name: "",
      teams: [],
      reward: "",
      punishment: "",
    },
    validate: {
      name: (value) => (value.trim().length === 0 ? "Name cannot be empty" : null),
      teams: (value) => (value.length === 0 ? "At least one team must be chosen" : null),
    },
  });

  const handleSubmit = (values: PoolFormData) => {
    const submissionData = {
      ...values,
      teams: form.values.teams.map((team) => {
        const match = team.match(/\(([^)]+)\)/);
        return match ? match[1] : "";
      }),
    };

    // TODO - Do the API endpoint
    postPool(submissionData.name, currentUser?.uid, submissionData.teams).then((newPool) => {
      // TODO - Navigate to dashboard for now, change it to move to pool page
      navigate(`/pool/${newPool.roomCode}`);
    });
  };

  return (
    <>
      <Header />
      <div className={styles.createPage}>
        <TextInput
          label="Pool Name"
          placeholder="Name"
          withAsterisk
          key={form.key("name")}
          {...form.getInputProps("name")}
        />
        <MultiSelect
          mt="md"
          label="Teams"
          placeholder="Pick team"
          withAsterisk
          data={hockeyTeams}
          searchable
          key={form.key("teams")}
          {...form.getInputProps("teams")}
        />
        <TextInput
          mt="md"
          label="Reward"
          placeholder="Reward"
          key={form.key("reward")}
          {...form.getInputProps("reward")}
        />
        <TextInput
          mt="md"
          label="Punishment"
          placeholder="Punishment"
          key={form.key("punishment")}
          {...form.getInputProps("punishment")}
        />
        <Group justify="center" mt="xl">
          <Button className={styles.submitButton} onClick={() => form.onSubmit(handleSubmit)()}>Create your pool</Button>
        </Group>
      </div>
    </>
  );
}

export default CreatePage;
