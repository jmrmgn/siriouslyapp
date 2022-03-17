import { StyleSheet, Text, View } from 'react-native';

import React from 'react';

const EmptyList = () => {
  return (
    <View style={styles.container}>
      <Text>No data</Text>
    </View>
  );
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
