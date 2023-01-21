import React, { useState } from 'react';

import CheckIcon from '@assets/images/icons/check.svg';
import { COLORS } from '@colors/colors';
import { commonButtonStyles } from '@components/buttons/commonButtonStyles';
import { IconButtonWithLoader } from '@components/buttons/iconButtonWithLoader/IconButtonWithLoader';
import 'react-native-get-random-values';
import { SetStateType } from '@root/types/common/types';
import { View } from 'react-native';

import { SendEditedTaskButtonPropsType } from './types';

export const SendEditedTaskButton = (props: SendEditedTaskButtonPropsType) => {
  const { sendEditedTask } = props;

  const { WHITE } = COLORS;

  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

  const sendEditedTaskWrapper = (setIsLoading: SetStateType<boolean>) => {
    sendEditedTask(setIsLoading, setButtonDisabled);
  };

  return (
    <IconButtonWithLoader
      disabled={buttonDisabled}
      icon={
        <View style={commonButtonStyles.buttonContainer}>
          <CheckIcon fill={WHITE} height={25} width={25} />
        </View>
      }
      okHandler={sendEditedTaskWrapper}
    />
  );
};
