import {TASK_LISTS, USERS} from '@constants/constants';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import {DB} from '@root/api/DB';
import {errorAlert} from '@root/helpers/alertHelper';
import {setEditedTaskListTitleAction} from '@store/actions/tasksReducerActions/taskListsActions/setEditedTaskListTitleAction';
import {
  EditTaskListTitleSagaActionReturnType,
  EditTaskListTitleSagaPayloadType,
} from '@store/actions/tasksSagaActions/taskListsSagasActions/editTaskListTitleAction';
import {UserIDType} from '@store/reducers/authReducer/types';
import {userIDSelector} from '@store/selectors/authSelectors';
import {t} from 'i18next';
import {call, delay, put, select} from 'redux-saga/effects';

export function* editTaskListTitleSaga(
  action: EditTaskListTitleSagaActionReturnType,
) {
  try {
    const connectionStatus: NetInfoState = yield NetInfo.fetch();
    if (!connectionStatus.isInternetReachable) {
      errorAlert(t('common.NoInternetConnection'));
      return;
    }
    yield delay(10);

    yield call(action.payload.setIsLoading, true);
    const userID: UserIDType = yield select(userIDSelector);
    const sendModifiedTaskListToFirebase = (
      payload: EditTaskListTitleSagaPayloadType,
    ) => {
      return DB.ref(
        `${USERS}/${userID}/${TASK_LISTS}/${payload.taskListId}`,
      ).update({
        title: payload.editedTaskListTitle,
      });
    };
    yield call(sendModifiedTaskListToFirebase, action.payload);
    yield put(
      setEditedTaskListTitleAction({
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
    errorAlert(error);
  }
}
