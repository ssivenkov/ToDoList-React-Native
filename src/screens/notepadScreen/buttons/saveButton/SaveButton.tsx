import React, { useState } from 'react';

import { COLORS } from '@colors/colors';
import { commonButtonStyles } from '@components/buttons/commonButtonStyles';
import { IconButtonWithLoader } from '@components/buttons/iconButtonWithLoader/IconButtonWithLoader';
import { ICON_SIZE_MEDIUM } from '@constants/constants';
import { faSave } from '@fortawesome/free-solid-svg-icons/faSave';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import 'react-native-get-random-values';
import { SetStateType } from '@root/types/common/types';
import { saveNotepadTextAction } from '@store/actions/notepadSagaActions/saveNotepadTextAction';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';

import { SaveButtonPropsType } from './types';

export const SaveButton = (props: SaveButtonPropsType) => {
  const { notepadText } = props;

  const { WHITE } = COLORS;

  const dispatch = useDispatch();

  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

  const saveNotepadText = (setIsLoading: SetStateType<boolean>) => {
    dispatch(
      saveNotepadTextAction({
        notepadText,
        setIsLoading,
        setButtonDisabled,
      }),
    );
  };

  return (
    <IconButtonWithLoader
      disabled={buttonDisabled}
      icon={
        <View style={commonButtonStyles.buttonContainer}>
          <FontAwesomeIcon color={WHITE} icon={faSave} size={ICON_SIZE_MEDIUM} />
        </View>
      }
      okHandler={saveNotepadText}
    />
  );
};
