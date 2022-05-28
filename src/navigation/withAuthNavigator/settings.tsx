import {CreateTaskListButton} from '@components/buttons/createTaskListButton/CreateTaskListButton';
import {ICON_SIZE_MEDIUM} from '@constants/constants';
import {faFile, faUser} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {styles} from '@navigation/withAuthNavigator/styles';
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs/src/types';
import {useStyles} from '@root/hooks/useStyles';
import {themeSelector} from '@store/selectors/userSelectors';
import {t} from 'i18next';
import React from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';

export const withAuthNavigatorOptions: () => BottomTabNavigationOptions =
  () => {
    const style = useStyles(styles);
    const theme = useSelector(themeSelector);

    return {
      headerShown: false,
      tabBarStyle: style.tabBarContainer,
      tabBarActiveTintColor: theme.TAB_BAR_FOCUS_TEXT_COLOR,
      tabBarInactiveTintColor: theme.TAB_BAR_TEXT_COLOR,
      tabBarIconStyle: style.icon,
      tabBarLabelStyle: style.title,
    };
  };

export const tasksNavigatorOptions: () => BottomTabNavigationOptions = () => {
  const style = useStyles(styles);

  return {
    headerShown: true,
    headerStyle: style.header,
    headerTitle: `${t('tasksScreen.Tasks')}`,
    headerTitleStyle: style.headerTitleStyle,
    headerTitleAlign: 'center',
    tabBarLabel: `${t('tasksScreen.Tasks')}`,
    headerRight: () => (
      <View style={style.buttonContainer}>
        <CreateTaskListButton />
      </View>
    ),
    tabBarIcon: ({focused}) => (
      <FontAwesomeIcon
        style={focused ? style.tabFocusIcon : style.tabIcon}
        icon={faFile}
        size={ICON_SIZE_MEDIUM}
      />
    ),
  };
};

export const accountScreenOptions: () => BottomTabNavigationOptions = () => {
  const style = useStyles(styles);

  return {
    headerShown: true,
    headerStyle: style.header,
    headerTitle: `${t('accountScreen.Account')}`,
    headerTitleStyle: style.headerTitleStyle,
    headerTitleAlign: 'center',
    tabBarLabel: `${t('accountScreen.Account')}`,
    tabBarIcon: ({focused}) => (
      <FontAwesomeIcon
        style={focused ? style.tabFocusIcon : style.tabIcon}
        icon={faUser}
        size={ICON_SIZE_MEDIUM}
      />
    ),
  };
};
