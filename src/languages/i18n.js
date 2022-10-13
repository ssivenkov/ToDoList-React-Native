import { EN } from '@constants/constants';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import belarusian from './belarusian.json';
import english from './english.json';
import russian from './russian.json';

// eslint-disable-next-line import/no-named-as-default-member
i18next.use(initReactI18next).init({
  lng: EN,
  interpolation: { escapeValue: false },
  resources: {
    en: english,
    ru: russian,
    by: belarusian,
  },
  react: {
    useSuspense: false,
  },
});

export default i18next;
