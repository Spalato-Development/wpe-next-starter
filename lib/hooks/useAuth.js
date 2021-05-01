import React, { createContext, useContext } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { useReactiveVar } from '@apollo/client';

import { apolloAuthData, client } from '../services/apollo';
import {
  setPersistedAuthData,
  deletePersistedAuthData,
} from '../services/auth';
import useAuthTokenRefresher from './useAuthTokenRefresher';

const AuthContext = createContext();

const GET_APOLLO_AUTH_DATA = gql`
  query getApolloAuthData {
    apolloAuthData @client
  }
`;

export const setAuthData = (authData) => {
  const { refreshToken, user } = authData;
  console.log("authData: ", authData)
  apolloAuthData(authData);
  console.log("authData 2: ", apolloAuthData())
  delete user.jwtAuthToken;
  delete user.jwtRefreshToken;
  setPersistedAuthData({ refreshToken, user });
}

export const setIsLoading = (isLoading) => {
  const prevAuthData = apolloAuthData()
  apolloAuthData({
    ...prevAuthData,
    isLoading
  });
}

export const deleteAuthData = () => {
  apolloAuthData({
    authToken: null,
    refreshToken: null,
    user: null,
  });
  client.resetStore();
  deletePersistedAuthData();
}

export const AuthProvider = ({ children }) => {
  // TODO: the query does not "work", it shoudl be const {data : {apolloAuthData}} ....
  const { data } = useQuery(GET_APOLLO_AUTH_DATA); // "Apollo makeVars session"

  const authData = useReactiveVar(apolloAuthData);
  console.log(">>>> AUTH PROVIDER")
  console.log("authData: ", authData);
  console.log("data: ", data);
  console.log(">>>> // AUTH PROVIDER")
  const isLoggedIn = !!authData?.authToken ?? false;
  const user = authData?.user ?? null;

  const isLoading = !!authData?.isLoading;

  useAuthTokenRefresher(authData, setAuthData, deleteAuthData, setIsLoading);

  const value = {
    isLoggedIn,
    user,
    setAuthData,
    deleteAuthData,
    isLoading,
    setIsLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => useContext(AuthContext);

export default useAuth;
