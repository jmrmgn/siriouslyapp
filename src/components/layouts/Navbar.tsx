import { TAppNavProps, TAppRouteProps } from 'routes/App/types';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Appbar } from 'react-native-paper';
import { EAppScreen } from 'routes/App/enums';
import React from 'react';

const HEADER_TITLE = 'Seriously';

export interface INavBarProps {
  back?: boolean;
}

const Navbar = (props: INavBarProps) => {
  const { back } = props;
  const navigation = useNavigation<TAppNavProps>();
  const route = useRoute<TAppRouteProps<EAppScreen.Home>>();

  const isMainPage = route?.params?.isMain;
  const headerTitle = route?.params?.headerTitle ?? route?.name;

  return (
    <Appbar.Header dark>
      {back && <Appbar.BackAction onPress={navigation.goBack} />}
      <Appbar.Content title={isMainPage ? HEADER_TITLE : headerTitle} />
      {isMainPage && (
        <Appbar.Action
          icon="dots-vertical"
          onPress={() => navigation.push(EAppScreen.Settings)}
        />
      )}
    </Appbar.Header>
  );
};

export default Navbar;
