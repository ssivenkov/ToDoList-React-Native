import React from 'react';

import { IconButton } from '@components/buttons/iconButton/IconButton';
import { useStyles } from '@hooks/useStyles';
import { View } from 'react-native';

import { menuHorizontalStyles } from './styles';
import { MenuHorizontalPropsType } from './types';

export const MenuHorizontal = (props: MenuHorizontalPropsType) => {
  const {
    children,
    buttons,
    menuButtonIcon,
    isMenuHorizontalVisible,
    onMenuButtonPress,
  } = props;

  const styles = useStyles(menuHorizontalStyles);

  return (
    <View style={styles.menuHorizontalContainer}>
      <View style={styles.contentContainer}>
        {isMenuHorizontalVisible && (
          <View style={styles.buttonsContainer}>{buttons}</View>
        )}
        <View
          style={[styles.childrenContainer, isMenuHorizontalVisible && styles.hidden]}
        >
          {children}
        </View>
      </View>
      <IconButton icon={menuButtonIcon} onPress={onMenuButtonPress} />
    </View>
  );
};
