import React from 'react';
import { AppContext, AppInitialProps } from 'next/app';
import { HeadlessProvider } from '@wpengine/headless/react';
import { Layout } from '../components';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../styles/chakraTheme/theme';
import { GlobalDataProvider } from '../lib/context/globalDataContext';
import '../styles/globals.css';

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
const client = new ApolloClient({
  uri: 'https://starter-next.gatsby-wp.com/graphql',
  cache: new InMemoryCache(),
});

/* eslint-disable react/jsx-props-no-spreading */
export default function App({
  Component,
  pageProps,
}: AppContext & AppInitialProps) {
  console.log('pageProps: ', pageProps);
  return (
    <GlobalDataProvider globalData={pageProps}>
      <HeadlessProvider pageProps={pageProps}>
        <ChakraProvider theme={theme}>
          <ApolloProvider client={client}>
            <Component {...pageProps} />
          </ApolloProvider>
        </ChakraProvider>
      </HeadlessProvider>
    </GlobalDataProvider>
  );
}
