import { Alert, FlatList } from 'react-native';

import { List } from 'react-native-paper';
import React from 'react';
import { useRandomResponseStore } from './store/useRandomResponseStore';

const RandomResponseList = () => {
  const { randomResponses, deleteRandomResponse } = useRandomResponseStore(
    state => state
  );

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

  return (
    <FlatList
      data={randomResponses}
      renderItem={({ item: entry }) => (
        <List.Item
          key={entry.id}
          titleNumberOfLines={3}
          title={entry.message}
          onPress={() => {}}
          onLongPress={() => handleDelete(entry.id)}
          delayLongPress={100}
        />
      )}
      keyExtractor={item => String(item.id)}
    />
  );
};

export default RandomResponseList;
