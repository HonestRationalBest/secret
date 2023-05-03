import * as React from "react";
import { useParams } from "react-router-dom";

import { ActionTypes, useItemsContext } from "../context/ItemsContext";
import { useUserContext } from "../context/UserContext";
import { client } from "../apolloClient";
import {
  CREATE_FAVORITE,
  GET_FAVORITES,
  REMOVE_FAVORITE,
} from "../utils/queries/favorites";
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
  
    const [isFavorite, setIsFavorite] = React.useState(isInFavorites);
  
    const handleToggleFavorite = async () => {
      if (isFavorite) {
        try {
          await client.mutate({
            mutation: REMOVE_FAVORITE,
            variables: { userId, itemId: sale.id || id },
          });
          dispatch({
            type: ActionTypes.REMOVE_FROM_FAVORITES,
            payload: { userId, sale: { ...sale, id } },
          });
          setIsFavorite(false);
        } catch (error) {
          console.error("Error removing favorite:", error);
        }
      } else {
        try {
          await client.mutate({
            mutation: CREATE_FAVORITE,
            variables: { userId, itemId: sale.id || id },
          });
          dispatch({
            type: ActionTypes.ADD_TO_FAVORITES,
            payload: { userId, sale: { ...sale, id } },
          });
          setIsFavorite(true);
        } catch (error) {
          console.error("Error adding favorite:", error);
        }
      }
    };
  
    React.useEffect(() => {
      client
        .query({
          query: GET_FAVORITES,
          variables: { userId },
        })
        .then((result) => {
          result.data.getFavorites.forEach((item: any) => {
            dispatch({
              type: ActionTypes.ADD_TO_FAVORITES,
              payload: { userId, sale: { ...item, id: item.itemId } },
            });
          });
        });
    }, [dispatch, userId]);
  
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
  