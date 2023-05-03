import * as React from "react";
import DOMPurify from "dompurify";
import {
  ButtonWrapper,
  ImageWrapper,
  SaleDetailHeader,
} from "./SaleDetails.styles";
import { Button, LoadingSpinner } from "../../components";
import { useFavorites } from "../../hooks/useFavorites";
import { useGetFavorites } from "../../hooks/useGetFavorites";

export const SaleDetails: React.FC = () => {
  const { handleToggleFavorite, isInFavorites, loading, error, sale, userId } =
    useFavorites();

  useGetFavorites();

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
              <Button onClick={handleToggleFavorite}>
                {isInFavorites ? "Remove from favorite" : "Add to favorite"}
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
