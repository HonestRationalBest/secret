interface IBasicEditorial {
  title: string;
  destinationName: string;
}

export interface IBasicSale {
  id: string;
  editorial: IBasicEditorial;
  photos: Array<{ url: string }>;
}

export interface ISale extends IBasicSale {
  editorial: IBasicEditorial & {
    hotelDetails?: string;
  };
  prices: {
    leadRate: {
      forDisplay: string;
    };
  };
}
