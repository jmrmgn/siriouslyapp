import { Alert, FlatList } from 'react-native';
import { List, Text } from 'react-native-paper';
import React, { useEffect, useState } from 'react';

import EmptyList from 'components/EmptyList';
import { IRandomResponse } from './interfaces/randomResponse';
import RandomResponseFormDialog from './RandomResponseFormDialog';
import firestore from '@react-native-firebase/firestore';

const RandomResponseList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [entry, setEntry] = useState<IRandomResponse>();
  const [randomResponses, setRandomResponses] = useState<IRandomResponse[]>([]);
  const ref = firestore().collection('randomResponses');

  const handleClose = () => setIsOpen(false);

  const handlePressDelete = (id: string): void => {
    if (randomResponses.length > 3) {
      ref
        .doc(id)
        .delete()
        .then(() => {});
      return;
    }
    Alert.alert('Information', 'Entries should be at least three(3).');
  };

  const handleDelete = (id: string): void => {
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

  useEffect(() => {
    return ref.orderBy('createdAt', 'asc').onSnapshot(querySnapshot => {
      const entries: IRandomResponse[] = [];
      querySnapshot.forEach(doc => {
        const { message } = doc.data();
        entries.push({
          id: doc.id,
          message
        });
      });

      setRandomResponses(entries);
    });
  }, []);

  return (
    <>
      <FlatList
        data={randomResponses}
        renderItem={({ item }) => (
          <List.Item
            key={item.id}
            titleNumberOfLines={3}
            title={item.message}
            titleStyle={{ fontStyle: 'italic' }}
            onPress={() => handleClickEntry(item)}
            onLongPress={() => handleDelete(item.id)}
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
        // randomResponseId={entry?.id}
        randomResponse={entry}
      />
    </>
  );
};

export default RandomResponseList;
