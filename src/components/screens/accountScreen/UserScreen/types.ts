type UserDataType = {
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
};

export type UserScreenPropsType = {
  userData: UserDataType;
  signOutCallback: () => void;
};
