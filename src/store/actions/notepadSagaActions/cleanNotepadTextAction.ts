import { NOTEPAD_SAGA_ACTION } from '@enums/notepadSagaEnum';
import { NotepadTextSetStateType } from '@root/screens/notepadScreen/types';
import { SetStateType } from '@root/types/common/types';

export type CleanNotepadTextSagaPayloadType = {
  setNotepadText: NotepadTextSetStateType;
  setIsLoading: SetStateType<boolean>;
  setModalVisible: SetStateType<boolean>;
  setButtonDisabled: SetStateType<boolean>;
};

export type CleanNotepadTextSagaActionReturnType = {
  type: NOTEPAD_SAGA_ACTION.CLEAN_NOTEPAD_TEXT;
  payload: CleanNotepadTextSagaPayloadType;
};

export type CleanNotepadTextActionType = (
  payload: CleanNotepadTextSagaPayloadType,
) => CleanNotepadTextSagaActionReturnType;

export const cleanNotepadTextAction: CleanNotepadTextActionType = (payload) => ({
  type: NOTEPAD_SAGA_ACTION.CLEAN_NOTEPAD_TEXT,
  payload,
});
