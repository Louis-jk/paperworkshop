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

import Header from '../Common/Header';
import Footer from '../Common/Footer';

const Detail = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  const phoneNumber = '01012345678';
  const emailAddress = 'paper_workshop@paperworkshop.com';

  const carouselRef = React.useRef(null);

  const entries = [
    {
      id: 1,
      image: require('../../src/images/p01.jpg'),
    },
    {
      id: 2,
      image: require('../../src/images/p03.jpg'),
    },
    {
      id: 2,
      image: require('../../src/images/p04.jpg'),
    },
  ];

  const renderItem = ({ item, index }) => {
    return (
      <Image
        key={index}
        source={item.image}
        resizeMode="cover"
        style={{ width: Dimensions.get('window').width, height: 400 }}
      />
    );
  };

  return (
    <>
      <Header title={routeName} navigation={navigation} />
      <ScrollView style={styles.container}>
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
            <Text>삼보인쇄</Text>
            <Text>2020.11.01</Text>
          </View>
          <View>
            <Text style={{ fontSize: 18, lineHeight: 24 }}>
              [패키지] 병원/의약품/건강/케어/헬스 관련패키지 디자인입니다.
            </Text>
          </View>
        </View>
        <View
          style={{ width: Dimensions.get('window').width, height: 1, backgroundColor: '#D7D7D7' }}
        />
        <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
          <Image
            source={require('../../src/images/p10.jpg')}
            resizeMode="cover"
            style={{ width: '100%', height: 370, marginBottom: 20 }}
          />
          <Text style={{ fontSize: 15, color: '#333333', lineHeight: 24 }}>
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
});

export default Detail;
