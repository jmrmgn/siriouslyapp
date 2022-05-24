import { Alert, FlatList } from 'react-native';
import { List, Text } from 'react-native-paper';
import React, { useEffect, useState } from 'react';

import Divider from 'components/Divider';
import { EAppScreen } from 'routes/App/enums';
import EmptyList from 'components/EmptyList';
import KeywordFormDialog from './KeywordFormDialog';
import { TAppRouteProps } from 'routes/App/types';
import firestore from '@react-native-firebase/firestore';
import { useRoute } from '@react-navigation/native';

const KeywordList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [entry, setEntry] = useState<any>();
  const [keywords, setKeywords] = useState<any[]>([]);
  const route = useRoute<TAppRouteProps<EAppScreen.Keywords>>();
  const categoryId = route.params.categoryId;
  const keywordsRef = firestore().collection('keywords');

  const handleClose = () => setIsOpen(false);

  const handleClick = (_entry: any) => {
    setIsOpen(true);

    setEntry(_entry);
  };

  const handleDelete = (id: string) => {
    // TODO: Delete
    Alert.alert('Delete', 'Are you sure you want to delete this entry?', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel'
      },
      {
        text: 'OK',
        onPress: () => {
          keywordsRef
            .doc(id)
            .delete()
            .then(() => {});
        }
      }
    ]);
  };

  const getData = () => {
    keywordsRef
      .where('categoryId', '==', categoryId)
      .orderBy('createdAt', 'asc')
      .onSnapshot(querySnapshot => {
        const entries: any[] = [];
        (querySnapshot ?? []).forEach(doc => {
          const { name, response } = doc.data();
          entries.push({
            id: doc.id,
            name,
            response
          });
        });

        setKeywords(entries);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <FlatList
        data={keywords}
        renderItem={({ item: entry }) => {
          return (
            <>
              <List.Item
                key={entry.id}
                title={entry.name}
                description={entry.response}
                descriptionNumberOfLines={3}
                descriptionStyle={{ fontStyle: 'italic' }}
                onPress={() => handleClick(entry)}
                onLongPress={() => handleDelete(entry.id)}
              />
              <Divider />
            </>
          );
        }}
        keyExtractor={item => String(item.id)}
        ListEmptyComponent={
          <EmptyList>
            <Text>No Data</Text>
          </EmptyList>
        }
      />
      <KeywordFormDialog
        isOpen={isOpen}
        onClose={handleClose}
        // randomResponseId={entry?.id}
        keyword={entry}
      />
    </>
  );
};

export default KeywordList;
