import styled from "styled-components";
import { Button } from "../";

export const StyledSearchForm = styled.form`
  display: flex;
  flex-drection: row;
`;

export const SearchInput = styled.input`
  box-sizing: border-box;
  padding: 8px 12px;
  width: 320px;
  height: 40px;
  background: #ffffff;
  border: 1px solid #b4b5bb;
  border-radius: 2px;
`;

export const SearchButton = () => {
  return <Button type="submit">Search</Button>;
};
