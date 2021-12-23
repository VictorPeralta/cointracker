type CoinMarketsParams = {
  vs_currency: string;
  ids?: string | string[];
  order?:
    | "market_cap_desc"
    | "gecko_desc"
    | "gecko_asc"
    | "market_cap_asc"
    | "market_cap_desc"
    | "volume_asc"
    | "volume_desc"
    | "id_asc"
    | "id_desc";
  per_page?: number;
  page?: number;
  sparkline?: boolean;
};

export interface Sparkline {
  price: number[];
}

export interface CoinGeckoMarketData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: Date;
  atl: number;
  atl_change_percentage: number;
  atl_date: Date;
  roi?: any;
  last_updated: Date;
  sparkline_in_7d: Sparkline;
}

export const getCoinMarketsData = async (params: CoinMarketsParams) => {
  const stringParams = Object.entries(params).map(([key, value]) => {
    return [key, value.toString()] as [string, string];
  });
  const qs = new URLSearchParams(stringParams);
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?${qs.toString()}`
  );

  if (!res.ok) {
    throw Error("Couldn't get CoinGecko market data");
  }

  return (await res.json()) as CoinGeckoMarketData[];
};
