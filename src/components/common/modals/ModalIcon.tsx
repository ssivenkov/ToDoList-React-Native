import React, { useState } from 'react';

import { IconButton } from '@components/common/buttons/iconButton/IconButton';
import { ModalMenuButton } from '@components/common/buttons/modalMenuButton/ModalMenuButton';
import { Separator } from '@components/common/buttons/modalMenuButton/Separator';
import { Loader } from '@components/common/loader/Loader';
import { useStyles } from '@root/hooks/useStyles';
import { useTranslation } from 'react-i18next';
import { Modal, Text, View } from 'react-native';

import { styles } from './styles';
import { ModalIconPropsType } from './types';

export const ModalIcon = (props: ModalIconPropsType) => {
  const {
    children,
    description,
    buttonIcon,
    okHandler,
    closeHandler,
    modalVisibleFromProps,
    setModalVisibleFromProps,
    okDisable,
  } = props;

  const style = useStyles(styles);
  const { t } = useTranslation();

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const modalByPropsControlCondition =
    typeof modalVisibleFromProps === 'boolean' && !!setModalVisibleFromProps;

  const onButtonPress = (): void => {
    if (modalByPropsControlCondition && !modalVisibleFromProps) {
      setModalVisibleFromProps(true);
    }

    if (!modalVisible) setModalVisible(true);
  };

  const onCancelButtonPress = (): void => {
    if (closeHandler) closeHandler();

    if (modalByPropsControlCondition) {
      setModalVisibleFromProps(false);
    } else setModalVisible(false);
  };

  const onOkButtonPress = (): void => {
    okHandler(setIsLoading, setModalVisible);
  };

  return (
    <View>
      <View>
        <Modal transparent visible={modalVisibleFromProps ?? modalVisible}>
          <View style={style.centeredView}>
            <View style={style.modalView}>
              <View style={style.content}>
                {description && <Text style={style.text}>{description}</Text>}
                {children && <View>{children}</View>}
              </View>
              <View style={style.buttonsContainer}>
                <ModalMenuButton
                  disable={okDisable}
                  leftRounding
                  onPress={onOkButtonPress}
                  rightRounding={false}
                  title={t('common.Ok')}
                />
                <Separator />
                <ModalMenuButton
                  leftRounding={false}
                  onPress={onCancelButtonPress}
                  rightRounding
                  title={t('common.Close')}
                />
              </View>
            </View>
          </View>
          {isLoading && <Loader />}
        </Modal>
      </View>
      <IconButton icon={buttonIcon} onPress={onButtonPress} />
    </View>
  );
};
