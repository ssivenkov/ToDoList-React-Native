import {LongButton} from '@components/common/buttons/longButton/LongButton';
import {
  ModalMenuButton,
  Separator,
} from '@components/common/buttons/modalMenuButton/ModalMenuButton';
import {useStyles} from '@root/hooks/useStyles';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Modal, Text, View} from 'react-native';
import {styles} from './styles';
import {ModalLongButtonPropsType} from './types';

export const ModalLongButton = (props: ModalLongButtonPropsType) => {
  const {
    children,
    description,
    buttonIcon,
    buttonTitle,
    okHandler,
    rightComponent,
    disable,
  } = props;

  const style = useStyles(styles);
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
                    onPress={onOkButtonPress}
                    title={t('common.Ok')}
                    leftRounding={true}
                    rightRounding={false}
                  />
                  <Separator />
                </>
              )}
              <ModalMenuButton
                onPress={onClosePress}
                title={t('common.Close')}
                leftRounding={!okHandler}
                rightRounding={true}
              />
            </View>
          </View>
        </View>
      </Modal>
      <LongButton
        icon={buttonIcon}
        onPress={onModalButtonPress}
        title={buttonTitle}
        disable={disable}
        rightComponent={rightComponent}
      />
    </View>
  );
};
