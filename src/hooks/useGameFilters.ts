import { useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { setFilters, resetPagination } from '../store/slices/gamesSlice';
import { GameFilters } from '../types/game';

function useGameFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.games.filters);

  useEffect(() => {
    const search = searchParams.get('search') || '';
    const gameTypeID = searchParams.get('gameTypeID') || '';

    if (search !== filters.search || gameTypeID !== filters.gameTypeID) {
      dispatch(setFilters({ search, gameTypeID }));
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.search.trim()) {
      params.set('search', filters.search);
    }

    if (filters.gameTypeID) {
      params.set('gameTypeID', filters.gameTypeID);
    }

    if (params.toString() !== searchParams.toString()) {
      setSearchParams(params, { replace: true });
    }
  }, [filters, setSearchParams, searchParams]);

  const updateFilters = useCallback(
    (newFilters: Partial<GameFilters>) => {
      dispatch(setFilters(newFilters));
      dispatch(resetPagination());
    },
    [dispatch],
  );

  return {
    filters,
    updateFilters,
  };
}

export default useGameFilters;
