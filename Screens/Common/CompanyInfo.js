import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Platform,
} from 'react-native';
import {WebView} from 'react-native-webview';
import AutoHeightWebView from 'react-native-autoheight-webview';

import Header from '../Common/Header';
import Footer from '../Common/Footer';
import {SCDream4, SCDream5, SCDream6} from '../../src/font';


// import { WebView } from 'react-native-webview';

const CompanyInfo = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  return (
    <>
      <Header title={routeName} navigation={navigation} />

      <AutoHeightWebView
        style={{
          width: Dimensions.get('window').width - 20,
          height: Dimensions.get('window').height - 300,
        }}
        source={{
          uri: `http://dmonster1506.cafe24.com/bbs/content.php?co_id=company`,
        }}
        scalesPageToFit={Platform.OS === 'android' ? true : false}
        viewportContent={'width=device-width, user-scalable=no'}
      />
      <Footer navigation={navigation} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  content: {
    flex: 1,
    height: Dimensions.get('window').height - 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  normalText: {
    fontFamily: SCDream4,
  },
  mediumText: {
    fontFamily: SCDream5,
  },
  boldText: {
    fontFamily: SCDream6,
  },
});

export default CompanyInfo;
