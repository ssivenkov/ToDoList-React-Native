import {CreateTaskListButton} from '@components/buttons/createTaskListButton/CreateTaskListButton';
import {ACCOUNT, ICON_SIZE_MEDIUM} from '@constants/constants';
import {faFile, faUser} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {TasksNavigator} from '@navigation/tasksNavigator/TasksNavigator';
import {navigatorOptions} from '@navigation/withAuthNavigator/settings';
import {BottomTabParamList} from '@navigation/withAuthNavigator/types';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AccountScreen} from '@root/screens/accountScreen/AccountScreen';
import {syncUserTaskListsAction} from '@store/actions/authSagaActions/syncUserTaskListsAction';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import {styles} from './styles';

const {Navigator, Screen} = createBottomTabNavigator<BottomTabParamList>();

export const WithAuthNavigator = () => {
  const dispatch = useDispatch();

  const {t} = useTranslation();

  useEffect(() => {
    dispatch(syncUserTaskListsAction());
  }, []);

  return (
    <Navigator initialRouteName={'Tasks'} screenOptions={navigatorOptions}>
      <Screen
        name={'Tasks'}
        component={TasksNavigator}
        options={{
          headerShown: true,
          headerStyle: styles.header,
          headerTitle: `${t('tasksScreen.Tasks')}`,
          headerTitleStyle: styles.headerTitleStyle,
          tabBarLabel: `${t('tasksScreen.Tasks')}`,
          headerRight: () => (
            <View style={styles.buttonContainer}>
              <CreateTaskListButton />
            </View>
          ),
          tabBarIcon: ({focused}) => (
            <FontAwesomeIcon
              style={focused ? styles.tabLightIcon : styles.tabDarkIcon}
              icon={faFile}
              size={ICON_SIZE_MEDIUM}
            />
          ),
        }}
      />
      <Screen
        name={ACCOUNT}
        component={AccountScreen}
        options={{
          headerShown: true,
          headerStyle: styles.header,
          headerTitle: `${t('accountScreen.Account')}`,
          headerTitleStyle: styles.headerTitleStyle,
          tabBarLabel: `${t('accountScreen.Account')}`,
          tabBarIcon: ({focused}) => (
            <FontAwesomeIcon
              style={focused ? styles.tabLightIcon : styles.tabDarkIcon}
              icon={faUser}
              size={ICON_SIZE_MEDIUM}
            />
          ),
        }}
      />
    </Navigator>
  );
};
