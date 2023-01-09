import { EN } from '@constants/languages';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import belarusian from './belarusian.json';
import chinese from './chinese.json';
import english from './english.json';
import french from './french.json';
import german from './german.json';
import indonesian from './indonesian.json';
import italian from './italian.json';
import japanese from './japanese.json';
import korean from './korean.json';
import polish from './polish.json';
import portuguese from './portuguese.json';
import russian from './russian.json';
import spanish from './spanish.json';
import turkish from './turkish.json';
import ukrainian from './ukrainian.json';

// eslint-disable-next-line import/no-named-as-default-member
i18next.use(initReactI18next).init({
  lng: EN,
  interpolation: { escapeValue: false },
  resources: {
    by: belarusian,
    cn: chinese,
    de: german,
    en: english,
    es: spanish,
    fr: french,
    id: indonesian,
    it: italian,
    jp: japanese,
    kr: korean,
    pl: polish,
    pt: portuguese,
    ru: russian,
    tr: turkish,
    ua: ukrainian,
  },
  react: {
    useSuspense: false,
  },
});

export default i18next;
