import React, {FC} from 'react';
import {Text} from 'react-native';
import {ReturnComponentType} from 'types/common/ReturnComponentType';
import {Styles} from './Styles';

type TaskItemPropsType = {
  title: string;
};

export const Task: FC<TaskItemPropsType> = (props): ReturnComponentType => {
  const {title} = props;

  return <Text style={Styles.text}>{title}</Text>;
};
