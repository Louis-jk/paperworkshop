import * as React from 'react';
import { View, Text, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import {
  MainStackNavigator,
  GalleryStackNavigator,
  PartnersStackNavigator,
  StoryStackNavigator,
  CCenterStackNavigator,
  PaperInfoStackNavigator,
  PartnersDetailStackNavigator,
  LoginStackNavigator,
  RegisterStackNavigator,
  SignedStackNavigator,
  FindIdStackNavigator,
  FindPwdStackNavigator,
  ProfileEditStackNavigator,
  MessageStackNavigator,
  MessageDetailStackNavigator,
  OrderStackNavigator,
  MyOrderStackNavigator,
  ReviewStackNavigator,
  ReviewDetailStackNavigator,
} from './StackNavigator';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#ACACAC',
        inactiveTintColor: '#ACACAC',
        labelStyle: {
          fontSize: 12,
          letterSpacing: -1,
          paddingBottom: 5,
        },
        style: {
          height: 70,
          width: '100%',
          paddingRight: 5,
        },
        showLabel: false,
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? require('../src/assets/micon01_on.png')
              : require('../src/assets/micon01.png');
          } else if (route.name === 'Gallery') {
            iconName = focused
              ? require('../src/assets/micon02_on.png')
              : require('../src/assets/micon02.png');
          } else if (route.name === 'Partners') {
            iconName = focused
              ? require('../src/assets/micon03_on.png')
              : require('../src/assets/micon03.png');
          } else if (route.name === 'Story') {
            iconName = focused
              ? require('../src/assets/micon04_on.png')
              : require('../src/assets/micon04.png');
          } else if (route.name === 'Ccenter') {
            iconName = focused
              ? require('../src/assets/micon05_on.png')
              : require('../src/assets/micon05.png');
          } else if (route.name === 'PaperInfo') {
            iconName = focused
              ? require('../src/assets/micon06_on.png')
              : require('../src/assets/micon06.png');
          }

          return <Image source={iconName} resizeMode="contain" style={{ width: 50, height: 70 }} />;
        },
      })}>
      <Tab.Screen name="Home" component={MainStackNavigator} options={{ tabBarLabel: '홈' }} />
      <Tab.Screen
        name="Gallery"
        component={GalleryStackNavigator}
        options={{ tabBarLabel: '갤러리' }}
      />
      <Tab.Screen
        name="Partners"
        component={PartnersStackNavigator}
        options={{ tabBarLabel: '파트너스' }}
      />
      <Tab.Screen
        name="Story"
        component={StoryStackNavigator}
        options={{ tabBarLabel: '제작스토리' }}
      />
      <Tab.Screen
        name="Ccenter"
        component={CCenterStackNavigator}
        options={{ tabBarLabel: '고객센터' }}
      />
      <Tab.Screen
        name="PaperInfo"
        component={PaperInfoStackNavigator}
        options={{ tabBarLabel: '지류정보' }}
      />
    </Tab.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginStackNavigator} />
      <Stack.Screen name="Stack" component={BottomTabNavigator} />
      <Stack.Screen name="Register" component={RegisterStackNavigator} />
      <Stack.Screen name="ProfileEdit" component={ProfileEditStackNavigator} />
      <Stack.Screen name="Signed" component={SignedStackNavigator} />
      <Stack.Screen name="FindId" component={FindIdStackNavigator} />
      <Stack.Screen name="FindPwd" component={FindPwdStackNavigator} />
      <Stack.Screen name="Message" component={MessageStackNavigator} />
      <Stack.Screen name="MessageDetail" component={MessageDetailStackNavigator} />
      <Stack.Screen name="Order" component={OrderStackNavigator} />
      <Stack.Screen name="OrderStep02" component={OrderStackNavigator} />
      <Stack.Screen name="OrderStep03" component={OrderStackNavigator} />
      <Stack.Screen name="easyOrderComplete" component={OrderStackNavigator} />
      <Stack.Screen name="CancelOrder" component={MyOrderStackNavigator} />
      <Stack.Screen name="MyOrder" component={MyOrderStackNavigator} />
      <Stack.Screen name="MyOrderReqDetailList" component={MyOrderStackNavigator} />
      <Stack.Screen name="SelectPartnerStep01" component={MyOrderStackNavigator} />
      <Stack.Screen name="SelectPartnerStep02" component={MyOrderStackNavigator} />
      <Stack.Screen name="SelectPartnerStep03" component={MyOrderStackNavigator} />
      <Stack.Screen name="Receive" component={MyOrderStackNavigator} />
      <Stack.Screen name="Done" component={MyOrderStackNavigator} />
      <Stack.Screen name="CopyOrder" component={MyOrderStackNavigator} />
      <Stack.Screen name="OrderDetail" component={MyOrderStackNavigator} />
      <Stack.Screen name="FeedBack" component={MyOrderStackNavigator} />
      <Stack.Screen name="Review" component={ReviewStackNavigator} />
      <Stack.Screen name="ReviewDetail" component={ReviewDetailStackNavigator} />
      <Stack.Screen name="PartnersDetail" component={PartnersDetailStackNavigator} />
    </Stack.Navigator>
  );
};

export default TabNavigator;
