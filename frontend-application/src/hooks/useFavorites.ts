import * as React from "react";

import { ActionTypes, useItemsContext } from "../context/items/ItemsContext";
import { useUserContext } from "../context/UserContext";
import { client } from "../apolloClient";
import { CREATE_FAVORITE, REMOVE_FAVORITE } from "../utils/queries/favorites";
import { useFetchSale } from "../utils/UseFetchSale";
import { ISale } from "../utils/Sale.interface";

interface UseFavoritesReturnType {
  handleToggleFavorite: () => Promise<void>;
  isFavorite: boolean;
  loading: boolean;
  error: Error | undefined;
  sale: ISale | undefined;
  userId: string | null;
}

export const useFavorites = (id: string): UseFavoritesReturnType => {
  const {
    state: { favorites },
    dispatch,
  } = useItemsContext();
  const { userId } = useUserContext();
  const { loading, error, sale } = useFetchSale({ saleId: id });

  const isInFavorites = React.useMemo(
    () => favorites[userId]?.some((favorite) => favorite.id === id) ?? false,
    [favorites, id, userId]
  );
  const [isFavorite, setIsFavorite] = React.useState(isInFavorites);

  const removeFavorite = async () => {
    try {
      await client.mutate({
        mutation: REMOVE_FAVORITE,
        variables: { userId, itemId: id },
      });
      dispatch({
        type: ActionTypes.REMOVE_FROM_FAVORITES,
        payload: { userId, sale: { ...sale, id } },
      });
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  const addFavorite = async () => {
    try {
      await client.mutate({
        mutation: CREATE_FAVORITE,
        variables: { userId, itemId: id },
      });
      dispatch({
        type: ActionTypes.ADD_TO_FAVORITES,
        payload: { userId, sale: { ...sale, id } },
      });
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  };

  const handleToggleFavorite = async () => {
    if (isFavorite) {
      removeFavorite().then(() => {
        setIsFavorite(false);
      });
    } else {
      addFavorite().then(() => {
        setIsFavorite(true);
      });
    }
  };

  React.useEffect(() => {
    setIsFavorite(isInFavorites);
  }, [isInFavorites]);

  return {
    handleToggleFavorite,
    isFavorite,
    loading,
    error,
    sale,
    userId,
  };
};
