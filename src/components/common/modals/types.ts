export type ModalTextPropsType = {
  buttonTitle: string;

  children?: any;
  description?: string;
  okHandler?: () => any;
};

export type ModalIconPropsType = {
  buttonIcon: JSX.Element;

  children?: any;
  description?: string;
  okHandler?: () => any;
  okDisable?: boolean;
};
