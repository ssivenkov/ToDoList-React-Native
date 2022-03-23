import {CustomTextButton} from '@components/common/buttons/CustomTextButton';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Modal, Pressable, View, Text} from 'react-native';
import {styles} from './styles';
import {ModalTextPropsType} from './types';

export const ModalText = ({
  children,
  description,
  buttonTitle,
  okHandler,
}: ModalTextPropsType) => {
  const {t} = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);

  const onOkButtonPress = () => {
    okHandler && okHandler();
    setModalVisible(false);
  };

  return (
    <View>
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {description && <Text style={styles.text}>{description}</Text>}
            {children && <View>{children}</View>}
            <View style={styles.buttonsContainer}>
              {okHandler && (
                <CustomTextButton
                  onPress={() => onOkButtonPress()}
                  title={`${t('Ok')}`}
                />
              )}
              <CustomTextButton
                onPress={() => setModalVisible(false)}
                title={`${t('Close')}`}
              />
            </View>
          </View>
        </View>
      </Modal>
      <Pressable>
        <CustomTextButton
          onPress={() => setModalVisible(true)}
          title={buttonTitle}
        />
      </Pressable>
    </View>
  );
};
