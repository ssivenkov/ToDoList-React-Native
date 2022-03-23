export type ModalTextPropsType = {
  buttonTitle: string;

  children?: any;
  description?: string;
  okHandler?: () => void;
};

export type ModalIconPropsType = {
  buttonIcon: JSX.Element;

  children?: any;
  description?: string;
  okHandler?: () => void;
  okDisable?: boolean;
  closeHandler?: () => void;
};
