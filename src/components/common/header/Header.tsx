import React, {FC} from 'react';

import {Text, View} from 'react-native';
import {headerPropsType} from 'types/components/header/HeaderTypes';
import {ReturnComponentType} from 'types/common/ReturnComponentType';
import {styles} from './Styles';

export const Header: FC<headerPropsType> = (props): ReturnComponentType => {
  const {title} = props;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};
