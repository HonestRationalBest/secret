import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { Home, SaleDetails, SearchResults } from "./pages";
import { MainLayout } from "./layout/MainLayout";
import { UserContext } from "./context/UserContext";
import {
  SearchContext,
  searchInitialState,
  searchReducer,
} from "./context/SearchContext";

export const App: React.FC = () => {
  const [userId, setUserId] = React.useState<string>(
    localStorage.getItem("SE_USER_ID") ?? ""
  );
  const [state, dispatch] = React.useReducer(searchReducer, searchInitialState);

  const handleSetUserId: (userId: string) => void = (userId) => {
    localStorage.setItem("SE_USER_ID", userId);
    setUserId(userId);
  };

  return (
    <UserContext.Provider value={{ userId, setUserId: handleSetUserId }}>
      <SearchContext.Provider value={{ state, dispatch }}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/sale/:id" element={<SaleDetails />} />
            <Route path="/search/:query" element={<SearchResults />} />
            <Route path="/search" element={<SearchResults />} />
          </Route>
        </Routes>
      </SearchContext.Provider>
    </UserContext.Provider>
  );
};
