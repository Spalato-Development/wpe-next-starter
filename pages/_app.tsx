import React from 'react';
import { AppContext, AppInitialProps } from 'next/app';
import { HeadlessProvider } from '@wpengine/headless/react';
import AuthProvider from '../lib/context/authContext';

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

// window.addEventListener('storage', function(event){
//   if (event.key == 'logout-event') {
//       // ..
//   }
// });
/* eslint-disable react/jsx-props-no-spreading */
export default function App({
  Component,
  pageProps,
}: AppContext & AppInitialProps) {
  return (
    <GlobalDataProvider globalData={pageProps}>
      <HeadlessProvider pageProps={pageProps}>
        <AuthProvider>
          <ChakraProvider theme={theme}>
            <ApolloProvider client={client}>
              <Component {...pageProps} />
            </ApolloProvider>
          </ChakraProvider>
        </AuthProvider>
      </HeadlessProvider>
    </GlobalDataProvider>
  );
}

// window.addEventListener('storage', (e) => {
//   if (e.key === 'access_token' && e.oldValue && !e.newValue) {
//     store.dispatch(userSignOut());
//   }
// });
