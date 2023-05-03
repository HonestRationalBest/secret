import * as React from "react";
import { Route, Routes } from "react-router-dom";

import { Home, SaleDetails, SearchResults } from "./pages";
import { MainLayout } from "./layout/MainLayout";
import { UserContext } from "./context/UserContext";
import {
  ItemsContext,
  itemsInitialState,
  itemsReducer,
} from "./context/items/ItemsContext";
import { ProtectedFavorites } from "./pages/Favorites/ProtectedFavorites";

export const App: React.FC = () => {
  const [userId, setUserId] = React.useState<string>(
    localStorage.getItem("SE_USER_ID") ?? ""
  );
  const [state, dispatch] = React.useReducer(itemsReducer, itemsInitialState);

  const handleSetUserId: (userId: string) => void = (userId) => {
    localStorage.setItem("SE_USER_ID", userId);
    setUserId(userId);
  };

  return (
    <UserContext.Provider value={{ userId, setUserId: handleSetUserId }}>
      <ItemsContext.Provider value={{ state, dispatch }}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/sale/:id" element={<SaleDetails />} />
            <Route path="/search/:query" element={<SearchResults />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/favorites" element={<ProtectedFavorites />} />
          </Route>
        </Routes>
      </ItemsContext.Provider>
    </UserContext.Provider>
  );
};
