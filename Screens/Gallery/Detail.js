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
import Swiper from 'react-native-swiper';
import Carousel from 'react-native-snap-carousel';

import DetailHeader from '../Common/DetailHeader';
import Footer from '../Common/Footer';
import {SCDream4, SCDream5, SCDream6} from '../../src/font';

const Detail = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  return (
    <>
      <DetailHeader title={routeName} navigation={navigation} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: '#fff',
            paddingVertical: 15,
            paddingHorizontal: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <Text style={[styles.normalText, {fontSize: 14, color: '#333333'}]}>
              삼보인쇄
            </Text>
            <Text style={[styles.normalText, {color: '#A2A2A2'}]}>
              2020.11.01
            </Text>
          </View>
          <View>
            <Text style={[styles.mediumText, {fontSize: 18, lineHeight: 26}]}>
              [패키지] 병원/의약품/건강/케어/헬스 관련패키지 디자인입니다.
            </Text>
          </View>
        </View>
        <View
          style={{
            width: Dimensions.get('window').width,
            height: 1,
            backgroundColor: '#D7D7D7',
          }}
        />
        <View style={{paddingHorizontal: 20, paddingVertical: 20}}>
          <Image
            source={require('../../src/images/p10.jpg')}
            resizeMode="cover"
            style={{width: '100%', height: 370, marginBottom: 20}}
          />
          <Text
            style={[
              styles.normalText,
              {fontSize: 15, color: '#333333', lineHeight: 26},
            ]}>
            내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다
          </Text>
        </View>

        <Footer navigation={navigation} />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
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

export default Detail;
