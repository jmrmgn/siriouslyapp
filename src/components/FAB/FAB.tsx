import { FAB as RnpFAB, useTheme } from 'react-native-paper';

import React from 'react';
import { StyleSheet } from 'react-native';

interface IFABProps {
  icon?: string;
  onPress: () => void;
  color?: string;
}

const FAB = (props: IFABProps) => {
  const { icon, onPress, color } = props;
  const { colors } = useTheme();

  return (
    <RnpFAB
      style={styles.fab}
      icon={icon ?? 'plus'}
      color={color ?? colors.surface}
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 30,
    right: 0,
    bottom: 0
  }
});

export default FAB;
