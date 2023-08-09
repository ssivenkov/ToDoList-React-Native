import React, { useState } from 'react';

import {
  taskMenuButtonDarkGradient,
  taskMenuButtonLightGradient,
} from '@colors/gradients';
import { commonButtonStyles } from '@components/buttons/commonButtonStyles';
import { menuHorizontalStyles } from '@components/menus/menuHorizontal/styles';
import { ModalIcon } from '@components/modals/ModalIcon';
import { Switcher } from '@components/switcher/Switcher';
import {
  ASCENDING,
  DESCENDING,
  ICON_SIZE_SMALL,
  switcherMargin,
} from '@constants/constants';
import { sortingTypeVariants } from '@constants/defaultValues';
import { faSort } from '@fortawesome/free-solid-svg-icons/faSort';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useStyles } from '@hooks/useStyles';
import { SetStateType } from '@root/types/common/types';
import { editTaskListSortingStyles } from '@screens/tasksScreen/buttons/editTaskListSortingButton/styles';
import { editTaskListSortingAction } from '@store/actions/tasksSagaActions/taskListsSagasActions/editTaskListSortingAction';
import { SortingValuesType, TaskListType } from '@store/reducers/tasksReducer/types';
import { themeSelector } from '@store/selectors/userSelectors';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import { useDispatch, useSelector } from 'react-redux';

import { EditTaskListSortingButtonPropsType } from './types';

export const EditTaskListSortingButton = ({
  oldTaskListSorting,
  taskListID,
  setIsMenuHorizontalVisible,
}: EditTaskListSortingButtonPropsType) => {
  const dispatch = useDispatch();

  const theme = useSelector(themeSelector);

  const menuHorizontalStyle = useStyles(menuHorizontalStyles);
  const styles = useStyles(editTaskListSortingStyles);

  const { t } = useTranslation();

  const [sortingValue, setSortingValue] = useState<string>(oldTaskListSorting.type);
  const [sortingOrder, setSortingOrder] = useState<string>(
    oldTaskListSorting.isAscending ? ASCENDING : DESCENDING,
  );
  const [isSwitcherOn, setIsSwitcherOn] = useState<boolean>(
    oldTaskListSorting.isAutosorting,
  );

  const taskMenuButtonGradient = theme.darkMode
    ? taskMenuButtonDarkGradient
    : taskMenuButtonLightGradient;

  const sortingValueButtons: RadioButtonProps[] = [
    {
      id: 'modificationDate',
      label: t('tasksScreen.sortByModificationDate'),
      value: 'modificationDate',
      labelStyle: styles.sortingLabel,
      containerStyle: styles.sortingLabelContainer,
      borderColor: theme.TEXT_COLOR,
      color: theme.TEXT_COLOR,
    },
    {
      id: 'date',
      label: t('tasksScreen.sortByCreationDate'),
      value: 'creationDate',
      labelStyle: styles.sortingLabel,
      containerStyle: styles.sortingLabelContainer,
      borderColor: theme.TEXT_COLOR,
      color: theme.TEXT_COLOR,
    },
    {
      id: 'title',
      label: t('tasksScreen.sortByTitle'),
      value: 'title',
      labelStyle: styles.sortingLabel,
      containerStyle: styles.sortingLabelContainer,
      borderColor: theme.TEXT_COLOR,
      color: theme.TEXT_COLOR,
    },
  ];

  const sortingTypeButtons: RadioButtonProps[] = [
    {
      id: ASCENDING,
      label: t('tasksScreen.sortAscendingType'),
      value: ASCENDING,
      labelStyle: styles.sortingLabel,
      containerStyle: styles.sortingLabelContainer,
      borderColor: theme.TEXT_COLOR,
      color: theme.TEXT_COLOR,
    },
    {
      id: DESCENDING,
      label: t('tasksScreen.sortDescendingType'),
      value: DESCENDING,
      labelStyle: styles.sortingLabel,
      containerStyle: styles.sortingLabelContainer,
      borderColor: theme.TEXT_COLOR,
      color: theme.TEXT_COLOR,
    },
  ];

  const onOkPress = (
    setIsLoading: SetStateType<boolean>,
    setModalVisible: SetStateType<boolean>,
  ) => {
    const sortingType = sortingValue as SortingValuesType;

    const editedTaskListSorting: TaskListType['sorting'] = {
      isAscending: sortingOrder === ASCENDING,
      type: sortingType,
      isAutosorting: isSwitcherOn,
    };

    if (sortingTypeVariants.includes(sortingType)) {
      dispatch(
        editTaskListSortingAction({
          editedTaskListSorting,
          setIsLoading,
          setIsMenuHorizontalVisible,
          setModalVisible,
          taskListID,
        }),
      );
    }
  };

  const onClosePress = () => {
    setIsMenuHorizontalVisible(false);
  };

  return (
    <ModalIcon
      buttonIcon={
        <LinearGradient colors={taskMenuButtonGradient}>
          <View style={menuHorizontalStyle.middleButtonContainer}>
            <View style={commonButtonStyles.buttonContainer}>
              <FontAwesomeIcon
                color={theme.ICON_BUTTON_COLOR}
                icon={faSort}
                size={ICON_SIZE_SMALL}
              />
            </View>
          </View>
        </LinearGradient>
      }
      closeHandler={onClosePress}
      description={t('tasksScreen.ModalSortingTitle')}
      okHandler={onOkPress}
      okText={t('common.Confirm')}
    >
      <View style={styles.sortingContainer}>
        <RadioGroup
          onPress={setSortingValue}
          radioButtons={sortingValueButtons}
          selectedId={sortingValue}
        />
        <View style={styles.separator} />
        <RadioGroup
          onPress={setSortingOrder}
          radioButtons={sortingTypeButtons}
          selectedId={sortingOrder}
        />
        <View style={styles.separator} />
        <Switcher
          containerStyle={styles.switcherContainer}
          isOn={isSwitcherOn}
          onToggleSwitcherClick={setIsSwitcherOn}
          size='medium'
          switcherMarginLeft={18}
          switcherMarginRight={switcherMargin}
          switcherText={t('tasksScreen.taskAutosorting')}
          textMarginBottom={3}
          textStyle={styles.switcherText}
        />
      </View>
    </ModalIcon>
  );
};
