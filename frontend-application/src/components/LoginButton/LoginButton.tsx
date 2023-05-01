import { useContext } from "react";
import { Button } from "../";
import { UserContext } from "../../context/UserContext";

export const LoginButton = () => {
  const { userId, setUserId } = useContext(UserContext);
  const handleLogin = () => {
    const id = userId ? "" : prompt("Enter User ID");
    setUserId(id ?? "");
  };
  return (
    <Button onClick={handleLogin}>
      {userId ? `Logout ${userId}` : "Login"}
    </Button>
  );
};
