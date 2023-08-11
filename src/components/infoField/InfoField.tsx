import React from 'react';

import { infoFieldStyles } from '@components/infoField/styles';
import { InfoFieldPropsType } from '@components/infoField/types';
import { formatDateHelper } from '@helpers/dateHelpers';
import { useStyles } from '@hooks/useStyles';
import i18next from 'i18next';
import { nanoid } from 'nanoid';
import { Text, View } from 'react-native';

export const InfoField = (props: InfoFieldPropsType) => {
  const { infoText, suptext } = props;

  const styles = useStyles(infoFieldStyles);

  const text = formatDateHelper(infoText, i18next.language);

  return (
    <View style={styles.infoTextContainer}>
      {suptext && <Text style={styles.suptext}>{suptext}</Text>}
      <Text key={nanoid()} style={styles.infoText}>
        {text}
      </Text>
    </View>
  );
};
