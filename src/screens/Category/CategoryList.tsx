import { Alert, FlatList, StyleSheet, View } from 'react-native';
import { List, Text } from 'react-native-paper';
import React, { useEffect, useState } from 'react';

import CategoryFormDialog from './CategoryFormDialog';
import Divider from 'components/Divider';
import { EAppScreen } from 'routes/App/enums';
import EmptyList from 'components/EmptyList';
import { ICategory } from './interfaces/category';
import { ItemHeader } from 'components/common';
import { TAppNavProps } from 'routes/App/types';
import firestore from '@react-native-firebase/firestore';
import useAuthContext from 'hooks/useAuthContext';
import { useCategoryStore } from './store/useCategoryStore';
import { useNavigation } from '@react-navigation/native';

const CategoryList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState<ICategory>();
  const [categories, setCategories] = useState<any[]>([]);
  const { deleteCategory } = useCategoryStore(state => state);
  const navigation = useNavigation<TAppNavProps>();
  const categoriesRef = firestore().collection('categories');
  const { authData } = useAuthContext();

  const handleClose = () => setIsOpen(false);

  const handleDelete = (id: number): void => {
    Alert.alert('Delete', 'Are you sure you want to delete this category?', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel'
      },
      { text: 'OK', onPress: () => deleteCategory(id) }
    ]);
  };

  // const handleClickEntry = (_category: ICategory) => {
  //   setIsOpen(true);
  //   setCategory(_category);
  // };

  const handleClickCategory = (entry: any) => {
    navigation.push(EAppScreen.Keywords, {
      headerTitle: entry.name,
      categoryId: entry.id
    });
  };

  useEffect(() => {
    return categoriesRef
      .where('userId', '==', `${authData.uniqueId}`)
      .orderBy('createdAt', 'asc')
      .onSnapshot(querySnapshot => {
        const entries: any[] = [];
        (querySnapshot ?? []).forEach(doc => {
          const { name } = doc.data();
          entries.push({
            id: doc.id,
            name
          });
        });

        setCategories(entries);
      });
  }, []);

  return (
    <View style={styles.container}>
      <ItemHeader headerLabel="Tap a response-mode to edit. Long press to delete." />
      <FlatList
        data={categories}
        renderItem={({ item: entry }) => {
          return (
            <>
              <List.Item
                key={entry.id}
                titleNumberOfLines={3}
                title={entry.name}
                onPress={() => handleClickCategory(entry)}
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
      <CategoryFormDialog
        isOpen={isOpen}
        onClose={handleClose}
        category={category}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default CategoryList;
