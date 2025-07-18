import GameFilters from '@/components/GameFilters/GameFilters';
import Search from '@/components/Search/Search';
import GameList from '@/components/GameList/GameList';
import styles from './HomePage.module.css';

function HomePage() {
  return (
    <div className={styles.homePage}>
      <div className={styles.header}>
        <GameFilters />
        <Search />
      </div>
      <GameList />
    </div>
  );
}

export default HomePage;
