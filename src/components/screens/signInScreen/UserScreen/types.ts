type UserDataType = {
  displayName: string | null;
  photoURL: string | null;
};

export type UserScreenPropsType = {
  userData: UserDataType;
  signOutCallback: () => void;
};
