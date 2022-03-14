import { ItemHeader } from 'components/common';
import { List } from 'react-native-paper';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const Configuration = () => {
  const navigation = useNavigation<any>();

  return (
    <>
      <ItemHeader headerLabel="Configuration" />
      <List.Item
        title="Categories"
        left={props => (
          <List.Icon {...props} icon="format-list-bulleted-square" />
        )}
        onPress={() => navigation.push('Categories')}
      />
      <List.Item
        title="Responses"
        left={props => <List.Icon {...props} icon="message-question" />}
        onPress={() => navigation.push('Responses')}
      />
    </>
  );
};

export default Configuration;
