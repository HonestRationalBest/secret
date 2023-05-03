import * as React from "react";
import { ActionTypes, useItemsContext } from "../context/ItemsContext";
import { GET_FAVORITES } from "../utils/queries/favorites";
import { client } from "../apolloClient";
import { useUserContext } from "../context/UserContext";

export const useGetFavorites = () => {
  const {
    state: { favorites, favoritesFetched },
    dispatch,
  } = useItemsContext();
  const { userId } = useUserContext();

  React.useEffect(() => {
    if (
      (!favorites[userId] || favorites[userId].length === 0) &&
      !favoritesFetched[userId]
    ) {
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
          dispatch({
            type: ActionTypes.SET_FAVORITES_FETCHED,
            payload: { userId, status: true },
          });
        });
    }
  }, [dispatch, userId, favorites, favoritesFetched]);
};
