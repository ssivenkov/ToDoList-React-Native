import { NOTEPAD_REDUCER_ACTION } from '@enums/notepadReducerEnum';
import { NotepadReducerStateType } from '@store/reducers/notepadReducer/types';

type SetNotepadTextActionPayloadType = {
  notepadText: NotepadReducerStateType['notepadText'];
};

export type SetNotepadTextActionReturnType = {
  payload: SetNotepadTextActionPayloadType;
  type: NOTEPAD_REDUCER_ACTION.SET_NOTEPAD_TEXT;
};

export type SetNotepadTextActionType = (
  payload: SetNotepadTextActionPayloadType,
) => SetNotepadTextActionReturnType;

export const setNotepadTextAction: SetNotepadTextActionType = (payload) => ({
  payload,
  type: NOTEPAD_REDUCER_ACTION.SET_NOTEPAD_TEXT,
});
