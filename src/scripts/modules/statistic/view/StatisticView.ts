import ElementTemplate from '../../../common/ElementTemplate';
import { ShortGamesStat, ShortWordsStat } from '../ShortStat.model';
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

  private lightCoral = '#F08080';

  private lightGreen = '#90EE90';

  private lightBlue = '#ADD8E6';

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
}
