import React from 'react';

import { styles } from '@components/common/buttons/modalMenuButton/styles';
import { useStyles } from '@root/hooks/useStyles';
import { View } from 'react-native';

export const Separator = () => {
  const style = useStyles(styles);

  return <View style={style.separator} />;
};
