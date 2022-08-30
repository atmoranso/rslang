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
  currentWordIndex: number;
  currentWordEn: string;
  currentWordRu: string;
  currentWordRuTrue: string;
  isGameFinished: boolean;
  correctAnswerCount: number;
  speedSprint: number;
  speedIconCount: number;
}

export interface AppState {
  authorization: Authorization;
  textbook: Textbook;
  sprint: SprintState;
}
