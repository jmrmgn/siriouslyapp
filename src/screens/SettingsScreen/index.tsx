import {
  Button,
  Dialog,
  Divider,
  List,
  Portal,
  Text
} from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Configuration from './Configuration';
import InputGroup from 'components/InputGroup';
import { ItemHeader } from 'components/common';
import { Picker } from '@react-native-picker/picker';
import firestore from '@react-native-firebase/firestore';
import { getUniqueId } from 'react-native-device-info';

const NameField: React.FC = () => {
  const [selectedCat, setSelectedCat] = useState();
  const [categories, setCategories] = useState<any[]>([]);
  const categoriesRef = firestore().collection('categories');
  const usersRef = firestore().collection('users');

  const [showDialog, setShowDialog] = useState(false);
  const [name, setName] = useState<string>('');
  const [userId, setUserId] = useState<string>();

  const handleChangeName = () => {
    // TODO: Add validation if the uniqueId exist
    const _responseMode = selectedCat;
    const data = {
      name,
      responseMode: selectedCat,
      responseModeTxt:
        categories.find(cat => cat.id === _responseMode).name ?? ''
    };

    usersRef.doc(userId).update(data);
    setShowDialog(false);
  };

  useEffect(() => {
    return categoriesRef
      .where('userId', '==', `${getUniqueId()}`)
      .orderBy('createdAt', 'asc')
      .onSnapshot(querySnapshot => {
        const entries: any[] = [];
        querySnapshot.forEach(doc => {
          const { name } = doc.data();
          entries.push({
            id: doc.id,
            name
          });
        });

        setCategories(entries);
      });
  }, []);

  useEffect(() => {
    return usersRef
      .where('uniqueId', '==', getUniqueId())
      .onSnapshot(querySnapshot => {
        if (querySnapshot.size > 0) {
          const data = querySnapshot.docs[0].data();
          setName(data.name);
          setUserId(querySnapshot.docs[0].id);
          setSelectedCat(data.responseMode);
        }
      });
  }, []);

  return (
    <>
      <Portal>
        <Dialog visible={showDialog} onDismiss={() => setShowDialog(false)}>
          <Dialog.Title>Edit details</Dialog.Title>
          <Dialog.Content>
            <InputGroup
              label="Name"
              value={name}
              onChangeText={text => setName(text)}
              placeholder="Type name"
            />
            <Text>Response mode</Text>
            <Picker
              selectedValue={selectedCat}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedCat(itemValue)
              }
              style={{
                backgroundColor: '#e2e2e2'
              }}
            >
              {categories.map(cat => {
                return (
                  <Picker.Item key={cat.id} label={cat.name} value={cat.id} />
                );
              })}
            </Picker>
          </Dialog.Content>
          <Dialog.Actions style={style.formActions}>
            <Button
              style={style.formButton}
              mode="outlined"
              onPress={() => {
                setShowDialog(false);
              }}
            >
              Cancel
            </Button>
            <Button
              style={style.formButton}
              mode="contained"
              dark
              onPress={handleChangeName}
            >
              Ok
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <ItemHeader
        headerLabel="Details"
        actionLabel="Edit"
        onClickAction={() => {
          setShowDialog(true);
        }}
      />
      <List.Item
        title={name}
        description="Name"
        titleStyle={style.title}
        descriptionStyle={style.description}
        left={props => <List.Icon {...props} icon="account" />}
      />
    </>
  );
};

const ResponseModeField = () => {
  const [responseModeTxt, setResponseModeTxt] = useState('');
  const usersRef = firestore().collection('users');

  useEffect(() => {
    return usersRef
      .where('uniqueId', '==', getUniqueId())
      .onSnapshot(querySnapshot => {
        if (querySnapshot.size > 0) {
          const data = querySnapshot.docs[0].data();
          setResponseModeTxt(data.responseModeTxt);
        }
      });
  }, []);

  return (
    <List.Item
      title={responseModeTxt}
      description="Response mode"
      titleStyle={style.title}
      descriptionStyle={style.description}
      left={props => <List.Icon {...props} icon="head-cog" />}
    />
  );
};

const SettingsScreen: React.FC = () => {
  return (
    <View style={style.container}>
      <NameField />
      <ResponseModeField />
      <Divider style={{ marginVertical: 10 }} />
      <Configuration />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  title: { color: '#000' },
  description: { fontSize: 14, opacity: 0.75 },
  formActions: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    justifyContent: 'space-between'
  },
  formButton: {
    width: '47%'
  }
});

export default SettingsScreen;
