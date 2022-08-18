export interface User {
  name: string;
  email: string;
  password: string;
}

export interface UserWord {
  difficulty: string;
  optional: Record<string, unknown>;
}

export interface UserStatistic {
  learnedWords: number;
  optional: Record<string, unknown>;
}

export interface UserSetting {
  wordsPerDay: number;
  optional: Record<string, unknown>;
}
