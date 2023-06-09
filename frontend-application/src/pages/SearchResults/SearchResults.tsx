import * as React from "react";
import { useParams, useSearchParams } from "react-router-dom";

import { Button, LoadingSpinner, SaleCard, SearchForm } from "../../components";
import { useSearch } from "../../utils/UseSearch";
import { ActionTypes, useItemsContext } from "../../context/items/ItemsContext";
import { useGetFavorites } from "../../hooks/useGetFavorites";

import {
  LoadMoreWrapper,
  SearchResultsContainer,
  SearchResultsHeader,
} from "./SearchResults.styles";

export const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const params = useParams();
  const query: string = params?.query ?? searchParams.get("query") ?? "";
  const { loading, error, response, fetchMore } = useSearch({
    query,
    pageSize: 12,
  });

  const {
    state: { searchResponse },
    dispatch,
  } = useItemsContext();
  useGetFavorites();

  React.useEffect(() => {
    if (response) {
      dispatch({ type: ActionTypes.SET_SEARCH_RESPONSE, payload: response });
    }
  }, [response, dispatch]);

  return (
    <div>
      <SearchResultsHeader>
        <h2>Search results for {query}</h2>
        <SearchForm />
      </SearchResultsHeader>
      {loading && <LoadingSpinner />}
      {error && <p>{error.toString()}</p>}
      {searchResponse && (
        <>
          <h4>
            Found {searchResponse?.resultCount ?? 0}{" "}
            {searchResponse?.resultCount !== 1 ? "results" : "result"}
          </h4>
          <SearchResultsContainer>
            {searchResponse?.sales?.map((s) => (
              <SaleCard key={s.id} sale={s} />
            ))}
          </SearchResultsContainer>
          {searchResponse?.sales.length < searchResponse.resultCount && (
            <LoadMoreWrapper>
              <Button onClick={fetchMore} disabled={loading}>
                {loading ? "Loading..." : "Load More"}
              </Button>
            </LoadMoreWrapper>
          )}
        </>
      )}
    </div>
  );
};
