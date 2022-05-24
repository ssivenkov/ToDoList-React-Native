import {START_ANIMATION_DELAY, TASK_LISTS, USERS} from '@constants/constants';
import {DB} from '@root/api/DB';
import {errorAlert} from '@root/helpers/alertHelper';
import {checkInternetConnectionHelper} from '@root/helpers/hasInternetConnectionHelper';
import {setEditedTaskListTitleAction} from '@store/actions/tasksReducerActions/taskListsActions/setEditedTaskListTitleAction';
import {EditTaskListTitleSagaActionReturnType} from '@store/actions/tasksSagaActions/taskListsSagasActions/editTaskListTitleAction';
import {UserIDType} from '@store/reducers/userReducer/types';
import {userIDSelector} from '@store/selectors/userSelectors';
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
    const internetIsOn: boolean = yield call(checkInternetConnectionHelper);
    if (!internetIsOn) return;

    yield call(setIsLoading, true);
    yield delay(START_ANIMATION_DELAY);
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
