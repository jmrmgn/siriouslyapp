import {
  Button,
  Dialog,
  Divider,
  List,
  Portal,
  TextInput,
} from 'react-native-paper';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import useCategories, { Category as CategoryProp } from 'hooks/useCategories';

import { ItemHeader } from 'components/common';
import useAuth from 'hooks/useAuth';

type InputGroupProps = React.ComponentProps<typeof TextInput> & {
  label: string;
  autoFocus?: boolean;
};

const InputGroup: React.FC<InputGroupProps> = props => {
  const { label } = props;
  return (
    <View style={{ marginBottom: 20 }}>
      <Text>{label}</Text>
      <TextInput dense {...props} label={undefined} />
    </View>
  );
};

const NameField: React.FC = () => {
  const { authData, loading, signIn } = useAuth();

  const [showDialog, setShowDialog] = useState(false);
  const [name, setName] = useState(authData?.name);

  const handleChangeName = async () => {
    // Same as changing the name
    await signIn(name);
    setShowDialog(false);
  };

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <>
      <Portal>
        <Dialog visible={showDialog} onDismiss={() => setShowDialog(false)}>
          <Dialog.Title>Edit Name</Dialog.Title>
          <Dialog.Content>
            <TextInput
              autoFocus
              value={name}
              onChangeText={text => setName(text)}
              dense
              placeholder="Tell me your name"
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowDialog(false)}>Cancel</Button>
            <Button onPress={handleChangeName}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <ItemHeader
        headerLabel="Details"
        actionLabel="Edit"
        onClickAction={() => setShowDialog(true)}
      />
      <List.Item
        title={authData?.name}
        description="Name"
        titleStyle={style.title}
        descriptionStyle={style.description}
        left={props => <List.Icon {...props} icon="account" />}
      />
    </>
  );
};

const Categories: React.FC = () => {
  const { categories, addCategory, deleteCategory, updateCategory } =
    useCategories();
  const [showDialog, setShowDialog] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [phrase, setPhrase] = useState('');
  const [category, setCategory] = useState<CategoryProp>();
  const [edit, setEdit] = useState(false);

  const handleCloseForm = (): void => {
    setShowDialog(false);
    setEdit(false);
    setCategory(undefined);
    clearCategoryForm();
  };

  const handleManageCategory = () => {
    if (edit) {
      updateCategory(category?.id as number, { keyword, phrase });
    } else {
      addCategory({ keyword, phrase });
    }

    handleCloseForm();
  };

  const handleDeleteCategory = () => {
    if (category?.id) {
      deleteCategory(category.id as number);
      handleCloseForm();
    }
  };

  const handleClickCategory = (category: CategoryProp): void => {
    setCategory(category);
    setKeyword(category.keyword);
    setPhrase(category.phrase);
    setEdit(true);
    setShowDialog(true);
  };

  const clearCategoryForm = (): void => {
    setKeyword('');
    setPhrase('');
  };

  const formLabel = edit ? 'Edit' : 'Add';

  return (
    <>
      <Portal>
        <Dialog visible={showDialog} onDismiss={handleCloseForm}>
          <Dialog.Title>{formLabel} Category</Dialog.Title>
          <Dialog.Content>
            <InputGroup
              label="Keyword"
              value={keyword}
              onChangeText={text => setKeyword(text)}
              placeholder="Input keyword"
              autoCorrect={false}
            />
            <InputGroup
              label="Response"
              value={phrase}
              onChangeText={text => setPhrase(text)}
              placeholder="Input response"
              autoCorrect={false}
            />
          </Dialog.Content>
          <Dialog.Actions style={categoriesStyle.actionButtons}>
            {edit ? (
              <Button
                onPress={handleDeleteCategory}
                style={categoriesStyle.deleteActionButton}>
                Delete
              </Button>
            ) : null}
            <Button onPress={handleCloseForm}>Cancel</Button>
            <Button onPress={handleManageCategory}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <ItemHeader
        headerLabel="Categories"
        actionLabel="Add"
        onClickAction={() => setShowDialog(true)}
      />
      <FlatList
        data={categories}
        renderItem={({ item: category }) => (
          <List.Item
            key={category.id}
            title={category.keyword}
            description={category.phrase}
            titleStyle={style.title}
            descriptionStyle={style.description}
            onPress={() => handleClickCategory(category)}
          />
        )}
        keyExtractor={item => String(item.id)}
      />
    </>
  );
};

const categoriesStyle = StyleSheet.create({
  actionButtons: {
    display: 'flex',
  },
  deleteActionButton: {
    position: 'absolute',
    top: 9,
    left: 10,
  },
});

const SettingsScreen: React.FC = () => {
  return (
    <View style={style.container}>
      <NameField />
      <Divider style={{ marginVertical: 10 }} />
      <Categories />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  title: { color: '#000' },
  description: { fontSize: 14 },
});

export default SettingsScreen;
