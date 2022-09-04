import { AppState } from './stateTypes';

const state: AppState = {
  authorization: { isAuth: false, token: '', refreshToken: '', userId: '', name: '', date: 0, timeoutId: 0 },
  textbook: { group: 1, page: 1 },
  sprint: {
    group: 0,
    score: 0,
    gameWords: [],
    currentWordIndex: -1,
    currentWordRu: '',
    wordsCorrectIds: [],
    wordsInCorrectIds: [],
    isGameFinished: false,
    correctAnswerCount: 0,
    correctAnswerCountTotal: 0,
    speedSprint: 1,
    speedIconCount: 1,
    newWords: 0,
    gameLearnedWords: 0,
    isFromTextBook: false,
  },
  audioCall: {
    group: 0,
    gameWords: [],
    currentWordIndex: -1,
    currentWordRu: [],
    wordsCorrectIds: [],
    wordsInCorrectIds: [],
    isGameFinished: false,
    correctAnswerCountTotal: 0,
    newWords: 0,
    gameLearnedWords: 0,
    isFromTextBook: false,
  },
};

export default state;
