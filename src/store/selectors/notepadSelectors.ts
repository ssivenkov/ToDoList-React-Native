import { NotepadReducerStateType } from '@store/reducers/notepadReducer/types';
import { AppRootStateType } from '@store/types';

export const notepadTextSelector = (
  state: AppRootStateType,
): NotepadReducerStateType['notepadText'] => {
  return state.notepad.notepadText;
};
