import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';

import {GalleryStackNavigator} from './StackNavigator';
import {BottomTabNavigator} from './TabNavigator';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={BottomTabNavigator} />
      <Drawer.Screen name="Gallery" component={GalleryStackNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
