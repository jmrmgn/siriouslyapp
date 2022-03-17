import CategoriesScreen from 'screens/Category/CategoriesScreen';
import { EAppScreen } from './enums';
import HomeScreen from '@/screens/HomeScreen';
import Navbar from '@/components/layouts/Navbar';
import RandomResponsesScreen from 'screens/RandomResponse/RandomResponsesScreen';
import React from 'react';
import SettingsScreen from '@/screens/SettingsScreen';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const AppStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{ header: (props: any) => <Navbar {...props} /> }}
    >
      <Stack.Screen
        name={EAppScreen.Home}
        component={HomeScreen}
        initialParams={{ isMain: true }}
      />
      <Stack.Screen name={EAppScreen.Settings} component={SettingsScreen} />
      <Stack.Screen name={EAppScreen.Categories} component={CategoriesScreen} />
      <Stack.Screen
        name={EAppScreen.RandomResponses}
        component={RandomResponsesScreen}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
