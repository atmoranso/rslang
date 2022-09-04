import ElementTemplate from '../../../common/ElementTemplate';
import { ShortGamesStat, ShortWordsStat, LongStat } from '../Stat.model';
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle,
} from 'chart.js';

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle,
);

export default class StatisticView extends ElementTemplate {
  private shortGamesStatCtx: CanvasRenderingContext2D | null;

  private shortWordsStatCtx: CanvasRenderingContext2D | null;

  private longNewWordsStatCtx: CanvasRenderingContext2D | null;

  private longLearnedWordsStatCtx: CanvasRenderingContext2D | null;

  private lightCoral = '#F08080';

  private lightGreen = '#90EE90';

  private lightBlue = '#ADD8E6';

  private lightSalmon = '#FFA07A';

  private lightSeaGreen = '#20B2AA';

  constructor(parentNode: HTMLElement | null) {
    super(parentNode, 'section', 'statistic');
    const shortGamesStatBlock = new ElementTemplate(this.node, 'div', 'short-games-stat');
    const shortGamesStatCanvas: ElementTemplate<HTMLCanvasElement> = new ElementTemplate(
      shortGamesStatBlock.node,
      'canvas',
    );
    this.shortGamesStatCtx = shortGamesStatCanvas.node.getContext('2d');
    const shortWordsStatBlock = new ElementTemplate(this.node, 'div', 'short-words-stat');
    const shortWordsStatCanvas: ElementTemplate<HTMLCanvasElement> = new ElementTemplate(
      shortWordsStatBlock.node,
      'canvas',
    );
    this.shortWordsStatCtx = shortWordsStatCanvas.node.getContext('2d');
    const longNewWordsStatBlock = new ElementTemplate(this.node, 'div', 'long-new-words-stat');
    const longNewWordsStatCanvas: ElementTemplate<HTMLCanvasElement> = new ElementTemplate(
      longNewWordsStatBlock.node,
      'canvas',
    );
    this.longNewWordsStatCtx = longNewWordsStatCanvas.node.getContext('2d');
    const longLearnedWordsStatBlock = new ElementTemplate(this.node, 'div', 'long-learned-words-stat');
    const longLearnedWordsStatCanvas: ElementTemplate<HTMLCanvasElement> = new ElementTemplate(
      longLearnedWordsStatBlock.node,
      'canvas',
    );
    this.longLearnedWordsStatCtx = longLearnedWordsStatCanvas.node.getContext('2d');
  }

  public renderShortGamesStat = (gameData: ShortGamesStat) => {
    if (this.shortGamesStatCtx === null) {
      return;
    }
    const data = {
      labels: ['Спринт', 'Аудиовызов'],
      datasets: [
        {
          label: 'Количество новых слов',
          data: [gameData.sprint.newWords, gameData.audioCall.newWords],
          backgroundColor: this.lightCoral,
        },
        {
          label: 'Процент правильных ответов',
          data: [gameData.sprint.correctPercent, gameData.audioCall.correctPercent],
          backgroundColor: this.lightGreen,
        },
        {
          label: 'Серия правильных ответов',
          data: [gameData.sprint.correctChain, gameData.audioCall.correctChain],
          backgroundColor: this.lightBlue,
        },
      ],
    };
    new Chart(this.shortGamesStatCtx, {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
          title: {
            display: true,
            text: `Статистика по играм на ${gameData.date}`,
          },
        },
      },
    });
  };

  public renderShortWordsStat = (gameData: ShortWordsStat) => {
    if (this.shortWordsStatCtx === null) {
      return;
    }
    const data = {
      labels: [''],
      datasets: [
        {
          label: 'Количество новых слов',
          data: [gameData.newWords],
          backgroundColor: this.lightCoral,
        },
        {
          label: 'Процент правильных ответов',
          data: [gameData.correctPercent],
          backgroundColor: this.lightGreen,
        },
        {
          label: 'Количество изученных слов',
          data: [gameData.learnedWords],
          backgroundColor: this.lightBlue,
        },
      ],
    };
    new Chart(this.shortWordsStatCtx, {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
          title: {
            display: true,
            text: `Статистика по словам на ${gameData.date}`,
          },
        },
      },
    });
  };

  public renderLongNewWords = (wordsData: LongStat) => {
    if (this.longNewWordsStatCtx === null) {
      return;
    }
    const dataArr = Object.values(wordsData).map((el) => el.newWords);
    const data = {
      labels: Object.keys(wordsData),
      datasets: [
        {
          label: '',
          data: dataArr,
          borderColor: this.lightSalmon,
          backgroundColor: this.lightSalmon,
        },
      ],
    };
    new Chart(this.longNewWordsStatCtx, {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: 'Количество новых слов за каждый день',
          },
        },
      },
    });
  };

  public renderLongLearnedWords = (wordsData: LongStat) => {
    if (this.longLearnedWordsStatCtx === null) {
      return;
    }
    let sum = 0;
    const dataArr = Object.values(wordsData).map((el) => {
      sum += el.learnedWords;
      return sum;
    });
    const data = {
      labels: Object.keys(wordsData),
      datasets: [
        {
          label: '',
          data: dataArr,
          borderColor: this.lightSeaGreen,
          backgroundColor: this.lightSeaGreen,
        },
      ],
    };
    new Chart(this.longLearnedWordsStatCtx, {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: 'Количество изученных слов за весь период',
          },
        },
      },
    });
  };
}
