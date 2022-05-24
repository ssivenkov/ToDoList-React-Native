import {EN} from '@constants/constants';
import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import english from './english.json';
import russian from './russian.json';

i18next.use(initReactI18next).init({
  lng: EN,
  resources: {
    en: english,
    ru: russian,
  },
  react: {
    useSuspense: false,
  },
});

export default i18next;
