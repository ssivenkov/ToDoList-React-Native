import { SetStateType } from '@root/types/common/types';

export type SendNewTaskButtonPropsType = {
  sendNewTask: (
    setLoading: SetStateType<boolean>,
    setButtonDisabled: SetStateType<boolean>,
  ) => void;
};
