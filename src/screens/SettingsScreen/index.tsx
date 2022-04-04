import {
  Button,
  Dialog,
  Divider,
  List,
  Portal,
  Text
} from 'react-native-paper';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Configuration from './Configuration';
import InputGroup from 'components/InputGroup';
import { ItemHeader } from 'components/common';
import { Picker } from '@react-native-picker/picker';
import useAuthContext from 'hooks/useAuthContext';

const NameField: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState();
  const { authData, signIn } = useAuthContext();

  const [showDialog, setShowDialog] = useState(false);
  const [name, setName] = useState<string>(authData?.name ?? '');

  const handleChangeName = () => {
    signIn(name);
    setShowDialog(false);
  };

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
              selectedValue={selectedLanguage}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedLanguage(itemValue)
              }
              style={{
                backgroundColor: '#e2e2e2'
              }}
            >
              <Picker.Item label="Java" value="java" />
              <Picker.Item label="JavaScript" value="js" />
            </Picker>
          </Dialog.Content>
          <Dialog.Actions style={style.formActions}>
            <Button
              style={style.formButton}
              mode="outlined"
              onPress={() => setShowDialog(false)}
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

const ResponseModeField = () => {
  return (
    <List.Item
      title="Something"
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
