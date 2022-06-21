import React, { useState } from 'react';

import { LongButton } from '@components/common/buttons/longButton/LongButton';
import { ModalMenuButton } from '@components/common/buttons/modalMenuButton/ModalMenuButton';
import { Separator } from '@components/common/buttons/modalMenuButton/Separator';
import { useStyles } from '@root/hooks/useStyles';
import { useTranslation } from 'react-i18next';
import { Modal, Text, View } from 'react-native';

import { styles } from './styles';
import { ModalLongButtonPropsType } from './types';

export const ModalLongButton = (props: ModalLongButtonPropsType) => {
  const {
    children,
    description,
    buttonIcon,
    buttonTitle,
    okHandler,
    closeHandler,
    rightComponent,
    disable,
  } = props;

  const style = useStyles(styles);
  const { t } = useTranslation();

  const [modalVisible, setModalVisible] = useState(false);

  const onModalButtonPress = (): void => {
    setModalVisible(true);
  };

  const onOkButtonPress = (): void => {
    if (okHandler) okHandler();
  };

  const onClosePress = (): void => {
    if (closeHandler) closeHandler();

    setModalVisible(false);
  };

  return (
    <View>
      <Modal onRequestClose={onClosePress} transparent visible={modalVisible}>
        <View style={style.centeredView}>
          <View style={style.modalView}>
            <View style={style.content}>
              {description && <Text style={style.text}>{description}</Text>}
              {children && <View>{children}</View>}
            </View>
            <View style={style.buttonsContainer}>
              {okHandler && (
                <>
                  <ModalMenuButton
                    leftRounding
                    onPress={onOkButtonPress}
                    rightRounding={false}
                    title={t('common.Ok')}
                  />
                  <Separator />
                </>
              )}
              <ModalMenuButton
                leftRounding={!okHandler}
                onPress={onClosePress}
                rightRounding
                title={t('common.Close')}
              />
            </View>
          </View>
        </View>
      </Modal>
      <LongButton
        disable={disable}
        icon={buttonIcon}
        onPress={onModalButtonPress}
        rightComponent={rightComponent}
        title={buttonTitle}
      />
    </View>
  );
};
