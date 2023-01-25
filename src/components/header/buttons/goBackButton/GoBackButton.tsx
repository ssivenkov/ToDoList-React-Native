import React from 'react';

import { COLORS } from '@colors/colors';
import { IconButton } from '@components/buttons/iconButton/IconButton';
import { headerStyles } from '@components/header/styles';
import { ICON_SIZE_HALF_MEDIUM } from '@constants/constants';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import 'react-native-get-random-values';
import { useStyles } from '@hooks/useStyles';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';

export const GoBackButton = () => {
  const navigation = useNavigation();

  const headerStyle = useStyles(headerStyles);

  const { WHITE } = COLORS;

  return (
    <IconButton
      icon={
        <View style={headerStyle.leftButtonContainer}>
          <FontAwesomeIcon
            color={WHITE}
            icon={faArrowLeft}
            size={ICON_SIZE_HALF_MEDIUM}
          />
        </View>
      }
      onPress={navigation.goBack}
    />
  );
};
