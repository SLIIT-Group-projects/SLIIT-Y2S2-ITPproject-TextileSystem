import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';

import { logout } from './authSlice'; // Import the logout action


const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
});

async function baseQueryWithAuth(args, api, extra) {
  try {
    const result = await baseQuery(args, api, extra);
    // Dispatch the logout action on 401.
    if (result.error && result.error.status === 401) {
      console.log(result.error);
      api.dispatch(logout());
    }
    return result;
  } catch (error) {
    console.error('An error occurred:', error);
    throw error; // Rethrow the error to propagate it further
  }
}


export const apiSlice = createApi({
  baseQuery: baseQueryWithAuth, // Use the customized baseQuery
  tagTypes: ['Product', 'Order', 'User'],
  endpoints: (builder) => ({}),
});
