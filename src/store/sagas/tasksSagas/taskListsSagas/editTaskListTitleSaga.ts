import {
  ONLINE,
  START_ANIMATION_DELAY,
  TASK_LISTS,
  USERS,
} from '@constants/constants';
import {DB} from '@root/api/DB';
import {checkInternetConnectionHelper} from '@root/helpers/checkInternetConnectionHelper';
import {setEditedTaskListTitleAction} from '@store/actions/tasksReducerActions/taskListsActions/setEditedTaskListTitleAction';
import {EditTaskListTitleSagaActionReturnType} from '@store/actions/tasksSagaActions/taskListsSagasActions/editTaskListTitleAction';
import {setModalErrorMessageAction} from '@store/actions/userReducerActions/setModalErrorMessageAction';
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
    const internetConnectionStatus: string = yield call(
      checkInternetConnectionHelper,
    );

    if (internetConnectionStatus !== ONLINE) {
      throw Error(internetConnectionStatus);
    }

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

    if (error instanceof Error) {
      yield put(setModalErrorMessageAction({errorModalMessage: error.message}));
    }
  }
}
