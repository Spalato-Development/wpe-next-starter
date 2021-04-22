import React from 'react';
import { Header, Footer } from './index';
import Head from 'next/head';
import styles from './Layout.module.css';
import config from "../config";


const Main = ({ title = config?.site?.title || "", children }) => {
  return (
    <main className={styles.main}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </main>
  )
}

export const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <Header />
      <Main>
        {children}
      </Main>
      <Footer />
    </div>
  );
};
