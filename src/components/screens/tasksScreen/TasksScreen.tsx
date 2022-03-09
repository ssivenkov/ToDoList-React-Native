import React from 'react';
import {styles} from './Styles';
import {NAVIGATION_TASKS} from '../../../enums/TasksEnum';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';
import {TaskList} from '../../common/taskList/TaskList';
import {CustomImageButton} from '../../common/buttons/CustomImageButton';
import {FlatList, ListRenderItem, Image, View} from 'react-native';
import {AppRootStateType} from 'store/Store';
import {ReturnComponentType} from 'types/common/ReturnComponentType';
import {TaskListType} from 'store/reducers/taskListsReducer/Types';
import TasksActiveImage from '../../../assets/images/icons/TasksActive.png';
import TasksImage from '../../../assets/images/icons/Tasks.png';
import DoneTasksActiveImage from '../../../assets/images/icons/DoneTasksActive.png';
import DoneTasksImage from '../../../assets/images/icons/DoneTasks.png';
import AddTaskListImage from '../../../assets/images/icons/Add.png';
import {TabParamListType} from './Types';

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
                <Image style={styles.tabImage} source={TasksActiveImage} />
              ) : (
                <Image style={styles.tabImage} source={TasksImage} />
              );
            case NAVIGATION_TASKS.DONE_TASKS:
              return focused ? (
                <Image style={styles.tabImage} source={DoneTasksActiveImage} />
              ) : (
                <Image style={styles.tabImage} source={DoneTasksImage} />
              );
            default:
              return <Image style={styles.tabImage} source={TasksImage} />;
          }
        },
        headerRight: () => {
          if (route.name === NAVIGATION_TASKS.TASKS) {
            return (
              <View style={styles.buttonContainer}>
                <CustomImageButton bigImage image={AddTaskListImage} />
              </View>
            );
          }
        },
        tabBarIconStyle: styles.tabImage,
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
