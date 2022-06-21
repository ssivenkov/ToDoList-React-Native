import { NotificationType } from '@store/reducers/tasksReducer/types';

export const findNotification = (taskID: string, notifications: NotificationType[]) => {
  return notifications.find((notification) => notification.taskID === taskID);
};
