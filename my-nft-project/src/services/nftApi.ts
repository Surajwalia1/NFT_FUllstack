import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const nftApi = createApi({
  reducerPath: 'nftApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/nfts', // Replace with your backend URL
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      if (token) {
        headers.set('Authorization', `Bearer ${token}`); // Set the token in the Authorization header
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createNft: builder.mutation<any, { name: string; description: string; price: number; image: File; owner: string }>({
      query: ({ name, description, price, image, owner }) => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price.toString());
        formData.append('image', image);
        formData.append('owner', owner); // Append the owner string

        return {
          url: '/create',
          method: 'POST',
          body: formData,
        };
      },
    }),
    getNfts: builder.query<any[], void>({
      query: () => '/list',
    }),
  }),
});

export const { useCreateNftMutation, useGetNftsQuery } = nftApi;
