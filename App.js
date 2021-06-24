import React, {useState, useEffect} from 'react';
import {StatusBar, BackHandler, ToastAndroid} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import messaging from '@react-native-firebase/messaging';
import Toast from 'react-native-simple-toast';

import DrawerNavigator from './navigation/DrawerNavigator';

const App = () => {
  // 안드로이드 뒤로가기 버튼 제어
  React.useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);

    messaging().onMessage((remoteMessage) => {
      Toast.showWithGravity(
        `${remoteMessage.data.message}`,
        Toast.LONG,
        Toast.TOP,
        [' UIAlertController '],
      );
    });
  }, []);

  const [exitApp, setExitApp] = React.useState(false);
  const ref = React.createRef(null);

  // 0618, 0621
  // const backAction = () => {
  //   let tmp =
  //     ref.current?.getRootState().routes[0].state.index != undefined
  //       ? ref.current?.getRootState().routes[0].state.index
  //       : tmp;

  //   let timeout;

  //   if (tmp == 0) {
  //     if (exitApp == undefined || !exitApp) {
  //       ToastAndroid.show(
  //         '한번 더 누르면 앱을 종료합니다.',
  //         ToastAndroid.SHORT,
  //       );
  //       setExitApp(true);

  //       timeout = setTimeout(() => {
  //         setExitApp(false);
  //       }, 2000);
  //     } else {
  //       clearTimeout(timeout);
  //       BackHandler.exitApp(); // 앱 종료
  //     }
  //     return true;
  //   }
  // };

  // React.useEffect(() => {
  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     backAction,
  //   );

  //   return () =>
  //     BackHandler.removeEventListener('hardwareBackPress', backHandler);
  // }, [exitApp]);

  return (
    <>
      <StatusBar hidden={true} />
      <NavigationContainer ref={ref}>
        <DrawerNavigator />
      </NavigationContainer>
    </>
  );
};

export default React.memo(App);
