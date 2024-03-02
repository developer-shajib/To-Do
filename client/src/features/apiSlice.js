import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Create Api Slice
const apiSlice = createApi({
  tagTypes: ['Me'],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_PUBLIC_API_URL,
    credentials: 'include',
    withCredentials: true,
    prepareHeaders: (headers, { getState }) => {
      // Add custom headers here
      const token = getState()?.userState?.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  endpoints: (build) => ({})
});

export default apiSlice;
