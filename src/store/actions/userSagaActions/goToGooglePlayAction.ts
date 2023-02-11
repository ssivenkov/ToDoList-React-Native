import { USER_SAGA_ACTION } from '@enums/userSagaEnum';

export type GoToGooglePlaySagaActionReturnType = {
  type: USER_SAGA_ACTION.GO_TO_GOOGLE_PLAY;
};

export type GoToGooglePlaySagaActionType = () => GoToGooglePlaySagaActionReturnType;

export const goToGooglePlayAction: GoToGooglePlaySagaActionType = () => ({
  type: USER_SAGA_ACTION.GO_TO_GOOGLE_PLAY,
});
