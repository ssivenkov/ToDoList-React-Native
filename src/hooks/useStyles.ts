import {ThemeType} from '@store/reducers/userReducer/types';
import {themeSelector} from '@store/selectors/userSelectors';
import {useSelector} from 'react-redux';

export const useStyles = <TStyles, ArgType>(
  fn: (theme: ThemeType, ...args: ArgType[]) => TStyles,
): TStyles => {
  const theme = useSelector(themeSelector);

  return fn(theme);
};
