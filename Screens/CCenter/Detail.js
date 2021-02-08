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
} from 'react-native';

import AutoHeightImage from 'react-native-auto-height-image';

import Header from '../Common/HeaderBackBtnNotSearch';
import Footer from '../Common/Footer';

const Detail = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  return (
    <>
      <Header title={routeName} navigation={navigation} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: 20 }}>
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
                {/* <View style={styles.categoryBtn}>
                  <Text style={styles.categoryBtnTxt}>카테고리A</Text>
                </View>
                <Text style={styles.new}>NEW</Text> */}
              </View>
              <Text style={styles.categoryDate}>2020.11.01</Text>
            </View>
            <Text style={styles.categoryTitle}>
              문의제목 문의제목 문의제목 문의제목 문의제목 문 의제목문의제목 문의제목 문의제목
              입니다.
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

        <View style={{ paddingHorizontal: 20 }}>
          {/* 이벤트 내용 */}
          <View style={{ marginTop: 15 }}>
            <Text
              style={[
                styles.normalText,
                { fontSize: 15, color: '#333333', lineHeight: 28, width: '100%', marginBottom: 20 },
              ]}>
              내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다
            </Text>
          </View>
          {/* // 이벤트 내용 */}
        </View>
      </ScrollView>
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
  categoryBtn: {
    backgroundColor: '#275696',
    borderRadius: 2,
    paddingVertical: 5,
    paddingHorizontal: 7,
    marginRight: 5,
  },
  categoryBtnTxt: {
    fontFamily: 'SCDream4',
    fontSize: 11,
    color: '#fff',
  },
  new: {
    fontFamily: 'SCDream4',
    fontSize: 12,
    color: '#366DE5',
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

export default Detail;
