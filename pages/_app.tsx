import React from 'react';
import { AppContext, AppInitialProps } from 'next/app';
import { HeadlessProvider } from '@wpengine/headless/react';
import AuthProvider from '../lib/context/authContext';

import { Layout } from '../components';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../styles/chakraTheme/theme';
import { GlobalDataProvider } from '../lib/context/globalDataContext';
import '../styles/globals.css';

import { ApolloClient, InMemoryCache, ApolloLink, createHttpLink, from } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { onError } from "@apollo/client/link/error";

import { WP_REFRESH_TOKEN } from "../lib/api/auth"


const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
}


let client = "" as any
const getNewToken = async (refreshToken: string) => {
  return client.query({ 
    query: WP_REFRESH_TOKEN,
    variables: {
      jwtRefreshToken: refreshToken
    }
   }).then((response: any) => {
    // extract your accessToken from your response data and return it
    const { accessToken } = response.data;
    return accessToken;
  });
};


const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        console.log(">>> Errors: ", err)
        switch (err?.extensions?.code) {
          case 'UNAUTHENTICATED':
            // error code is set to UNAUTHENTICATED
            // when AuthenticationError thrown in resolver
            console.log("----> UNAUTHENTICATED")
            // modify the operation context with a new token
            const oldHeaders = operation.getContext().headers;
            operation.setContext({
              headers: {
                ...oldHeaders,
                authorization: `Bearer ----`,
              },
            });
            // retry the request, returning the new observable
            return forward(operation);
        }
      }
    }
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
      // if you would also like to retry automatically on
      // network errors, we recommend that you use
      // apollo-link-retry
    }
  }
);

const httpLink = createHttpLink({
  uri: 'https://starter-next.gatsby-wp.com/graphql',
});


const otherMiddleware = new ApolloLink((operation, forward) => {
  console.log("operation, forward: ", operation, forward)
  // add the recent-activity custom header to the headers
  operation.setContext(({ headers = {} }) => {
    return ({
    headers: {
      ...headers,
      'recent-activity': localStorage.getItem('lastOnlineTime') || null,
    }
  })
});

  return forward(operation);
})


/* export const authLinkAfterware = new ApolloLink(
  (operation, forward) =>
    forward(operation).map(
      (
        response: {
          extensions?: Record<string, any>
          context?: Record<string, any>
        },
      ) => {
        const ctx = operation.getContext()
        const res = ctx.response

        console.log("after call")

        try {
          // Do we have a response?
          if (res) {
            const { headers } = res
            const refreshToken = headers.get('X-JWT-Refresh');
            console.log("REFRESH >>  the refreshToken: ", refreshToken)
            // Do we have headers with refresh token
            if (!!refreshToken) {
              // Extract tokens from Headers & save them

              //todo this does not work
              const token = headers.get('X-JWT-Auth')
              
              console.log(`token: ${token}`)


              if (!!refreshToken) {
                console.log('setting refresh token in afterware - refreshToken: ', refreshToken)
                getNewToken(refreshToken).then(newToken => {

                  console.log(">>> NEW TOKEN: ", newToken)
                } )
              }
            }
          }
        } catch (e) {
          console.log(e)
        }

        return response
      },
    ),
) */

client = new ApolloClient({
  //uri: 'https://starter-next.gatsby-wp.com/graphql',
  cache: new InMemoryCache(),
  link:  from([errorLink, httpLink]),
  defaultOptions: defaultOptions,
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
