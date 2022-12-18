import React from 'react';

import { IconButton } from '@components/common/buttons/iconButton/IconButton';
import { useStyles } from '@root/hooks/useStyles';
import { View } from 'react-native';

import { menuHorizontalStyles } from './styles';
import { MenuHorizontalPropsType } from './types';

export const MenuHorizontal = (props: MenuHorizontalPropsType) => {
  const { children, buttons, menuButtonIcon, isMenuVisible, onMenuButtonPress } = props;

  const style = useStyles(menuHorizontalStyles);

  return (
    <View style={style.menuHorizontalContainer}>
      <View style={style.contentContainer}>
        {isMenuVisible && <View style={style.buttonsContainer}>{buttons}</View>}
        <View style={[style.childrenContainer, isMenuVisible && style.hidden]}>
          {children}
        </View>
      </View>
      <IconButton icon={menuButtonIcon} onPress={onMenuButtonPress} />
    </View>
  );
};
