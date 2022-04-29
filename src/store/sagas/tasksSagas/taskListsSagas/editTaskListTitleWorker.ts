import {taskLists, Users} from '@constants/constants';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import {DB} from '@root/api/DB';
import {errorAlert} from '@root/helpers/alert';
import {delay} from '@root/helpers/delay';
import {setEditedTaskListTitle} from '@store/actions/tasksReducerActions/taskListsActions/setEditedTaskListTitle';
import {
  EditTaskListTitleSagaActionReturnType,
  EditTaskListTitleSagaPayloadType,
} from '@store/actions/tasksSagaActions/taskListsSagasActions/editTaskListTitle';
import {UserIDType} from '@store/reducers/authReducer/types';
import {getUserID} from '@store/selectors/authSelectors';
import {t} from 'i18next';
import {call, put, select} from 'redux-saga/effects';

export function* editTaskListTitleWorker(
  action: EditTaskListTitleSagaActionReturnType,
) {
  try {
    const connectionStatus: NetInfoState = yield NetInfo.fetch();
    if (!connectionStatus.isInternetReachable) {
      errorAlert(t('common.NoInternetConnection'));
      return;
    }
    yield call(delay, 10);

    yield call(action.payload.setIsLoading, true);
    const userID: UserIDType = yield select(getUserID);
    const sendModifiedTaskListToFirebase = (
      payload: EditTaskListTitleSagaPayloadType,
    ) => {
      return DB.ref(
        `${Users}/${userID}/${taskLists}/${payload.taskListId}`,
      ).update({
        title: payload.editedTaskListTitle,
      });
    };
    yield call(sendModifiedTaskListToFirebase, action.payload);
    yield put(
      setEditedTaskListTitle({
        taskListId: action.payload.taskListId,
        editedTaskListTitle: action.payload.editedTaskListTitle,
      }),
    );
    yield call(action.payload.setIsLoading, false);
    yield call(action.payload.setModalVisible, false);
    yield call(
      action.payload.setEditedTaskListTitleState,
      action.payload.editedTaskListTitle,
    );
  } catch (error) {
    yield call(action.payload.setIsLoading, false);
    if (error instanceof Error) {
      errorAlert(error);
    }
  }
}
