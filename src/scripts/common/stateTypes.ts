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

export interface AppState {
  authorization: Authorization;
  textbook: Textbook;
}
