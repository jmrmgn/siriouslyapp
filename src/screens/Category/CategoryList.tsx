import { Alert, FlatList, StyleSheet, View } from 'react-native';
import { Chip, List, Text } from 'react-native-paper';
import React, { useState } from 'react';

import CategoryFormDialog from './CategoryFormDialog';
import EmptyList from 'components/EmptyList';
import { ICategory } from './interfaces/category';
import { useCategoryStore } from './store/useCategoryStore';

const CategoryList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState<ICategory>();
  const { categories, deleteCategory } = useCategoryStore(state => state);

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

  const handleClickEntry = (_category: ICategory) => {
    setIsOpen(true);
    setCategory(_category);
  };

  return (
    <>
      <FlatList
        data={categories}
        renderItem={({ item: entry }) => {
          return (
            <>
              <List.Section>
                <List.Item
                  key={entry.id}
                  titleNumberOfLines={3}
                  title={entry.name}
                  description={entry.responses}
                  descriptionNumberOfLines={3}
                  onPress={() => handleClickEntry(entry)}
                  onLongPress={() => handleDelete(entry.id)}
                />
                {(entry.keywords ?? []).length > 0 && (
                  <View style={styles.chipContainer}>
                    {(entry.keywords ?? []).map((_entry, index: number) => (
                      <Chip key={index} style={styles.chip}>
                        {_entry}
                      </Chip>
                    ))}
                  </View>
                )}
              </List.Section>
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
        categoryId={category?.id}
      />
    </>
  );
};

const styles = StyleSheet.create({
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    paddingVertical: 5
  },
  chip: {
    marginRight: 5,
    marginTop: 2
  }
});

export default CategoryList;
