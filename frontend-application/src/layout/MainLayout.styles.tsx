import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const ContentContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 8px;

  @media (min-width: 600px) {
    padding: 16px;
  }

  @media (min-width: 1200px) {
    padding: 16px 0px;
  }
`;

export const Header = styled.header`
  background: #000;
  color: #fff;
  ul {
    display: flex;
    gap: 30px;
    margin: 0;
    padding: 10px 0;
    li {
      list-style: none;
      display: block;
      text-align: center;
      a {
        color: #fff;
        text-decoration: none;

        &.active {
          border-bottom: 1px solid #fff;
        }
      }
    }
  }
`;

export const Logo = styled.div`
  background: url("//d1x3cbuht6sy0f.cloudfront.net/assets/images/logos/se-logo-light.svg")
    no-repeat;
  background-size: 100%;
  margin: 10px 0 0 0;
  height: 32px;
  width: 194px;
`;

export const StyledLink: React.FC<{ to: string; children: string }> = ({
  to,
  children,
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? "active" : "inactive")}
    >
      {children}
    </NavLink>
  );
};

export const FlexWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
