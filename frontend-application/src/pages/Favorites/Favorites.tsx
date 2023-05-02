import React from "react";
import { SaleCard } from "../../components";
import { useItemsContext } from "../../context/ItemsContext";
import { useUserContext } from "../../context/UserContext";
import {
  SearchResultsContainer,
  SearchResultsHeader,
} from "../SearchResults/SearchResults.styles";

export const Favorites: React.FC = () => {
  const { state } = useItemsContext();
  const { favorites } = state;

  const { userId } = useUserContext();

  const userFavorites = favorites[userId] || [];

  return (
    <div>
      <SearchResultsHeader>
        <h2>Your Favorite Sales</h2>
      </SearchResultsHeader>
      {userFavorites.length === 0 ? (
        <p>No favorites yet. Add some from the search results!</p>
      ) : (
        <SearchResultsContainer>
          {userFavorites.map((favorite, i) => (
            <SaleCard key={i} sale={favorite} />
          ))}
        </SearchResultsContainer>
      )}
    </div>
  );
};
