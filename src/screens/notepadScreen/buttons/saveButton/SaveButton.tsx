import React, { useState } from 'react';

import { COLORS } from '@colors/colors';
import { commonButtonStyles } from '@components/buttons/common/styles/commonButtonStyles';
import { IconWithoutDialog } from '@components/common/modals/IconWihoutDialog';
import { ICON_SIZE_MEDIUM } from '@constants/constants';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import 'react-native-get-random-values';
import { SaveButtonPropsType } from '@root/screens/notepadScreen/buttons/saveButton/types';
import { SetStateType } from '@root/types/common/types';
import { saveNotepadTextAction } from '@store/actions/notepadSagaActions/saveNotepadTextAction';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';

export const SaveButton = (props: SaveButtonPropsType) => {
  const { notepadText } = props;

  const dispatch = useDispatch();

  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

  const saveNotepadText = (setIsLoading: SetStateType<boolean>): void => {
    dispatch(
      saveNotepadTextAction({
        notepadText,
        setIsLoading,
        setButtonDisabled,
      }),
    );
  };

  return (
    <IconWithoutDialog
      buttonIcon={
        <View style={commonButtonStyles.buttonContainer}>
          <FontAwesomeIcon color={COLORS.WHITE} icon={faSave} size={ICON_SIZE_MEDIUM} />
        </View>
      }
      buttonIconDisabled={buttonDisabled}
      okHandler={saveNotepadText}
    />
  );
};
