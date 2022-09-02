import GameStatistic from './GameStatistic.model';

interface GamesStatistic {
  wasInGames: boolean;
  sprint: GameStatistic;
  audioCall: GameStatistic;
}

export default GamesStatistic;
