import { ColorType, ThemeType } from '@store/reducers/userReducer/types';
import {
  accentColorSelector,
  emulatorStatusBarHeightSelector,
  themeSelector,
} from '@store/selectors/userSelectors';
import { useWindowDimensions } from 'react-native';
import { useSelector } from 'react-redux';

export type ExtendedStylesPropsType = ThemeType & {
  ACCENT_COLOR: ColorType;
  appWidth: number;
  appHeight: number;
  emulatorStatusBarHeight: number;
};

export const useStyles = <TStyles, ArgType>(
  styleFunction: (props: ExtendedStylesPropsType, ...args: ArgType[]) => TStyles,
): TStyles => {
  const theme = useSelector(themeSelector);
  const accentColor = useSelector(accentColorSelector);
  const emulatorStatusBarHeight = useSelector(emulatorStatusBarHeightSelector);

  const { width, height } = useWindowDimensions();

  const appWidth = Math.floor(width);
  const appHeight = Math.floor(height);

  const props: ExtendedStylesPropsType = {
    ...theme,
    ACCENT_COLOR: accentColor,
    appWidth,
    appHeight,
    emulatorStatusBarHeight,
  };

  return styleFunction(props);
};
