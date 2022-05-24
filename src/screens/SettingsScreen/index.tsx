import React, { useEffect, useState } from 'react';
import SettingsForm, { EFieldName } from './SettingsForm';
import { StyleSheet, View } from 'react-native';

import Configuration from './Configuration';
import { ItemHeader } from 'components/common';
import { List } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import { getUniqueId } from 'react-native-device-info';

interface INameFieldProps {
  onClick: (fieldName: EFieldName) => void;
}

const NameField = ({ onClick }: INameFieldProps) => {
  const usersRef = firestore().collection('users');
  const [name, setName] = useState<string>('');

  useEffect(() => {
    return usersRef
      .where('uniqueId', '==', getUniqueId())
      .onSnapshot(querySnapshot => {
        if (querySnapshot.size > 0) {
          const data = querySnapshot.docs[0].data();
          setName(data.name);
        }
      });
  }, []);

  return (
    <>
      <List.Item
        title="Name"
        description={name}
        titleStyle={style.title}
        descriptionStyle={style.description}
        left={props => <List.Icon {...props} icon="account" />}
        onPress={() => onClick(EFieldName.Name)}
      />
    </>
  );
};

interface IResponseModeFieldProps {
  onClick: (fieldName: EFieldName) => void;
}

const ResponseModeField = ({ onClick }: IResponseModeFieldProps) => {
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
      title="Current response-mode"
      description={responseModeTxt}
      titleStyle={style.title}
      descriptionStyle={style.description}
      left={props => <List.Icon {...props} icon="head-cog" />}
      onPress={() => onClick(EFieldName.ResponseMode)}
    />
  );
};

const SettingsScreen = () => {
  const [open, setOpen] = useState(false);
  const [selectedField, setSelectedField] = useState(EFieldName.Name);

  const handleClick = (fieldName: EFieldName) => {
    setSelectedField(fieldName);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <View style={style.container}>
      <SettingsForm
        open={open}
        onClose={handleClose}
        fieldName={selectedField}
      />
      <ItemHeader headerLabel="Tap to edit" />
      {/* <NameField onClick={handleClick} /> */}
      <ResponseModeField onClick={handleClick} />
      <Configuration />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1
  },
  title: { fontSize: 14, opacity: 0.75, fontWeight: 'bold' },
  description: { color: '#000', fontWeight: 'bold' },
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
