import { Button, Dialog, FAB, Portal, useTheme } from 'react-native-paper';
import React, { useState } from 'react';

import InputGroup from 'components/InputGroup';
import RandomResponseList from './RandomResponseList';
import { StyleSheet } from 'react-native';
import { useRandomResponseStore } from './store/useRandomResponseStore';

const RandomResponsesScreen = () => {
  const { colors } = useTheme();
  const [showDialog, setShowDialog] = useState(false);
  const [randomResponse, setRandResponse] = useState('');

  const { addRandomResponse } = useRandomResponseStore(state => state);

  const handleClose = () => setShowDialog(!showDialog);

  const handleAdd = () => {
    addRandomResponse(randomResponse);
    setRandResponse('');
    handleClose();
  };

  return (
    <>
      <RandomResponseList />
      <FAB
        icon="plus"
        style={styles.fab}
        color={colors.surface}
        onPress={() => setShowDialog(true)}
      />
      <Portal>
        <Dialog visible={showDialog} onDismiss={handleClose}>
          <Dialog.Title>Random response</Dialog.Title>
          <Dialog.Content>
            <InputGroup
              label="Response"
              value={randomResponse}
              onChangeText={text => setRandResponse(text)}
              placeholder="Type random response"
              autoCorrect={false}
              multiline
              numberOfLines={3}
            />
          </Dialog.Content>
          <Dialog.Actions style={styles.formActions}>
            <Button
              onPress={handleClose}
              style={styles.formButton}
              mode="outlined"
            >
              Cancel
            </Button>
            <Button
              onPress={handleAdd}
              style={styles.formButton}
              mode="contained"
            >
              Add
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
