import ElementTemplate from '../../../common/ElementTemplate';
import Word from '../../../common/api/models/Word.model';
import DataAPI from '../../../common/api/DataAPI';
import UserWordExt from '../../../common/api/models/UserWordExt.model';
import YesNo from '../../../common/enums';
import { AppState } from '../../../common/stateTypes';
import UserWord from '../../../common/api/models/UserWord.model';
import WordStatistic from './WordStatisticView';
import GamesStatistic from '../../../common/api/models/GamesStatistic.model';
import GameStatistic from '../../../common/api/models/GameStatistic.model';

export default class CardView extends ElementTemplate {
  private audio: HTMLAudioElement | undefined = undefined;

  private audioMeaning: HTMLAudioElement | undefined = undefined;

  private audioExample: HTMLAudioElement | undefined = undefined;

  private audioSrcs: Record<string, string>;

  private isAudioInit = false;

  private wordId = '';

  private userWordId = '';

  public isDifficult = false;

  public isLearned = false;

  private difficultButton: ElementTemplate<HTMLButtonElement>;

  private learnedButton: ElementTemplate<HTMLButtonElement>;

  private difficultButtonAction: ElementTemplate;

  private learnedButtonAction: ElementTemplate;

  private isRemoveAble = false;

  private learnedDate = 0;

  private state: AppState;

  private gamesStatistic: GamesStatistic;

  private setNewSpeaker: (newSpeaker: CardView) => void;

  private onChangeUserWord: () => void;

  constructor(
    parentNode: HTMLElement,
    data: Word,
    baseURL: string,
    isRemoveAble: boolean,
    initUserWordData: UserWordExt | undefined,
    state: AppState,
    setNewSpeaker: (newSpeaker: CardView) => void,
    onChangeUserWord: () => void,
  ) {
    super(parentNode, 'div', 'card');
    this.state = state;
    this.setNewSpeaker = setNewSpeaker;
    this.onChangeUserWord = onChangeUserWord;
    this.audioSrcs = {
      audio: `${baseURL}${data.audio}`,
      audioMeaning: `${baseURL}${data.audioMeaning}`,
      audioExample: `${baseURL}${data.audioExample}`,
    };
    this.isRemoveAble = isRemoveAble;
    this.wordId = data.id;
    const gameStatistic: GameStatistic = { correct: 0, wrong: 0, correctChain: 0, lastUpdate: 0 };
    this.gamesStatistic = { wasInGames: false, sprint: gameStatistic, audioCall: gameStatistic };
    if (initUserWordData) {
      this.userWordId = initUserWordData.id;
      if (initUserWordData.optional.gamesStatistic) {
        this.gamesStatistic = initUserWordData.optional.gamesStatistic;
      }
    }
    const image = new ElementTemplate(this.node, 'div', 'card__image');
    image.node.style.backgroundImage = `url(${baseURL}${data.image})`;
    const cardWrapper = new ElementTemplate(this.node, 'div', 'card__wrapper');
    new ElementTemplate(cardWrapper.node, 'span', 'card__word', data.word);
    const listenWrapper = new ElementTemplate(cardWrapper.node, 'div', 'card__listen-wrapper');
    const listenButton = new ElementTemplate(listenWrapper.node, 'button', 'card__listen-button');
    new ElementTemplate(listenWrapper.node, 'span', 'card__transcription', data.transcription);
    new ElementTemplate(cardWrapper.node, 'span', 'card__word-translate', data.wordTranslate);
    new ElementTemplate(cardWrapper.node, 'p', 'card__text-meaning', data.textMeaning);
    new ElementTemplate(cardWrapper.node, 'p', 'card__text-meaning-translate', data.textMeaningTranslate);
    new ElementTemplate(cardWrapper.node, 'p', 'card__text-example', data.textExample);
    new ElementTemplate(cardWrapper.node, 'p', 'card__text-example-translate', data.textExampleTranslate);
    const buttonsWrapper = new ElementTemplate(cardWrapper.node, 'div', 'card__buttons-wrapper');
    this.difficultButton = new ElementTemplate(buttonsWrapper.node, 'button', 'card__difficult-button');
    this.difficultButton.node.title = 'добавить в раздел "Сложные слова"';
    this.difficultButtonAction = new ElementTemplate(this.difficultButton.node, 'div', 'card__difficult-button-plus');
    this.learnedButton = new ElementTemplate(buttonsWrapper.node, 'button', 'card__learned-button');
    this.learnedButton.node.title = 'слово изучено';
    this.learnedButtonAction = new ElementTemplate(this.learnedButton.node, 'div', 'card__learned-button-plus');
    const statisticButton = new ElementTemplate(buttonsWrapper.node, 'button', 'card__statistic-button');
    statisticButton.node.title = 'посмотреть статистику';

    if (!this.state.authorization.isAuth) {
      this.difficultButton.node.hidden = true;
      this.difficultButtonAction.node.hidden = true;
      this.learnedButton.node.hidden = true;
      this.learnedButtonAction.node.hidden = true;
      statisticButton.node.hidden = true;
    } else {
      this.initUserWord(initUserWordData);
    }
    this.difficultButton.node.addEventListener('click', this.difficultButtonOnClick);
    this.learnedButton.node.addEventListener('click', this.learnedButtonOnClick);
    listenButton.node.addEventListener('click', this.listenButtonOnClick);
    statisticButton.node.addEventListener('click', () => {
      new WordStatistic(this.node, this.gamesStatistic);
    });
  }

  private correctChainZeroing = () => {
    this.gamesStatistic.sprint.correctChain = 0;
    this.gamesStatistic.audioCall.correctChain = 0;
  };

  private difficultButtonOnClick = async () => {
    this.difficultButton.node.disabled = true;
    this.learnedButton.node.disabled = true;
    const token = this.state.authorization.token;
    const userId = this.state.authorization.userId;
    const userWord: UserWord = {
      difficulty: YesNo.yes,
      optional: { learned: YesNo.no, learnedDate: 0, gamesStatistic: this.gamesStatistic },
    };
    this.isDifficult = !this.isDifficult;
    if (this.isDifficult) {
      this.correctChainZeroing();
      if (this.userWordId) {
        await DataAPI.updateUserWord(token, userId, this.wordId, userWord);
      } else {
        const data = await DataAPI.createUserWord(token, userId, this.wordId, userWord);
        this.userWordId = data.id;
      }
      this.isLearned = false;
      this.changelearnedStyle();
    } else {
      userWord.difficulty = YesNo.no;
      await DataAPI.updateUserWord(token, userId, this.wordId, userWord);
    }
    this.changeDifficultStyle();
    this.onChangeUserWord();
    this.difficultButton.node.disabled = false;
    this.learnedButton.node.disabled = false;
  };

  private changeDifficultStyle = () => {
    if (this.isDifficult) {
      this.difficultButtonAction.node.classList.add('card__difficult-button-plus_remove');
    } else {
      this.difficultButtonAction.node.classList.remove('card__difficult-button-plus_remove');
    }
    if (this.isRemoveAble && !this.isDifficult) {
      super.delete();
    }
  };

  private learnedButtonOnClick = async () => {
    this.difficultButton.node.disabled = true;
    this.learnedButton.node.disabled = true;
    const token = this.state.authorization.token;
    const userId = this.state.authorization.userId;
    const userWord: UserWord = {
      difficulty: YesNo.no,
      optional: { learned: YesNo.yes, learnedDate: Date.now(), gamesStatistic: this.gamesStatistic },
    };
    this.isLearned = !this.isLearned;
    if (this.isLearned) {
      if (this.userWordId) {
        await DataAPI.updateUserWord(token, userId, this.wordId, userWord);
      } else {
        const data = await DataAPI.createUserWord(token, userId, this.wordId, userWord);
        this.userWordId = data.id;
      }
      this.isDifficult = false;
      this.changeDifficultStyle();
    } else {
      this.correctChainZeroing();
      userWord.optional.learned = YesNo.no;
      userWord.optional.learnedDate = 0;
      await DataAPI.updateUserWord(token, userId, this.wordId, userWord);
    }
    this.changelearnedStyle();
    this.onChangeUserWord();
    this.difficultButton.node.disabled = false;
    this.learnedButton.node.disabled = false;
  };

  private changelearnedStyle = () => {
    if (this.isLearned) {
      this.learnedButtonAction.node.classList.add('card__learned-button-plus_remove');
    } else {
      this.learnedButtonAction.node.classList.remove('card__learned-button-plus_remove');
    }
  };

  private listenButtonOnClick = () => {
    this.setNewSpeaker(this);
    if (!this.isAudioInit) {
      this.isAudioInit = true;
      this.initSpeech();
    }
    this.loadSpeech();
    this.playSpeech();
  };

  private initUserWord = async (initUserWordData: UserWordExt | undefined) => {
    if (initUserWordData) {
      this.isDifficult = initUserWordData.difficulty === YesNo.yes;
      this.isLearned = initUserWordData.optional.learned === YesNo.yes;
      this.changeDifficultStyle();
      this.changelearnedStyle();
    }
  };

  private initSpeech = () => {
    this.audio = new Audio(this.audioSrcs.audio);
    this.audioMeaning = new Audio(this.audioSrcs.audioMeaning);
    this.audioExample = new Audio(this.audioSrcs.audioExample);
  };

  private loadSpeech = () => {
    this.audio?.load();
    this.audioMeaning?.load();
    this.audioExample?.load();
  };

  private playSpeech = () => {
    this.audio?.play();
    this.audio?.addEventListener('ended', () => {
      this.audioMeaning?.play();
      this.audioMeaning?.addEventListener('ended', () => {
        this.audioExample?.play();
        this.audioExample?.addEventListener('ended', () => {
          this.audioExample?.pause();
        });
      });
    });
  };

  public pauseSpeech = () => {
    this.audio?.pause();
    this.audioMeaning?.pause();
    this.audioExample?.pause();
  };
}
