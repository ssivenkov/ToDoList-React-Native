import {TASK_LISTS, USERS} from '@constants/constants';
import {DB} from '@root/api/DB';
import {errorAlert} from '@root/helpers/alertHelper';
import {checkInternetConnectionHelper} from '@root/helpers/hasInternetConnectionHelper';
import {addNewTaskListAction} from '@store/actions/tasksReducerActions/taskListsActions/addNewTaskListAction';
import {AddNewTaskListSagaActionReturnType} from '@store/actions/tasksSagaActions/taskListsSagasActions/addNewTaskListAction';
import {UserIDType} from '@store/reducers/authReducer/types';
import {userIDSelector} from '@store/selectors/authSelectors';
import {call, delay, put, select} from 'redux-saga/effects';

export function* addNewTaskListSaga(
  action: AddNewTaskListSagaActionReturnType,
) {
  const {taskList, setIsLoading, setModalVisible, setTaskListTitle} =
    action.payload;
  const {id: taskListID} = taskList;
  try {
    const internetIsOn: boolean = yield call(checkInternetConnectionHelper);
    if (!internetIsOn) return;

    yield delay(10);
    yield call(setIsLoading, true);
    const userID: UserIDType = yield select(userIDSelector);
    const addNewTaskListToFirebase = () => {
      return DB.ref(`${USERS}/${userID}/${TASK_LISTS}/${taskListID}`).set(
        taskList,
      );
    };

    yield call(addNewTaskListToFirebase);
    yield put(addNewTaskListAction({taskList}));
    yield call(setIsLoading, false);
    yield call(setModalVisible, false);
    yield call(setTaskListTitle, '');
  } catch (error) {
    yield call(setIsLoading, false);
    errorAlert(error);
  }
}
