import { Button, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useFirebaseAuth } from "../../contexts/FirebaseAuth.context";

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
    <>
      <Text>Header</Text>
      <Button onClick={signOut}>Sign Out</Button>
    </>
  );
}

export default Header;
