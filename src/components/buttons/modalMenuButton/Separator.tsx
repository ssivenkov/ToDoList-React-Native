import React from 'react';

import { useStyles } from '@hooks/useStyles';
import { View } from 'react-native';

import { modalMenuButtonStyles } from './styles';

export const Separator = () => {
  const styles = useStyles(modalMenuButtonStyles);

  return <View style={styles.separator} />;
};
