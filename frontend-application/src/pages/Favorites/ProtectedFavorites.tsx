import * as React from "react";
import { useNavigate } from "react-router-dom";

import { useUserContext } from "../../context/UserContext";

import { Favorites } from "./Favorites";

export const ProtectedFavorites: React.FC = () => {
  const { userId } = useUserContext();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!userId) {
      navigate("/");
    }
  }, [userId, navigate]);

  return <Favorites />;
};
