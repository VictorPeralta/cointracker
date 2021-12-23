import React from "react";
import styles from "./CoinInfo.module.css";

interface Props {
  ticker: string;
  marketCap: number;
  price: number;
  change: number;
  currency: string;
  sparkline: Sparkline;
}

import { LineChart, Line, YAxis } from "recharts";
import { Sparkline } from "../../utils/coingecko";

export default function CoinInfo({
  ticker,
  marketCap,
  price,
  change,
  currency,
  sparkline,
}: Props) {
  const renderLineChart = (
    <LineChart width={100} height={40} data={sparkline.price}>
      <YAxis hide domain={["dataMin", "dataMax"]} />

      <Line
        type="monotone"
        dataKey={(v) => v}
        stroke={getColorByPriceChange(change)}
        dot={false}
        isAnimationActive={false}
      />
    </LineChart>
  );

  return (
    <div className={styles.card}>
      <div>
        <div className={`${styles.tickerContainer} `}>{ticker}</div>
        <div className={`${styles.xsText} `}>
          {currency}
          {(marketCap / 1000000000).toFixed(3)} bn
        </div>
      </div>
      <div>{renderLineChart}</div>
      <div className={styles.alignRight}>
        <div className={styles.price}>
          {currency}
          {price.toFixed(2)}
        </div>
        <div
          className={styles.sText}
          style={{ color: getColorByPriceChange(change) }}
        >
          {change.toFixed(2)}%
        </div>
      </div>
    </div>
  );
}

const getColorByPriceChange = (change: number) => {
  if (change >= 0) return "green";
  else return "red";
};
