export interface Currency {
  currency_iso: string;
  currency_rate: number;
}

export interface UserState {
  userLocation: string | null;
  isUserFirstTime: boolean;
  userAppRating: number | null;
  currencies: Currency[] | null;
  currentCurrency: Currency | null;
}
