import { Button, Menu, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useFirebaseAuth } from "../../contexts/FirebaseAuth.context";
import { IconLogout } from "@tabler/icons-react";

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
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '30px' }}>
      <Title order={1}>
        Urban Fantasy Hockey
      </Title>

      <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button>Account Settings</Button>
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
