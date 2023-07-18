import { SetStateType } from '@root/types/common/types';

export type DoneButtonPropsType = {
  onPress: (
    setLoading: SetStateType<boolean>,
    setButtonDisabled: SetStateType<boolean>,
  ) => void;
};
