import React, { useEffect, useState } from "react";
import { CoinGeckoMarketData, getCoinMarketsData } from "../../utils/coingecko";
import CoinInfo from "../CoinInfo/CoinInfo";
import Spinner from "../Spinner/Spinner";

export default function MarketData() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>();
  const [data, setData] = useState<CoinGeckoMarketData[]>();

  useEffect(() => {
    const fetchCoinPrices = async () => {
      try {
        const marketsData = await getCoinMarketsData({
          vs_currency: "USD",
          sparkline: true,
          per_page: 10,
        });
        setData(marketsData);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCoinPrices();
  }, []);
  return (
    <>
      {loading && <Spinner />}
      {error && "Something went wrong"}
      {data?.map((d) => (
        <CoinInfo
          key={d.symbol}
          ticker={d.symbol}
          marketCap={d.market_cap}
          change={d.price_change_percentage_24h}
          currency="$"
          price={d.current_price}
          sparkline={d.sparkline_in_7d}
        />
      ))}
    </>
  );
}
