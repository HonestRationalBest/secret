import * as React from "react";

import { ActionTypes, useItemsContext } from "../context/items/ItemsContext";
import { GET_FAVORITES } from "../utils/queries/favorites";
import { useUserContext } from "../context/UserContext";

import { client } from "../apolloClient";
import { IBasicSale } from "../utils/Sale.interface";

export interface FetchedFavoriteItem extends IBasicSale {
  _id: string;
  itemId: string;
  userId: string;
}

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
          result.data.getFavorites.forEach((item: FetchedFavoriteItem) => {
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
