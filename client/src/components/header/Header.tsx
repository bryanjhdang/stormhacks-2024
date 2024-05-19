import { ActionIcon, Button, Menu, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useFirebaseAuth } from "../../contexts/FirebaseAuth.context";
import { IconUserCircle, IconLogout } from "@tabler/icons-react";

function Header() {
  const { firebaseSignOut } = useFirebaseAuth();
  const navigate = useNavigate();

  const signOut = async () => {
    try {
      await firebaseSignOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '50px' }}>
      <Title order={1}>
        Urban Fantasy Hockey
      </Title>

      <Menu shadow="md" width={200}>
      <Menu.Target>
        <ActionIcon
          variant="transparent"
          color="rgba(0, 0, 0, 1)"
          size="xl"
        >
          <IconUserCircle style={{ width: '100%', height: '100%' }} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Account</Menu.Label>
        <Menu.Item leftSection={<IconLogout />} onClick={signOut}>
          Log out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
    </div>
  );
}

export default Header;
