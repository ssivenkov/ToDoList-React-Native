import React, { useLayoutEffect, useRef, useState } from 'react';

import CancelIcon from '@assets/images/icons/cancel.svg';
import { COLORS } from '@colors/colors';
import { commonButtonStyles } from '@components/buttons/commonButtonStyles';
import { SmallLoader } from '@components/loaders/smallLoader/SmallLoader';
import { MOVE_TASK_IN_DONE, MOVE_TASK_IN_TODO } from '@components/snackBar/actions';
import { snackBarStyles } from '@components/snackBar/styles';
import { SnackBarAnimationParamsType } from '@components/snackBar/types';
import { ICON_SIZE_EXTRA_SMALL } from '@constants/constants';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faUndoAlt } from '@fortawesome/free-solid-svg-icons/faUndoAlt';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useStyles } from '@hooks/useStyles';
import { deleteSnackBarEventAction } from '@store/actions/snackBarActions/deleteSnackBarEventAction';
import { setTaskIsDoneAction } from '@store/actions/tasksSagaActions/tasksSagasActions/setTaskIsDoneAction';
import { setTaskIsToDoAction } from '@store/actions/tasksSagaActions/tasksSagasActions/setTaskIsToDoAction';
import { SnackBarReducerStateType } from '@store/reducers/snackBarReducer/types';
import { snackBarEventSelector } from '@store/selectors/snackBarSelectors';
import {
  emulatorStatusBarHeightSelector,
  themeSelector,
} from '@store/selectors/userSelectors';
import { isEqual } from 'lodash';
import { useTranslation } from 'react-i18next';
import {
  Animated,
  Modal,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

export const SnackBar = () => {
  const dispatch = useDispatch();

  const styles = useStyles(snackBarStyles);

  const { t } = useTranslation();

  const theme = useSelector(themeSelector);
  const snackBarEvent = useSelector(snackBarEventSelector);
  const emulatorStatusBarHeight = useSelector(emulatorStatusBarHeightSelector);

  const { height: appHeight } = useWindowDimensions();

  const [cancelPending, setCancelPending] = useState<boolean>(false);
  const [cancelFulfilled, setCancelFulfilled] = useState<boolean>(false);
  const [screenBlocking, setScreenBlocking] = useState<boolean>(false);
  const [oldEvent, setOldEvent] = useState<SnackBarReducerStateType['event']>(null);

  const isSnackBarShow = !!snackBarEvent;
  const isOldEvent = isSnackBarShow && isEqual(oldEvent, snackBarEvent);

  const eventIcon =
    snackBarEvent !== null && snackBarEvent.action === MOVE_TASK_IN_TODO
      ? faCheck
      : faUndoAlt;

  if (!isOldEvent && snackBarEvent !== null) {
    setOldEvent(snackBarEvent);
  }

  const defaultFlowCondition = isSnackBarShow && !cancelPending && !cancelFulfilled;
  const cancelResolveFlowCondition = isSnackBarShow && cancelPending && cancelFulfilled;

  const { PURPLE_HEART, ELECTRIC_VIOLET3 } = COLORS;

  const hiddenSnackBarHeight = -50;
  const visibleSnackBarHeight = 53;
  const hiddenSnackBarValue = hiddenSnackBarHeight - appHeight + emulatorStatusBarHeight;
  const visibleSnackBarValue =
    visibleSnackBarHeight - appHeight + emulatorStatusBarHeight;
  const showAnimationDuration = 280;
  const hideAnimationDuration = 200;
  const hideAnimationDelay = 2500;
  const deleteEventDelay =
    showAnimationDuration + hideAnimationDelay + hideAnimationDuration;
  const disableLoadingDelay = hideAnimationDelay + hideAnimationDuration;
  const cancelIconSize = 17;

  const offsetAnimation = useRef(
    new Animated.Value(cancelPending ? visibleSnackBarValue : hiddenSnackBarValue),
  ).current;

  const snackBarAnimation = (params: SnackBarAnimationParamsType) => {
    const { toValue, duration } = params;

    Animated.timing(offsetAnimation, {
      duration: duration,
      toValue: toValue,
      useNativeDriver: false,
    }).start();
  };

  const onCancelPress = () => {
    if (isSnackBarShow) {
      const { taskID, taskListID, taskTitle, action } = snackBarEvent;

      switch (action) {
        case MOVE_TASK_IN_TODO: {
          setScreenBlocking(true);
          dispatch(
            setTaskIsToDoAction({
              doneTaskID: taskID,
              taskListID,
              taskTitle,
              setSnackBarCancelPending: setCancelPending,
              setSnackBarCancelFulfilled: setCancelFulfilled,
            }),
          );
          break;
        }

        case MOVE_TASK_IN_DONE: {
          setScreenBlocking(true);
          dispatch(
            setTaskIsDoneAction({
              toDoTaskID: taskID,
              taskListID,
              taskTitle,
              setSnackBarCancelPending: setCancelPending,
              setSnackBarCancelFulfilled: setCancelFulfilled,
            }),
          );
          break;
        }

        default:
          return;
      }
    }
  };

  useLayoutEffect(() => {
    if (defaultFlowCondition) {
      snackBarAnimation({
        toValue: visibleSnackBarValue,
        duration: showAnimationDuration,
      });

      const deleteEventTimeout = setTimeout(() => {
        dispatch(deleteSnackBarEventAction());
      }, deleteEventDelay);

      const hideAnimationTimeout = setTimeout(() => {
        snackBarAnimation({
          toValue: hiddenSnackBarValue,
          duration: hideAnimationDuration,
        });
      }, hideAnimationDelay);

      const disableLoadingTimeout = setTimeout(() => {
        setCancelPending(false);
      }, disableLoadingDelay);

      return () => {
        clearTimeout(deleteEventTimeout);
        clearTimeout(hideAnimationTimeout);
        clearTimeout(disableLoadingTimeout);
      };
    } else if (cancelResolveFlowCondition) {
      snackBarAnimation({
        toValue: hiddenSnackBarValue,
        duration: hideAnimationDuration,
      });

      const afterSnackBarHideTimeout = setTimeout(() => {
        dispatch(deleteSnackBarEventAction());
        setCancelPending(false);
        setCancelFulfilled(false);
        setScreenBlocking(false);
      }, hideAnimationDuration);

      return () => {
        clearTimeout(afterSnackBarHideTimeout);
      };
    }
  }, [oldEvent, isSnackBarShow, cancelPending, cancelFulfilled]);

  return (
    <View>
      <View>
        <Modal transparent={true} visible={screenBlocking} />
      </View>
      <Animated.View style={[styles.snackBarWrapper, { bottom: offsetAnimation }]}>
        <View style={styles.snackBar}>
          <View style={styles.leftContainer}>
            <View style={commonButtonStyles.buttonContainerLargePaddingHorizontal}>
              <FontAwesomeIcon
                color={theme.TEXT_COLOR}
                icon={eventIcon}
                size={ICON_SIZE_EXTRA_SMALL}
              />
            </View>
          </View>
          {snackBarEvent && (
            <View style={styles.middleContainer}>
              <Text style={styles.message}>
                {t(snackBarEvent.snackBarUntranslatedText)}
              </Text>
            </View>
          )}
          {cancelPending ? (
            <View style={styles.rightLoaderContainer}>
              <SmallLoader isDarkTheme={theme.darkMode} />
            </View>
          ) : (
            <TouchableOpacity onPress={onCancelPress} style={styles.rightContainer}>
              <View style={styles.rightContainerIconWrapper}>
                <CancelIcon
                  fill={theme.darkMode ? ELECTRIC_VIOLET3 : PURPLE_HEART}
                  height={cancelIconSize}
                  width={cancelIconSize}
                />
              </View>
              <Text style={styles.buttonText}>{t('common.Cancel')}</Text>
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>
    </View>
  );
};
