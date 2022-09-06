import YesNo from '../../enums';
import GamesStatistic from './GamesStatistic.model';

interface UserWord {
  difficulty: YesNo;
  optional: {
    learned: YesNo;
    learnedDate: number;
    gamesStatistic: GamesStatistic;
  };
}

export default UserWord;
