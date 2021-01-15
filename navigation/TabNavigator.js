import * as React from 'react';
import {View, Text, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

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
        activeTintColor: '#0a0a0a',
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
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === '홈') {
            iconName = focused
              ? require('../src/images/tabIcon/home.png')
              : require('../src/images/tabIcon/home_off.png');
          } else if (route.name === '갤러리') {
            iconName = focused
              ? require('../src/images/tabIcon/gallery.png')
              : require('../src/images/tabIcon/gallery_off.png');
          } else if (route.name === '파트너스') {
            iconName = focused
              ? require('../src/images/tabIcon/handshake.png')
              : require('../src/images/tabIcon/handshake_off.png');
          } else if (route.name === '제작스토리') {
            iconName = focused
              ? require('../src/images/tabIcon/chat.png')
              : require('../src/images/tabIcon/chat_off.png');
          } else if (route.name === '고객센터') {
            iconName = focused
              ? require('../src/images/tabIcon/headphones.png')
              : require('../src/images/tabIcon/headphones_off.png');
          } else if (route.name === '지류정보') {
            iconName = focused
              ? require('../src/images/tabIcon/text.png')
              : require('../src/images/tabIcon/text_off.png');
          }

          return (
            <Image
              source={iconName}
              resizeMode="contain"
              style={{width: 30, height: 30}}
            />
          );
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
