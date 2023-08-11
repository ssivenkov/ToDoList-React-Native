import { ExtendedStylesPropsType } from '@hooks/useStyles';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

type InfoFieldStylesType = {
  infoText: TextStyle;
  infoTextContainer: ViewStyle;
  suptext: TextStyle;
};

export const infoFieldStyles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<InfoFieldStylesType>({
    infoTextContainer: {
      paddingBottom: 10,
    },

    infoText: {
      width: '100%',
      fontSize: 18,
      lineHeight: 28,
      color: props.TEXT_COLOR,
      backgroundColor: props.PLACEHOLDER_COLOR,
      paddingHorizontal: 15,
      borderRadius: 8,
      flex: 1,
      alignSelf: 'center',
      paddingVertical: 10,
    },

    suptext: {
      fontSize: 14,
      color: props.TEXT_COLOR,
      paddingVertical: 8,
    },
  });
