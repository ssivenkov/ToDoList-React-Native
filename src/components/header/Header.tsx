import React from 'react';

import { EmptyButton } from '@components/header/buttons/emptyButton/EmptyButton';
import { headerStyles } from '@components/header/styles';
import { HeaderPropsType } from '@components/header/types';
import { useStyles } from '@hooks/useStyles';
import { Text, View } from 'react-native';

export const Header = (props: HeaderPropsType) => {
  const { leftButton, rightButton, title } = props;

  const styles = useStyles(headerStyles);

  return (
    <View style={styles.header}>
      <View style={styles.leftButtonContainer}>{leftButton ?? <EmptyButton />}</View>
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={styles.rightButtonContainer}>{rightButton ?? <EmptyButton />}</View>
    </View>
  );
};
