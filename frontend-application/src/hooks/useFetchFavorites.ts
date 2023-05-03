import { useQuery } from "@apollo/client";

import { GET_FAVORITE_SALES } from "../utils/queries/favorites";

export const useFetchFavorites = (favoriteIds: string[]) => {
  const { loading, error, data } = useQuery(GET_FAVORITE_SALES, {
    variables: { saleIds: favoriteIds },
    skip: favoriteIds.length === 0,
  });

  return {
    loading,
    error,
    favoriteSales: data?.saleSearch?.sales,
  };
};
