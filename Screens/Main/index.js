import * as React from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  StyleSheet,
  Animated,
  ActivityIndicator,
  FlatList,
  Platform,
  PermissionsAndroid,
  SafeAreaView
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import Dash from 'react-native-dash';
import {TabView, SceneMap} from 'react-native-tab-view';
import messaging from '@react-native-firebase/messaging';
import Footer from '../Common/Footer';
import Main from '../../src/api/Main';
import {useDispatch, useSelector} from 'react-redux';
import { CommonActions } from '@react-navigation/native';

import {selectCate1} from '../../Modules/OrderReducer';
import OrderAPI from '../../src/api/OrderAPI';

import FirstRoute from './Component/FirstRoute';
import SecondRoute from './Component/SecondRoute';
import ThirdRoute from './Component/ThirdRoute';
import {SCDream4, SCDream5, SCDream6} from '../../src/font';

const index = (props) => {
  const navigation = props.navigation;

  const [isLoading, setIsLoading] = React.useState(false);

  const [mainPercent, setMainPercent] = React.useState(1);
  const [stepPercent, setStepPercent] = React.useState(1);

  const [mainBanners, setMainBanners] = React.useState([]); // 메인 최상단 슬라이더(배너)
  const [middleBanners, setMiddleBanners] = React.useState([]); // 메인 중간 슬라이더(배너)

  const dispatch = useDispatch();
  const {mb_id, mb_hp, mb_name, sns_check, sns_type} = useSelector((state) => state.UserInfoReducer);

  // SNS 로그인일 경우 휴대폰번호가 없으면 회원정보 수정페이지로 보내기
  const checkSNSLoginMobileNumHandler = () => {
    if(sns_type === 'apple' && ((mb_hp === '' || mb_hp === null) || (mb_name === '' || mb_name === null))) {
      Alert.alert('성함과 휴대폰 번호를 입력해주세요.', '회원정보수정페이지로 이동합니다.', [
        {
          text: '확인',
          onPress: () => navigation.navigate('ProfileEdit')
        }
      ])
      return false;
    } else if(mb_hp === '' || mb_hp === null) {
      Alert.alert('휴대폰번호를 입력해주세요.', '회원정보수정페이지로 이동합니다.', [
        {
          text: '확인',
          onPress: () => navigation.navigate('ProfileEdit')
        }
      ])
    }
    else {
      return false;
    }
  }

  React.useEffect(() => {
    if(sns_check === 'Y') {
      // console.log("SNS 로그인 중");
      checkSNSLoginMobileNumHandler();
    }
  }, []);

  // 안드로이드 권한 설정
  const requestAndroidPermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple(
        [
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        ]
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera");
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  // 슬라이더 (배너) progress bar 표현식
  const calculator = (name) => {
    let initialPer01 = 1 / name.length;
    if (name === mainBanners) {
      setMainPercent(initialPer01);
    } else {
      setStepPercent(initialPer01);
    }
  };

  // 메인 최상단 슬라이더(배너) API 연동
  const getMainTopSlider = () => {
    Main.onSlider('proc_banner_list', '상단')
      .then((res) => {
        if (res.data.result === '1' && res.data.count > 0) {
          setMainBanners(res.data.item);
          calculator(mainBanners);
          setIsLoading(false);
        } else if (res.data.result === '1' && res.data.count <= 0) {
          setMainBanners(null);
          setIsLoading(false);
        } else {
          setMainBanners(null);
          setIsLoading(false);
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

  // 메인 중간 슬라이더(배너) API 연동
  const getMainMiddleSlider = () => {
    Main.onSlider('proc_banner_list', '중단')
      .then((res) => {
        if (res.data.result === '1' && res.data.count > 0) {
          setMiddleBanners(res.data.item);
          calculator(middleBanners);
          setIsLoading(false);
        } else if (res.data.result === '1' && res.data.count <= 0) {
          setMainBanners(null);
          setIsLoading(false);
        } else {
          setMainBanners(null);
          setIsLoading(false);
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

  // 실시간 견적 처리 현황
  const [allOrders, setAllOrders] = React.useState([]);
  const getAllOrderList = () => {
    OrderAPI.getAllOrders('1')
      .then((res) => {
        if (res.data.result === '1' && res.data.count > 0) {
          setAllOrders(res.data.item);
        } else {
          setAllOrders(null);
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

  const renderRow = ({item, index}) => {
    return (
      <View key={index}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#FFF',
            marginVertical: 15,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#FFF',
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(54, 109, 229, 0.07)',
                borderRadius: 5,
                marginRight: 10,
              }}>
              <View
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 5,
                  // flexWrap: 'wrap',
                }}>
                <Text
                  style={[
                    styles.normalText,
                    {textAlign: 'center', fontSize: 12, color: '#366DE5', marginBottom: 5},
                  ]}>
                  {item.status === '0'
                    ? '견적요청'
                    : item.status === '1'
                    ? '입찰중'
                    : item.status === '2'
                    ? '파트너선정'
                    : item.status === '3'
                    ? '파트너선정'
                    : item.status === '4'
                    ? '파트너선정'
                    : item.status === '5'
                    ? '제작요청'
                    : item.status === '6'
                    ? '납품완료'
                    : item.status === '7'
                    ? '수령완료'
                    : item.status === '8'
                    ? '마감'
                    : null}
                </Text>
                {item.status === '1' ? (
                  <Text
                    style={[
                      styles.normalText,
                      {fontSize: 12, color: '#366DE5'},
                    ]}>
                    {item.ecnt}건
                  </Text>
                ) : null}
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
                <Text
                  style={[
                    styles.mediumText,
                    {
                      color: '#000',
                      fontSize: 14,
                    },
                  ]}
                  numberOfLines={1}>
                  {item.title}
                </Text>
              </View>
              <Text
                style={[styles.normalText, {fontSize: 13, color: '#979797'}]}
                numberOfLines={1}>
                {item.ca_name}
              </Text>
            </View>
          </View>

          <View style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
            <Text
              style={[
                styles.normalText,
                {fontSize: 13, color: '#979797', marginBottom: 5},
              ]}>
              {item.mb_name}
            </Text>
            <Text style={[styles.normalText, {fontSize: 13, color: '#979797'}]}>
              {item.edate}
            </Text>
          </View>
        </View>
        <Dash
          style={{width: '100%', height: 0.25}}
          dashLength={1}
          dashColor="#ccc"
          dashGap={2}
          dashThickness={1}
        />
      </View>
    );
  };

  React.useEffect(() => {
    if(Platform.OS === 'android') {
      requestAndroidPermission();
    }
    setIsLoading(true);
    getMainTopSlider();
    getMainMiddleSlider();
    getAllOrderList();
  }, []);

  const mainCarouselRef = React.useRef(null);
  const stepCarouselRef = React.useRef(null);
  const bannerCarouselRef = React.useRef(null);

  // 페이퍼공작소의 제작과정 슬라이더 이미지
  const steps = [
    {
      id: 1,
      image: require('../../src/images/step01.png'),
    },
    {
      id: 2,
      image: require('../../src/images/step02.png'),
    },
    {
      id: 3,
      image: require('../../src/images/step03.png'),
    },
    {
      id: 4,
      image: require('../../src/images/step04.png'),
    },
    {
      id: 5,
      image: require('../../src/images/step05.png'),
    },
  ];

  // 메인 최상단 슬라이더 배너
  const mainRenderItem = ({item, index}) => {
    return (
      <View style={{borderRadius: 20, height: 120}}>
        <Image
          key={item.bn_id}
          source={{uri: `${item.bimg}`}}
          resizeMode="cover"
          style={{
            width: '100%',
            height: 400,
          }}
        />
      </View>
    );
  };

  const stepRenderItem = ({item, index}) => {
    return (
      <View style={{borderRadius: 20, height: 120}}>
        <Image
          key={index}
          source={item.image}
          resizeMode="cover"
          style={{
            width: '100%',
            height: 350,
          }}
        />
      </View>
    );
  };

  const sliderWidth = Dimensions.get('window').width;
  const minItemWidth = Dimensions.get('window').width;
  const itemWidth = Dimensions.get('window').width - 60;

  const [activeSlide, setActiveSlide] = React.useState(0);
  const [mainActiveSlide, setMainActiveSlide] = React.useState(0);
  const [stepActiveSlide, setStepActiveSlide] = React.useState(0);

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

  const initialLayout = {width: Dimensions.get('window').width};

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: '성실파트너스'},
    {key: 'second', title: '인기파트너스'},
    {key: 'third', title: '지역파트너스'},
  ]);

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'first':
        return <FirstRoute navigation={navigation} />;
      case 'second':
        return <SecondRoute navigation={navigation} />;
      case 'third':
        return <ThirdRoute navigation={navigation} />;
    }
  };

  const [tabIndex, setTabIndex] = React.useState('first');

  const TabBar = (props) => {
    const {tabIndex, jumpTo} = props;

    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 10,
              paddingBottom: 10,
              // backgroundColor: '#ffaaee',
            }}
            onPress={async () => {
              await jumpTo('first');
              await setTabIndex('first');
            }}>
            <Text
              style={[
                tabIndex === 'first' && index === 0
                  ? styles.boldText
                  : styles.mediumText,
                {
                  paddingVertical: 12,
                  fontSize: 14,
                  color:
                    tabIndex === 'first' && index === 0 ? '#275696' : '#B5B5B5',
                },
              ]}>
              성실파트너스
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 10,
              paddingBottom: 10,
              // backgroundColor: '#ffeeee',
            }}
            onPress={async () => {
              await jumpTo('second');
              await setTabIndex('second');
            }}>
            <Text
              style={[
                tabIndex === 'second' || index === 1
                  ? styles.boldText
                  : styles.mediumText,
                {
                  paddingVertical: 12,
                  fontSize: 14,
                  color:
                    tabIndex === 'second' || index === 1
                      ? '#275696'
                      : '#B5B5B5',
                },
              ]}>
              인기파트너스
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 10,
              paddingBottom: 10,
              // backgroundColor: '#ffeeaa',
            }}
            onPress={async () => {
              await jumpTo('third');
              await setTabIndex('third');
            }}>
            <Text
              style={[
                tabIndex === 'third' || index === 2
                  ? styles.boldText
                  : styles.mediumText,
                {
                  paddingVertical: 12,
                  fontSize: 14,
                  color:
                    tabIndex === 'third' || index === 2 ? '#275696' : '#B5B5B5',
                },
              ]}>
              지역파트너스
            </Text>
            {tabIndex === 'third' || index === 2 ? (
              <View
                style={{
                  position: 'absolute',
                  top: 37,
                  right: 0,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}></View>
            ) : null}
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // 파트너스 탭 end

  const offset = React.useRef(new Animated.Value(0)).current;
  // const [animation] = React.useState(new Animated.Value(1));

  const headerOpacity = offset.interpolate({
    inputRange: [0, 200],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const [offsetY, setOffsetY] = React.useState(0);

  const handleScroll = (e) => {
    setOffsetY(e.nativeEvent.contentOffset.y);
  };

  return (    
    <SafeAreaView style={{ backgroundColor: '#fff' }}>
      <View style={{position: 'relative'}}>
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
            backgroundColor: 'rgba(255,255,255,0.8)',
          }}>
          <ActivityIndicator size="large" color="#275696" />
        </View>
      )}      
      {Platform.OS === 'android' ? <StatusBar hidden={true} /> : <StatusBar translucent barStyle="dark-content"  /> }

      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 5,
          elevation: 0,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: Dimensions.get('window').width,
          paddingVertical: 15,
          paddingHorizontal: 25,
          // backgroundColor: offsetY > 50 ? 'rgba(255,255,255,0.9)' : 'transparent',
          opacity: headerOpacity,
        }}>
        <View>
          <Text
            style={[
              styles.boldText,
              {
                fontSize: 20,
                letterSpacing: -2,
              },
            ]}>
            페이퍼공작소
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Search')}>
            <Image
              source={require('../../src/assets/top_seach02.png')}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
                marginRight: 20,
              }}
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => navigation.openDrawer('right')}
            hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}>
            <Image
              source={require('../../src/assets/menu.png')}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
              }}
            />
          </TouchableWithoutFeedback>
        </View>
      </Animated.View>

      <Animated.ScrollView
        style={{backgroundColor: '#fff'}}
        showsVerticalScrollIndicator={false}
        // nestedScrollEnabled={true}
        // onScroll={handleScroll}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: offset}}}],
          {
            useNativeDriver: true,
          },
        )}>
        {/* 메인 상단 슬라이더 section */}
        <View
          style={{
            width: Dimensions.get('window').width,
          }}>
          <View style={{position: 'relative', height: 400}}>
            <Carousel
              ref={mainCarouselRef}
              data={mainBanners}
              renderItem={mainRenderItem}
              sliderWidth={sliderWidth}
              itemWidth={minItemWidth}
              layout="default"
              autoplay={true}
              autoplayDelay={3000}
              autoplayInterval={1000}
              loop={true}
              onSnapToItem={(index) => {
                setMainActiveSlide(index);
                let stepPer = (index + 1) / mainBanners.length;
                setMainPercent(stepPer);
              }}
              containerCustomStyle={{height: 400}}
            />
            <View
              style={{
                position: 'absolute',
                top: 265,
                left: 20,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={[styles.mediumText, {fontSize: 14, color: '#275696'}]}>
                  0{mainActiveSlide + 1}
                  {/* //총 이미지 갯수중 현재 index가 몇인지를 나타낸다 */}
                </Text>
                <View
                  style={{
                    width: 55,
                    height: 2,
                    backgroundColor: '#C1C1C1',
                    marginHorizontal: 5,
                    position: 'relative',
                  }}>
                  <View
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width:
                        mainPercent === 1 ? '100%' : `${mainPercent * 100}%`,
                      height: 2,
                      backgroundColor: '#275696',
                    }}
                  />
                </View>
                <Text
                  style={[styles.mediumText, {fontSize: 14, color: '#C1C1C1'}]}>
                  0{mainBanners.length}
                </Text>
              </View>
            </View>

            <View
              style={{
                position: 'absolute',
                right: 0,
                bottom: 0,
                width: Dimensions.get('window').width - 30,
                height: 100,
                backgroundColor: '#275696',
                borderTopLeftRadius: 20,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: 25,
                  paddingHorizontal: 20,
                }}>
                <View>
                  <Text
                    style={[
                      styles.normalText,
                      {
                        color: '#fff',
                        fontSize: 12,
                      },
                    ]}>
                    총 누적 견적
                  </Text>
                  <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
                    <Text
                      style={[
                        styles.mediumText,
                        {
                          color: '#fff',
                          fontSize: 24,
                          fontWeight: 'bold',
                          marginRight: 5,
                        },
                      ]}>
                      252,154
                    </Text>
                    <Text
                      style={[
                        styles.normalText,
                        {color: '#fff', fontSize: 17, fontWeight: '100'},
                      ]}>
                      건
                    </Text>
                  </View>
                </View>
                <View>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() =>
                      navigation.navigate('Order', {screen: 'Order'})
                    }
                    style={{
                      borderWidth: 2,
                      borderColor: '#fff',
                      borderRadius: 30,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: 22,
                        paddingVertical: 12,
                      }}>
                      <Image
                        source={require('../../src/assets/icon02_m.png')}
                        resizeMode="contain"
                        style={{
                          width: 20,
                          height: 22,
                          marginRight: 2,
                        }}
                      />
                      <Text
                        style={[
                          styles.normalText,
                          {
                            fontSize: 14,
                            color: '#fff',
                          },
                        ]}>
                        견적받기
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
        {/* // 메인 상단 슬라이더 section */}
        {/* 견적 바로가기 아이콘 section */}
        <View
          style={{
            flexDirection: 'row',
            marginV: 40,
            paddingHorizontal: 50,
            justifyContent: 'space-between',
            backgroundColor: '#fff',
            paddingVertical: 40,
          }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              dispatch(selectCate1('1'));
              navigation.navigate('OrderPackage', {
                screen: 'OrderPackage',
                params: {screen: 'OrderPackage'},
              });
            }}
            style={{justifyContent: 'center', alignItems: 'center'}}>
            <View
              style={{
                width: 100,
                height: 100,
                borderRadius: 100,
                marginBottom: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../src/images/icon06.png')}
                resizeMode="contain"
                style={{
                  position: 'absolute',
                  width: 100,
                  height: 100,
                  borderRadius: 100,
                  marginBottom: 10,
                }}
              />
            </View>

            <Text
              style={[
                styles.mediumText,
                {
                  fontSize: 16,
                  letterSpacing: -1,
                  marginBottom: 3,
                },
              ]}>
              패키지
            </Text>
            <Text
              style={[
                styles.normalText,
                {
                  fontSize: 12,
                  color: '#979797',
                  letterSpacing: -1,
                  marginBottom: 10,
                },
              ]}>
              단상자/싸바리/쇼핑백 등
            </Text>

            <View style={{backgroundColor: '#275696', borderRadius: 20}}>
              <Text
                style={[
                  styles.normalText,
                  {
                    fontSize: 13,
                    color: '#fff',
                    paddingVertical: 7,
                    paddingHorizontal: 13,
                  },
                ]}>
                견적 바로가기
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              dispatch(selectCate1('0'));
              navigation.navigate('OrderGeneral', {
                screen: 'OrderGeneral',
                params: {screen: 'OrderGeneral'},
              });
            }}
            style={{justifyContent: 'center', alignItems: 'center'}}>
            <View
              style={{
                width: 100,
                height: 100,
                borderRadius: 100,
                marginBottom: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../src/images/icon07.png')}
                resizeMode="contain"
                style={{
                  position: 'absolute',
                  width: 100,
                  height: 100,
                  borderRadius: 100,
                  marginBottom: 10,
                }}
              />
            </View>

            <Text
              style={[
                styles.mediumText,
                {
                  fontSize: 16,
                  letterSpacing: -1,
                  marginBottom: 3,
                },
              ]}>
              일반인쇄
            </Text>
            <Text
              style={[
                styles.normalText,
                {
                  fontSize: 12,
                  color: '#979797',
                  letterSpacing: -1,
                  marginBottom: 10,
                },
              ]}>
              리플렛/브로슈어/포스터 등
            </Text>

            <View style={{backgroundColor: '#275696', borderRadius: 20}}>
              <Text
                style={[
                  styles.normalText,
                  {
                    fontSize: 13,
                    color: '#fff',
                    paddingVertical: 7,
                    paddingHorizontal: 13,
                  },
                ]}>
                견적 바로가기
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* // 견적 바로가기 아이콘 section */}

        {/* 페이퍼 공작소 제작 과정 section */}
        <View
          style={{
            paddingTop: 50,
            paddingBottom: 30,
            backgroundColor: '#F5F5F5',
            position: 'relative',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 30,
              paddingHorizontal: 20,
            }}>
            <Text
              style={[
                styles.boldText,
                {
                  fontSize: 18,
                  letterSpacing: -1,
                },
              ]}>
              페이퍼공작소의 제작 과정
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={[styles.mediumText, {fontSize: 14, color: '#275696'}]}>
                {/* 0{currentRqIndex} */}0{stepActiveSlide + 1}
                {/* //총 이미지 갯수중 현재 index가 몇인지를 나타낸다 */}
              </Text>
              <View
                style={{
                  width: 65,
                  height: 2,
                  backgroundColor: '#C1C1C1',
                  marginHorizontal: 5,
                  position: 'relative',
                }}>
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: stepPercent === 1 ? '100%' : `${stepPercent * 100}%`,
                    height: 2,
                    backgroundColor: '#275696',
                  }}
                />
              </View>
              <Text
                style={[styles.mediumText, {fontSize: 14, color: '#C1C1C1'}]}>
                0{steps.length}
              </Text>
            </View>
          </View>
          <View>
            <Carousel
              ref={stepCarouselRef}
              data={steps}
              renderItem={stepRenderItem}
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
              layout="default"
              autoplay={true}
              autoplayDelay={3000}
              autoplayInterval={1000}
              loop={true}
              onSnapToItem={(index) => {
                setStepActiveSlide(index);

                let stepPer = (index + 1) / steps.length;
                setStepPercent(stepPer);
              }}
              containerCustomStyle={{height: 350}}
              // contentInset={{ marginHorizontal: 20 }}
            />
          </View>
        </View>
        {/* // 페이퍼 공작소 제작 과정 section */}

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
              data={middleBanners}
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
              // containerCustomStyle={{ marginHorizontal: 20 }}
            />
            <Pagination
              dotsLength={middleBanners.length}
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

        {/* 파트너스 section */}
        <View
          style={{
            paddingBottom: 30,
            backgroundColor: '#fff',
            position: 'relative',
          }}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Partners')}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 10,
                paddingHorizontal: 20,
              }}>
              <Text
                style={[
                  styles.boldText,
                  {
                    fontSize: 18,
                  },
                ]}>
                파트너스
              </Text>

              <Image
                source={require('../../src/images/next.png')}
                resizeMode="contain"
                style={{width: 14, height: 15}}
              />
            </View>
          </TouchableWithoutFeedback>
          <View style={{paddingHorizontal: 20}}>
            <TabView
              renderTabBar={(props) => (
                <TabBar
                  {...props}
                  navigation={navigation}
                  setTabIndex={setTabIndex}
                  tabIndex={tabIndex}
                  onIndexChange={setIndex}
                />
              )}
              navigationState={{index, routes}}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={initialLayout}
              swipeEnabled={false}
            />
          </View>
        </View>
        {/* // 파트너스 section */}

        {/* 실시간 견적 처리 현황 section */}
        <View
          style={{
            paddingTop: 20,
            paddingBottom: 30,
            backgroundColor: '#fff',
            position: 'relative',
          }}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Estimate')}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 20,
                marginBottom: 15,
              }}>
              <Text
                style={[
                  styles.boldText,
                  {
                    fontSize: 18,
                  },
                ]}>
                실시간 견적 처리 현황
              </Text>

              {/* <TouchableWithoutFeedback
                onPress={() => navigation.navigate('Estimate')}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 10,
                    paddingLeft: 10,
                  }}>
                  <Text
                    style={[
                      styles.normalText,
                      {fontSize: 13, color: '#275696', marginRight: 5},
                    ]}>
                    견적 더보기
                  </Text>
                  <Image
                    source={require('../../src/assets/plus.png')}
                    resizeMode="contain"
                    style={{width: 14, height: 14}}
                  />
                </View>
              </TouchableWithoutFeedback> */}
            </View>
          </TouchableWithoutFeedback>
          <View style={{paddingHorizontal: 20}}>
            {/* 실시간 견적현황 리스트(list) */}
            <FlatList
              nestedScrollEnabled={true}
              data={allOrders}
              renderItem={renderRow}
              keyExtractor={(list, index) => index.toString()}
              // numColumns={1}
              // pagingEnabled={true}
              persistentScrollbar={true}
              showsVerticalScrollIndicator={false}
              progressViewOffset={true}
              refreshing={true}
              ListEmptyComponent={
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                    height: 200,
                  }}>
                  <Text style={{fontFamily: SCDream4}}>
                    실시간 견적 처리 현황 리스트가 없습니다.
                  </Text>
                </View>
              }
            />
            {/* // 실시간 견적현황 리스트(list) */}

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Order', {screen: 'Order'})}
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#275696',
                borderRadius: 5,
                marginTop: 40,
              }}>
              <Text
                style={[
                  styles.mediumText,
                  {
                    textAlign: 'center',
                    fontSize: 16,
                    color: '#fff',
                    paddingVertical: 15,
                  },
                ]}>
                견적 신청하기
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* // 실시간 견적 처리 현황 section */}
        <Footer navigation={navigation} />
      </Animated.ScrollView>
    </View>
    </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  listStep02Badge: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#275696',
    borderRadius: 2,
    alignSelf: 'flex-start',
  },
  listStep02BadgePayReq: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EFF6FF',
    borderRadius: 2,
    backgroundColor: '#EFF6FF',
    alignSelf: 'flex-start',
  },
  listStep02BadgePayComplete: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F5F5F5',
    borderRadius: 2,
    backgroundColor: '#F5F5F5',
    alignSelf: 'flex-start',
  },
  listStep02BadgeTimeOver: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F5F5F5',
    borderRadius: 2,
    backgroundColor: '#F5F5F5',
    alignSelf: 'flex-start',
  },
  listStep02BadgeText: {
    fontFamily: SCDream4,
    fontSize: 12,
    color: '#000000',
    paddingVertical: 2,
    paddingHorizontal: 5,
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

export default index;
