import * as React from "react";
import { ISale } from "../../utils/Sale.interface";
import {
  DestenationText,
  SaleCardContent,
  SaleCardLink,
  TitleText,
} from "./SaleCard.styles";

interface ISaleCardProps {
  sale: Partial<ISale>;
}

export const SaleCard: React.FC<ISaleCardProps> = ({ sale }) => {
  return (
    <SaleCardLink to={`/sale/${sale.id}`}>
      <img
        width="100%"
        src={sale.photos?.[0].url}
        alt={sale?.editorial?.title}
      />
      <SaleCardContent>
        <DestenationText>{sale?.editorial?.destinationName}</DestenationText>
        <TitleText>{sale?.editorial?.title}</TitleText>
      </SaleCardContent>
    </SaleCardLink>
  );
};
