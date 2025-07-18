import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameFilters } from '@/types/game';

interface GamesState {
  filters: GameFilters;

  currentPage: number;
}

const initialState: GamesState = {
  filters: {
    search: '',
    gameTypeID: '',
  },

  currentPage: 1,
};

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<GameFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
      state.currentPage = 1;
    },

    loadMoreGames: (state) => {
      state.currentPage += 1;
    },

    resetPagination: (state) => {
      state.currentPage = 1;
    },
  },
});

export const { setFilters, loadMoreGames, resetPagination } =
  gamesSlice.actions;

export default gamesSlice.reducer;
