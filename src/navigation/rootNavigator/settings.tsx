import React from 'react';

import { ICON_SIZE_HALF_MEDIUM } from '@constants/constants';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { ExtraScreenSettingsType } from '@navigation/rootNavigator/types';
import { View } from 'react-native';

export const commonExtraScreenSettings: ExtraScreenSettingsType = (params) => {
  const { style } = params;

  return {
    headerShown: true,
    headerTitleAlign: 'center',
    headerLeft: () => (
      <View style={style.buttonContainer}>
        <FontAwesomeIcon
          icon={faArrowLeft}
          size={ICON_SIZE_HALF_MEDIUM}
          style={style.tabIcon}
        />
      </View>
    ),
  };
};
