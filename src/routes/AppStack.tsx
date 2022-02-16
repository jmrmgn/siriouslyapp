import HomeScreen from '@/screens/HomeScreen';
// import Navbar from 'components/layout/Navbar';
import React from 'react';
import SettingsScreen from '@/screens/SettingsScreen';
// import SettingsScreen from 'screens/SettingsScreen';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const AppStack: React.FC = () => {
  return (
    <Stack.Navigator>
      {/* screenOptions={{ header: (props: any) => <Navbar {...props} /> }} */}
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        initialParams={{ isMain: true }}
      />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
