const AUTH_DATA_KEY = `wbpAuthData`;

/**
 * Retrieves the auth data from localstorage
 * @returns {object} The auth data object
 */
export const getPersistedAuthData = () =>
  JSON.parse(localStorage.getItem(AUTH_DATA_KEY));

/**
 * Stores the auth data in localstorage
 * @param {object} authData The auth data object
 */
export const setPersistedAuthData = (authData) =>
  localStorage.setItem(AUTH_DATA_KEY, JSON.stringify(authData));

/**
 * Deletes the auth data from localstorage
 * @returns {object} The auth data object
 */
export const deletePersistedAuthData = () =>
  localStorage.removeItem(AUTH_DATA_KEY);
