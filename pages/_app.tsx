import React from 'react';
import { AppContext, AppInitialProps } from 'next/app';
import { HeadlessProvider } from '@wpengine/headless/react';
import { Layout } from '../components';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../styles/chakraTheme/theme';
import { GlobalDataProvider } from '../lib/context/globalDataContext';
import '../styles/globals.css';

/* eslint-disable react/jsx-props-no-spreading */
export default function App({
  Component,
  pageProps,
}: AppContext & AppInitialProps) {
  return (
    <GlobalDataProvider globalData={pageProps}>
      <HeadlessProvider pageProps={pageProps}>
        <ChakraProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </HeadlessProvider>
    </GlobalDataProvider>
  );
}
