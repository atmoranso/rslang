import { AppState } from './stateTypes';

const state: AppState = {
  authorization: { isAuth: false, token: '', refreshToken: '', userId: '', name: '', date: Date.now(), timeoutId: 0 },
  textbook: { group: 1, page: 1 },
};

export default state;
