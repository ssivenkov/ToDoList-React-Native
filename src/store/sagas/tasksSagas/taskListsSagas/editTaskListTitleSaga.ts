import {TASK_LISTS, USERS} from '@constants/constants';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import {DB} from '@root/api/DB';
import {errorAlert} from '@root/helpers/alertHelper';
import {setEditedTaskListTitleAction} from '@store/actions/tasksReducerActions/taskListsActions/setEditedTaskListTitleAction';
import {EditTaskListTitleSagaActionReturnType} from '@store/actions/tasksSagaActions/taskListsSagasActions/editTaskListTitleAction';
import {UserIDType} from '@store/reducers/authReducer/types';
import {userIDSelector} from '@store/selectors/authSelectors';
import {t} from 'i18next';
import {call, delay, put, select} from 'redux-saga/effects';

export function* editTaskListTitleSaga(
  action: EditTaskListTitleSagaActionReturnType,
) {
  const {
    setIsLoading,
    setModalVisible,
    taskListID,
    editedTaskListTitle,
    setEditedTaskListTitleState,
  } = action.payload;
  try {
    const connectionStatus: NetInfoState = yield NetInfo.fetch();
    if (!connectionStatus.isInternetReachable) {
      errorAlert(t('common.NoInternetConnection'));
      return;
    }
    yield delay(10);

    yield call(setIsLoading, true);
    const userID: UserIDType = yield select(userIDSelector);
    const sendModifiedTaskListToFirebase = () => {
      return DB.ref(`${USERS}/${userID}/${TASK_LISTS}/${taskListID}`).update({
        title: editedTaskListTitle,
      });
    };

    yield call(sendModifiedTaskListToFirebase);
    yield put(
      setEditedTaskListTitleAction({
        taskListID,
        editedTaskListTitle,
      }),
    );
    yield call(setIsLoading, false);
    yield call(setModalVisible, false);
    yield call(setEditedTaskListTitleState, editedTaskListTitle);
  } catch (error) {
    yield call(setIsLoading, false);
    errorAlert(error);
  }
}
