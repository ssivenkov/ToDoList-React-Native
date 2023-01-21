import React from 'react';

import { COLORS } from '@colors/colors';
import { commonButtonStyles } from '@components/buttons/commonButtonStyles';
import { ICON_SIZE_MEDIUM } from '@constants/constants';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import 'react-native-get-random-values';
import { View } from 'react-native';

export const EmptyButton = () => {
  const { TRANSPARENT } = COLORS;

  return (
    <View style={commonButtonStyles.buttonContainer}>
      <FontAwesomeIcon color={TRANSPARENT} icon={faArrowLeft} size={ICON_SIZE_MEDIUM} />
    </View>
  );
};
