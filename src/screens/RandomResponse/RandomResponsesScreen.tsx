import { FAB, useTheme } from 'react-native-paper';
import React, { useState } from 'react';

import RandomResponseFormDialog from './RandomResponseFormDialog';
import RandomResponseList from './RandomResponseList';
import { StyleSheet } from 'react-native';

const RandomResponsesScreen = () => {
  const { colors } = useTheme();
  const [showDialog, setShowDialog] = useState(false);

  const handleClose = () => setShowDialog(!showDialog);

  return (
    <>
      <RandomResponseList />
      <FAB
        icon="plus"
        style={styles.fab}
        color={colors.surface}
        onPress={() => setShowDialog(true)}
      />
      <RandomResponseFormDialog isOpen={showDialog} onClose={handleClose} />
    </>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 30,
    right: 0,
    bottom: 0
  },
  formActions: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    justifyContent: 'space-between'
  },
  formButton: {
    width: '47%'
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center'
  }
});

export default RandomResponsesScreen;
