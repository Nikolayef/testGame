import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';

import GameCard from '../GameCard/GameCard';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { useGetGamesQuery } from '@/store/api/gamesApi';
import {
  selectDisplayedGames,
  selectCurrentPage,
  selectFilteredGames,
} from '@/store/selectors/gameSelector';
import { loadMoreGames } from '@/store/slices/gamesSlice';
import { GAMES_PER_PAGE } from '@/utils/constants';
import { Game } from '@/types/game';
import styles from './GameList.module.css';

function GameList() {
  const dispatch = useDispatch();
  const { isLoading } = useGetGamesQuery();

  const displayedGames: Game[] = useSelector(selectDisplayedGames);
  const filteredGames = useSelector(selectFilteredGames);
  const currentPage = useSelector(selectCurrentPage);

  const hasMore = filteredGames.length > currentPage * GAMES_PER_PAGE;

  const handleLoadMore = useCallback(() => {
    if (hasMore && !isLoading) {
      dispatch(loadMoreGames());
    }
  }, [dispatch, hasMore, isLoading]);

  const sentinelRef = useInfiniteScroll({
    hasMore,
    isLoading,
    onLoadMore: handleLoadMore,
  });

  return (
    <div className={styles.gameList}>
      <div className={styles.header}>
        <div className={styles.provider}>
          <span>Pragmatic Play</span>
        </div>
      </div>

      {isLoading && displayedGames.length === 0 ? (
        <div className={styles.loading}>Loading...</div>
      ) : (
        <div className={styles.grid}>
          {displayedGames.map((game) => (
            <GameCard key={game.gameID} game={game} />
          ))}
        </div>
      )}

      {isLoading && displayedGames.length > 0 && (
        <div className={styles.loading}>Loading more games...</div>
      )}

      {hasMore && <div ref={sentinelRef} className={styles.sentinel} />}

      {!hasMore && displayedGames.length > 0 && (
        <div className={styles.endMessage}>All games loaded</div>
      )}
    </div>
  );
}

export default GameList;
