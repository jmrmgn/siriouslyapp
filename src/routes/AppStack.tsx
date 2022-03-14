import CategoriesScreen from 'screens/Category/CategoriesScreen';
import HomeScreen from '@/screens/HomeScreen';
import Navbar from '@/components/layouts/Navbar';
import React from 'react';
import ResponsesScreen from 'screens/Response/ResponsesScreen';
import SettingsScreen from '@/screens/SettingsScreen';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const AppStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{ header: (props: any) => <Navbar {...props} /> }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        initialParams={{ isMain: true }}
      />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Categories" component={CategoriesScreen} />
      <Stack.Screen name="Responses" component={ResponsesScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
