import { Alert, FlatList } from 'react-native';
import { List, Text } from 'react-native-paper';
import React, { useState } from 'react';

import EmptyList from 'components/EmptyList';
import { IRandomResponse } from './interfaces/randomResponse';
import RandomResponseFormDialog from './RandomResponseFormDialog';
import { useRandomResponseStore } from './store/useRandomResponseStore';

const RandomResponseList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [entry, setEntry] = useState<IRandomResponse>();
  const { randomResponses, deleteRandomResponse } = useRandomResponseStore(
    state => state
  );

  const handleClose = () => setIsOpen(false);

  const handlePressDelete = (id: number): void => {
    if (randomResponses.length > 3) {
      return deleteRandomResponse(id);
    }

    Alert.alert('Information', 'Entries should be at least three(3).');
  };

  const handleDelete = (id: number): void => {
    Alert.alert('Delete', 'Are you sure you want to delete this entry?', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel'
      },
      {
        text: 'OK',
        onPress: () => handlePressDelete(id)
      }
    ]);
  };

  const handleClickEntry = (_entry: IRandomResponse) => {
    setIsOpen(true);
    setEntry(_entry);
  };

  return (
    <>
      <FlatList
        data={randomResponses}
        renderItem={({ item: entry }) => (
          <List.Item
            key={entry.id}
            titleNumberOfLines={3}
            title={entry.message}
            titleStyle={{ fontStyle: 'italic' }}
            onPress={() => handleClickEntry(entry)}
            onLongPress={() => handleDelete(entry.id)}
          />
        )}
        keyExtractor={item => String(item.id)}
        ListEmptyComponent={
          <EmptyList>
            <Text>No Data</Text>
          </EmptyList>
        }
      />
      <RandomResponseFormDialog
        isOpen={isOpen}
        onClose={handleClose}
        randomResponseId={entry?.id}
      />
    </>
  );
};

export default RandomResponseList;
