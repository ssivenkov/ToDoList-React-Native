import React, { useState } from 'react';

import CheckIcon from '@assets/images/icons/check.svg';
import { COLORS } from '@colors/colors';
import { IconButtonWithLoader } from '@components/buttons/iconButtonWithLoader/IconButtonWithLoader';
import 'react-native-get-random-values';
import { headerStyles } from '@components/header/styles';
import { useStyles } from '@hooks/useStyles';
import { SetStateType } from '@root/types/common/types';
import { View } from 'react-native';

import { SendNewTaskButtonPropsType } from './types';

export const SendNewTaskButton = (props: SendNewTaskButtonPropsType) => {
  const { sendNewTask } = props;

  const { WHITE } = COLORS;

  const headerStyle = useStyles(headerStyles);

  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

  const sendNewTaskWrapper = (setIsLoading: SetStateType<boolean>) => {
    sendNewTask(setIsLoading, setButtonDisabled);
  };

  return (
    <IconButtonWithLoader
      disabled={buttonDisabled}
      icon={
        <View style={headerStyle.rightButtonContainer}>
          <CheckIcon fill={WHITE} height={25} width={25} />
        </View>
      }
      okHandler={sendNewTaskWrapper}
    />
  );
};
