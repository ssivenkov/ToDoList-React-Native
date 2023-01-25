import React from 'react';

import { EmptyButton } from '@components/header/buttons/emptyButton/EmptyButton';
import { headerStyles } from '@components/header/styles';
import { HeaderPropsType } from '@components/header/types';
import { left, right } from '@constants/constants';
import { useStyles } from '@hooks/useStyles';
import { Text, View } from 'react-native';

export const Header = (props: HeaderPropsType) => {
  const { leftButton, rightButton, title } = props;

  const styles = useStyles(headerStyles);

  return (
    <View style={styles.header}>
      <View>{leftButton ?? <EmptyButton side={left} />}</View>
      <Text numberOfLines={1} style={styles.headerTitle}>
        {title}
      </Text>
      <View>{rightButton ?? <EmptyButton side={right} />}</View>
    </View>
  );
};
