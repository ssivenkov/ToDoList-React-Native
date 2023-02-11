import { NOTEPAD_SAGA_ACTION } from '@enums/notepadSagaEnum';
import { SetStateType } from '@root/types/common/types';
import { NotepadTextSetStateType } from '@screens/notepadScreen/types';

export type CleanNotepadTextSagaPayloadType = {
  setButtonDisabled: SetStateType<boolean>;
  setIsLoading: SetStateType<boolean>;
  setModalVisible: SetStateType<boolean>;
  setNotepadText: NotepadTextSetStateType;
};

export type CleanNotepadTextSagaActionReturnType = {
  payload: CleanNotepadTextSagaPayloadType;
  type: NOTEPAD_SAGA_ACTION.CLEAN_NOTEPAD_TEXT;
};

export type CleanNotepadTextActionType = (
  payload: CleanNotepadTextSagaPayloadType,
) => CleanNotepadTextSagaActionReturnType;

export const cleanNotepadTextAction: CleanNotepadTextActionType = (payload) => ({
  payload,
  type: NOTEPAD_SAGA_ACTION.CLEAN_NOTEPAD_TEXT,
});
