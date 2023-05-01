import { DocumentNode, gql, useQuery } from "@apollo/client";
import { ISale } from "./Sale.interface";

interface IUseFetchSaleProps {
  saleId: String;
}
interface IUseFetchSale {
  sale: ISale;
  loading: boolean;
  error: any;
}

const GET_SALE_QUERY: DocumentNode = gql`
  query fetchSale($saleId: String!) {
    sale(saleId: $saleId) {
      editorial {
        title
        destinationName
        hotelDetails
      }
      prices {
        leadRate {
          forDisplay
        }
      }
      photos {
        url
      }
    }
  }
`;

export const useFetchSale: (props: IUseFetchSaleProps) => IUseFetchSale = ({
  saleId,
}) => {
  const { data, loading, error } = useQuery(GET_SALE_QUERY, {
    variables: {
      saleId: saleId,
    },
  });

  return { sale: data?.sale, loading, error };
};
