import styled from "styled-components";

export const SearchResultsContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  width: 100%;
  gap: 16px;
  box-sizeing: border-box;

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    gap: 24px;
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const SearchResultsHeader = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LoadMoreWrapper = styled.div`
  display: grid;
  place-items: center;
  padding: 16px;
  width: 100%;
  box-sizing: border-box;
`;
