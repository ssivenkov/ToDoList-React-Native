import {taskLists, Users} from '@constants/constants';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import {DB} from '@root/api/DB';
import {errorAlert} from '@root/helpers/alertHelper';
import {delayHelper} from '@root/helpers/delayHelper';
import {addNewTaskListAction} from '@store/actions/tasksReducerActions/taskListsActions/addNewTaskListAction';
import {AddNewTaskListSagaActionReturnType} from '@store/actions/tasksSagaActions/taskListsSagasActions/addNewTaskListAction';
import {UserIDType} from '@store/reducers/authReducer/types';
import {TaskListInterface} from '@store/reducers/tasksReducer/types';
import {getUserID} from '@store/selectors/authSelectors';
import {t} from 'i18next';
import {call, put, select} from 'redux-saga/effects';

export function* addNewTaskListSaga(
  action: AddNewTaskListSagaActionReturnType,
) {
  try {
    const connectionStatus: NetInfoState = yield NetInfo.fetch();
    if (!connectionStatus.isInternetReachable) {
      errorAlert(t('common.NoInternetConnection'));
      return;
    }
    yield call(delayHelper, 10);

    yield call(action.payload.setIsLoading, true);
    const userID: UserIDType = yield select(getUserID);
    const addNewTaskListToFirebase = (newTaskList: TaskListInterface) => {
      return DB.ref(`${Users}/${userID}/${taskLists}/${newTaskList.id}`).set(
        newTaskList,
      );
    };

    yield call(addNewTaskListToFirebase, action.payload.newTaskList);
    yield put(addNewTaskListAction({taskList: action.payload.newTaskList}));
    yield call(action.payload.setIsLoading, false);
    yield call(action.payload.setModalVisible, false);
    yield call(action.payload.setNewTaskListTitle, '');
  } catch (error) {
    yield call(action.payload.setIsLoading, false);
    if (error instanceof Error) {
      errorAlert(error);
    }
  }
}
