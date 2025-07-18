
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GameApiResponse } from '@/types/game';
import { API_BASE_URL, PARTNER_NAME } from '@/utils/constants';

export const gamesApi = createApi({
  reducerPath: 'gamesApi',
  baseQuery: fetchBaseQuery({

    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {

      headers.set('Origin', 'https://belparyaj.com');
      headers.set('Referer', 'https://belparyaj.com');
      headers.set('Accept', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Game'],
  endpoints: (builder) => ({
    getGames: builder.query<GameApiResponse, void>({

      query: () => `pragmatic/game/list?partner_name=${PARTNER_NAME}`,
      providesTags: ['Game'],
    }),
  }),
});

export const { useGetGamesQuery } = gamesApi;
