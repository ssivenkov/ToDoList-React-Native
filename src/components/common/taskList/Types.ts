import {TaskItemType} from 'store/reducers/tasksReducer/Types';

export type TaskListPropsType = {
  dataList: TaskItemType[];
  title: string;
  todo?: boolean;
  done?: boolean;
};
