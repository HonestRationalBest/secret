import * as React from "react";
import { useParams } from "react-router-dom";
import { useFetchSale } from "../../utils/UseFetchSale";
import DOMPurify from "dompurify";
import {
  ButtonWrapper,
  ImageWrapper,
  SaleDetailHeader,
} from "./SaleDetails.styles";
import { Button, LoadingSpinner } from "../../components";
import { ActionTypes, useItemsContext } from "../../context/ItemsContext";
import { useUserContext } from "../../context/UserContext";

export const SaleDetails: React.FC = () => {
  const params = useParams();
  const id: string = params.id ?? "";
  const { loading, error, sale } = useFetchSale({ saleId: id });
  const {
    state: { favorites },
    dispatch,
  } = useItemsContext();
  const { userId } = useUserContext();

  const isInFavorites = () => {
    return favorites[userId] && favorites[userId].some((favorite) => favorite.id === id);
  };

  const [isFavorite, setIsFavorite] = React.useState(isInFavorites());

  const handleAddToFavorite = () => {
    if (isFavorite) {
      dispatch({
        type: ActionTypes.REMOVE_FROM_FAVORITES,
        payload: { userId, sale: { ...sale, id } },
      });
    } else {
      dispatch({
        type: ActionTypes.ADD_TO_FAVORITES,
        payload: { userId, sale: { ...sale, id } },
      });
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <div>
      {loading && <LoadingSpinner />}
      {error && <p>{error.toString()}</p>}
      {sale && (
        <section>
          <SaleDetailHeader>
            <div>
              <h2>{sale.editorial.destinationName}</h2>
              <h1>{sale.editorial.title}</h1>
            </div>
            <strong>from {sale.prices.leadRate.forDisplay}</strong>
          </SaleDetailHeader>
          <ImageWrapper>
            <img src={sale.photos?.[0].url} alt={sale.editorial?.title} />
          </ImageWrapper>
          {userId && (
            <ButtonWrapper>
              <Button onClick={handleAddToFavorite}>
                {isFavorite ? "Remove from favorite" : "Add to favorite"}
              </Button>
            </ButtonWrapper>
          )}
          {sale.editorial.hotelDetails && (
            <article
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(sale?.editorial?.hotelDetails),
              }}
            />
          )}
        </section>
      )}
    </div>
  );
};
