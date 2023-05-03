import * as React from "react";
import {
  SaleCardWrapper,
  SaleCardContent,
  DestenationText,
  TitleText,
  FavoriteButton,
} from "./SaleCard.styles";
import { IBasicSale } from "../../utils/Sale.interface";
import { Link } from "react-router-dom";
import { useFavorites } from "../../hooks/useFavorites";

export interface ISaleCardProps {
  sale: IBasicSale;
}

export const SaleCard: React.FC<ISaleCardProps> = ({ sale }) => {
  const { handleToggleFavorite, isInFavorites, userId } = useFavorites(sale.id);

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
          <FavoriteButton onClick={() => handleToggleFavorite()}>
            {isInFavorites ? "Remove from favorites" : "Add to favorites"}
          </FavoriteButton>
        )}
      </SaleCardContent>
    </SaleCardWrapper>
  );
};
