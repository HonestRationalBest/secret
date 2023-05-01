import * as React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SearchBox } from "./SearchBox";

export const SearchForm: React.FC = (props) => {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();
  const query: string = searchParams.get("query") ?? "";
  const updateSearchQuery: (query: string) => void = (query) => {
    navigate(`/search?query=${query}`, { replace: true });
  };

  return <SearchBox initialValue={query} onSubmit={updateSearchQuery} />;
};
