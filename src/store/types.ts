import { TasksReducerStateType } from '@store/reducers/tasksReducer/types';
import { UserReducerStateType } from '@store/reducers/userReducer/types';
import { rootReducer } from '@store/store';

export type AppRootStateType = ReturnType<typeof rootReducer>;

export type RootStateType = {
  tasks: TasksReducerStateType;
  user: UserReducerStateType;
};
