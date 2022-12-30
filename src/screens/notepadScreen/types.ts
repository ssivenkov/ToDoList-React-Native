import { SetStateType } from '@root/types/common/types';
import { NotepadReducerStateType } from '@store/reducers/notepadReducer/types';

export type NotepadTextType = NotepadReducerStateType['notepadText'];
export type NotepadTextSetStateType = SetStateType<NotepadTextType>;
