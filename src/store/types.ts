import { NotepadReducerStateType } from '@store/reducers/notepadReducer/types';
import { SnackBarReducerStateType } from '@store/reducers/snackBarReducer/types';
import { TasksReducerStateType } from '@store/reducers/tasksReducer/types';
import { UserReducerStateType } from '@store/reducers/userReducer/types';
import { rootReducer } from '@store/store';

export type AppRootStateType = ReturnType<typeof rootReducer>;

export type RootStateType = {
  notepad: NotepadReducerStateType;
  snackBarEvents: SnackBarReducerStateType;
  tasks: TasksReducerStateType;
  user: UserReducerStateType;
};
