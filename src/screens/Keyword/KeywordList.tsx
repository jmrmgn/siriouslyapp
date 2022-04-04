import { List, Text } from 'react-native-paper';

import EmptyList from 'components/EmptyList';
import { FlatList } from 'react-native';
import { IKeyword } from './interfaces/keyword';
import React from 'react';

const KeywordList = () => {
  const keywords: IKeyword[] = [
    { id: 1, name: 'Steak', response: 'Lorem ipsum sit amet dolor' },
    { id: 2, name: 'Chips', response: 'That’s a lot of sodium mate!' }
  ];

  const handleClick = () => {
    // TODO: Long Press
  };

  const handleDelete = () => {
    // TODO: Delete
  };

  return (
    <FlatList
      data={keywords}
      renderItem={({ item: entry }) => {
        return (
          <List.Item
            key={entry.id}
            title={entry.name}
            description={entry.response}
            descriptionNumberOfLines={3}
            descriptionStyle={{ fontStyle: 'italic' }}
            onPress={() => handleClick()}
            onLongPress={() => handleDelete()}
          />
        );
      }}
      keyExtractor={item => String(item.id)}
      ListEmptyComponent={
        <EmptyList>
          <Text>No Data</Text>
        </EmptyList>
      }
    />
  );
};

export default KeywordList;
