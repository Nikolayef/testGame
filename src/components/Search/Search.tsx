import { useState } from 'react';
import useGameFilters from '@/hooks/useGameFilters';
import styles from './Search.module.css';

function Search() {
  const { filters, updateFilters } = useGameFilters();
  const [searchValue, setSearchValue] = useState(filters.search);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const handleSearchClick = () => {
    updateFilters({ search: searchValue });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  return (
    <div className={styles.search}>
      <div className={styles.label}>Search</div>
      <div className={styles.inputContainer}>
        <input
          value={searchValue}
          onChange={(e) => handleSearchChange(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Search"
          className={styles.input}
        />
        <button
          type="button"
          onClick={handleSearchClick}
          className={styles.button}
        >
          SEARCH
        </button>
      </div>
    </div>
  );
}

export default Search;
