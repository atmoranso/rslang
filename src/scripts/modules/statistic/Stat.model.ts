interface ShortGameStat {
  newWords: number;
  correctPercent: number;
  correctChain: number;
}

export interface ShortGamesStat {
  date: string;
  sprint: ShortGameStat;
  audioCall: ShortGameStat;
}

export interface ShortWordsStat {
  date: string;
  newWords: number;
  learnedWords: number;
  correctPercent: number;
}

export interface LongStat {
  [date: string]: {
    newWords: number;
    learnedWords: number;
  };
}
