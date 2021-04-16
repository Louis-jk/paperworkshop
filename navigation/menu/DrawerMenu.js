import React from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import { ScrollView } from 'react-native-gesture-handler';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import Collapsible from 'react-native-collapsible';
import FastImage from 'react-native-fast-image';

import Main from '../../src/api/Main';

const DrawerMenu = (props) => {
  const navigation = props.navigation;

  // Redux 에서 유저 정보 가져오기
  const {
    mb_id,
    mb_email,
    mb_name,
    mb_hp,
    mb_1,
    mb_2,
    mb_profile_img,
    estimate_cnt,
  } = useSelector((state) => state.UserInfoReducer);

  const [imgMime, setImgMime] = React.useState(null);

  // Redux에서 가입시 회원 정보 가져오기

  const bannerCarouselRef = React.useRef(null);

  const [banners, setBanners] = React.useState([]); // 드로어 메뉴 내부 슬라이더(배너)

  // 슬라이더 (배너) progress bar 표현식
  const calculator = (name) => {
    let initialPer01 = 1 / name.length;
    if (name === mainBanners) {
      setMainPercent(initialPer01);
    } else {
      setStepPercent(initialPer01);
    }
  };

  // 드로어 메뉴 내부 슬라이더(배너) API 연동
  const getSliderBanners = () => {
    Main.onSlider('proc_banner_list', '슬라이드')
      .then((res) => {
        if (res.data.result === '1' && res.data.count > 0) {
          setBanners(res.data.item);
          // calculator(banners);
        } else if (res.data.result === '1' && res.data.count <= 0) {
          setMainBanners(null);
        } else {
          setMainBanners(null);
        }
      })
      .catch((err) => {
        Alert.alert(err, '관리자에게 문의하세요', [
          {
            text: '확인',
          },
        ]);
      });
  };

  React.useEffect(() => {
    if (mb_profile_img) {
      const sliceImg = mb_profile_img.slice(mb_profile_img.lastIndexOf('.'));
      if (sliceImg === '.gif') {
        setImgMime('gif');
      }
    }

    getSliderBanners();
  }, [mb_profile_img]);

  const [activeSlide, setActiveSlide] = React.useState(0);
  const sliderWidth = Dimensions.get('window').width;
  const itemWidth = Dimensions.get('window').width - 60;

  const renderItem = ({item, index}) => {
    return (
      <View style={{borderRadius: 20, height: 120}}>
        <Image
          key={item.bn_id}
          source={{uri: `${item.bimg}`}}
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

  // 각 메뉴 아코디언 형식 설정(collapse)
  const [collapseArrow01, setCollapseArrow01] = React.useState(true);
  const [collapseArrow02, setCollapseArrow02] = React.useState(true);
  const [collapseArrow03, setCollapseArrow03] = React.useState(true);
  const [collapseArrow04, setCollapseArrow04] = React.useState(true);
  const [collapseArrow05, setCollapseArrow05] = React.useState(true);

  const setCollapseArrowFunc01 = () => {
    setCollapseArrow01((prev) => !prev);
  };
  const setCollapseArrowFunc02 = () => {
    setCollapseArrow02((prev) => !prev);
  };
  const setCollapseArrowFunc03 = () => {
    setCollapseArrow03((prev) => !prev);
  };
  const setCollapseArrowFunc04 = () => {
    setCollapseArrow04((prev) => !prev);
  };
  const setCollapseArrowFunc05 = () => {
    setCollapseArrow05((prev) => !prev);
  };

  // 로그아웃
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('@paper_info');
    } catch (e) {
      console.log('로그아웃 에러', e);
    }
    Alert.alert('로그아웃 되었습니다.', '로그인 화면으로 이동합니다.', [
      {
        text: '확인',
        onPress: () => navigation.navigate('Login'),
      },
    ]);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
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
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Main')}>
              <Image
                source={require('../../src/assets/home.png')}
                resizeMode="cover"
                style={{width: 20, height: 20, marginRight: 13}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.closeDrawer('right')}>
              <Image
                source={require('../../src/assets/icon_close02.png')}
                resizeMode="cover"
                style={{width: 30, height: 30}}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
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
                  {mb_profile_img && imgMime !== 'gif' ? (
                    <Image
                      source={{uri: `${mb_profile_img}`}}
                      resizeMode="cover"
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: 80,
                      }}
                    />
                  ) : mb_profile_img && imgMime === 'gif' ? (
                    <FastImage
                      source={{uri: `${mb_profile_img}`}}
                      resizeMode={FastImage.resizeMode.contain}
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: 80,
                      }}
                    />
                  ) : (
                    <Image
                      source={require('../../src/assets/photo.png')}
                      resizeMode="cover"
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: 80,
                      }}
                    />
                  )}
                </View>
              </View>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginBottom: 5,
                  }}>
                  <View
                    style={{
                      backgroundColor: '#fff',
                      borderRadius: 20,
                      marginRight: 5,
                    }}>
                    <Text
                      style={[
                        styles.normalText,
                        {
                          color: '#275696',
                          paddingHorizontal: 10,
                          paddingVertical: 5,
                        },
                      ]}>
                      일반회원
                    </Text>
                  </View>
                  <Text
                    style={[styles.normalText, {color: '#fff', fontSize: 18}]}>
                    {mb_name}님
                  </Text>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('ProfileEdit')}>
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
                <Text style={[styles.normalText, styles.whiteFont]}>
                  {mb_email}
                </Text>
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
            <TouchableWithoutFeedback
              onPress={() =>
                navigation.navigate('MyOrder', {screen: 'MyOrder'})
              }>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}>
                <Text
                  style={[
                    styles.mediumText,
                    {
                      fontSize: 24,
                      color: '#275696',
                      letterSpacing: -1.5,
                      marginBottom: 7,
                    },
                  ]}>
                  {estimate_cnt}
                </Text>
                <Text
                  style={[
                    styles.mediumText,
                    {
                      fontSize: 14,
                      letterSpacing: -1.5,
                    },
                  ]}>
                  나의 견적 의뢰 건
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <View
              style={{borderWidth: 0.5, height: '100%', borderColor: '#E3E3E3'}}
            />
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('Message')}>
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
                  style={{width: 35, height: 30, marginBottom: 10}}
                />
                <Text
                  style={[
                    styles.mediumText,
                    {
                      fontSize: 14,
                      letterSpacing: -1,
                    },
                  ]}>
                  메세지
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <View
              style={{borderWidth: 0.5, height: '100%', borderColor: '#E3E3E3'}}
            />
            <TouchableWithoutFeedback
              onPress={() =>
                navigation.navigate('Home', {
                  screen: 'MyPartners',
                  value: 'reload',
                })
              }>
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
                  style={{width: 35, height: 30, marginBottom: 10}}
                />
                <Text
                  style={[
                    styles.mediumText,
                    {
                      fontSize: 14,
                      letterSpacing: -1,
                    },
                  ]}>
                  나의 파트너스
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate('Order', {screen: 'Order'})}
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#275696',
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 10,
              borderRadius: 5,
            }}>
            <Image
              source={require('../../src/assets/icon02_s.png')}
              resizeMode="contain"
              style={{width: 35, height: 30}}
            />
            <Text style={[styles.whiteFont, styles.mediumText, {fontSize: 16}]}>
              비교 견적 신청
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity activeOpacity={1} onPress={setCollapseArrowFunc01}>
            <View
              style={[
                styles.categoryTitle,
                styles.mV10,
                {flexDirection: 'row', justifyContent: 'space-between'},
              ]}>
              <Text style={[styles.mediumText, {fontSize: 16}]}>
                인쇄/패키지 갤러리
              </Text>
              <Image
                source={
                  collapseArrow01
                    ? require('../../src/assets/arr03.png')
                    : require('../../src/assets/arr01.png')
                }
                resizeMode="contain"
                style={{width: 30, height: 20}}
              />
            </View>
          </TouchableOpacity>
          <Collapsible collapsed={collapseArrow01}>
            <View
              style={{
                backgroundColor: '#F5F5F5',
                paddingVertical: 10,
                paddingLeft: 40,
              }}>
              <TouchableOpacity
                style={styles.subCategory}
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate('Root', {
                    screen: 'Gallery',
                    params: {screen: 'GalleryPackage', params: {cate1: '1'}},
                  })
                }>
                <Text style={[styles.categoryText, styles.normalText]}>
                  패키지(단상자, 싸바리 등)
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.subCategory}
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate('Root', {
                    screen: 'Gallery',
                    params: {screen: 'GalleryGeneral', params: {cate1: '0'}},
                  })
                }>
                <Text style={[styles.categoryText, styles.normalText]}>
                  일반인쇄(서적,카달로그 등)
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.subCategory}
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate('Root', {
                    screen: 'Gallery',
                    params: {screen: 'GalleryEtc', params: {cate1: '2'}},
                  })
                }>
                <Text style={[styles.categoryText, styles.normalText]}>
                  기타 인쇄물
                </Text>
              </TouchableOpacity>
            </View>
          </Collapsible>

          <View
            style={{
              width: Dimensions.get('window').width,
              height: 1,
              backgroundColor: '#F5F5F5',
            }}
          />

          <TouchableOpacity activeOpacity={1} onPress={setCollapseArrowFunc02}>
            <View
              style={[
                styles.categoryTitle,
                styles.mV10,
                {flexDirection: 'row', justifyContent: 'space-between'},
              ]}>
              <Text style={[styles.mediumText, {fontSize: 16}]}>파트너스</Text>
              <Image
                source={
                  collapseArrow02
                    ? require('../../src/assets/arr03.png')
                    : require('../../src/assets/arr01.png')
                }
                resizeMode="contain"
                style={{width: 30, height: 20}}
              />
            </View>
          </TouchableOpacity>
          <Collapsible collapsed={collapseArrow02}>
            <View
              style={{
                backgroundColor: '#F5F5F5',
                paddingVertical: 10,
                paddingLeft: 40,
              }}>
              <TouchableOpacity
                style={styles.subCategory}
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate('Root', {
                    screen: 'Partners',
                    params: {screen: 'Partners01'},
                  })
                }>
                <Text style={[styles.categoryText, styles.normalText]}>
                  성실 파트너스
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.subCategory}
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate('Root', {
                    screen: 'Partners',
                    params: {screen: 'Partners02'},
                  })
                }>
                <Text style={[styles.categoryText, styles.normalText]}>
                  인기 파트너스
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.subCategory}
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate('Root', {
                    screen: 'Partners',
                    params: {screen: 'Partners03'},
                  })
                }>
                <Text style={[styles.categoryText, styles.normalText]}>
                  지역 파트너스
                </Text>
              </TouchableOpacity>
            </View>
          </Collapsible>

          <View
            style={{
              width: Dimensions.get('window').width,
              height: 1,
              backgroundColor: '#F5F5F5',
            }}
          />

          <TouchableOpacity activeOpacity={1} onPress={setCollapseArrowFunc03}>
            <View
              style={[
                styles.categoryTitle,
                styles.mV10,
                {flexDirection: 'row', justifyContent: 'space-between'},
              ]}>
              <Text style={[styles.mediumText, {fontSize: 16}]}>
                제작스토리
              </Text>
              <Image
                source={
                  collapseArrow03
                    ? require('../../src/assets/arr03.png')
                    : require('../../src/assets/arr01.png')
                }
                resizeMode="contain"
                style={{width: 30, height: 20}}
              />
            </View>
          </TouchableOpacity>
          <Collapsible collapsed={collapseArrow03}>
            <View
              style={{
                backgroundColor: '#F5F5F5',
                paddingVertical: 10,
                paddingLeft: 40,
              }}>
              <TouchableOpacity
                style={styles.subCategory}
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate('Root', {
                    screen: 'Story',
                    params: {screen: 'Story'},
                  })
                }>
                <Text style={[styles.categoryText, styles.normalText]}>
                  고객 후기
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.subCategory}
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate('Root', {
                    screen: 'Story',
                    params: {screen: 'StoryTips'},
                  })
                }>
                <Text style={[styles.categoryText, styles.normalText]}>
                  유용한 정보
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.subCategory}
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate('Root', {
                    screen: 'Story',
                    params: {screen: 'StoryCreateInfo'},
                  })
                }>
                <Text style={[styles.categoryText, styles.normalText]}>
                  인쇄/패키지 제작 정보
                </Text>
              </TouchableOpacity>
            </View>
          </Collapsible>

          <View
            style={{
              width: Dimensions.get('window').width,
              height: 1,
              backgroundColor: '#F5F5F5',
            }}
          />

          <View style={[styles.categoryTitle, styles.mV10]}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Event')}
              activeOpacity={0.8}>
              <Text style={[styles.mediumText, {fontSize: 16}]}>이벤트</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              width: Dimensions.get('window').width,
              height: 1,
              backgroundColor: '#F5F5F5',
            }}
          />

          <TouchableOpacity activeOpacity={1} onPress={setCollapseArrowFunc04}>
            <View
              style={[
                styles.categoryTitle,
                styles.mV10,
                {flexDirection: 'row', justifyContent: 'space-between'},
              ]}>
              <Text style={[styles.mediumText, {fontSize: 16}]}>고객센터</Text>
              <Image
                source={
                  collapseArrow04
                    ? require('../../src/assets/arr03.png')
                    : require('../../src/assets/arr01.png')
                }
                resizeMode="contain"
                style={{width: 30, height: 20}}
              />
            </View>
          </TouchableOpacity>
          <Collapsible collapsed={collapseArrow04}>
            <View
              style={{
                backgroundColor: '#F5F5F5',
                paddingVertical: 10,
                paddingLeft: 40,
              }}>
              <TouchableOpacity
                style={styles.subCategory}
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate('Root', {
                    screen: 'Ccenter',
                    params: {screen: 'CCenterNotice'},
                  })
                }>
                <Text style={[styles.categoryText, styles.normalText]}>
                  공지사항
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.subCategory}
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate('Root', {
                    screen: 'Ccenter',
                    params: {screen: 'CCenter'},
                  })
                }>
                <Text style={[styles.categoryText, styles.normalText]}>
                  FAQ
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.subCategory}
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate('Root', {
                    screen: 'Ccenter',
                    params: {screen: 'CCenterQnA'},
                  })
                }>
                <Text style={[styles.categoryText, styles.normalText]}>
                  1:1 문의
                </Text>
              </TouchableOpacity>
            </View>
          </Collapsible>

          <View
            style={{
              width: Dimensions.get('window').width,
              height: 1,
              backgroundColor: '#F5F5F5',
            }}
          />

          <View style={[styles.categoryTitle, styles.mV10]}>
            <TouchableOpacity
              onPress={() => navigation.navigate('CompanyInfo')}
              activeOpacity={0.8}>
              <Text style={[styles.mediumText, {fontSize: 16}]}>회사소개</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              width: Dimensions.get('window').width,
              height: 1,
              backgroundColor: '#F5F5F5',
            }}
          />

          <TouchableOpacity activeOpacity={1} onPress={setCollapseArrowFunc05}>
            <View
              style={[
                styles.categoryTitle,
                styles.mV10,
                {flexDirection: 'row', justifyContent: 'space-between'},
              ]}>
              <Text style={[styles.mediumText, {fontSize: 16}]}>지류정보</Text>
              <Image
                source={
                  collapseArrow05
                    ? require('../../src/assets/arr03.png')
                    : require('../../src/assets/arr01.png')
                }
                resizeMode="contain"
                style={{width: 30, height: 20}}
              />
            </View>
          </TouchableOpacity>
          <Collapsible collapsed={collapseArrow05}>
            <View
              style={{
                backgroundColor: '#F5F5F5',
                paddingVertical: 10,
                paddingLeft: 40,
              }}>
              <TouchableOpacity
                style={styles.subCategory}
                activeOpacity={0.8}
                // onPress={() =>
                //   navigation.navigate('Root', {
                //     screen: 'PaperInfo',
                //     params: {screen: 'PaperInfo'},
                //   })
                // }
                onPress={() =>
                  Alert.alert('준비중입니다.', '', [
                    {
                      text: '확인',
                    },
                  ])
                }>
                <Text style={[styles.categoryText, styles.normalText]}>
                  지류소개
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.subCategory}
                activeOpacity={0.8}
                // onPress={() =>
                //   navigation.navigate('Root', {
                //     screen: 'PaperInfo',
                //     params: {screen: 'PaperPrice'},
                //   })
                // }
                onPress={() =>
                  Alert.alert('준비중입니다.', '', [
                    {
                      text: '확인',
                    },
                  ])
                }>
                <Text style={[styles.categoryText, styles.normalText]}>
                  지류고시가
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.subCategory}
                activeOpacity={0.8}
                onPress={() =>
                  Alert.alert('준비중입니다.', '', [
                    {
                      text: '확인',
                    },
                  ])
                }>
                <Text style={[styles.categoryText, styles.normalText]}>
                  지류가격계산
                </Text>
              </TouchableOpacity>
            </View>
          </Collapsible>

          <View
            style={{
              width: Dimensions.get('window').width,
              height: 1,
              backgroundColor: '#F5F5F5',
            }}
          />
          <TouchableOpacity activeOpacity={1} onPress={logout}>
            <View
              style={[
                styles.categoryTitle,
                styles.mV10,
                {flexDirection: 'row', justifyContent: 'space-between'},
              ]}>
              <Text style={[styles.mediumText, {fontSize: 16}]}>로그아웃</Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              width: Dimensions.get('window').width,
              height: 1,
              backgroundColor: '#F5F5F5',
            }}
          />
        </View>

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
              autoplayDelay={3000}
              autoplayInterval={1000}
              loop={true}
              onSnapToItem={(index) => {
                setActiveSlide(index);
              }}
            />
            <Pagination
              dotsLength={banners.length}
              activeDotIndex={activeSlide}
              dotContainerStyle={{margin: 0, padding: 0}}
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
              containerStyle={{paddingVertical: 20}}
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
    paddingVertical: 5,
  },
  subCategory: {
    marginVertical: 7,
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

export default DrawerMenu;
