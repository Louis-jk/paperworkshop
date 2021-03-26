import * as React from 'react';
import {View, Text} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import Toast from 'react-native-toast-message';

const ToastComponent = () => {
  React.useEffect(() => {
    messaging().onMessage((remoteMessage) => {
      Toast.show({
        text1: `${remoteMessage.notification.title}`,
        text2: `${remoteMessage.notification.body}`,
      });
    });
  });

  return <Toast ref={(ref) => Toast.setRef(ref)} />;
};

export default ToastComponent;
