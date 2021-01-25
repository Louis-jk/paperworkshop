import * as React from 'react';
import { View, Text, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
  MainStackNavigator,
  GalleryStackNavigator,
  PartnersStackNavigator,
  StoryStackNavigator,
  CCenterStackNavigator,
  PaperInfoStackNavigator,
} from './StackNavigator';

const Tab = createBottomTabNavigator();

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
          paddingTop: 7,
        },
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === '홈') {
            iconName = focused
              ? require('../src/assets/micon01_on.png')
              : require('../src/assets/micon01.png');
          } else if (route.name === '갤러리') {
            iconName = focused
              ? require('../src/assets/micon02_on.png')
              : require('../src/assets/micon02.png');
          } else if (route.name === '파트너스') {
            iconName = focused
              ? require('../src/assets/micon03_on.png')
              : require('../src/assets/micon03.png');
          } else if (route.name === '제작스토리') {
            iconName = focused
              ? require('../src/assets/micon04_on.png')
              : require('../src/assets/micon04.png');
          } else if (route.name === '고객센터') {
            iconName = focused
              ? require('../src/assets/micon05_on.png')
              : require('../src/assets/micon05.png');
          } else if (route.name === '지류정보') {
            iconName = focused
              ? require('../src/assets/micon06_on.png')
              : require('../src/assets/micon06.png');
          }

          return <Image source={iconName} resizeMode="contain" style={{ width: 40, height: 50 }} />;
        },
      })}>
      <Tab.Screen name="홈" component={MainStackNavigator} />
      <Tab.Screen name="갤러리" component={GalleryStackNavigator} />
      <Tab.Screen name="파트너스" component={PartnersStackNavigator} />
      <Tab.Screen name="제작스토리" component={StoryStackNavigator} />
      <Tab.Screen name="고객센터" component={CCenterStackNavigator} />
      <Tab.Screen name="지류정보" component={PaperInfoStackNavigator} />
    </Tab.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default TabNavigator;
