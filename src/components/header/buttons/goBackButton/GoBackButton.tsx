import React from 'react';

import { COLORS } from '@colors/colors';
import { commonButtonStyles } from '@components/buttons/commonButtonStyles';
import { IconButton } from '@components/buttons/iconButton/IconButton';
import { ICON_SIZE_MEDIUM } from '@constants/constants';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import 'react-native-get-random-values';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';

export const GoBackButton = () => {
  const navigation = useNavigation();

  const { WHITE } = COLORS;

  return (
    <IconButton
      icon={
        <View style={commonButtonStyles.buttonContainer}>
          <FontAwesomeIcon color={WHITE} icon={faArrowLeft} size={ICON_SIZE_MEDIUM} />
        </View>
      }
      onPress={navigation.goBack}
    />
  );
};
