import React, {useState} from 'react';
import {Modal, Pressable, View, Text} from 'react-native';
import {styles} from './Styles';
import {CustomTextButton} from '../buttons/CustomTextButton';
import {ModalIconPropsType} from './Types';
import {CustomIconButton} from '../buttons/CustomIconButton';

export const ModalIcon = ({
  children,
  description,
  buttonIcon,
  okHandler,
}: ModalIconPropsType) => {
  const [modalVisible, setModalVisible] = useState(false);

  const onCancelButtonPress = () => {
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
                  title={'Ok'}
                />
              )}
              <CustomTextButton onPress={onCancelButtonPress} title={'Close'} />
            </View>
          </View>
        </View>
      </Modal>
      <Pressable>
        <CustomIconButton
          onPress={() => setModalVisible(true)}
          icon={buttonIcon}
        />
      </Pressable>
    </View>
  );
};
