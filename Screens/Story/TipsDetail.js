import * as React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
  Image,
  Linking,
  Platform,
} from 'react-native';
import {WebView} from 'react-native-webview';
import AutoHeightWebView from 'react-native-autoheight-webview';

import AutoHeightImage from 'react-native-auto-height-image';

import DetailHeader from '../Common/DetailHeader';
import Footer from '../Common/Footer';
import {SCDream4, SCDream5, SCDream6} from '../../src/font';

const TipsDetail = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;
  const {id, title, datetime, ca_name, new_yn} = props.route.params.item;

  console.log('props', props);

  const [getHeight, setGetHeight] = React.useState(null);

  return (
    <>
      <DetailHeader title={routeName} navigation={navigation} />
      <View style={[styles.container, {paddingHorizontal: 20}]}>
        <View style={styles.categoryWrap}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <View style={styles.categoryBtn}>
                <Text style={styles.categoryBtnTxt}>{ca_name}</Text>
              </View>
              <Text style={styles.new}>{new_yn === 'Y' ? 'NEW' : null}</Text>
            </View>
            <Text style={styles.categoryDate}>{datetime}</Text>
          </View>
          <Text style={styles.categoryTitle}>{title}</Text>
        </View>
      </View>

      <View
        style={{
          height: 1,
          width: Dimensions.get('window').width,
          backgroundColor: '#D7D7D7',
        }}
      />

      <View
        style={{
          width: '100%',
          height: Dimensions.get('window').height - 210,
        }}>
        {/* <AutoHeightWebView
          customScript={`
              document.body.style.background = '#fff'; 
              document.body.style.fontSize = '14px';
              document.body.style.lineHeight = '22px';
              `}
          onSizeUpdated={(size) => console.log(size.height)}
          style={{}}
          files={[
            {
              href: 'cssfileaddress',
              type: 'text/css',
              rel: 'stylesheet',
            },
          ]}
          source={{
            uri: `http://dmonster1506.cafe24.com/bbs/board.php?bo_table=info&wr_id=${id}`,
          }}
          scalesPageToFit={Platform.OS === 'ios' ? false : true}
          viewportContent={'width=device-width, user-scalable=no'}
        /> */}
        <AutoHeightWebView
          style={{
            width: Dimensions.get('window').width,
            backgroundColor: '#fff'
          }}
          source={{
            uri: `http://dmonster1506.cafe24.com/bbs/board.php?bo_table=info&wr_id=${id}`,
          }}
          customStyle={`
            p {
              font-size: 16px;
              line-height: 2em;
            }
          `}
          scalesPageToFit={Platform.OS === 'android' ? true : false}
          viewportContent={'width=device-width, user-scalable=no'}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  submitBtn: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#275696',
    backgroundColor: '#275696',
    width: '100%',
    paddingVertical: 15,
  },
  submitBtnText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
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
  categoryWrap: {
    marginTop: 20,
    paddingBottom: 10,
  },
  categoryBtn: {
    backgroundColor: '#275696',
    borderRadius: 2,
    paddingVertical: 5,
    paddingHorizontal: 7,
    marginRight: 5,
  },
  categoryBtnTxt: {
    fontFamily: SCDream4,
    fontSize: 11,
    color: '#fff',
  },
  new: {
    fontFamily: SCDream4,
    fontSize: 12,
    color: '#366DE5',
  },
  categoryTitle: {
    fontFamily: SCDream5,
    fontSize: 17,
    lineHeight: 24,
    color: '#000',
  },
  categoryDate: {
    fontFamily: SCDream4,
    fontSize: 13,
    color: '#A2A2A2',
  },
});

export default TipsDetail;
