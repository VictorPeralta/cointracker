import type { NextPage } from "next";
import Head from "next/head";
import MarketData from "../components/MarketData/MarketData";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Cointracker</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <>
          <h1>Coin Tracker</h1>
          <MarketData />
        </>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://www.coingecko.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Coingecko
        </a>
      </footer>
    </div>
  );
};

export default Home;
