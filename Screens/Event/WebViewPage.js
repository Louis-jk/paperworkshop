import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {WebView} from 'react-native-webview';
import AutoHeightWebView from 'react-native-autoheight-webview';

import moment from 'moment';
import 'moment/locale/ko';
import axios from 'axios';
import qs from 'qs';

import Header from '../Common/DetailHeader';

const WebViewPage = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;
  const id = props.route.params.id;
  const description = props.route.params.description;

  const [eventDetail, setEventDetail] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [getHeight, setGetHeight] = React.useState(null);

  const getApi = () => {
    setIsLoading(true);
    axios({
      method: 'post',
      url: 'http://dmonster1506.cafe24.com/json/proc_json.php',
      data: qs.stringify({
        method: 'proc_event_detail',
        id,
      }),
    })
      .then((res) => {
        if (res.data.result === '1' && res.data.count === 1) {
          setEventDetail(res.data.item);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          Alert.alert(res.data.message, '', [
            {
              text: '확인',
            },
          ]);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        Alert.alert('오류가 발생했습니다. \n 관리자에게 문의하세요.', err, [
          {
            text: '확인',
          },
        ]);
      });
  };

  React.useEffect(() => {
    getApi();
  }, []);

  return (
    <>
      <Header title={routeName} navigation={navigation} />
      {isLoading && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            flex: 1,
            height: Dimensions.get('window').height,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 100,
            elevation: 0,
            backgroundColor: 'rgba(255,255,255,0.5)',
          }}>
          <ActivityIndicator size="large" color="#275696" />
        </View>
      )}
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {eventDetail !== null && (
          <>
            <View style={{paddingHorizontal: 20}}>
              <View style={styles.categoryWrap}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 10,
                  }}>
                  <Text style={styles.normalText}>{eventDetail[0].title}</Text>
                  <Text style={styles.categoryDate}>
                    {moment(eventDetail[0].datetime).format('YYYY.MM.DD')}
                  </Text>
                </View>
                <Text style={styles.categoryTitle}>
                  {eventDetail[0].description}
                </Text>
              </View>
            </View>

            <View
              style={{
                height: 1,
                width: Dimensions.get('window').width,
                backgroundColor: '#D7D7D7',
                marginBottom: 10,
              }}
            />

            <View style={{paddingHorizontal: 20}}>
              <AutoHeightWebView
                customScript={`
                  document.body.style.background = '#fff'; 
                  document.body.style.fontSize = '14px';
                  document.body.style.lineHeight = '22px';
               `}
                style={{
                  alignSelf: 'center',
                  flex: 1,
                  width: Dimensions.get('window').width,
                  height: Dimensions.get('window').height - 160,
                  marginTop: 10,
                }}
                onSizeUpdated={(size) => {
                  setGetHeight(size.height);
                }}
                files={[
                  {
                    href: 'cssfileaddress',
                    type: 'text/css',
                    rel: 'stylesheet',
                  },
                ]}
                source={{
                  uri: `http://dmonster1506.cafe24.com/bbs/board.php?bo_table=event&wr_id=${id}`,
                }}
                scalesPageToFit={Platform.OS === 'ios' ? false : true}
                viewportContent={'width=device-width, user-scalable=no'}
              />
            </View>
          </>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    // flex: 1,
    // justifyContent: 'flex-start',
    // alignItems: 'center',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
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
  categoryWrap: {
    marginTop: 20,
    paddingBottom: 10,
  },
  categoryTitle: {
    fontFamily: 'SCDream5',
    fontSize: 17,
    lineHeight: 24,
    color: '#000',
  },
  categoryDate: {
    fontFamily: 'SCDream4',
    fontSize: 13,
    color: '#A2A2A2',
  },
});

export default WebViewPage;
