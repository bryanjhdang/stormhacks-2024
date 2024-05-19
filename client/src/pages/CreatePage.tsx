import { Button, Group, MultiSelect, Select, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { randomId } from '@mantine/hooks';
import Header from "../components/header/Header";

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
	"Winnipeg Jets (WPG)"
];

interface PoolFormData {
	name: string;
	teams: string[];
	reward: string;
	punishment: string;
}

class PoolForm implements PoolFormData {
	name: string;
	teams: string[];
	reward: string;
	punishment: string;

	constructor() {
		this.name = '';
		this.teams = [];
		this.reward = '';
		this.punishment = '';
	}
}

function CreatePage() {
	const form = useForm<PoolFormData>({
		initialValues: new PoolForm(),
	});

	const handleSubmit = () => {
		const submissionData = {
			...form.values,
			teams: form.values.teams.map(team => {
				const match = team.match(/\(([^)]+)\)/);
				return match ? match[1] : '';
			})
		};
	};

	return (
		<>
			<Header />
			<div>
				<TextInput
					label="Pool Name"
					placeholder="Name"
					withAsterisk
					key={form.key('name')}
					{...form.getInputProps('name')}
				/>
				<MultiSelect
					mt="md"
					label="Teams"
					placeholder="Pick team"
					withAsterisk
					data={hockeyTeams}
					searchable
					key={form.key('teams')}
					{...form.getInputProps('teams')}
				/>
				<TextInput
					mt="md"
					label="Reward"
					placeholder="Reward"
					key={form.key('reward')}
					{...form.getInputProps('reward')}
				/>
				<TextInput
					mt="md"
					label="Punishment"
					placeholder="Punishment"
					key={form.key('punishment')}
					{...form.getInputProps('punishment')}
				/>
				<Group justify="center" mt="xl">
					<Button
						onClick={handleSubmit}
					>
						Create your pool
					</Button>
				</Group>
			</div>
		</>
	)
}

export default CreatePage