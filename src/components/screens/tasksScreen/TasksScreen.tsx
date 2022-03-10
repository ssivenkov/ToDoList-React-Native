import React from 'react';
import {styles} from './Styles';
import {NAVIGATION_TASKS} from '../../../enums/TasksEnum';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';
import {TaskList} from '../../common/taskList/TaskList';
import {FlatList, ListRenderItem, View} from 'react-native';
import {AppRootStateType} from 'store/Store';
import {ReturnComponentType} from 'types/common/ReturnComponentType';
import {TaskListType} from 'store/reducers/taskListsReducer/Types';
import {TabParamListType} from './Types';
import {Input} from '../../common/input/Input';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlus, faCheck, faListCheck} from '@fortawesome/free-solid-svg-icons';
import {iconSizeLarge} from '../../../constants/constants';
import {ModalIcon} from '../../common/modals/ModalIcon';

const TasksScreenTab = createBottomTabNavigator<TabParamListType>();

export const TasksScreen = (): ReturnComponentType => {
  const toDoTaskLists = useSelector<AppRootStateType, TaskListType[]>(
    (state) => state.taskLists.toDoTaskLists,
  );
  const doneTaskLists = useSelector<AppRootStateType, TaskListType[]>(
    (state) => state.taskLists.doneTaskLists,
  );

  const toDoTaskListRenderItem: ListRenderItem<TaskListType> = ({
    item,
  }): ReturnComponentType => {
    return <TaskList todo title={item.title} tasks={item.tasks} />;
  };

  const doneTaskListRenderItem: ListRenderItem<TaskListType> = ({
    item,
  }): ReturnComponentType => {
    return <TaskList title={item.title} tasks={item.tasks} />;
  };

  const TodoTasksScreen = (): ReturnComponentType => {
    return (
      <View style={styles.tasksListContainer}>
        <FlatList data={toDoTaskLists} renderItem={toDoTaskListRenderItem} />
      </View>
    );
  };

  const DoneTasksScreen = (): ReturnComponentType => {
    return (
      <View style={styles.tasksListContainer}>
        <FlatList data={doneTaskLists} renderItem={doneTaskListRenderItem} />
      </View>
    );
  };

  return (
    <TasksScreenTab.Navigator
      initialRouteName={NAVIGATION_TASKS.TASKS}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          switch (route.name) {
            case NAVIGATION_TASKS.TASKS:
              return focused ? (
                <FontAwesomeIcon
                  style={styles.tabLightIcon}
                  icon={faListCheck}
                  size={iconSizeLarge}
                />
              ) : (
                <FontAwesomeIcon icon={faListCheck} size={iconSizeLarge} />
              );
            case NAVIGATION_TASKS.DONE_TASKS:
              return focused ? (
                <FontAwesomeIcon
                  style={styles.tabLightIcon}
                  icon={faCheck}
                  size={iconSizeLarge}
                />
              ) : (
                <FontAwesomeIcon icon={faCheck} size={iconSizeLarge} />
              );
            default:
              return <FontAwesomeIcon icon={faCheck} size={iconSizeLarge} />;
          }
        },
        headerRight: () => {
          if (route.name === NAVIGATION_TASKS.TASKS) {
            return (
              <View style={styles.buttonContainer}>
                <ModalIcon
                  okHandler={() => {}}
                  description={'Enter new tasklist title:'}
                  buttonIcon={
                    <FontAwesomeIcon icon={faPlus} size={iconSizeLarge} />
                  }>
                  <Input />
                </ModalIcon>
              </View>
            );
          }
        },
        tabBarStyle: styles.tabBarContainer,
        tabBarActiveBackgroundColor: '#0000dd',
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#123',
      })}>
      <TasksScreenTab.Screen
        name={NAVIGATION_TASKS.TASKS}
        component={TodoTasksScreen}
      />
      <TasksScreenTab.Screen
        name={NAVIGATION_TASKS.DONE_TASKS}
        component={DoneTasksScreen}
      />
    </TasksScreenTab.Navigator>
  );
};
