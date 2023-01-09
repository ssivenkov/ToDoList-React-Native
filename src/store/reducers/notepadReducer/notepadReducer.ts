import { NOTEPAD_REDUCER_ACTION } from '@enums/notepadReducerEnum';
import {
  NotepadReducerActionsType,
  NotepadReducerStateType,
} from '@store/reducers/notepadReducer/types';

const notepadReducerState: NotepadReducerStateType = {
  notepadText: '',
};

export const notepadReducer = (
  state = notepadReducerState,
  action: NotepadReducerActionsType,
): NotepadReducerStateType => {
  switch (action.type) {
    case NOTEPAD_REDUCER_ACTION.SET_NOTEPAD_TEXT:
      return { ...state, notepadText: action.payload.notepadText };

    default:
      return state;
  }
};
