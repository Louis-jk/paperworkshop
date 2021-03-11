import * as React from 'react';
import {View, Text, StatusBar, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import messaging from '@react-native-firebase/messaging';
// import Toast from 'react-native-toast-message';
import Toast from 'react-native-simple-toast';

import DrawerNavigator from './navigation/DrawerNavigator';

// import MainScreen from './Screens/Main';
// import PartnersScreen from './Screens/Partners';

// import {MainStackNavigator} from './navigation/StackNavigation';
// import {BottomTabNavigator} from './navigation/TabNavigator';

const App = () => {
  React.useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);

    messaging().onMessage((remoteMessage) => {
      console.log('remoteMessage', remoteMessage);
      Toast.showWithGravity(
        `${remoteMessage.data.message}`,
        Toast.LONG,
        Toast.TOP,
        [' UIAlertController '],
      );
      // Toast.show({
      //   text1: `${remoteMessage.notification.title}`,
      //   text2: `${remoteMessage.notification.body}`,
      // });
    });
  }, []);

  return (
    <>
      <StatusBar hidden={true} />
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </>
  );
};

export default App;
