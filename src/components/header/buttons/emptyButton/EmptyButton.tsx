import React from 'react';

import { COLORS } from '@colors/colors';
import { EmptyButtonPropsType } from '@components/header/buttons/emptyButton/types';
import { headerStyles } from '@components/header/styles';
import { ICON_SIZE_MEDIUM, left } from '@constants/constants';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import 'react-native-get-random-values';
import { useStyles } from '@hooks/useStyles';
import { View } from 'react-native';

export const EmptyButton = (props: EmptyButtonPropsType) => {
  const { side } = props;

  const headerStyle = useStyles(headerStyles);

  const { TRANSPARENT } = COLORS;

  return (
    <View
      style={
        side === left ? headerStyle.leftButtonContainer : headerStyle.rightButtonContainer
      }
    >
      <FontAwesomeIcon color={TRANSPARENT} icon={faArrowLeft} size={ICON_SIZE_MEDIUM} />
    </View>
  );
};
