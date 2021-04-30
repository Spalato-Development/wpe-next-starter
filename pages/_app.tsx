import React from 'react';
import { AppContext, AppInitialProps } from 'next/app';
import { HeadlessProvider } from '@wpengine/headless/react';
import AuthProvider from '../lib/context/authContext';
import { Layout } from '../components';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../styles/chakraTheme/theme';
import { GlobalDataProvider } from '../lib/context/globalDataContext';
import '../styles/globals.css';

import { ApolloProvider } from '@apollo/client/react';
import { client } from '../services/apollo';

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
              <Layout>
                <Component {...pageProps} />
              </Layout>
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

// window.addEventListener('storage', function(event){
//   if (event.key == 'logout-event') {
//       // ..
//   }
// });
