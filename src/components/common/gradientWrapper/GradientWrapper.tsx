import React from 'react';

import { COLORS } from '@colors/colors';
import { GradientWrapperPropsType } from '@components/common/gradientWrapper/types';
import { themeSelector } from '@store/selectors/userSelectors';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';

export const GradientWrapper = (props: GradientWrapperPropsType) => {
  const { children } = props;

  const theme = useSelector(themeSelector);

  const buttonGradient = theme.darkMode
    ? [COLORS.OUTER_SPACE, COLORS.MINE_SHAFT2]
    : [COLORS.WHITE, COLORS.ALTO2];

  return <LinearGradient colors={buttonGradient}>{children}</LinearGradient>;
};
