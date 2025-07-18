import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Game } from '@/types/game';
import { GAMES_PER_PAGE } from '@/utils/constants';
import { gamesApi } from '../api/gamesApi';

const selectFilters = (state: RootState) => state.games.filters;

const selectAllGames = gamesApi.endpoints.getGames.select();

const selectFilteredGames = createSelector(
  [selectAllGames, selectFilters],
  (gamesState, filters) => {
    if (!gamesState.data || !gamesState.data.result) return [];

    return gamesState.data.result.filter((game: Game) => {
      const matchesType =
        filters.gameTypeID === '' ||
        game.gameTypeID
          .toLowerCase()
          .includes(filters.gameTypeID.toLowerCase());

      const matchesSearch =
        filters.search === '' ||
        game.gameName.toLowerCase().includes(filters.search.toLowerCase());

      return matchesType && matchesSearch;
    });
  },
);

const selectDisplayedGames = createSelector(
  [selectFilteredGames, (state: RootState) => state.games.currentPage],
  (filteredGames, currentPage) => {
    const totalToShow = currentPage * GAMES_PER_PAGE;
    return filteredGames.slice(0, totalToShow);
  },
);

const selectGameTypes = createSelector([selectAllGames], (gamesState) => {
  const uniqueGameTypes = new Set(
    gamesState.data?.result.map((game) => game.gameTypeID) || [],
  );
  return Array.from(uniqueGameTypes);
});

const selectCurrentPage = (state: RootState) => state.games.currentPage;
const selectFiltersState = (state: RootState) => state.games.filters;

export {
  selectDisplayedGames,
  selectFilteredGames,
  selectCurrentPage,
  selectFiltersState,
  selectGameTypes,
};
