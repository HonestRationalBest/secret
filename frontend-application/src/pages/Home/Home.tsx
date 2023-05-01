import * as React from "react";
import { SearchForm } from "../../components";
import { HomePageWrapper } from "./Home.styles";

export const Home: React.FC = (props) => {
  return (
    <HomePageWrapper>
      <h2>Enjoy luxury hotels and holidays at lower prices</h2>
      <SearchForm />
    </HomePageWrapper>
  );
};
