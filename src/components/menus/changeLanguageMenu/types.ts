import { LanguageType } from '@store/reducers/userReducer/types';

export type ChangeLanguageMenuPropsType = {
  changeLanguage: (language: LanguageType) => void;

  modalCloseHandler?: () => void;
};
