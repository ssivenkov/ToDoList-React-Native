import { NOTEPAD_SAGA_ACTION } from '@enums/notepadSagaEnum';
import { SetStateType } from '@root/types/common/types';
import { NotepadTextType } from '@screens/notepadScreen/types';

export type SaveNotepadTextSagaPayloadType = {
  notepadText: NotepadTextType;
  setIsLoading: SetStateType<boolean>;
  setButtonDisabled: SetStateType<boolean>;
};

export type SaveNotepadTextSagaActionReturnType = {
  type: NOTEPAD_SAGA_ACTION.SAVE_NOTEPAD_TEXT;
  payload: SaveNotepadTextSagaPayloadType;
};

export type SaveNotepadTextActionType = (
  payload: SaveNotepadTextSagaPayloadType,
) => SaveNotepadTextSagaActionReturnType;

export const saveNotepadTextAction: SaveNotepadTextActionType = (payload) => ({
  type: NOTEPAD_SAGA_ACTION.SAVE_NOTEPAD_TEXT,
  payload,
});
