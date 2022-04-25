import { EAppScreen } from 'routes/App/enums';
import { ItemHeader } from 'components/common';
import { List } from 'react-native-paper';
import React from 'react';
import { TAppNavProps } from 'routes/App/types';
import { useNavigation } from '@react-navigation/native';

const Configuration = () => {
  const navigation = useNavigation<TAppNavProps>();

  return (
    <>
      <List.Item
        title="Keywords and Responses"
        left={props => (
          <List.Icon {...props} icon="format-list-bulleted-square" />
        )}
        onPress={() => navigation.push(EAppScreen.Categories)}
      />
      <List.Item
        title="Random Responses"
        left={props => <List.Icon {...props} icon="message-question" />}
        onPress={() => navigation.push(EAppScreen.RandomResponses)}
      />
    </>
  );
};

export default Configuration;
