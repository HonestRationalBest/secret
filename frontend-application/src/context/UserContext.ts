import { Context, createContext, useContext } from "react";

interface IUserContext {
  userId: string;
  setUserId: (userId: string) => void;
}

export const UserContext: Context<IUserContext> = createContext({
  userId: "",
  setUserId: (_userId) => {},
});

export const useUserContext = () => useContext(UserContext);
