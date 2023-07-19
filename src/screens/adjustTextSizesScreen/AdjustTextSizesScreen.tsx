import React, { useState } from 'react';

import { ModalMenuButtonVisualExample } from '@components/buttons/modalMenuButton/ModalMenuButtonVisualExample';
import { Separator } from '@components/buttons/modalMenuButton/Separator';
import { DoneButton } from '@components/header/buttons/doneButton/DoneButton';
import { DoneButtonPropsType } from '@components/header/buttons/doneButton/types';
import { GoBackButton } from '@components/header/buttons/goBackButton/GoBackButton';
import { Header } from '@components/header/Header';
import { NotepadInputVisualExample } from '@components/inputs/NotepadInputVisualExample';
import { modalStyles } from '@components/modals/modalStyles';
import { RangeSlider } from '@components/rangeSlider/RangeSlider';
import { TaskVisualExample } from '@components/task/TaskVisualExample';
import { TaskListVisualExample } from '@components/taskList/TaskListVisualExample';
import { useStyles } from '@hooks/useStyles';
import { useNavigation } from '@react-navigation/native';
import { TextSizesStateType } from '@screens/adjustTextSizesScreen/types';
import { changeTextSizesAction } from '@store/actions/userSagaActions/changeTextSizesAction';
import {
  accentColorSelector,
  modalButtonTextSizeSelector,
  notepadTextSizeSelector,
  modalWindowTextSizeSelector,
  taskListTitleSizeSelector,
  taskTextSizeSelector,
  themeSelector,
} from '@store/selectors/userSelectors';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { adjustTextSizesScreenStyles } from './styles';

const SLIDER_MIN_VALUE = 5;
const SLIDER_MAX_VALUE = 30;
const SMALL_WIDTH_MIN_VALUE = 10;
const SLIDER_STEP = 0.5;

export const AdjustTextSizesScreen = () => {
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const { t } = useTranslation();

  const styles = useStyles(adjustTextSizesScreenStyles);
  const modStyles = useStyles(modalStyles);

  const theme = useSelector(themeSelector);
  const taskListTitleSizeFromStore = useSelector(taskListTitleSizeSelector);
  const taskTextSizeFromStore = useSelector(taskTextSizeSelector);
  const notepadTextSizeFromStore = useSelector(notepadTextSizeSelector);
  const modalWindowTextSizeFromStore = useSelector(modalWindowTextSizeSelector);
  const modalButtonTextSizeFromStore = useSelector(modalButtonTextSizeSelector);
  const accentColor = useSelector(accentColorSelector);

  const [taskListTitleSize, setTaskListTitleSize] = useState<
    TextSizesStateType['taskListTitleSize']
  >(taskListTitleSizeFromStore);
  const [taskTextSize, setTaskTextSize] =
    useState<TextSizesStateType['taskTextSize']>(taskTextSizeFromStore);
  const [notepadTextSize, setNotepadTextSize] = useState<
    TextSizesStateType['notepadTextSize']
  >(notepadTextSizeFromStore);
  const [modalWindowTextSize, setModalWindowTextSize] = useState<
    TextSizesStateType['modalWindowTextSize']
  >(modalWindowTextSizeFromStore);
  const [modalButtonTextSize, setModalButtonTextSize] = useState<
    TextSizesStateType['modalButtonTextSize']
  >(modalButtonTextSizeFromStore);
  const [notepadText, setNotepadText] = useState<string>(
    t('adjustTextSizesScreen.NotepadVisualExampleText'),
  );

  const goBack = () => {
    navigation.goBack();
  };

  const onDonePress: DoneButtonPropsType['onPress'] = (setLoading, setButtonDisabled) => {
    dispatch(
      changeTextSizesAction({
        goBack,
        setButtonDisabled,
        setLoading,
        modalButtonTextSize,
        taskListTitleSize,
        taskTextSize,
        notepadTextSize,
        modalWindowTextSize,
      }),
    );
  };

  return (
    <View>
      <Header
        leftButton={<GoBackButton />}
        rightButton={<DoneButton onPress={onDonePress} />}
        title={t('adjustTextSizesScreen.HeaderTitle')}
      />
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps='handled'
      >
        <View style={styles.exampleContainer}>
          <TaskListVisualExample
            taskListTitleSize={taskListTitleSize}
            tasks={
              <>
                <TaskVisualExample
                  taskTitle={t('adjustTextSizesScreen.TaskVisualExample1Text')}
                  textSize={taskTextSize}
                />
                <TaskVisualExample
                  taskTitle={t('adjustTextSizesScreen.TaskVisualExample2Text')}
                  textSize={taskTextSize}
                />
                <TaskVisualExample
                  taskTitle={t('adjustTextSizesScreen.TaskVisualExample3Text')}
                  textSize={taskTextSize}
                />
              </>
            }
            title={t('adjustTextSizesScreen.TaskListVisualExampleTitle')}
          />
        </View>
        <Text style={styles.exampleText}>
          {t('adjustTextSizesScreen.TaskListSliderTitle')}
        </Text>
        <RangeSlider
          initialAndCurrentValue={taskListTitleSize}
          maxValue={SLIDER_MAX_VALUE}
          minValue={SLIDER_MIN_VALUE}
          setValue={(value) => {
            setTaskListTitleSize(value);
          }}
          step={SLIDER_STEP}
          thumbColor={accentColor}
          trackColor={accentColor}
          valueContainerStyle={styles.sliderValueContainer}
          valueStyle={
            taskListTitleSize < SMALL_WIDTH_MIN_VALUE
              ? styles.sliderValueSingleNumber
              : styles.sliderValue
          }
        />
        <Text style={styles.exampleText}>
          {t('adjustTextSizesScreen.TaskSliderTitle')}
        </Text>
        <RangeSlider
          initialAndCurrentValue={taskTextSize}
          maxValue={SLIDER_MAX_VALUE}
          minValue={SLIDER_MIN_VALUE}
          setValue={(value) => {
            setTaskTextSize(value);
          }}
          step={SLIDER_STEP}
          thumbColor={accentColor}
          trackColor={accentColor}
          valueContainerStyle={styles.sliderValueContainer}
          valueStyle={
            taskTextSize < SMALL_WIDTH_MIN_VALUE
              ? styles.sliderValueSingleNumber
              : styles.sliderValue
          }
        />
        <View style={styles.divider} />
        <View style={styles.exampleContainer}>
          <NotepadInputVisualExample
            onValueChange={setNotepadText}
            textSize={notepadTextSize}
            value={notepadText}
          />
        </View>
        <Text style={styles.exampleText}>
          {t('adjustTextSizesScreen.NotepadSliderTitle')}
        </Text>
        <RangeSlider
          initialAndCurrentValue={notepadTextSize}
          maxValue={SLIDER_MAX_VALUE}
          minValue={SLIDER_MIN_VALUE}
          setValue={(value) => {
            setNotepadTextSize(value);
          }}
          step={SLIDER_STEP}
          thumbColor={accentColor}
          trackColor={accentColor}
          valueContainerStyle={styles.sliderValueContainer}
          valueStyle={
            notepadTextSize < SMALL_WIDTH_MIN_VALUE
              ? styles.sliderValueSingleNumber
              : styles.sliderValue
          }
        />
        <View style={styles.divider} />
        <View style={styles.exampleContainer}>
          <View
            style={
              theme.darkMode
                ? modStyles.centeredViewVisualExampleDark
                : modStyles.centeredViewVisualExampleLight
            }
          >
            <View style={modStyles.modalView}>
              <View style={modStyles.descriptionContainer}>
                <Text
                  style={[modStyles.textVisualExample, { fontSize: modalWindowTextSize }]}
                >
                  {t('adjustTextSizesScreen.ModalVisualExampleText')}
                </Text>
              </View>
              <View style={modStyles.buttonsContainer}>
                <ModalMenuButtonVisualExample
                  textSize={modalButtonTextSize}
                  title={t('common.Close')}
                />
                <Separator />
                <ModalMenuButtonVisualExample
                  textSize={modalButtonTextSize}
                  title={t('common.Ok')}
                />
              </View>
            </View>
          </View>
        </View>
        <Text style={styles.exampleText}>
          {t('adjustTextSizesScreen.ModalWindowSliderTitle')}
        </Text>
        <RangeSlider
          initialAndCurrentValue={modalWindowTextSize}
          maxValue={SLIDER_MAX_VALUE}
          minValue={SLIDER_MIN_VALUE}
          setValue={(value) => {
            setModalWindowTextSize(value);
          }}
          step={SLIDER_STEP}
          thumbColor={accentColor}
          trackColor={accentColor}
          valueContainerStyle={styles.sliderValueContainer}
          valueStyle={
            modalWindowTextSize < SMALL_WIDTH_MIN_VALUE
              ? styles.sliderValueSingleNumber
              : styles.sliderValue
          }
        />
        <Text style={styles.exampleText}>
          {t('adjustTextSizesScreen.ModalButtonSliderTitle')}
        </Text>
        <RangeSlider
          initialAndCurrentValue={modalButtonTextSize}
          maxValue={SLIDER_MAX_VALUE}
          minValue={SLIDER_MIN_VALUE}
          setValue={(value) => {
            setModalButtonTextSize(value);
          }}
          step={SLIDER_STEP}
          thumbColor={accentColor}
          trackColor={accentColor}
          valueContainerStyle={styles.sliderValueContainer}
          valueStyle={
            modalButtonTextSize < SMALL_WIDTH_MIN_VALUE
              ? styles.sliderValueSingleNumber
              : styles.sliderValue
          }
        />
      </ScrollView>
    </View>
  );
};
