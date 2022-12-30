import React, { useState } from 'react';

import { COLORS } from '@colors/colors';
import { commonButtonStyles } from '@components/buttons/common/styles/commonButtonStyles';
import { ModalIcon } from '@components/common/modals/ModalIcon';
import { ICON_SIZE_MEDIUM } from '@constants/constants';
import { faBackspace } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { CleanButtonPropsType } from '@root/screens/notepadScreen/buttons/cleanButton/types';
import { SetStateType } from '@root/types/common/types';
import { cleanNotepadTextAction } from '@store/actions/notepadSagaActions/cleanNotepadTextAction';
import { useTranslation } from 'react-i18next';
import 'react-native-get-random-values';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';

export const CleanButton = (props: CleanButtonPropsType) => {
  const { setNotepadText } = props;

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

  const clearNotepadText = (
    setIsLoading: SetStateType<boolean>,
    setModalVisible: SetStateType<boolean>,
  ): void => {
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
        <View style={commonButtonStyles.buttonContainer}>
          <FontAwesomeIcon
            color={COLORS.WHITE}
            icon={faBackspace}
            size={ICON_SIZE_MEDIUM}
          />
        </View>
      }
      buttonIconDisabled={buttonDisabled}
      description={t('notepadScreen.cleanButtonWarningTitle')}
      okHandler={clearNotepadText}
    />
  );
};
