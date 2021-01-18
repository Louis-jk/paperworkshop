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

  const sliderWidth = Dimensions.get('window').width;
  const itemWidth = Dimensions.get('window').width;

  return (
    <>
      <Header title={routeName} navigation={navigation} />
      <ScrollView style={styles.container}>
        <View
          style={{
            position: 'relative',
            backgroundColor: '#fff',
            justifyContent: 'flex-start',
            marginBottom: 20,
          }}>
          {/* <Swiper
            ref={swiperRef}
            style={{ height: 400, opacity: 0.85, backgroundColor: '#000' }}
            showsButtons={false}
            showsPagination={false}
            // onIndexChanged={(index) => {
            //   console.log('swipe index', index);
            // }}
          >
            <Image
              source={require('../../src/images/p01.jpg')}
              resizeMode="cover"
              style={{ width: Dimensions.get('window').width, height: 400 }}
            />
            <Image
              source={require('../../src/images/p01.jpg')}
              resizeMode="cover"
              style={{ width: Dimensions.get('window').width, height: 400 }}
            />
          </Swiper> */}

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
                  source={require('../../src/images/prevBtn.png')}
                  resizeMode="contain"
                  style={{ width: 20, height: 15 }}
                />
              </View>
            </TouchableWithoutFeedback>
            <View style={{ borderWidth: 0.5, height: 15, borderColor: '#fff' }} />
            <TouchableWithoutFeedback
              onPress={() => {
                carouselRef.current.snapToNext();
              }}>
              <View
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Image
                  source={require('../../src/images/nextBtn.png')}
                  resizeMode="contain"
                  style={{ width: 20, height: 15 }}
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
              <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 5 }}>
                삼보인쇄(주)
              </Text>
              <Text style={{ fontSize: 12, marginBottom: 12 }}>담당자 김성준</Text>
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
                <Text style={{ fontSize: 12 }}>4.0</Text>
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
            <TouchableWithoutFeedback onPress={() => Linking.openURL(`tel:${phoneNumber}`)}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 15,
                }}>
                <Image
                  source={require('../../src/images/phone-call.png')}
                  resizeMode="contain"
                  style={{ width: 20, height: 20 }}
                />
                <Text
                  style={{
                    fontSize: 14,
                    letterSpacing: -1,
                    marginLeft: 5,
                  }}>
                  전화하기
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <View style={{ borderWidth: 0.5, height: '100%', borderColor: '#E3E3E3' }} />
            <TouchableWithoutFeedback onPress={() => Linking.openURL(`mailto:${emailAddress}`)}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 15,
                }}>
                <Image
                  source={require('../../src/images/mail.png')}
                  resizeMode="contain"
                  style={{ width: 20, height: 20 }}
                />
                <Text
                  style={{
                    fontSize: 14,
                    letterSpacing: -1,
                    marginLeft: 5,
                  }}>
                  메세지보내기
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>

          {/* 업체소개 */}
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>업체소개</Text>
            <Text style={{ fontSize: 14 }}>
              카타로그제작부터 후가공까지 삼보인쇄에서 함께하세요!
            </Text>
            <Text>최신형 보유장비로 최고의 품질을 가동합니다.</Text>
            <Text>당일 오후 4시 이전에 견적문의 주시면 당일 견적가능!</Text>

            <View style={{ paddingVertical: 20, paddingLeft: 7 }}>
              <Text>* 업무시간 : 평일 09:00 ~ 18:00</Text>
              <Text>* 토, 일, 공휴일 휴무</Text>
            </View>
          </View>
          {/* // 업체소개 */}
        </View>

        {/* 영업품목 */}
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 20,
            backgroundColor: '#F5F5F5',
            width: Dimensions.get('screen').width,
          }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>영업품목</Text>
          <Text style={{ fontSize: 14 }}>- 패키지 : 단상자/싸바리/~~</Text>
          <Text style={{ fontSize: 14 }}>- 일반인쇄 : 카달로그/화보집/도록/~~</Text>
        </View>
        {/* // 영업품목 */}

        {/* 고객후기 */}
        <View
          style={{
            marginTop: 20,
            paddingHorizontal: 20,
            paddingVertical: 20,
            backgroundColor: '#fff',
            width: Dimensions.get('screen').width,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginRight: 12 }}>고객후기</Text>
            <Text style={{ fontSize: 16, color: '#275696' }}>총 리뷰수 26</Text>
          </View>
          {/* 고객후기 리스트 박스 */}
          <View style={{ borderWidth: 1, borderColor: '#E3E3E3', marginBottom: 10 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                marginBottom: 20,
                paddingTop: 20,
                paddingHorizontal: 20,
                paddingBottom: 10,
              }}>
              <ImageBackground
                source={require('../../src/images/w01.jpg')}
                resizeMode="cover"
                style={{ width: 72, height: 65, position: 'relative' }}>
                <Text
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    fontSize: 10,
                    backgroundColor: 'rgba(0,0,0,0.45)',
                    color: '#fff',
                    padding: 5,
                  }}>
                  +6
                </Text>
              </ImageBackground>
              <View style={{ flexShrink: 2, marginLeft: 20 }}>
                <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 10 }}>
                  하나로세상(김*미 고객님)
                </Text>
                <Text style={{ fontSize: 14, lineHeight: 20 }}>
                  배송도 빠르고 프린트 퀄리티도 너무 좋아요 배송도 빠르고 프린트 퀄리티도 너무
                  좋아요
                </Text>
              </View>
            </View>
            <View style={{ width: '100%', height: 1, backgroundColor: '#E3E3E3' }} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 20,
                paddingVertical: 10,
              }}>
              <View>
                <Text style={{ fontSize: 12, color: '#707070', marginBottom: 7 }}>소통만족도</Text>
                <View
                  style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Image
                    source={require('../../src/images/rating04.png')}
                    resizeMode="cover"
                    style={{ width: 55, height: 15, marginRight: 5 }}
                  />
                  <Text style={{ fontSize: 10 }}>4.0</Text>
                </View>
              </View>
              <View>
                <Text style={{ fontSize: 12, color: '#707070', marginBottom: 7 }}>품질만족도</Text>
                <View
                  style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Image
                    source={require('../../src/images/rating.png')}
                    resizeMode="cover"
                    style={{ width: 55, height: 15, marginRight: 5 }}
                  />
                  <Text style={{ fontSize: 10 }}>5.0</Text>
                </View>
              </View>
              <View>
                <Text style={{ fontSize: 12, color: '#707070', marginBottom: 7 }}>납기만족도</Text>
                <View
                  style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Image
                    source={require('../../src/images/rating.png')}
                    resizeMode="cover"
                    style={{ width: 55, height: 15, marginRight: 5 }}
                  />
                  <Text style={{ fontSize: 10 }}>5.0</Text>
                </View>
              </View>
            </View>
          </View>
          {/* // 고객후기 리스트 박스 */}
          {/* 고객후기 리스트 박스 */}
          <View style={{ borderWidth: 1, borderColor: '#E3E3E3', marginBottom: 10 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                marginBottom: 20,
                paddingTop: 20,
                paddingHorizontal: 20,
                paddingBottom: 10,
              }}>
              <ImageBackground
                source={require('../../src/images/w02.jpg')}
                resizeMode="cover"
                style={{ width: 72, height: 65, position: 'relative' }}>
                <Text
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    fontSize: 10,
                    backgroundColor: 'rgba(0,0,0,0.45)',
                    color: '#fff',
                    padding: 5,
                  }}>
                  +6
                </Text>
              </ImageBackground>
              <View style={{ flexShrink: 2, marginLeft: 20 }}>
                <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 10 }}>
                  신세계세상(정*주 고객님)
                </Text>
                <Text style={{ fontSize: 14, lineHeight: 20 }}>
                  퀄리티 하나는 정말 끝내줍니다. 믿고 맡기는 업체로 선정한 지 꽤 됩니다.
                </Text>
              </View>
            </View>
            <View style={{ width: '100%', height: 1, backgroundColor: '#E3E3E3' }} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 20,
                paddingVertical: 10,
              }}>
              <View>
                <Text style={{ fontSize: 12, color: '#707070', marginBottom: 7 }}>소통만족도</Text>
                <View
                  style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Image
                    source={require('../../src/images/rating04.png')}
                    resizeMode="cover"
                    style={{ width: 55, height: 15, marginRight: 5 }}
                  />
                  <Text style={{ fontSize: 10 }}>4.0</Text>
                </View>
              </View>
              <View>
                <Text style={{ fontSize: 12, color: '#707070', marginBottom: 7 }}>품질만족도</Text>
                <View
                  style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Image
                    source={require('../../src/images/rating.png')}
                    resizeMode="cover"
                    style={{ width: 55, height: 15, marginRight: 5 }}
                  />
                  <Text style={{ fontSize: 10 }}>5.0</Text>
                </View>
              </View>
              <View>
                <Text style={{ fontSize: 12, color: '#707070', marginBottom: 7 }}>납기만족도</Text>
                <View
                  style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Image
                    source={require('../../src/images/rating04.png')}
                    resizeMode="cover"
                    style={{ width: 55, height: 15, marginRight: 5 }}
                  />
                  <Text style={{ fontSize: 10 }}>4.0</Text>
                </View>
              </View>
            </View>
          </View>
          {/* // 고객후기 리스트 박스 */}
          {/* 고객후기 리스트 박스 */}
          <View style={{ borderWidth: 1, borderColor: '#E3E3E3', marginBottom: 10 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                marginBottom: 20,
                paddingTop: 20,
                paddingHorizontal: 20,
                paddingBottom: 10,
              }}>
              <ImageBackground
                source={require('../../src/images/w03.jpg')}
                resizeMode="cover"
                style={{ width: 72, height: 65, position: 'relative' }}>
                <Text
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    fontSize: 10,
                    backgroundColor: 'rgba(0,0,0,0.45)',
                    color: '#fff',
                    padding: 5,
                  }}>
                  +6
                </Text>
              </ImageBackground>
              <View style={{ flexShrink: 2, marginLeft: 20 }}>
                <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 10 }}>
                  내안에바다(전*리 고객님)
                </Text>
                <Text style={{ fontSize: 14, lineHeight: 20 }}>
                  명함은 항상 여기서 주문해요. 고급지도 종류별로 다양하고 디지털로 찍어도 오프셋
                  뺨치게 잘나옵니다.
                </Text>
              </View>
            </View>
            <View style={{ width: '100%', height: 1, backgroundColor: '#E3E3E3' }} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 20,
                paddingVertical: 10,
              }}>
              <View>
                <Text style={{ fontSize: 12, color: '#707070', marginBottom: 7 }}>소통만족도</Text>
                <View
                  style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Image
                    source={require('../../src/images/rating.png')}
                    resizeMode="cover"
                    style={{ width: 55, height: 15, marginRight: 5 }}
                  />
                  <Text style={{ fontSize: 10 }}>5.0</Text>
                </View>
              </View>
              <View>
                <Text style={{ fontSize: 12, color: '#707070', marginBottom: 7 }}>품질만족도</Text>
                <View
                  style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Image
                    source={require('../../src/images/rating.png')}
                    resizeMode="cover"
                    style={{ width: 55, height: 15, marginRight: 5 }}
                  />
                  <Text style={{ fontSize: 10 }}>5.0</Text>
                </View>
              </View>
              <View>
                <Text style={{ fontSize: 12, color: '#707070', marginBottom: 7 }}>납기만족도</Text>
                <View
                  style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Image
                    source={require('../../src/images/rating04.png')}
                    resizeMode="cover"
                    style={{ width: 55, height: 15, marginRight: 5 }}
                  />
                  <Text style={{ fontSize: 10 }}>4.0</Text>
                </View>
              </View>
            </View>
          </View>
          {/* // 고객후기 리스트 박스 */}

          {/* 고객후기 전체보기 버튼 */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#fff',
              borderWidth: 1,
              borderColor: '#E3E3E3',
              marginTop: 20,
            }}>
            <Text
              style={{ textAlign: 'center', fontSize: 16, color: '#444444', paddingVertical: 15 }}>
              고객후기 전체보기
            </Text>
          </TouchableOpacity>
          {/* // 고객후기 전체보기 버튼 */}
        </View>
        {/* // 고객후기 */}

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
