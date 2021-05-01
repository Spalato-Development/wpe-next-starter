import {
  makeVar,
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  createHttpLink,
} from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { relayStylePagination } from "@apollo/client/utilities"
import decode from 'jwt-decode';
import { getPersistedAuthData } from './auth';
import { setAuthData, deleteAuthData } from "../hooks/useAuth"

//TODO: set
const NEXT_WORDPRESS_URL = "https://starter-next.gatsby-wp.com/graphql"

const isBrowser = typeof window !== `undefined`;
const persistedAuthData = isBrowser ? getPersistedAuthData() : null;

/**
 * Reactive variable that stores auth data.
 * Docs: https://www.apollographql.com/docs/react/local-state/reactive-variables/
 */
export const apolloAuthData = makeVar({
  authToken: null,
  refreshToken: persistedAuthData?.refreshToken || null,
  user: persistedAuthData?.user || null,
});

/**
 * Gets the current timestamp in seconds
 * @returns {number} The current time in seconds format (timestamp)
 */
const getCurrentTimestampInSeconds = () => Math.floor(Date.now() / 1000);

/**
 * Check if a JWT token is expired
 * @param {string} token The token to be analyzed
 * @returns {boolean} True if the token is expired, false otherwise
 */
const isTokenExpired = (token) =>
  decode(token).exp <= getCurrentTimestampInSeconds();

/**
 * Refresh auth token if it is expired.
 */
const tokenRefreshLink = new TokenRefreshLink({
  accessTokendField: `access_token`,
  isTokenValidOrUndefined: () => {
    const { authToken } = apolloAuthData();
    return !authToken || !isTokenExpired(authToken);
  },
  fetchAccessToken: () => {
    const { refreshToken } = apolloAuthData();

    const query = `
        mutation refreshJwtAuthToken($input: RefreshJwtAuthTokenInput!) {
            refreshJwtAuthToken(input: $input) {
                authToken
            }
        }
    `;

    return fetch(process.env.NEXT_WORDPRESS_URL, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: {
          input: {
            clientMutationId: uuidv4(),
            jwtRefreshToken: refreshToken || ``,
          },
        },
      }),
    });
  },

  handleFetch: response => {
    const { authToken } = response
    console.log("tokenRefreshLink: ", authToken)
    setAuthData({ ...apolloAuthData(), authToken })
  },
  handleError: error => {
    console.error(error)
    deleteAuthData()
  },
});

/**
 * Include auth token in request headers.
 */
const authLink = setContext((_, { headers }) => {
  const { authToken } = apolloAuthData();

  return {
    headers: {
      ...headers,
      authorization: authToken ? `Bearer ${authToken}` : ``,
    },
  };
});

/**
 * Handle errors.
 */
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  if (networkError) console.error(`[Network error]: ${networkError}`);
});

/**
 * Update the authToken and refreshToken with the updated tokens
 * sent back in the response headers.
 */
const tokenUpdateLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    const {
      response: { headers },
    } = operation.getContext();

    if (headers) {
      const authToken = headers.get('x-jwt-auth');
      const refreshToken = headers.get('x-jwt-refresh');

      if (authToken) {
        setAuthData({ ...apolloAuthData(), authToken });
      }

      if (refreshToken) {
        setAuthData({ ...apolloAuthData(), refreshToken });
      }
    }

    return response;
  });
});


/**
 * Handle HTTP requests.
 */
const httpLink = createHttpLink({
  uri: NEXT_WORDPRESS_URL,
});

// https://www.apollographql.com/docs/react/local-state/managing-state-with-field-policies/#storing-local-state-in-reactive-variables
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        apolloAuthData: {
          read() {
            return apolloAuthData()
          },
        },
        // runs: relayStylePagination(),
      },
    },
  },
})

export const client = new ApolloClient({
  link: ApolloLink.from([
    tokenRefreshLink,
    authLink,
    errorLink,
    tokenUpdateLink,
    httpLink,
  ]),
  cache,
});

// const defaultOptions = {
//   watchQuery: {
//     fetchPolicy: 'no-cache',
//     errorPolicy: 'all',
//   },
//   query: {
//     fetchPolicy: 'no-cache',
//     errorPolicy: 'all',
//   },
// };
