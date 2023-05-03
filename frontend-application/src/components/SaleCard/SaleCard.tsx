import * as React from "react";
import { Link } from "react-router-dom";

import { IBasicSale } from "../../utils/Sale.interface";
import { useFavorites } from "../../hooks/useFavorites";
import { useUserContext } from "../../context/UserContext";

import {
  SaleCardWrapper,
  SaleCardContent,
  DestenationText,
  TitleText,
  FavoriteButton,
} from "./SaleCard.styles";

export interface ISaleCardProps {
  sale: IBasicSale;
}

export const SaleCard: React.FC<ISaleCardProps> = ({ sale }) => {
  const { userId } = useUserContext();
  const { handleToggleFavorite, isFavorite } = useFavorites(sale.id);

  return (
    <SaleCardWrapper>
      <Link to={`/sale/${sale.id}`}>
        <img
          width="100%"
          src={sale.photos?.[0].url}
          alt={sale?.editorial?.title}
        />
      </Link>
      <SaleCardContent>
        <DestenationText>{sale?.editorial?.destinationName}</DestenationText>
        <TitleText>{sale?.editorial?.title}</TitleText>
        {userId && (
          <FavoriteButton onClick={handleToggleFavorite}>
            {isFavorite ? "Remove from favorites" : "Add to favorites"}
          </FavoriteButton>
        )}
      </SaleCardContent>
    </SaleCardWrapper>
  );
};
