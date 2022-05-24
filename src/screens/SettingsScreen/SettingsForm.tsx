import { Button, Dialog, Portal } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';

import InputGroup from 'components/InputGroup';
import { Picker } from '@react-native-picker/picker';
import firestore from '@react-native-firebase/firestore';
import { getUniqueId } from 'react-native-device-info';

export enum EFieldName {
  Name = 'Name',
  ResponseMode = 'ResponseMode'
}

interface ISettingsFormProps {
  open: boolean;
  onClose: () => void;
  fieldName: EFieldName;
}

const SettingsForm = (props: ISettingsFormProps) => {
  const { open, onClose, fieldName } = props;
  const [selectedCat, setSelectedCat] = useState();
  const [categories, setCategories] = useState<any[]>([]);
  const categoriesRef = firestore().collection('categories');
  const usersRef = firestore().collection('users');

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
    onClose();
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
    <Portal>
      <Dialog visible={open} onDismiss={onClose}>
        <Dialog.Title>Select a response-mode</Dialog.Title>
        <Dialog.Content>
          {fieldName === EFieldName.Name && (
            <InputGroup
              label="Name"
              value={name}
              onChangeText={text => setName(text)}
              placeholder="Type name"
            />
          )}
          {fieldName === EFieldName.ResponseMode && (
            <>
              <Picker
                selectedValue={selectedCat}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedCat(itemValue)
                }
                style={{
                  backgroundColor: '#e2e2e2',
                  color: '#000'
                }}
              >
                {categories.map(cat => {
                  return (
                    <Picker.Item
                      style={{ color: '#000' }}
                      key={cat.id}
                      label={cat.name}
                      value={cat.id}
                    />
                  );
                })}
              </Picker>
            </>
          )}
        </Dialog.Content>
        <Dialog.Actions style={style.formActions}>
          <Button style={style.formButton} mode="outlined" onPress={onClose}>
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
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  title: { fontSize: 14, opacity: 0.75 },
  description: { color: '#000' },
  formActions: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    justifyContent: 'space-between'
  },
  formButton: {
    width: '47%'
  }
});

export default SettingsForm;
