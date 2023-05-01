import { Context, createContext } from "react";

interface IUserContext {
  userId: string;
  setUserId: (userId: string) => void;
}

export const UserContext: Context<IUserContext> = createContext({
  userId: "",
  setUserId: (_userId) => {},
});
