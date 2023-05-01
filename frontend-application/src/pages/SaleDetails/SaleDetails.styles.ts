import styled from "styled-components";

export const SaleDetailHeader = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  h1 {
    font-size: 32px;
    margin-top: 8px;
    font-family: "Source Serif Pro", Georgia, "Times New Roman", Times, serif;
  }
  h2 {
    font-size: 16px;
    margin-bottom: 0px;
    color: #3d4052;
    font-weight: normal;
  }
  strong {
    font-size: 32px;
    color: #f56a00;
    flex-shrink: 0;
  }
`;

export const ImageWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  img {
    aspect-ratio: 1.5;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 32px 0;

  & button {
    width: 200px;
  }
`