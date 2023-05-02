import * as React from "react";
import { ActionTypes, useItemsContext } from "../../context/ItemsContext";
import { useUserContext } from "../../context/UserContext";
import {
  SaleCardWrapper,
  SaleCardContent,
  DestenationText,
  TitleText,
  FavoriteButton,
} from "./SaleCard.styles";
import { IBasicSale } from "../../utils/Sale.interface";
import { Button } from "../Button/Button";
import { Link } from "react-router-dom";

export interface ISaleCardProps {
  sale: IBasicSale;
}

export const SaleCard: React.FC<ISaleCardProps> = ({ sale }) => {
  const { userId } = useUserContext();
  const {
    state: { favorites },
    dispatch,
  } = useItemsContext();

  const isInFavorites = () => {
    return (
      favorites[userId] &&
      favorites[userId].some((favorite) => favorite.id === sale.id)
    );
  };

  const [isFavorite, setIsFavorite] = React.useState(isInFavorites());

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch({
        type: ActionTypes.REMOVE_FROM_FAVORITES,
        payload: { userId, sale },
      });
    } else {
      dispatch({
        type: ActionTypes.ADD_TO_FAVORITES,
        payload: { userId, sale },
      });
    }
    setIsFavorite(!isFavorite);
  };

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
