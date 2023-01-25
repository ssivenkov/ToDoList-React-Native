import React from 'react';

import { ICON_SIZE_MEDIUM } from '@constants/constants';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useStyles } from '@hooks/useStyles';
import { themeSelector } from '@store/selectors/userSelectors';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

import { longButtonStyles } from './styles';
import { LongButtonPropsType } from './type';

export const LongButton = (props: LongButtonPropsType) => {
  const { icon, title, onPress, rightComponent, disabled } = props;

  const styles = useStyles(longButtonStyles);

  const theme = useSelector(themeSelector);

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={styles.longButtonContainer}
    >
      <View style={styles.contentContainer}>
        <View style={styles.icon}>
          {typeof icon === 'string' ? (
            <Text style={styles.stringIcon}>{icon}</Text>
          ) : (
            <FontAwesomeIcon
              color={theme.TEXT_COLOR}
              icon={icon}
              size={ICON_SIZE_MEDIUM}
            />
          )}
        </View>
        <Text style={styles.text}>{title}</Text>
        {rightComponent && <View style={styles.rightComponent}>{rightComponent}</View>}
      </View>
    </TouchableOpacity>
  );
};
