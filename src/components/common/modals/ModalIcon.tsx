import {CustomIconButton} from '@components/common/buttons/CustomIconButton';
import {CustomTextButton} from '@components/common/buttons/CustomTextButton';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Modal, View, Text} from 'react-native';
import {styles} from './styles';
import {ModalIconPropsType} from './types';

export const ModalIcon = ({
  children,
  description,
  buttonIcon,
  okHandler,
  okDisable,
  closeHandler,
}: ModalIconPropsType) => {
  const {t} = useTranslation();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const onButtonPress = () => {
    if (!modalVisible) setModalVisible(true);
  };

  const onCancelButtonPress = () => {
    closeHandler && closeHandler();
    setModalVisible(false);
  };

  const onOkButtonPress = () => {
    okHandler && okHandler();
    setModalVisible(false);
  };

  return (
    <View>
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {description && <Text style={styles.text}>{description}</Text>}
            {children && <View>{children}</View>}
            <View style={styles.buttonsContainer}>
              {okHandler && (
                <CustomTextButton
                  onPress={() => onOkButtonPress()}
                  title={`${t('common.Ok')}`}
                  disable={okDisable}
                />
              )}
              <CustomTextButton
                onPress={onCancelButtonPress}
                title={`${t('common.Close')}`}
              />
            </View>
          </View>
        </View>
      </Modal>
      <CustomIconButton onPress={onButtonPress} icon={buttonIcon} />
    </View>
  );
};
