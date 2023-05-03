import * as React from "react";
import { useParams } from "react-router-dom";

import { ActionTypes, useItemsContext } from "../context/ItemsContext";
import { useUserContext } from "../context/UserContext";
import { client } from "../apolloClient";
import { CREATE_FAVORITE, REMOVE_FAVORITE } from "../utils/queries/favorites";
import { useFetchSale } from "../utils/UseFetchSale";

export const useFavorites = () => {
  const {
    state: { favorites },
    dispatch,
  } = useItemsContext();
  const params = useParams();
  const id: string = params.id ?? "";

  const { loading, error, sale } = useFetchSale({ saleId: id });

  const { userId } = useUserContext();

  const isInFavorites = React.useMemo(
    () => favorites[userId]?.some((favorite) => favorite.id === id) ?? false,
    [favorites, id, userId]
  );

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
    if (isInFavorites) {
      removeFavorite();
    } else {
      addFavorite();
    }
  };

  return {
    handleToggleFavorite,
    isInFavorites,
    loading,
    error,
    sale,
    userId,
  };
};
