import User from './models/User.model';
import UserWord from './models/UserWord.model';
import UserStatistic from './models/UserStatistic.model';
import UserSetting from './models/UserSetting.model';

export default class DataAPI {
  public static baseURL = 'https://dt-learnwords-app.herokuapp.com/';

  private static paths = {
    words: 'words',
    users: 'users',
    tokens: 'tokens',
    aggregatedWords: 'aggregatedWords',
    statistics: 'statistics',
    settings: 'settings',
    signin: 'signin',
  };

  private static contentType = { 'Content-Type': 'application/json;charset=utf-8' };

  private static tokenPrefix = 'Bearer';

  private static async getResponseToRequest(params: string, options = {}) {
    const response = await fetch(`${this.baseURL}${params}`, options);
    if (response.ok && response.status !== 204) {
      const json = await response.json();
      return json;
    }
    return { status: response.status, statusText: response.statusText };
  }

  public static async getChunkOfWords(group = 0, page = 0) {
    const params = `${this.paths.words}?group=${group}&page=${page}`;
    return this.getResponseToRequest(params);
  }

  public static async getWord(wordId: string) {
    const params = `${this.paths.words}/${wordId}`;
    return this.getResponseToRequest(params);
  }

  public static async createUser(user: User) {
    const params = `${this.paths.users}`;
    const options = {
      method: 'POST',
      headers: this.contentType,
      body: JSON.stringify(user),
    };
    return this.getResponseToRequest(params, options);
  }

  public static async getUser(token: string, userId: string) {
    const params = `${this.paths.users}/${userId}`;
    const options = {
      headers: { Authorization: `${this.tokenPrefix} ${token}` },
    };
    return this.getResponseToRequest(params, options);
  }

  public static async updateUser(token: string, userId: string, user: Pick<User, 'email' | 'password'>) {
    const params = `${this.paths.users}/${userId}`;
    const options = {
      method: 'PUT',
      headers: Object.assign({}, { Authorization: `${this.tokenPrefix} ${token}` }, this.contentType),
      body: JSON.stringify(user),
    };
    return this.getResponseToRequest(params, options);
  }

  public static async deleteUser(token: string, userId: string) {
    const params = `${this.paths.users}/${userId}`;
    const options = {
      method: 'DELETE',
      headers: { Authorization: `${this.tokenPrefix} ${token}` },
    };
    return this.getResponseToRequest(params, options);
  }

  public static async getNewToken(refreshToken: string, userId: string) {
    const params = `${this.paths.users}/${userId}/${this.paths.tokens}`;
    const options = {
      headers: { Authorization: `${this.tokenPrefix} ${refreshToken}` },
    };
    return this.getResponseToRequest(params, options);
  }

  public static async getUserWords(token: string, userId: string) {
    const params = `${this.paths.users}/${userId}/${this.paths.words}`;
    const options = {
      headers: { Authorization: `${this.tokenPrefix} ${token}` },
    };
    return this.getResponseToRequest(params, options);
  }

  public static async createUserWord(token: string, userId: string, wordId: string, userWord: UserWord) {
    const params = `${this.paths.users}/${userId}/${this.paths.words}/${wordId}`;
    const options = {
      method: 'POST',
      headers: Object.assign({}, { Authorization: `${this.tokenPrefix} ${token}` }, this.contentType),
      body: JSON.stringify(userWord),
    };
    return this.getResponseToRequest(params, options);
  }

  public static async getUserWord(token: string, userId: string, wordId: string) {
    const params = `${this.paths.users}/${userId}/${this.paths.words}/${wordId}`;
    const options = {
      headers: { Authorization: `${this.tokenPrefix} ${token}` },
    };
    return this.getResponseToRequest(params, options);
  }

  public static async updateUserWord(token: string, userId: string, wordId: string, userWord: UserWord) {
    const params = `${this.paths.users}/${userId}/${this.paths.words}/${wordId}`;
    const options = {
      method: 'PUT',
      headers: Object.assign({}, { Authorization: `${this.tokenPrefix} ${token}` }, this.contentType),
      body: JSON.stringify(userWord),
    };
    return this.getResponseToRequest(params, options);
  }

  public static async deleteUserWord(token: string, userId: string, wordId: string) {
    const params = `${this.paths.users}/${userId}/${this.paths.words}/${wordId}`;
    const options = {
      method: 'DELETE',
      headers: { Authorization: `${this.tokenPrefix} ${token}` },
    };
    return this.getResponseToRequest(params, options);
  }

  public static async getAggregatedUserWords(token: string, userId: string, group = 0, page = 0, wordsPerPage = 0) {
    // TODO: Make filtering if needed.
    const params = `${this.paths.users}/${userId}/${this.paths.aggregatedWords}?group=${group}&page=${page}&wordsPerPage=${wordsPerPage}`;
    const options = {
      headers: { Authorization: `${this.tokenPrefix} ${token}` },
    };
    return this.getResponseToRequest(params, options);
  }

  public static async getAggregatedUserWord(token: string, userId: string, wordId: string) {
    const params = `${this.paths.users}/${userId}/${this.paths.aggregatedWords}/${wordId}`;
    const options = {
      headers: { Authorization: `${this.tokenPrefix} ${token}` },
    };
    return this.getResponseToRequest(params, options);
  }

  public static async getUserStatistic(token: string, userId: string) {
    const params = `${this.paths.users}/${userId}/${this.paths.statistics}`;
    const options = {
      headers: { Authorization: `${this.tokenPrefix} ${token}` },
    };
    return this.getResponseToRequest(params, options);
  }

  public static async updateUserStatistic(token: string, userId: string, userStatistic: UserStatistic) {
    const params = `${this.paths.users}/${userId}/${this.paths.statistics}`;
    const options = {
      method: 'PUT',
      headers: Object.assign({}, { Authorization: `${this.tokenPrefix} ${token}` }, this.contentType),
      body: JSON.stringify(userStatistic),
    };
    return this.getResponseToRequest(params, options);
  }

  public static async getUserSetting(token: string, userId: string) {
    const params = `${this.paths.users}/${userId}/${this.paths.settings}`;
    const options = {
      headers: { Authorization: `${this.tokenPrefix} ${token}` },
    };
    return this.getResponseToRequest(params, options);
  }

  public static async updateUserSetting(token: string, userId: string, userSetting: UserSetting) {
    const params = `${this.paths.users}/${userId}/${this.paths.settings}`;
    const options = {
      method: 'PUT',
      headers: Object.assign({}, { Authorization: `${this.tokenPrefix} ${token}` }, this.contentType),
      body: JSON.stringify(userSetting),
    };
    return this.getResponseToRequest(params, options);
  }

  public static async signIn(user: Pick<User, 'email' | 'password'>) {
    const params = `${this.paths.signin}`;
    const options = {
      method: 'POST',
      headers: this.contentType,
      body: JSON.stringify(user),
    };
    return this.getResponseToRequest(params, options);
  }
}
