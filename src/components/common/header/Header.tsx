import React, {FC} from 'react';

import {Text, View} from 'react-native';
import {headerPropsType} from 'components/common/header/Types';
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
