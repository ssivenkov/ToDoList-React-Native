import React, {useState} from 'react';
import {
  useWindowDimensions,
  useColorScheme,
  View,
  Text,
  TextInput,
} from 'react-native';
import {Header} from './common/header/Header';
import {TaskList} from './common/taskList/TaskList';
import {CustomButton} from './common/customButton/CustomButton';
import {useSelector} from 'react-redux';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {styles} from './Styles';
import {AppRootStateType} from 'store/Store';
import {ReturnComponentType} from 'types/common/ReturnComponentType';
import {TaskItemType} from 'types/reducers/TasksReducerTypes';

export const AppComponent = (): ReturnComponentType => {
  const isDarkMode = useColorScheme() === 'dark';
  const [inputText, setInputText] = useState('');
  const windowWidth = useWindowDimensions();
  const taskList = useSelector<AppRootStateType, TaskItemType[]>(
    (state) => state.tasks.tasks,
  );

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <View style={backgroundStyle}>
      <Header title="ToDo List" />
      <View style={styles.container}>
        <View style={styles.tasksListContainer}>
          <TaskList dataList={taskList} title="Task list" />
        </View>
        <Text>Width: {Math.floor(windowWidth.width)}</Text>
        <Text>Height: {Math.floor(windowWidth.height)}</Text>
        <CustomButton title={'Add task'} />
        <CustomButton title={'Add task list'} />
      </View>
      <TextInput
        style={styles.input}
        placeholder={'Enter task title...'}
        onChangeText={(text: string) => {
          setInputText(text);
        }}
        defaultValue={inputText}
      />
    </View>
  );
};
