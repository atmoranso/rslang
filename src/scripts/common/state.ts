export default {
  isAuth: localStorage.getItem('user') ? JSON.parse(<string>localStorage.getItem('user')).isAuth : false,
  name: localStorage.getItem('user') ? JSON.parse(<string>localStorage.getItem('user')).name : '',
  token: localStorage.getItem('user') ? JSON.parse(<string>localStorage.getItem('user')).token : '',
  refreshToken: localStorage.getItem('user') ? JSON.parse(<string>localStorage.getItem('user')).refreshToken : '',
  userId: localStorage.getItem('user') ? JSON.parse(<string>localStorage.getItem('user')).userId : '',
  data: new Date(),
};
