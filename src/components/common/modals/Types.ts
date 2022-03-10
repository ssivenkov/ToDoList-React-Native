import {FontawesomeObject} from '@fortawesome/fontawesome-svg-core';

export type ModalTextPropsType = {
  buttonTitle: string;

  children?: any;
  description?: string;
  okHandler?: () => any;
};

export type ModalIconPropsType = {
  buttonIcon: FontawesomeObject;

  children?: any;
  description?: string;
  okHandler?: () => any;
};
