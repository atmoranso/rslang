import { AppState } from './stateTypes';

const state: AppState = {
  authorization: { isAuth: false, token: '', refreshToken: '', userId: '', name: '', date: 0, timeoutId: 0 },
  textbook: { group: 1, page: 1 },
  sprint: {
    group: 0,
    score: 0,
    currentWordIndex: -1,
    currentWordEn: '',
    currentWordRu: '',
    currentWordRuTrue: '',
    isGameFinished: false,
    correctAnswerCount: 0,
    speedSprint: 1,
    speedIconCount: 1,
  },
};

export default state;
