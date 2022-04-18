import {CustomTextButton} from '@components/common/buttons/CustomTextButton';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Modal, View, Text} from 'react-native';
import {styles} from './styles';
import {ModalTextPropsType} from './types';

export const ModalText = (props: ModalTextPropsType) => {
  const {children, description, buttonTitle, okHandler} = props;
  const {t} = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);

  const onModalButtonPress = (): void => {
    setModalVisible(true);
  };

  const onOkButtonPress = (): void => {
    okHandler && okHandler();
    setModalVisible(false);
  };

  const onRequestClose = (): void => {
    setModalVisible(!modalVisible);
  };

  const onClosePress = (): void => {
    setModalVisible(false);
  };

  return (
    <View>
      <Modal transparent visible={modalVisible} onRequestClose={onRequestClose}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {description && <Text style={styles.text}>{description}</Text>}
            {children && <View>{children}</View>}
            <View style={styles.buttonsContainer}>
              {okHandler && (
                <CustomTextButton
                  onPress={onOkButtonPress}
                  title={`${t('common.Ok')}`}
                />
              )}
              <CustomTextButton
                onPress={onClosePress}
                title={`${t('common.Close')}`}
              />
            </View>
          </View>
        </View>
      </Modal>
      <CustomTextButton onPress={onModalButtonPress} title={buttonTitle} />
    </View>
  );
};
