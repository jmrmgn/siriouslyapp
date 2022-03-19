import { StyleSheet, Text, View } from 'react-native';

import React from 'react';

interface IEmptyListProps {
  children: React.ReactNode;
}

const EmptyList = (props: IEmptyListProps) => {
  const { children } = props;
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20
  }
});

export default EmptyList;
