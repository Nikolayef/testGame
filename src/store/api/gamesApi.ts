// src/store/api/gamesApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GameApiResponse } from '@/types/game';
import { API_BASE_URL, PARTNER_NAME } from '@/utils/constants';

export const gamesApi = createApi({
  reducerPath: 'gamesApi',
  baseQuery: fetchBaseQuery({
    // API_BASE_URL теперь будет '/api' на Vercel
    // и 'https://thingproxy...' локально.
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      // Эти заголовки будут добавлены Vercel при запросе к belparyaj.com
      // Это может быть важно, если тот сервер их проверяет.
      headers.set('Origin', 'https://belparyaj.com');
      headers.set('Referer', 'https://belparyaj.com');
      headers.set('Accept', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Game'],
  endpoints: (builder) => ({
    getGames: builder.query<GameApiResponse, void>({
      // Этот путь будет добавлен к baseUrl
      query: () => `pragmatic/game/list?partner_name=${PARTNER_NAME}`,
      providesTags: ['Game'],
    }),
  }),
});

export const { useGetGamesQuery } = gamesApi;
