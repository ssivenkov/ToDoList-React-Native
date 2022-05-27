import {ICON_SIZE_LARGE} from '@constants/constants';
import {faCheck, faList} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {styles} from '@navigation/tasksNavigator/styles';
import {MaterialTopTabNavigationOptions} from '@react-navigation/material-top-tabs/lib/typescript/src/types';
import {useStyles} from '@root/hooks/useStyles';
import {themeSelector} from '@store/selectors/userSelectors';
import {t} from 'i18next';
import React from 'react';
import {useSelector} from 'react-redux';

export const tasksNavigatorOptions = () => {
  const style = useStyles(styles);
  const theme = useSelector(themeSelector);

  return {
    tabBarStyle: style.tabBarContainer,
    tabBarItemStyle: style.tabBarItem,
    tabBarActiveTintColor: theme.TAB_BAR_FOCUS_TEXT_COLOR,
    tabBarInactiveTintColor: theme.TAB_BAR_TEXT_COLOR,
    tabBarIndicatorStyle: style.tabBarIndicator,
    tabBarIconStyle: style.icon,
    tabBarLabelStyle: style.title,
  };
};

export const toDoScreenOptions: () => MaterialTopTabNavigationOptions = () => {
  const style = useStyles(styles);

  return {
    tabBarLabel: `${t('tasksScreen.TodoTasksTab')}`,
    tabBarIcon: ({focused}) => (
      <FontAwesomeIcon
        style={focused ? style.tabFocusIcon : style.tabIcon}
        icon={faList}
        size={ICON_SIZE_LARGE}
      />
    ),
  };
};

export const doneScreenOptions: () => MaterialTopTabNavigationOptions = () => {
  const style = useStyles(styles);

  return {
    tabBarLabel: `${t('tasksScreen.DoneTasksTab')}`,
    tabBarIcon: ({focused}) => (
      <FontAwesomeIcon
        style={focused ? style.tabFocusIcon : style.tabIcon}
        icon={faCheck}
        size={ICON_SIZE_LARGE}
      />
    ),
  };
};
