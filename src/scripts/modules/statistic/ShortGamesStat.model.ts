interface ShortGameStat {
  newWords: number;
  correctPercent: number;
  correctChain: number;
}

interface ShortGamesStat {
  date: string;
  sprint: ShortGameStat;
  audioCall: ShortGameStat;
}

export default ShortGamesStat;
