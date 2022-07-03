import React from 'react';

import { COLORS } from '@colors/colors';
import { LongButtonPropsType } from '@components/common/buttons/longButton/type';
import { ICON_SIZE_MEDIUM } from '@constants/constants';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useStyles } from '@root/hooks/useStyles';
import { themeSelector } from '@store/selectors/userSelectors';
import { Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';

import { styles } from './styles';

export const LongButton = (props: LongButtonPropsType) => {
  const { icon, title, onPress, rightComponent, disable } = props;

  const style = useStyles(styles);
  const theme = useSelector(themeSelector);

  const buttonGradient = theme.darkMode
    ? [COLORS.OUTER_SPACE2, COLORS.MINE_SHAFT2]
    : [COLORS.WHITE, COLORS.ALTO3];

  return (
    <LinearGradient colors={buttonGradient}>
      <TouchableOpacity
        disabled={disable}
        onPress={onPress}
        style={style.longButtonContainer}
      >
        <View style={style.contentContainer}>
          <View style={style.icon}>
            <FontAwesomeIcon
              color={theme.TEXT_COLOR}
              icon={icon}
              size={ICON_SIZE_MEDIUM}
            />
          </View>
          <Text style={style.text}>{title}</Text>
        </View>
        {rightComponent && <View>{rightComponent}</View>}
      </TouchableOpacity>
    </LinearGradient>
  );
};
