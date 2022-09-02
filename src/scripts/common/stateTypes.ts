import Word from './api/models/Word.model';

export interface Authorization {
  isAuth: boolean;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
  date: number;
  timeoutId: number;
}

export interface Textbook {
  group: number;
  page: number;
}
export interface SprintState {
  group: number;
  score: number;
  gameWords: Word[];
  currentWordIndex: number;
  currentWordRu: string;
  wordsCorrectIds: string[];
  wordsInCorrectIds: string[];
  isGameFinished: boolean;
  correctAnswerCount: number;
  speedSprint: number;
  speedIconCount: number;
  newWords: number;
  gameLearnedWords: number;
}

export interface AppState {
  authorization: Authorization;
  textbook: Textbook;
  sprint: SprintState;
}
