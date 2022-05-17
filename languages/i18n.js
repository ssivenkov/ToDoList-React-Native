import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import {NativeModules} from 'react-native';
import english from './english.json';
import russian from './russian.json';

i18next.use(initReactI18next).init({
  lng: NativeModules.I18nManager?.localeIdentifier?.split('_')[0] || 'en',
  resources: {
    en: english,
    ru: russian,
  },
  react: {
    useSuspense: false,
  },
});

export default i18next;
