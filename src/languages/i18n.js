import { EN } from '@constants/constants';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import belarusian from './belarusian.json';
import english from './english.json';
import french from './french.json';
import german from './german.json';
import indonesian from './indonesian.json';
import italian from './italian.json';
import russian from './russian.json';
import spanish from './spanish.json';
import turkish from './turkish.json';

// eslint-disable-next-line import/no-named-as-default-member
i18next.use(initReactI18next).init({
  lng: EN,
  interpolation: { escapeValue: false },
  resources: {
    by: belarusian,
    de: german,
    en: english,
    es: spanish,
    fr: french,
    id: indonesian,
    it: italian,
    ru: russian,
    tr: turkish,
  },
  react: {
    useSuspense: false,
  },
});

export default i18next;
