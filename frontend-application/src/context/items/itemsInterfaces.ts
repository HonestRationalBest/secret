import { IBasicSale } from "../../utils/Sale.interface";
import { ISearchResponse } from "../../utils/UseSearch";

import { ActionTypes } from "./ItemsContext";

interface IAddToFavoritesPayload {
  userId: string;
  sale: IBasicSale;
}

interface ISetFavoritesFetchedPayload {
  userId: string;
  status: boolean;
}

export interface ISetSearchResponseAction {
  type: ActionTypes.SET_SEARCH_RESPONSE;
  payload: ISearchResponse;
}

export interface IAddToFavoritesAction {
  type: ActionTypes.ADD_TO_FAVORITES;
  payload: IAddToFavoritesPayload;
}

export interface IRemoveFromFavoritesAction {
  type: ActionTypes.REMOVE_FROM_FAVORITES;
  payload: IAddToFavoritesPayload;
}

export interface ISetFavoritesFetchedAction {
  type: ActionTypes.SET_FAVORITES_FETCHED;
  payload: ISetFavoritesFetchedPayload;
}
