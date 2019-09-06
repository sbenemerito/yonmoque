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
};

i18n.fallbacks = true;
i18n.default_locale = 'en';
i18n.translations = { ja, en };
i18n.locale = Localization.locale;

export default i18n;