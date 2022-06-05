import {AccentColorType, ThemeType} from '@store/reducers/userReducer/types';
import {
  accentColorSelector,
  themeSelector,
} from '@store/selectors/userSelectors';
import {useSelector} from 'react-redux';

export interface ExtendedStylesPropsType extends ThemeType {
  ACCENT_COLOR: AccentColorType;
}

export const useStyles = <TStyles, ArgType>(
  fn: (props: ExtendedStylesPropsType, ...args: ArgType[]) => TStyles,
): TStyles => {
  const theme = useSelector(themeSelector);
  const accentColor = useSelector(accentColorSelector);

  const props: ExtendedStylesPropsType = {...theme, ACCENT_COLOR: accentColor};

  return fn(props);
};
