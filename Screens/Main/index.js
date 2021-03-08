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
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import Dash from 'react-native-dash';
import {TabView, SceneMap} from 'react-native-tab-view';
import Footer from '../Common/Footer';
import Main from '../../src/api/Main';
import {useDispatch, useSelector} from 'react-redux';

import {selectCate1} from '../../Modules/OrderReducer';
import OrderAPI from '../../src/api/OrderAPI';

const index = (props) => {
  const navigation = props.navigation;

  const [isLoading, setIsLoading] = React.useState(false);

  const [mainPercent, setMainPercent] = React.useState(1);
  const [stepPercent, setStepPercent] = React.useState(1);

  const [mainBanners, setMainBanners] = React.useState([]); // 메인 최상단 슬라이더(배너)
  const [middleBanners, setMiddleBanners] = React.useState([]); // 메인 중간 슬라이더(배너)

  const dispatch = useDispatch();
  const {mb_id} = useSelector((state) => state.UserInfoReducer);

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
      .catch((err) => console.log(err));
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
      .catch((err) => console.log(err));
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
      .catch((err) =>
        Alert.alert('문제가 있습니다.', err, [
          {
            text: '확인',
          },
        ]),
      );
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
                marginRight: 15,
              }}>
              <View
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 5,
                }}>
                <Text
                  style={[styles.normalText, {fontSize: 12, color: '#366DE5'}]}>
                  입찰중
                </Text>
                <Text
                  style={[styles.normalText, {fontSize: 12, color: '#366DE5'}]}>
                  {item.ecnt}건
                </Text>
              </View>
            </View>
            <View
              style={{
                flexShrink: 2,
                marginRight: 35,
              }}>
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
    setIsLoading(true);
    getMainTopSlider();
    getMainMiddleSlider();
    getAllOrderList();
  }, []);

  const mainCarouselRef = React.useRef(null);
  const stepCarouselRef = React.useRef(null);
  const bannerCarouselRef = React.useRef(null);

  const steps = [
    {
      id: 1,
      image: require('../../src/images/slide01.png'),
    },
    {
      id: 2,
      image: require('../../src/images/slide02.png'),
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

  // 파트너스 탭 start
  const FirstRoute = (props) => (
    <View>
      {/* 파트너스 리스트(list) */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('PartnersDetail')}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#F5F5F5',
          paddingHorizontal: 20,
          paddingVertical: 15,
          borderRadius: 5,
          marginBottom: 10,
        }}>
        <View
          style={{
            flexShrink: 2,
            marginRight: 35,
            // backgroundColor: '#ffeeaa',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginBottom: 7,
            }}>
            <Text
              style={[
                styles.mediumText,
                {
                  color: '#000',
                  fontSize: 14,
                },
              ]}>
              삼보인쇄
            </Text>
            <View
              style={{
                backgroundColor: '#3CD7C8',
                borderRadius: 2,
                marginLeft: 5,
              }}>
              <Text
                style={[
                  styles.normalText,
                  {
                    color: '#fff',
                    fontSize: 11,
                    paddingHorizontal: 5,
                    paddingVertical: 2,
                  },
                ]}>
                패키지
              </Text>
            </View>
            <View
              style={{
                backgroundColor: '#275696',
                borderRadius: 2,
                marginLeft: 5,
              }}>
              <Text
                style={[
                  styles.normalText,
                  {
                    color: '#fff',
                    fontSize: 11,
                    paddingHorizontal: 5,
                    paddingVertical: 2,
                  },
                ]}>
                일반인쇄
              </Text>
            </View>
          </View>
          <Text
            style={[styles.normalText, {fontSize: 13, lineHeight: 20}]}
            numberOfLines={2}>
            카타로그제작부터 후가공까지 삼보인쇄에서 함께하세요!
          </Text>
        </View>
        <View>
          <Image
            source={require('../../src/images/p07.jpg')}
            resizeMode="cover"
            style={{width: 70, height: 70, borderRadius: 5}}
          />
        </View>
      </TouchableOpacity>
      {/* // 파트너스 리스트(list) */}
      {/* 파트너스 리스트(list) */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('PartnersDetail')}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#F5F5F5',
          paddingHorizontal: 20,
          paddingVertical: 15,
          borderRadius: 5,
          marginBottom: 10,
        }}>
        <View
          style={{
            flexShrink: 2,
            marginRight: 35,
            // backgroundColor: '#ffeeaa',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginBottom: 7,
            }}>
            <Text
              style={[
                styles.mediumText,
                {
                  color: '#000',
                  fontSize: 14,
                },
              ]}>
              미래엔인쇄서비스
            </Text>
            <View
              style={{
                backgroundColor: '#3CD7C8',
                borderRadius: 2,
                marginLeft: 5,
              }}>
              <Text
                style={[
                  styles.normalText,
                  {
                    color: '#fff',
                    fontSize: 11,
                    paddingHorizontal: 5,
                    paddingVertical: 2,
                  },
                ]}>
                패키지
              </Text>
            </View>
            <View
              style={{
                backgroundColor: '#275696',
                borderRadius: 2,
                marginLeft: 5,
              }}>
              <Text
                style={[
                  styles.normalText,
                  {
                    color: '#fff',
                    fontSize: 11,
                    paddingHorizontal: 5,
                    paddingVertical: 2,
                  },
                ]}>
                일반인쇄
              </Text>
            </View>
          </View>
          <Text
            style={[styles.normalText, {fontSize: 13, lineHeight: 18}]}
            numberOfLines={2}>
            대한민국 교육출판 No.1 다양한 지식 콘텐츠로 70년의 역사를 넘어
            최고를 향해 달려...
          </Text>
        </View>
        <View>
          <Image
            source={require('../../src/images/p06.jpg')}
            resizeMode="cover"
            style={{width: 70, height: 70, borderRadius: 5}}
          />
        </View>
      </TouchableOpacity>
      {/* // 파트너스 리스트(list) */}
      {/* 파트너스 리스트(list) */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('PartnersDetail')}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#F5F5F5',
          paddingHorizontal: 20,
          paddingVertical: 15,
          borderRadius: 5,
          marginBottom: 10,
        }}>
        <View
          style={{
            flexShrink: 2,
            marginRight: 35,
            // backgroundColor: '#ffeeaa',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginBottom: 7,
            }}>
            <Text
              style={[
                styles.mediumText,
                {
                  color: '#000',
                  fontSize: 14,
                },
              ]}>
              동천문화인쇄
            </Text>
            <View
              style={{
                backgroundColor: '#275696',
                borderRadius: 2,
                marginLeft: 5,
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 11,
                  paddingHorizontal: 5,
                  paddingVertical: 2,
                }}>
                일반인쇄
              </Text>
            </View>
          </View>
          <Text
            style={[styles.normalText, {fontSize: 13, lineHeight: 18}]}
            numberOfLines={2}>
            국내 유일 10,000 디지털을 인쇄하는 회사입니다. 가격은 DOWN, 퀄리티는
            UP시키...
          </Text>
        </View>
        <View>
          <Image
            source={require('../../src/images/p05.jpg')}
            resizeMode="cover"
            style={{width: 70, height: 70, borderRadius: 5}}
          />
        </View>
      </TouchableOpacity>
      {/* // 파트너스 리스트(list) */}
    </View>
  );

  const SecondRoute = (props) => (
    <View>
      {/* 파트너스 리스트(list) */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('PartnersDetail')}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#F5F5F5',
          paddingHorizontal: 20,
          paddingVertical: 15,
          borderRadius: 5,
          marginBottom: 10,
        }}>
        <View
          style={{
            flexShrink: 2,
            marginRight: 35,
            // backgroundColor: '#ffeeaa',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginBottom: 7,
            }}>
            <Text
              style={[
                styles.mediumText,
                {
                  color: '#000',
                  fontSize: 14,
                },
              ]}>
              동천문화인쇄
            </Text>
            <View
              style={{
                backgroundColor: '#275696',
                borderRadius: 2,
                marginLeft: 5,
              }}>
              <Text
                style={[
                  styles.normalText,
                  {
                    color: '#fff',
                    fontSize: 11,
                    paddingHorizontal: 5,
                    paddingVertical: 2,
                  },
                ]}>
                일반인쇄
              </Text>
            </View>
          </View>
          <Text
            style={[styles.normalText, {fontSize: 13, lineHeight: 18}]}
            numberOfLines={2}>
            국내 유일 10,000 디지털을 인쇄하는 회사입니다. 가격은 DOWN, 퀄리티는
            UP시키...
          </Text>
        </View>
        <View>
          <Image
            source={require('../../src/images/p05.jpg')}
            resizeMode="cover"
            style={{width: 70, height: 70, borderRadius: 5}}
          />
        </View>
      </TouchableOpacity>
      {/* // 파트너스 리스트(list) */}
      {/* 파트너스 리스트(list) */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('PartnersDetail')}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#F5F5F5',
          paddingHorizontal: 20,
          paddingVertical: 15,
          borderRadius: 5,
          marginBottom: 10,
        }}>
        <View
          style={{
            flexShrink: 2,
            marginRight: 35,
            // backgroundColor: '#ffeeaa',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginBottom: 7,
            }}>
            <Text
              style={[
                styles.mediumText,
                {
                  color: '#000',
                  fontSize: 14,
                },
              ]}>
              삼보인쇄
            </Text>
            <View
              style={{
                backgroundColor: '#3CD7C8',
                borderRadius: 2,
                marginLeft: 5,
              }}>
              <Text
                style={[
                  styles.normalText,
                  {
                    color: '#fff',
                    fontSize: 11,
                    paddingHorizontal: 5,
                    paddingVertical: 2,
                  },
                ]}>
                패키지
              </Text>
            </View>
            <View
              style={{
                backgroundColor: '#275696',
                borderRadius: 2,
                marginLeft: 5,
              }}>
              <Text
                style={[
                  styles.normalText,
                  {
                    color: '#fff',
                    fontSize: 11,
                    paddingHorizontal: 5,
                    paddingVertical: 2,
                  },
                ]}>
                일반인쇄
              </Text>
            </View>
          </View>
          <Text
            style={[styles.normalText, {fontSize: 13, lineHeight: 18}]}
            numberOfLines={2}>
            카타로그제작부터 후가공까지 삼보인쇄에서 함께하세요!
          </Text>
        </View>
        <View>
          <Image
            source={require('../../src/images/p07.jpg')}
            resizeMode="cover"
            style={{width: 70, height: 70, borderRadius: 5}}
          />
        </View>
      </TouchableOpacity>
      {/* // 파트너스 리스트(list) */}
      {/* 파트너스 리스트(list) */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('PartnersDetail')}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#F5F5F5',
          paddingHorizontal: 20,
          paddingVertical: 15,
          borderRadius: 5,
          marginBottom: 10,
        }}>
        <View
          style={{
            flexShrink: 2,
            marginRight: 35,
            // backgroundColor: '#ffeeaa',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginBottom: 7,
            }}>
            <Text
              style={[
                styles.mediumText,
                {
                  color: '#000',
                  fontSize: 14,
                },
              ]}>
              미래엔인쇄서비스
            </Text>
            <View
              style={{
                backgroundColor: '#3CD7C8',
                borderRadius: 2,
                marginLeft: 5,
              }}>
              <Text
                style={[
                  styles.normalText,
                  {
                    color: '#fff',
                    fontSize: 11,
                    paddingHorizontal: 5,
                    paddingVertical: 2,
                  },
                ]}>
                패키지
              </Text>
            </View>
            <View
              style={{
                backgroundColor: '#275696',
                borderRadius: 2,
                marginLeft: 5,
              }}>
              <Text
                style={[
                  styles.normalText,
                  {
                    color: '#fff',
                    fontSize: 11,
                    paddingHorizontal: 5,
                    paddingVertical: 2,
                  },
                ]}>
                일반인쇄
              </Text>
            </View>
          </View>
          <Text
            style={[styles.normalText, {fontSize: 13, lineHeight: 18}]}
            numberOfLines={2}>
            대한민국 교육출판 No.1 다양한 지식 콘텐츠로 70년의 역사를 넘어
            최고를 향해 달려...
          </Text>
        </View>
        <View>
          <Image
            source={require('../../src/images/p06.jpg')}
            resizeMode="cover"
            style={{width: 70, height: 70, borderRadius: 5}}
          />
        </View>
      </TouchableOpacity>
      {/* // 파트너스 리스트(list) */}
    </View>
  );

  const ThirdRoute = (props) => (
    <View>
      {/* 파트너스 리스트(list) */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('PartnersDetail')}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#F5F5F5',
          paddingHorizontal: 20,
          paddingVertical: 15,
          borderRadius: 5,
          marginBottom: 10,
        }}>
        <View
          style={{
            flexShrink: 2,
            marginRight: 35,
            // backgroundColor: '#ffeeaa',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginBottom: 7,
            }}>
            <Text
              style={[
                styles.mediumText,
                {
                  color: '#000',
                  fontSize: 14,
                },
              ]}>
              미래엔인쇄서비스
            </Text>
            <View
              style={{
                backgroundColor: '#3CD7C8',
                borderRadius: 2,
                marginLeft: 5,
              }}>
              <Text
                style={[
                  styles.normalText,
                  {
                    color: '#fff',
                    fontSize: 11,
                    paddingHorizontal: 5,
                    paddingVertical: 2,
                  },
                ]}>
                패키지
              </Text>
            </View>
            <View
              style={{
                backgroundColor: '#275696',
                borderRadius: 2,
                marginLeft: 5,
              }}>
              <Text
                style={[
                  styles.normalText,
                  {
                    color: '#fff',
                    fontSize: 11,
                    paddingHorizontal: 5,
                    paddingVertical: 2,
                  },
                ]}>
                일반인쇄
              </Text>
            </View>
          </View>
          <Text
            style={[styles.normalText, {fontSize: 13, lineHeight: 18}]}
            numberOfLines={2}>
            대한민국 교육출판 No.1 다양한 지식 콘텐츠로 70년의 역사를 넘어
            최고를 향해 달려...
          </Text>
        </View>
        <View>
          <Image
            source={require('../../src/images/p06.jpg')}
            resizeMode="cover"
            style={{width: 70, height: 70, borderRadius: 5}}
          />
        </View>
      </TouchableOpacity>
      {/* // 파트너스 리스트(list) */}
      {/* 파트너스 리스트(list) */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('PartnersDetail')}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#F5F5F5',
          paddingHorizontal: 20,
          paddingVertical: 15,
          borderRadius: 5,
          marginBottom: 10,
        }}>
        <View
          style={{
            flexShrink: 2,
            marginRight: 35,
            // backgroundColor: '#ffeeaa',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginBottom: 7,
            }}>
            <Text
              style={[
                styles.mediumText,
                {
                  color: '#000',
                  fontSize: 14,
                },
              ]}>
              동천문화인쇄
            </Text>
            <View
              style={{
                backgroundColor: '#275696',
                borderRadius: 2,
                marginLeft: 5,
              }}>
              <Text
                style={[
                  styles.normalText,
                  {
                    color: '#fff',
                    fontSize: 11,
                    paddingHorizontal: 5,
                    paddingVertical: 2,
                  },
                ]}>
                일반인쇄
              </Text>
            </View>
          </View>
          <Text
            style={[styles.normalText, {fontSize: 13, lineHeight: 18}]}
            numberOfLines={2}>
            국내 유일 10,000 디지털을 인쇄하는 회사입니다. 가격은 DOWN, 퀄리티는
            UP시키...
          </Text>
        </View>
        <View>
          <Image
            source={require('../../src/images/p05.jpg')}
            resizeMode="cover"
            style={{width: 70, height: 70, borderRadius: 5}}
          />
        </View>
      </TouchableOpacity>
      {/* // 파트너스 리스트(list) */}
      {/* 파트너스 리스트(list) */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('PartnersDetail')}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#F5F5F5',
          paddingHorizontal: 20,
          paddingVertical: 15,
          borderRadius: 5,
          marginBottom: 10,
        }}>
        <View
          style={{
            flexShrink: 2,
            marginRight: 35,
            // backgroundColor: '#ffeeaa',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginBottom: 7,
            }}>
            <Text
              style={[
                styles.mediumText,
                {
                  color: '#000',
                  fontSize: 14,
                },
              ]}>
              삼보인쇄
            </Text>
            <View
              style={{
                backgroundColor: '#3CD7C8',
                borderRadius: 2,
                marginLeft: 5,
              }}>
              <Text
                style={[
                  styles.normalText,
                  {
                    color: '#fff',
                    fontSize: 11,
                    paddingHorizontal: 5,
                    paddingVertical: 2,
                  },
                ]}>
                패키지
              </Text>
            </View>
            <View
              style={{
                backgroundColor: '#275696',
                borderRadius: 2,
                marginLeft: 5,
              }}>
              <Text
                style={[
                  styles.normalText,
                  {
                    color: '#fff',
                    fontSize: 11,
                    paddingHorizontal: 5,
                    paddingVertical: 2,
                  },
                ]}>
                일반인쇄
              </Text>
            </View>
          </View>
          <Text
            style={[styles.normalText, {fontSize: 13, lineHeight: 18}]}
            numberOfLines={2}>
            카타로그제작부터 후가공까지 삼보인쇄에서 함께하세요!
          </Text>
        </View>
        <View>
          <Image
            source={require('../../src/images/p07.jpg')}
            resizeMode="cover"
            style={{width: 70, height: 70, borderRadius: 5}}
          />
        </View>
      </TouchableOpacity>
      {/* // 파트너스 리스트(list) */}
    </View>
  );

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
        return <FirstRoute />;
      case 'second':
        return <SecondRoute />;
      case 'third':
        return <ThirdRoute />;
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
      <StatusBar hidden={true} />
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
        nestedScrollEnabled={true}
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
              autoplay={false}
              autoplayDelay={1000}
              autoplayInterval={3000}
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
              loop={false}
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
              // autoplay={true}
              // autoplayDelay={1000}
              // autoplayInterval={5000}
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

              <TouchableWithoutFeedback
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
              </TouchableWithoutFeedback>
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
                  }}>
                  <Text style={{fontFamily: 'SCDream4'}}>
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
  );
};

const styles = StyleSheet.create({
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

export default index;
