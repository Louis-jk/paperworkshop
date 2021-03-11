import * as React from 'react';
import {Dimensions} from 'react-native';

import {createDrawerNavigator} from '@react-navigation/drawer';

import TabNavigator, {BottomTabNavigator} from './TabNavigator';

import DrawerMenu from './menu/DrawerMenu';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerPosition="right"
        drawerType="front"
        detachInactiveScreens={false}
        drawerStyle={{
          backgroundColor: '#fff',
          width: Dimensions.get('window').width,
        }}
        drawerContent={(props) => <DrawerMenu {...props} />}>
        <Drawer.Screen name="Home" component={TabNavigator} />
        <Drawer.Screen name="Root" component={BottomTabNavigator} />
      </Drawer.Navigator>
    </>
  );
};

export default DrawerNavigator;
