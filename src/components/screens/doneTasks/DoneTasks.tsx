import React from 'react';
import {Text, View} from 'react-native';
import {ReturnComponentType} from 'types/common/ReturnComponentType';
import {styles} from './Styles';
import {Header} from '../../common/header/Header';

export const DoneTasks = (): ReturnComponentType => {
  return (
    <View>
      <Header title="ToDo List" />
      <Text style={styles.text}>Done tasks content</Text>
    </View>
  );
};
