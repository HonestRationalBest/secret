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
import { ActionTypes, useItemsContext } from "../../context/ItemsContext";
import { useUserContext } from "../../context/UserContext";
import { client } from "../../apolloClient";
import { CREATE_FAVORITE, REMOVE_FAVORITE } from "../../utils/queries/favorites";

export interface ISaleCardProps {
  sale: IBasicSale;
}

export const SaleCard: React.FC<ISaleCardProps> = ({ sale }) => {
  const {
    state: { favorites },
    dispatch
  } = useItemsContext();
  const { userId } = useUserContext();

  const isInFavorites = React.useMemo(
    () => favorites[userId]?.some((favorite) => favorite.id === sale.id) ?? false,
    [favorites, userId, sale.id]
  );

  const handleToggleFavorite = async () => {
    if (isInFavorites) {
      try {
        await client.mutate({
          mutation: REMOVE_FAVORITE,
          variables: { userId, itemId: sale.id },
        });
        dispatch({
          type: ActionTypes.REMOVE_FROM_FAVORITES,
          payload: { userId, sale: { ...sale } },
        });
      } catch (error) {
        console.error("Error removing favorite:", error);
      }
    } else {
      try {
        await client.mutate({
          mutation: CREATE_FAVORITE,
          variables: { userId, itemId: sale.id },
        });
        dispatch({
          type: ActionTypes.ADD_TO_FAVORITES,
          payload: { userId, sale: { ...sale } },
        });
      } catch (error) {
        console.error("Error adding favorite:", error);
      }
    }
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
          <FavoriteButton onClick={() => handleToggleFavorite()}>
            {isInFavorites ? "Remove from favorites" : "Add to favorites"}
          </FavoriteButton>
        )}
      </SaleCardContent>
    </SaleCardWrapper>
  );
};
