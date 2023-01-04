import { SetStateType } from '@root/types/common/types';

export type IconButtonWithLoaderPropsType = {
  icon: JSX.Element;
  okHandler: (setIsLoading: SetStateType<boolean>) => void;

  disabled?: boolean;
};
