import * as Localization from 'expo-localization';
import i18n from 'i18n-js';


const en = {
  yonmoque: 'Yonmoque',
  withAi: 'Play with AI',
  multiplayer: 'Multiplayer',
  howto: 'How to Play',
  chooseColor: 'Choose your color!',
  blue: 'Blue',
  white: 'White',
  or: 'or',
  lobby: 'Lobby',
  createRoom: 'Create Room',
  waiting: 'Waiting...',
  multiplayerMode: 'Choose mode',
  samePhone: 'Offline',
  internet: 'Online',
  howToPlay: 'How to Play',
  loginTitle: 'Login your Account',
  login: 'Login',
  register: 'Register',
  username: 'Username',
  password: 'Password',
  userNotFound: 'User not found',
  usernameMissing: 'Username is required',
  passwordMissing: 'Password is required',
  wrongUsername: 'No account with this username',
  wrongPassword: 'Invalid password',
  usernameTooLong: 'Username exceeds 16 characters',
  passwordsNotMatching: 'Passwords do not match',
  takenUsername: 'Username is already taken',
  notAllowed: 'You are not allowed to perform this action',
  authenticationFailed: 'Failed to authenticate token',
  player: 'Player'
};

const ja = {
  yonmoque: 'ヨンモク',
  withAi: 'AIゲーム',
  multiplayer: '対人ゲーム',
  howto: '遊び方',
  chooseColor: '色を選択してください',
  blue: '青',
  white: '白',
  or: 'か',
  lobby: 'ロビー',
  createRoom: 'ルーム作成',
  waiting: '他のプレイヤーを待っている',
  multiplayerMode: 'どこで遊びますか',
  samePhone: '当携帯',
  internet: 'オンライン上',
  howToPlay: '遊び方',
  loginTitle: 'アカウントにログイン',
  login: 'ログイン',
  register: '登録',
  username: 'ユーザー名',
  password: 'パスワード',
  userNotFound: 'ユーザーが見つけられません。',
  usernameMissing: 'ユーザー名が指定されていません。',
  passwordMissing: 'パスワードが定義されていません。',
  wrongUsername: '当ユーザー名が付けてあるアカウントがありません。',
  wrongPassword: 'パスワードが正しくありません。',
  usernameTooLong: 'ユーザー名が16文字を超えています。',
  passwordsNotMatching: 'パスワードが一致しません。',
  takenUsername: 'ユーザー名は既に使われています。',
  notAllowed: 'あなたはこれを行うことはできません。',
  authenticationFailed: 'トークンの認証に失敗しました。',
  player: 'プレイヤー'
};

i18n.fallbacks = true;
i18n.default_locale = 'en';
i18n.translations = { ja, en };
i18n.locale = Localization.locale;

export default i18n;
