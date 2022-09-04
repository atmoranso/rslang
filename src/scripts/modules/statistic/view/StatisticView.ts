import ElementTemplate from '../../../common/ElementTemplate';
import ShortGamesStat from '../ShortGamesStat.model';
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

  constructor(parentNode: HTMLElement | null) {
    super(parentNode, 'section', 'statistic');
    const shortGamesStatBlock = new ElementTemplate(this.node, 'div', 'short-games-stat');
    const shortGamesStatCanvas: ElementTemplate<HTMLCanvasElement> = new ElementTemplate(
      shortGamesStatBlock.node,
      'canvas',
    );
    this.shortGamesStatCtx = shortGamesStatCanvas.node.getContext('2d');
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
          backgroundColor: '#F08080',
        },
        {
          label: 'Процент правильных ответов',
          data: [gameData.sprint.correctPercent, gameData.audioCall.correctPercent],
          backgroundColor: '#90EE90',
        },
        {
          label: 'Серия правильных ответов',
          data: [gameData.sprint.correctChain, gameData.audioCall.correctChain],
          backgroundColor: '#ADD8E6',
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
}
