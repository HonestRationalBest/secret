import * as React from "react";
import { Outlet } from "react-router-dom";

import { LoginButton } from "../components";
import { useUserContext } from "../context/UserContext";

import {
  ContentContainer,
  FlexWrapper,
  Header,
  Logo,
  StyledLink,
} from "./MainLayout.styles";

export const MainLayout: React.FC = (props) => {
  const { userId } = useUserContext();

  return (
    <>
      <Header>
        <ContentContainer>
          <FlexWrapper>
            <Logo />
            <LoginButton />
          </FlexWrapper>
          <ul>
            <li>
              <StyledLink to="/">Home</StyledLink>
            </li>
            <li>
              <StyledLink to="/search/London">London</StyledLink>
            </li>
            <li>
              <StyledLink to="/search/Paris">Paris</StyledLink>
            </li>
            <li>
              <StyledLink to="/search/Berlin">Berlin</StyledLink>
            </li>
            {userId && (
              <li>
                <StyledLink to="/favorites">Favorites</StyledLink>
              </li>
            )}
          </ul>
        </ContentContainer>
      </Header>
      <ContentContainer>
        <Outlet />
      </ContentContainer>
    </>
  );
};
