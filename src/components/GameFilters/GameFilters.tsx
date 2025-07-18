import { useSelector } from 'react-redux';
import Select from '../Select/Select';
import useGameFilters from '@/hooks/useGameFilters';
import styles from './GameFilters.module.css';
import { selectGameTypes } from '@/store/selectors/gameSelector';

function GameFilters() {
  const { filters, updateFilters } = useGameFilters();

  const gameTypeOptions = useSelector(selectGameTypes);

  const handleGameTypeChange = (value: string) => {
    updateFilters({ gameTypeID: value });
  };

  return (
    <div className={styles.gameFilters}>
      <div className={styles.item}>
        <label className={styles.label}>Game Type</label>
        <Select
          value={filters.gameTypeID}
          onChange={handleGameTypeChange}
          options={gameTypeOptions}
        />
      </div>
    </div>
  );
}

export default GameFilters;
