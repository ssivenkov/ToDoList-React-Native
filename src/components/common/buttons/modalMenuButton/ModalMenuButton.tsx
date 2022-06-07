import {COLORS} from '@colors/colors';
import {ModalMenuButtonPropsType} from '@components/common/buttons/modalMenuButton/type';
import {useStyles} from '@root/hooks/useStyles';
import {themeSelector} from '@store/selectors/userSelectors';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import {styles} from './styles';

export const ModalMenuButton = (props: ModalMenuButtonPropsType) => {
  const {title, onPress, disable, rightRounding, leftRounding} = props;

  const style = useStyles(styles);
  const theme = useSelector(themeSelector);

  const buttonStyle = [
    {flex: 1},
    disable && style.modalMenuButtonDisable,
    leftRounding && style.leftBorderRadius,
    rightRounding && style.rightBorderRadius,
  ];

  const buttonGradient = theme.darkMode
    ? [COLORS.OUTER_SPACE1, COLORS.MINE_SHAFT2]
    : [COLORS.WHITE, COLORS.DUSTY_GRAY];

  return (
    <LinearGradient colors={buttonGradient} style={buttonStyle}>
      <TouchableOpacity
        onPress={onPress}
        style={style.modalMenuButton}
        disabled={disable}>
        <Text style={style.text}>{title}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export const Separator = () => {
  const style = useStyles(styles);

  return <View style={style.separator} />;
};
