import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import MainScreen from '../Screens/Main';
import EstimateScreen from '../Screens/Main/Estimate';
import GalleryScreen from '../Screens/Gallery';
import PartnersScreen from '../Screens/Partners';
import StoryScreen from '../Screens/Story';
import CCenterScreen from '../Screens/CCenter';
import PaperInfoScreen from '../Screens/PaperInfo';
import TermsScreen from '../Screens/Common/Terms';
import PrivacyScreen from '../Screens/Common/Terms/Privacy';

const Stack = createStackNavigator();

export const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#9AC4F8',
        },
        headerTintColor: 'white',
        headerBackTitle: 'Back',
        headerShown: false,
      }}>
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="Partners" component={PartnersScreen} />
      <Stack.Screen name="Terms" component={TermsScreen} />
      <Stack.Screen name="Privacy" component={PrivacyScreen} />
      <Stack.Screen name="Estimate" component={EstimateScreen} />
    </Stack.Navigator>
  );
};

export const GalleryStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Gallery" component={GalleryScreen} />
    </Stack.Navigator>
  );
};
export const PartnersStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Partners" component={PartnersScreen} />
    </Stack.Navigator>
  );
};
export const StoryStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Story" component={StoryScreen} />
    </Stack.Navigator>
  );
};
export const CCenterStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CCenter" component={CCenterScreen} />
    </Stack.Navigator>
  );
};
export const PaperInfoStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PaperInfo" component={PaperInfoScreen} />
    </Stack.Navigator>
  );
};

const StackNavigation = () => {
  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default StackNavigation;
