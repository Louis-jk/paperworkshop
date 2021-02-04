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

const Detail = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  const [like, setLike] = React.useState(false);
  const onLikeBtn = () => {
    setLike((prev) => !prev);
  };

  const phoneNumber = '01012345678';
  const emailAddress = 'paper_workshop@paperworkshop.com';

  const carouselRef = React.useRef(null);

  const entries = [
    {
      id: 1,
      image: require('../../src/images/main_slide03.png'),
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

  const sliderWidth = Dimensions.get('window').width;
  const itemWidth = Dimensions.get('window').width;

  return (
    <>
      <DetailHeader title={routeName} navigation={navigation} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View
          style={{
            position: 'relative',
            backgroundColor: '#fff',
            justifyContent: 'flex-start',
            marginBottom: 20,
          }}>
          <Carousel
            ref={carouselRef}
            data={entries}
            renderItem={renderItem}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            loop={true}
          />

          {/* Swipe Prev,Next 버튼 Custom */}
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: 111,
              height: 67,
              backgroundColor: '#275696',
            }}>
            <TouchableWithoutFeedback
              onPress={() => {
                carouselRef.current.snapToPrev();
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                }}>
                <Image
                  source={require('../../src/assets/slide_arr02.png')}
                  resizeMode="contain"
                  style={{ width: 22, height: 20 }}
                />
              </View>
            </TouchableWithoutFeedback>
            <View style={{ borderWidth: 0.2, height: 15, borderColor: '#D4D4D4' }} />
            <TouchableWithoutFeedback
              onPress={() => {
                carouselRef.current.snapToNext();
              }}>
              <View
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Image
                  source={require('../../src/assets/slide_arr01.png')}
                  resizeMode="contain"
                  style={{ width: 22, height: 20 }}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
          {/* // Swipe Prev,Next 버튼 Custom */}

          {/* 회사정보 상단 fix */}
          <View
            style={{
              position: 'absolute',
              top: 20,
              right: 20,
              justifyContent: 'center',
              alignItems: 'center',
              width: 156,
              height: 156,
              backgroundColor: '#fff',
            }}>
            <View style={{ justifyContent: 'flex-start' }}>
              {/* Partner_logo.png */}
              <Image
                source={require('../../src/images/Partner_logo.png')}
                resizeMode="cover"
                style={{ width: 55, height: 15, marginBottom: 5 }}
              />
              <Text style={[styles.mediumText, { fontSize: 20, marginBottom: 5 }]}>
                삼보인쇄(주)
              </Text>
              <Text
                style={[styles.mediumText, { fontSize: 12, marginBottom: 12, color: '#707070' }]}>
                담당자 김성준
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../../src/images/rating04.png')}
                  resizeMode="cover"
                  style={{ width: 65, height: 15, marginRight: 5 }}
                />
                <Text style={[styles.normalText, { fontSize: 12 }]}>4.0</Text>
              </View>
            </View>
          </View>
          {/* // 회사정보 상단 fix */}
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#E3E3E3',
              borderRadius: 5,
              backgroundColor: '#fff',
              marginBottom: 10,
            }}>
            <TouchableWithoutFeedback>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 20,
                }}>
                <Text
                  style={[
                    styles.mediumText,
                    {
                      fontSize: 14,
                      marginBottom: 5,
                    },
                  ]}>
                  소통 만족도
                </Text>
                <Text
                  style={[
                    styles.normalText,
                    {
                      fontSize: 14,
                      marginBottom: 5,
                    },
                  ]}>
                  4.0
                </Text>
                <View style={{ flexDirection: 'row' }}>
                  <Image
                    source={require('../../src/assets/star_on.png')}
                    resizeMode="cover"
                    style={{ width: 15, height: 15 }}
                  />
                  <Image
                    source={require('../../src/assets/star_on.png')}
                    resizeMode="cover"
                    style={{ width: 15, height: 15 }}
                  />
                  <Image
                    source={require('../../src/assets/star_on.png')}
                    resizeMode="cover"
                    style={{ width: 15, height: 15 }}
                  />
                  <Image
                    source={require('../../src/assets/star_on.png')}
                    resizeMode="cover"
                    style={{ width: 15, height: 15 }}
                  />
                  <Image
                    source={require('../../src/assets/star_off.png')}
                    resizeMode="cover"
                    style={{ width: 15, height: 15 }}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 20,
                }}>
                <Text
                  style={[
                    styles.mediumText,
                    {
                      fontSize: 14,
                      marginBottom: 5,
                    },
                  ]}>
                  품질 만족도
                </Text>
                <Text
                  style={[
                    styles.normalText,
                    {
                      fontSize: 14,
                      marginBottom: 5,
                    },
                  ]}>
                  4.0
                </Text>
                <View style={{ flexDirection: 'row' }}>
                  <Image
                    source={require('../../src/assets/star_on.png')}
                    resizeMode="cover"
                    style={{ width: 15, height: 15 }}
                  />
                  <Image
                    source={require('../../src/assets/star_on.png')}
                    resizeMode="cover"
                    style={{ width: 15, height: 15 }}
                  />
                  <Image
                    source={require('../../src/assets/star_on.png')}
                    resizeMode="cover"
                    style={{ width: 15, height: 15 }}
                  />
                  <Image
                    source={require('../../src/assets/star_on.png')}
                    resizeMode="cover"
                    style={{ width: 15, height: 15 }}
                  />
                  <Image
                    source={require('../../src/assets/star_off.png')}
                    resizeMode="cover"
                    style={{ width: 15, height: 15 }}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 20,
                }}>
                <Text
                  style={[
                    styles.mediumText,
                    {
                      fontSize: 14,
                      marginBottom: 5,
                    },
                  ]}>
                  납기 만족도
                </Text>
                <Text
                  style={[
                    styles.normalText,
                    {
                      fontSize: 14,
                      marginBottom: 5,
                    },
                  ]}>
                  4.0
                </Text>
                <View style={{ flexDirection: 'row' }}>
                  <Image
                    source={require('../../src/assets/star_on.png')}
                    resizeMode="cover"
                    style={{ width: 15, height: 15 }}
                  />
                  <Image
                    source={require('../../src/assets/star_on.png')}
                    resizeMode="cover"
                    style={{ width: 15, height: 15 }}
                  />
                  <Image
                    source={require('../../src/assets/star_on.png')}
                    resizeMode="cover"
                    style={{ width: 15, height: 15 }}
                  />
                  <Image
                    source={require('../../src/assets/star_on.png')}
                    resizeMode="cover"
                    style={{ width: 15, height: 15 }}
                  />
                  <Image
                    source={require('../../src/assets/star_off.png')}
                    resizeMode="cover"
                    style={{ width: 15, height: 15 }}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>

          {/* 업체소개 */}
          <View style={{ marginTop: 20 }}>
            <Text style={[styles.mediumText, { fontSize: 16, marginBottom: 15 }]}>고객후기</Text>
            <Text style={[styles.normalText, { fontSize: 14, lineHeight: 22, marginBottom: 5 }]}>
              배송도 빠르고 프린트 퀄리티도 너무 좋아요 배송도 빠르고 프린트 퀄리티도 너무 좋아요
              배송도 빠르고 프린트 퀄리티도 너무 좋아요 배송도 빠르고 프린트 퀄리티도 너무 좋아요
              배송도 빠르고 프린트 퀄리티도 너무 좋아요 배송도 빠르고 프린트 퀄리티도 너무 좋아요
              배송도 빠르고 프린트 퀄리티도 너무 좋아요 배송도 빠르고 프린트 퀄리티도 너무 좋아요
            </Text>
          </View>
          {/* // 업체소개 */}
        </View>

        {/* <Footer navigation={navigation} /> */}
        <View style={{ marginBottom: 50 }} />
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
});

export default Detail;
