import * as React from "react";
import { useParams } from "react-router-dom";
import { useFetchSale } from "../../utils/UseFetchSale";
import DOMPurify from "dompurify";
import { ButtonWrapper, ImageWrapper, SaleDetailHeader } from "./SaleDetails.styles";
import { Button, LoadingSpinner } from "../../components";

export const SaleDetails: React.FC = () => {
  const params = useParams();
  const id: string = params.id ?? "";
  const { loading, error, sale } = useFetchSale({ saleId: id });
  const [isFavorite, setIsFavorite] = React.useState(false)

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
          <ButtonWrapper>
            <Button>{isFavorite ? "Add to favorite" : "Remove from favorite"}</Button>
          </ButtonWrapper>
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
