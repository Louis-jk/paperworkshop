import React from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Linking,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';

import Carousel, { Pagination } from 'react-native-snap-carousel';

const DrawerMenu = (props) => {
  const navigation = props.navigation;

  const bannerCarouselRef = React.useRef(null);

  const banners = [
    {
      id: 1,
      image: require('../../src/images/ban01.png'),
    },
    {
      id: 2,
      image: require('../../src/images/ban01.png'),
    },
    {
      id: 3,
      image: require('../../src/images/ban01.png'),
    },
    {
      id: 4,
      image: require('../../src/images/ban01.png'),
    },
    {
      id: 5,
      image: require('../../src/images/ban01.png'),
    },
  ];

  const [activeSlide, setActiveSlide] = React.useState(0);
  const sliderWidth = Dimensions.get('window').width;
  const itemWidth = Dimensions.get('window').width - 60;

  const renderItem = ({ item, index }) => {
    return (
      <View style={{ borderRadius: 20, height: 120 }}>
        <Image
          key={index}
          source={item.image}
          resizeMode="contain"
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 7,
          }}
        />
      </View>
    );
  };

  return (
    <ScrollView>
      <View>
        <View
          style={{
            backgroundColor: '#275696',
            paddingHorizontal: 20,
            paddingVertical: 25,
            marginBottom: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'flex-end',
              marginBottom: 7,
            }}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Main')}>
              <Image
                source={require('../../src/assets/home.png')}
                resizeMode="cover"
                style={{ width: 20, height: 20, marginRight: 10 }}
              />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.closeDrawer('right')}>
              <Image
                source={require('../../src/assets/icon_close02.png')}
                resizeMode="cover"
                style={{ width: 30, height: 30 }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 80,
                  height: 80,
                  borderRadius: 160,
                  backgroundColor: '#fff',
                  marginRight: 20,
                }}>
                <View>
                  <Text
                    style={{ color: '#275696', fontSize: 12, fontWeight: 'bold', lineHeight: 14 }}>
                    페이퍼
                  </Text>
                  <Text
                    style={{ color: '#275696', fontSize: 12, fontWeight: 'bold', lineHeight: 14 }}>
                    공작소
                  </Text>
                </View>
              </View>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 5,
                  }}>
                  <View style={{ backgroundColor: '#fff', borderRadius: 20, marginRight: 5 }}>
                    <Text style={{ color: '#275696', paddingHorizontal: 10, paddingVertical: 5 }}>
                      일반회원
                    </Text>
                  </View>
                  <Text style={{ color: '#fff', fontSize: 18 }}>페이퍼님</Text>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => Alert.alert('Setting? ')}>
                    <View
                      style={{
                        paddingHorizontal: 10,
                        paddingVertical: 10,
                      }}>
                      <Image
                        source={require('../../src/assets/icon_pf.png')}
                        resizeMode="contain"
                        style={{
                          width: 15,
                          height: 15,
                          marginTop: 2,
                        }}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
                <Text style={styles.whiteFont}>paper@naver.com</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={[styles.mb20, styles.pdH20]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#E3E3E3',
              borderRadius: 5,
              backgroundColor: '#fff',
              marginBottom: 20,
            }}>
            <TouchableWithoutFeedback onPress={() => Linking.openURL(`tel:${phoneNumber}`)}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 24,
                    color: '#275696',
                    letterSpacing: -1.5,
                    marginBottom: 5,
                  }}>
                  12
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    letterSpacing: -1.5,
                  }}>
                  MY 견적 의뢰 건
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <View style={{ borderWidth: 0.5, height: '100%', borderColor: '#E3E3E3' }} />
            <TouchableWithoutFeedback onPress={() => Linking.openURL(`mailto:${emailAddress}`)}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  paddingVertical: 20,
                }}>
                <Image
                  source={require('../../src/assets/msm02.png')}
                  resizeMode="cover"
                  style={{ width: 35, height: 30, marginBottom: 10 }}
                />
                <Text
                  style={{
                    fontSize: 14,
                    letterSpacing: -1,
                  }}>
                  메세지
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <View style={{ borderWidth: 0.5, height: '100%', borderColor: '#E3E3E3' }} />
            <TouchableWithoutFeedback onPress={() => Linking.openURL(`mailto:${emailAddress}`)}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  paddingVertical: 20,
                }}>
                <Image
                  source={require('../../src/assets/pticon01.png')}
                  resizeMode="cover"
                  style={{ width: 35, height: 30, marginBottom: 10 }}
                />
                <Text
                  style={{
                    fontSize: 14,
                    letterSpacing: -1,
                  }}>
                  MY파트너스
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#275696',
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 7,
              borderRadius: 5,
            }}>
            <Image
              source={require('../../src/assets/icon02_s.png')}
              resizeMode="contain"
              style={{ width: 35, height: 30 }}
            />
            <Text style={[styles.whiteFont, { fontSize: 16, fontWeight: 'bold' }]}>
              비교 견적 신청
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <View style={[styles.categoryTitle, styles.mV10]}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>인쇄/패키지 갤러리</Text>
          </View>
          <View style={{ backgroundColor: '#F5F5F5', paddingVertical: 10, paddingLeft: 40 }}>
            <TouchableOpacity>
              <Text style={styles.categoryText}>패키지(단상자, 싸바리 등)</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.categoryText}>일반인쇄(서적,카달로그 등)</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.categoryText}>기타 인쇄물</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.categoryTitle, styles.mV10]}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>파트너스</Text>
          </View>
          <View style={{ backgroundColor: '#F5F5F5', paddingVertical: 10, paddingLeft: 40 }}>
            <TouchableOpacity>
              <Text style={styles.categoryText}>성실 파트너스</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.categoryText}>인기 파트너스</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.categoryText}>지역 파트너스</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.categoryTitle, styles.mV10]}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>제작스토리</Text>
          </View>
          <View style={{ backgroundColor: '#F5F5F5', paddingVertical: 10, paddingLeft: 40 }}>
            <TouchableOpacity>
              <Text style={styles.categoryText}>고객 후기</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.categoryText}>유용한 정보</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.categoryText}>인쇄/패키지 제작 정보</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.categoryTitle, styles.mV10]}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>이벤트</Text>
        </View>
        <View
          style={{ width: Dimensions.get('window').width, height: 1, backgroundColor: '#F5F5F5' }}
        />
        <View style={[styles.categoryTitle, styles.mV10]}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>고객센터</Text>
        </View>
        <View style={{ backgroundColor: '#F5F5F5', paddingVertical: 10, paddingLeft: 40 }}>
          <TouchableOpacity>
            <Text style={styles.categoryText}>공지사항</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.categoryText}>FAQ</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.categoryText}>1:1 문의</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.categoryTitle, styles.mV10]}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>회사소개</Text>
        </View>
        <View
          style={{ width: Dimensions.get('window').width, height: 1, backgroundColor: '#F5F5F5' }}
        />

        {/* 배너 광고 section */}
        <View
          style={{
            paddingVertical: 30,
            backgroundColor: '#FFF',
            position: 'relative',
          }}>
          <View>
            <Carousel
              ref={bannerCarouselRef}
              data={banners}
              renderItem={renderItem}
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
              layout="default"
              autoplay={true}
              autoplayDelay={1000}
              autoplayInterval={5000}
              loop={true}
              onSnapToItem={(index) => {
                // console.log('C index', index);
                setActiveSlide(index);
              }}
              // containerCustomStyle={{ marginHorizontal: 20 }}
            />
            <Pagination
              dotsLength={banners.length}
              activeDotIndex={activeSlide}
              dotContainerStyle={{ margin: 0, padding: 0 }}
              dotStyle={{
                width: 40,
                height: 8,
                borderRadius: 8,
                marginHorizontal: 0,
                paddingHorizontal: 0,
                backgroundColor: '#275696',
              }}
              inactiveDotStyle={{
                width: 8,
                height: 8,
                backgroundColor: '#C8C8C8',
                marginHorizontal: 0,
                paddingHorizontal: 0,
              }}
              inactiveDotOpacity={1}
              inactiveDotScale={1}
              tappableDots={true}
              carouselRef={bannerCarouselRef}
              containerStyle={{ paddingVertical: 20 }}
            />
          </View>
        </View>
        {/* // 배너 광고 section */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  whiteFont: {
    color: '#fff',
  },
  categoryText: {
    fontSize: 14,
    lineHeight: 28,
  },
  categoryTitle: {
    paddingHorizontal: 20,
    paddingVertical: 2,
  },
  pdH20: {
    paddingHorizontal: 20,
  },
  mb10: {
    marginBottom: 10,
  },
  mb20: {
    marginBottom: 20,
  },
  mV10: {
    marginVertical: 10,
  },
});

export default DrawerMenu;
