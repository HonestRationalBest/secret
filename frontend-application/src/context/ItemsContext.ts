import React, { createContext, useContext } from "react";
import { ISearchResponse } from "../utils/UseSearch";
import { IBasicSale } from "../utils/Sale.interface";

export enum ActionTypes {
  SET_SEARCH_RESPONSE = "SET_SEARCH_RESPONSE",
  ADD_TO_FAVORITES = "ADD_TO_FAVORITES",
  REMOVE_FROM_FAVORITES = "REMOVE_FROM_FAVORITES",
}

interface IState {
  searchResponse: ISearchResponse | null;
  favorites: {
    [userId: string]: Array<IBasicSale>;
  };
}

interface IAddToFavoritesPayload {
  userId: string;
  sale: IBasicSale;
}

interface ISetSearchResponseAction {
  type: ActionTypes.SET_SEARCH_RESPONSE;
  payload: ISearchResponse;
}

interface IAddToFavoritesAction {
  type: ActionTypes.ADD_TO_FAVORITES;
  payload: IAddToFavoritesPayload;
}

interface IRemoveFromFavoritesAction {
  type: ActionTypes.REMOVE_FROM_FAVORITES;
  payload: IAddToFavoritesPayload;
}

type IAction = ISetSearchResponseAction | IAddToFavoritesAction | IRemoveFromFavoritesAction;

export const itemsInitialState: IState = {
  searchResponse: null,
  favorites: {},
};

export const itemsReducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case ActionTypes.SET_SEARCH_RESPONSE:
      return { ...state, searchResponse: action.payload as ISearchResponse };
    case ActionTypes.ADD_TO_FAVORITES:
      const userId = action.payload.userId;
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