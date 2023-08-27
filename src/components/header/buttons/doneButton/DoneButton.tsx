import React, { useState } from 'react';

import { COLORS } from '@colors/colors';
import { IconButtonWithLoader } from '@components/buttons/iconButtonWithLoader/IconButtonWithLoader';
import { DoneButtonPropsType } from '@components/header/buttons/doneButton/types';
import { headerStyles } from '@components/header/styles';
import { ICON_SIZE_HALF_MEDIUM } from '@constants/constants';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import 'react-native-get-random-values';
import { useStyles } from '@hooks/useStyles';
import { SetStateType } from '@root/types/common/types';
import { View } from 'react-native';

export const DoneButton = (props: DoneButtonPropsType) => {
  const { onPress } = props;

  const headerStyle = useStyles(headerStyles);

  const { WHITE } = COLORS;

  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

  const onDonePress = (setIsLoading: SetStateType<boolean>) => {
    onPress(setIsLoading, setButtonDisabled);
  };

  return (
    <IconButtonWithLoader
      disabled={buttonDisabled}
      icon={
        <View style={headerStyle.rightButtonContainer}>
          <FontAwesomeIcon color={WHITE} icon={faCheck} size={ICON_SIZE_HALF_MEDIUM} />
        </View>
      }
      okHandler={onDonePress}
    />
  );
};
