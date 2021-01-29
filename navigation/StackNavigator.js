import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import MainScreen from '../Screens/Main';
import EstimateScreen from '../Screens/Main/Estimate';
import GalleryScreen from '../Screens/Gallery';
import GalleryDetailScreen from '../Screens/Gallery/Detail';
import PartnersScreen from '../Screens/Partners';
import PartnersDetailScreen from '../Screens/Partners/Detail';
import StoryScreen from '../Screens/Story';
import CCenterScreen from '../Screens/CCenter';
import PaperInfoScreen from '../Screens/PaperInfo';
import TermsScreen from '../Screens/Common/Terms';
import PrivacyScreen from '../Screens/Common/Terms/Privacy';

import LoginScreen from '../Screens/Profile/Auth/Login';
import RegisterScreen from '../Screens/Profile/Auth/Register';
import SignedScreen from '../Screens/Profile/Auth/Signed';
import FindIdScreen from '../Screens/Profile/Auth/FindId';
import FindPwdScreen from '../Screens/Profile/Auth/FindPwd';
import SetPwdScreen from '../Screens/Profile/Auth/SetPwd';
import SetPwdCompleteScreen from '../Screens/Profile/Auth/SetPwdComplete';
import ProfileEditScreen from '../Screens/Profile/Edit';
import MyOrderScreen from '../Screens/Profile/MyOrder';

import MessageScreen from '../Screens/Message';
import MessageDetailScreen from '../Screens/Message/Detail';
import OrderStep01Screen from '../Screens/Order';
import OrderStep02Screen from '../Screens/Order/Step02';
import OrderStep03Screen from '../Screens/Order/Step03';
import OrderStep04Screen from '../Screens/Order/Step04';
import easyOrderCompleteScreen from '../Screens/Order/easyOrderComplete';

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
      <Stack.Screen name="GalleryDetail" component={GalleryDetailScreen} />
    </Stack.Navigator>
  );
};
export const PartnersStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Partners" component={PartnersScreen} />
      <Stack.Screen name="PartnersDetail" component={PartnersDetailScreen} />
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

export const ProfileEditStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileEdit" component={ProfileEditScreen} />
    </Stack.Navigator>
  );
};

export const LoginStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export const RegisterStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export const SignedStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Signed" component={SignedScreen} />
    </Stack.Navigator>
  );
};

export const FindIdStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FindId" component={FindIdScreen} />
    </Stack.Navigator>
  );
};

export const FindPwdStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FindPwd" component={FindPwdScreen} />
      <Stack.Screen name="SetPwd" component={SetPwdScreen} />
      <Stack.Screen name="SetPwdComplete" component={SetPwdCompleteScreen} />
    </Stack.Navigator>
  );
};

export const MessageStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Message" component={MessageScreen} />
      <Stack.Screen name="MessageDetail" component={MessageDetailScreen} />
    </Stack.Navigator>
  );
};

export const OrderStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Order" component={OrderStep01Screen} />
      <Stack.Screen name="OrderStep02" component={OrderStep02Screen} />
      <Stack.Screen name="OrderStep03" component={OrderStep03Screen} />
      <Stack.Screen name="OrderStep04" component={OrderStep04Screen} />
      <Stack.Screen name="easyOrderComplete" component={easyOrderCompleteScreen} />
    </Stack.Navigator>
  );
};

export const MyOrderStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyOrder" component={MyOrderScreen} />
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
