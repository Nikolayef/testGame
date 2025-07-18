import { Game } from '@/types/game';
import { GAME_IMAGE_BASE_URL } from '@/utils/constants';
import styles from './GameCard.module.css';

interface GameCardProps {
  game: Game;
}

function GameCard({ game }: GameCardProps) {
  const imageUrl = `${GAME_IMAGE_BASE_URL}/${game.gameID}.png`;

  return (
    <div className={styles.gameCard}>
      <div className={styles.imageContainer}>
        <img src={imageUrl} alt={game.gameName} className={styles.image} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{game.gameName}</h3>
      </div>
    </div>
  );
}

export default GameCard;
