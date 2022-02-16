import { useNavigation, useRoute } from '@react-navigation/native';

import { Appbar } from 'react-native-paper';
import React from 'react';

interface Props {
  back?: any;
}

const HEADER_TITLE = 'Siriously';

const Navbar: React.FC<Props> = props => {
  const { back } = props;
  const navigation = useNavigation<any>();
  const route: any = useRoute();

  const isMainPage = route?.params?.isMain;
  const headerTitle = route?.params?.headerTitle ?? route?.name;

  return (
    <Appbar.Header dark>
      {back && <Appbar.BackAction onPress={navigation.goBack} />}
      <Appbar.Content title={isMainPage ? HEADER_TITLE : headerTitle} />
      {isMainPage && (
        <Appbar.Action
          icon="dots-vertical"
          onPress={() => navigation.push('Settings')}
        />
      )}
    </Appbar.Header>
  );
};

export default Navbar;
