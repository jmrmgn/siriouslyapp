import { Alert, FlatList } from 'react-native';
import { List, Text } from 'react-native-paper';
import React, { useState } from 'react';

import EmptyList from './EmptyList';
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

  const handleDelete = (id: number): void => {
    Alert.alert('Delete', 'Are you sure you want to delete this category?', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel'
      },
      { text: 'OK', onPress: () => deleteRandomResponse(id) }
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
            onPress={() => handleClickEntry(entry)}
            onLongPress={() => handleDelete(entry.id)}
          />
        )}
        keyExtractor={item => String(item.id)}
        ListEmptyComponent={<EmptyList />}
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
