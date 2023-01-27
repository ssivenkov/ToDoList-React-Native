import { NOTEPAD_SAGA_ACTION } from '@enums/notepadSagaEnum';
import { SetStateType } from '@root/types/common/types';
import { NotepadTextType } from '@screens/notepadScreen/types';

export type SaveNotepadTextSagaPayloadType = {
  notepadText: NotepadTextType;
  setButtonDisabled: SetStateType<boolean>;
  setIsLoading: SetStateType<boolean>;
};

export type SaveNotepadTextSagaActionReturnType = {
  payload: SaveNotepadTextSagaPayloadType;
  type: NOTEPAD_SAGA_ACTION.SAVE_NOTEPAD_TEXT;
};

export type SaveNotepadTextActionType = (
  payload: SaveNotepadTextSagaPayloadType,
) => SaveNotepadTextSagaActionReturnType;

export const saveNotepadTextAction: SaveNotepadTextActionType = (payload) => ({
  payload,
  type: NOTEPAD_SAGA_ACTION.SAVE_NOTEPAD_TEXT,
});
