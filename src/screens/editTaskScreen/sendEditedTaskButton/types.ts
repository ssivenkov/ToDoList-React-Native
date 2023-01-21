import { SetStateType } from '@root/types/common/types';

export type SendEditedTaskButtonPropsType = {
  sendEditedTask: (
    setLoading: SetStateType<boolean>,
    setButtonDisabled: SetStateType<boolean>,
  ) => void;
};
