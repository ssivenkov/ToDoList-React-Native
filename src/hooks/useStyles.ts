import { ColorType, ThemeType } from '@store/reducers/userReducer/types';
import { accentColorSelector, themeSelector } from '@store/selectors/userSelectors';
import { useWindowDimensions } from 'react-native';
import { useSelector } from 'react-redux';

export interface ExtendedStylesPropsType extends ThemeType {
  ACCENT_COLOR: ColorType;
  appWidth: number;
  appHeight: number;
}

export const useStyles = <TStyles, ArgType>(
  fn: (props: ExtendedStylesPropsType, ...args: ArgType[]) => TStyles,
): TStyles => {
  const theme = useSelector(themeSelector);
  const accentColor = useSelector(accentColorSelector);
  const { width, height } = useWindowDimensions();
  const appWidth = Math.floor(width);
  const appHeight = Math.floor(height);

  const props: ExtendedStylesPropsType = {
    ...theme,
    ACCENT_COLOR: accentColor,
    appWidth,
    appHeight,
  };

  return fn(props);
};
