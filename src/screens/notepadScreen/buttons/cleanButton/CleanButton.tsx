import React, { useState } from 'react';

import { COLORS } from '@colors/colors';
import { headerStyles } from '@components/header/styles';
import { ModalIcon } from '@components/modals/ModalIcon';
import { ICON_SIZE_MEDIUM } from '@constants/constants';
import { faBackspace } from '@fortawesome/free-solid-svg-icons/faBackspace';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useStyles } from '@hooks/useStyles';
import { SetStateType } from '@root/types/common/types';
import { cleanNotepadTextAction } from '@store/actions/notepadSagaActions/cleanNotepadTextAction';
import { useTranslation } from 'react-i18next';
import 'react-native-get-random-values';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';

import { CleanButtonPropsType } from './types';

export const CleanButton = (props: CleanButtonPropsType) => {
  const { setNotepadText } = props;

  const dispatch = useDispatch();

  const headerStyle = useStyles(headerStyles);

  const { t } = useTranslation();

  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

  const clearNotepadText = (
    setIsLoading: SetStateType<boolean>,
    setModalVisible: SetStateType<boolean>,
  ) => {
    dispatch(
      cleanNotepadTextAction({
        setNotepadText,
        setIsLoading,
        setModalVisible,
        setButtonDisabled,
      }),
    );
  };

  return (
    <ModalIcon
      buttonIcon={
        <View style={headerStyle.leftButtonContainer}>
          <FontAwesomeIcon
            color={COLORS.WHITE}
            icon={faBackspace}
            size={ICON_SIZE_MEDIUM}
          />
        </View>
      }
      buttonIconDisabled={buttonDisabled}
      description={t('notepadScreen.CleanButtonWarningTitle')}
      okHandler={clearNotepadText}
    />
  );
};
