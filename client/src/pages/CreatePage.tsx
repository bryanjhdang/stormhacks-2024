import { Button, Group, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { randomId } from '@mantine/hooks';
import Header from "../components/header/Header";

function CreatePage() {
	const form = useForm({
		mode: 'uncontrolled',
		initialValues: {
			name: '',
			teams: '',
			reward: '',
			punishment: ''
		},
	});

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
				<TextInput
					mt="md"
					label="Teams"
					placeholder="Teams"
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
						onClick={() =>
							form.setValues({
								name: randomId(),
								teams: '',
								reward: '',
								punishment: ''
							})
						}
					>
						Create your pool
					</Button>
				</Group>
			</div>
		</>
	)
}

export default CreatePage