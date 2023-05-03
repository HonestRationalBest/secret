import React, { createContext, useContext } from "react";
import { ISearchResponse } from "../../utils/UseSearch";
import { IBasicSale } from "../../utils/Sale.interface";
import {
  IAddToFavoritesAction,
  IRemoveFromFavoritesAction,
  ISetFavoritesFetchedAction,
  ISetSearchResponseAction,
} from "./itemsInterfaces";

export enum ActionTypes {
  SET_SEARCH_RESPONSE = "SET_SEARCH_RESPONSE",
  ADD_TO_FAVORITES = "ADD_TO_FAVORITES",
  REMOVE_FROM_FAVORITES = "REMOVE_FROM_FAVORITES",
  SET_FAVORITES_FETCHED = "SET_FAVORITES_FETCHED",
}

interface IState {
  searchResponse: ISearchResponse | null;
  favorites: {
    [userId: string]: Array<IBasicSale>;
  };
  favoritesFetched: {
    [userId: string]: boolean;
  };
}

type IAction =
  | ISetSearchResponseAction
  | IAddToFavoritesAction
  | IRemoveFromFavoritesAction
  | ISetFavoritesFetchedAction;

export const itemsInitialState: IState = {
  searchResponse: null,
  favorites: {},
  favoritesFetched: {},
};

export const itemsReducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case ActionTypes.SET_SEARCH_RESPONSE:
      return { ...state, searchResponse: action.payload as ISearchResponse };
    case ActionTypes.ADD_TO_FAVORITES:
      const userId = action.payload.userId;
      const saleToAdd = action.payload.sale;

      const existingFavorites = state.favorites[userId] || [];
      const isSaleAlreadyFavorite = existingFavorites.some(
        (favorite) => favorite.id === saleToAdd.id
      );
      if (isSaleAlreadyFavorite) {
        return state;
      }

      const newFavorites = state.favorites[userId]
        ? [...state.favorites[userId], action.payload.sale]
        : [action.payload.sale];
      return {
        ...state,
        favorites: { ...state.favorites, [userId]: newFavorites },
      };
    case ActionTypes.REMOVE_FROM_FAVORITES:
      const userIdToRemove = action.payload.userId;
      const filteredFavorites = state.favorites[userIdToRemove].filter(
        (item) => item.id !== action.payload.sale.id
      );
      return {
        ...state,
        favorites: { ...state.favorites, [userIdToRemove]: filteredFavorites },
      };
    case ActionTypes.SET_FAVORITES_FETCHED:
      return {
        ...state,
        favoritesFetched: {
          ...state.favoritesFetched,
          [action.payload.userId]: action.payload.status,
        },
      };
    default:
      return state;
  }
};

export const ItemsContext = createContext<{
  state: IState;
  dispatch: React.Dispatch<IAction>;
}>({
  state: itemsInitialState,
  dispatch: () => null,
});

export const useItemsContext = () => useContext(ItemsContext);
