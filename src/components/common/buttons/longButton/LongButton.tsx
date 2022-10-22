import React from 'react';

import { LongButtonPropsType } from '@components/common/buttons/longButton/type';
import { ICON_SIZE_MEDIUM } from '@constants/constants';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useStyles } from '@root/hooks/useStyles';
import { themeSelector } from '@store/selectors/userSelectors';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

import { styles } from './styles';

export const LongButton = (props: LongButtonPropsType) => {
  const { icon, title, onPress, rightComponent, disable } = props;

  const style = useStyles(styles);
  const theme = useSelector(themeSelector);

  return (
    <TouchableOpacity
      disabled={disable}
      onPress={onPress}
      style={style.longButtonContainer}
    >
      <View style={style.contentContainer}>
        <View style={style.icon}>
          {typeof icon === 'string' ? (
            <Text style={style.stringIcon}>{icon}</Text>
          ) : (
            <FontAwesomeIcon
              color={theme.TEXT_COLOR}
              icon={icon}
              size={ICON_SIZE_MEDIUM}
            />
          )}
        </View>
        <Text style={style.text}>{title}</Text>
      </View>
      {rightComponent && <View>{rightComponent}</View>}
    </TouchableOpacity>
  );
};
