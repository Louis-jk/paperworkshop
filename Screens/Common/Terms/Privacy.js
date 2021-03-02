import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, Dimensions} from 'react-native';
import {WebView} from 'react-native-webview';
import AutoHeightWebView from 'react-native-autoheight-webview';

import Header from '../DetailHeader';

const index = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  const [getHeight, setGetHeight] = React.useState(null);

  return (
    <>
      <Header title={routeName} navigation={navigation} />

      <AutoHeightWebView
        style={{
          width: Dimensions.get('window').width - 20,
        }}
        customScript={`document.body.style.background = 'lightyellow';`}
        customStyle={`
          * {
            font-family: 'Times New Roman';
          }
          p {
            font-size: 16px;
          }
        `}
        onSizeUpdated={(size) => console.log(size.height)}
        files={[
          {
            href: 'cssfileaddress',
            type: 'text/css',
            rel: 'stylesheet',
          },
        ]}
        source={{
          uri: `http://dmonster1506.cafe24.com/bbs/content.php?co_id=privacy`,
        }}
        scalesPageToFit={true}
        viewportContent={'width=device-width, user-scalable=no'}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  normalText: {
    fontFamily: 'SCDream4',
  },
  mediumText: {
    fontFamily: 'SCDream5',
  },
  boldText: {
    fontFamily: 'SCDream6',
  },
});

export default index;
