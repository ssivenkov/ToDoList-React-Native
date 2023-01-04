import React from 'react';

import { IconButton } from '@components/buttons/iconButton/IconButton';
import { useStyles } from '@hooks/useStyles';
import { View } from 'react-native';

import { menuHorizontalStyles } from './styles';
import { MenuHorizontalPropsType } from './types';

export const MenuHorizontal = (props: MenuHorizontalPropsType) => {
  const { children, buttons, menuButtonIcon, isMenuVisible, onMenuButtonPress } = props;

  const styles = useStyles(menuHorizontalStyles);

  return (
    <View style={styles.menuHorizontalContainer}>
      <View style={styles.contentContainer}>
        {isMenuVisible && <View style={styles.buttonsContainer}>{buttons}</View>}
        <View style={[styles.childrenContainer, isMenuVisible && styles.hidden]}>
          {children}
        </View>
      </View>
      <IconButton icon={menuButtonIcon} onPress={onMenuButtonPress} />
    </View>
  );
};
