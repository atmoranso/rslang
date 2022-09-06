import UserWord from './UserWord.model';

interface UserWordExt extends UserWord {
  id: string;
  wordId: string;
}

export default UserWordExt;
