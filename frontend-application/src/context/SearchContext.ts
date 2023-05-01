import React, { createContext, useContext } from "react";
import { ISearchResponse } from "../utils/UseSearch";

interface IState {
  searchResponse: ISearchResponse | null;
}

interface IAction {
  type: "SET_SEARCH_RESPONSE";
  payload: ISearchResponse;
}

export const searchInitialState: IState = {
  searchResponse: null,
};

export const searchReducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case "SET_SEARCH_RESPONSE":
      return { ...state, searchResponse: action.payload };
    default:
      return state;
  }
};

export const SearchContext = createContext<{
  state: IState;
  dispatch: React.Dispatch<IAction>;
}>({
  state: searchInitialState,
  dispatch: () => null,
});

export const useSearchContext = () => useContext(SearchContext);