import { LoadingSpinner, SaleCard } from "../../components";
import { useItemsContext } from "../../context/ItemsContext";
import { useUserContext } from "../../context/UserContext";
import {
  SearchResultsContainer,
  SearchResultsHeader,
} from "../SearchResults/SearchResults.styles";
import { useFetchFavorites } from "../../hooks/useFetchFavorites";
import { IBasicSale } from "../../utils/Sale.interface";
import { useGetFavorites } from "../../hooks/useGetFavorites";

export const Favorites: React.FC = () => {
  const {
    state: { favorites },
  } = useItemsContext();
  const { userId } = useUserContext();
  useGetFavorites();

  const favoriteIds = favorites[userId]?.map((favorite) => favorite.id) ?? [];

  const { loading, error, favoriteSales } = useFetchFavorites(favoriteIds);

  return (
    <div>
      <SearchResultsHeader>
        <h2>Your Favorite Sales</h2>
      </SearchResultsHeader>
      {loading && <LoadingSpinner />}
      {error && <p>{error.toString()}</p>}
      {!favoriteSales ? (
        <p>No favorites yet. Add some from the search results!</p>
      ) : (
        <SearchResultsContainer>
          {favoriteSales?.map((favorite: IBasicSale) => (
            <SaleCard key={favorite.id} sale={favorite} />
          ))}
        </SearchResultsContainer>
      )}
    </div>
  );
};
