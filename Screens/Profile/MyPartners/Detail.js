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

import Carousel from 'react-native-snap-carousel';
import StarRating from 'react-native-star-rating';
import {useDispatch} from 'react-redux';

import Header from '../Common/DetailHeader';
import Footer from '../Common/Footer';

import {setCompanyId} from '../../Modules/OrderReducer';

const Detail = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  const name = props.route.params.name;
  const bName = props.route.params.bName;
  const rating = props.route.params.rating;
  const portfolioImg = props.route.params.portfolioImg;
  const mobile = props.route.params.mobile;
  const description = props.route.params.description;
  const used = props.route.params.used;
  const openingTime = props.route.params.openingTime;
  const closedDay = props.route.params.closedDay;
  const cate1 = props.route.params.cate1;
  const companyId = props.route.params.companyId;

  const dispatch = useDispatch();

  const [like, setLike] = React.useState(false);
  const onLikeBtn = () => {
    setLike((prev) => !prev);
  };

  const carouselRef = React.useRef(null);

  const renderItem = ({item, index}) => {
    return (
      <Image
        key={index}
        source={{uri: `${item}`}}
        resizeMode="cover"
        style={{width: Dimensions.get('window').width, height: 400}}
      />
    );
  };

  const sliderWidth = Dimensions.get('window').width;
  const itemWidth = Dimensions.get('window').width;

  return (
    <>
      <Header title={routeName} navigation={navigation} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View
          style={{
            position: 'relative',
            backgroundColor: '#fff',
            justifyContent: 'flex-start',
            marginBottom: 20,
          }}>
          {portfolioImg ? (
            <Carousel
              ref={carouselRef}
              data={portfolioImg ? portfolioImg : null}
              renderItem={renderItem}
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
              loop={true}
            />
          ) : (
            <Image
              source={require('../../src/assets/noImg.png')}
              resizeMode="cover"
              style={{width: '100%'}}
            />
          )}

          {/* Swipe Prev,Next 버튼 Custom */}
          {portfolioImg ? (
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
                    style={{width: 22, height: 20}}
                  />
                </View>
              </TouchableWithoutFeedback>
              <View
                style={{borderWidth: 0.2, height: 15, borderColor: '#D4D4D4'}}
              />
              <TouchableWithoutFeedback
                onPress={() => {
                  carouselRef.current.snapToNext();
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                  }}>
                  <Image
                    source={require('../../src/assets/slide_arr01.png')}
                    resizeMode="contain"
                    style={{width: 22, height: 20}}
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
          ) : null}
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
            <View style={{justifyContent: 'flex-start'}}>
              {/* Partner_logo.png */}
              <Image
                source={require('../../src/images/Partner_logo.png')}
                resizeMode="cover"
                style={{width: 55, height: 15, marginBottom: 5}}
              />
              <Text
                style={[styles.mediumText, {fontSize: 20, marginBottom: 5}]}>
                {bName}
              </Text>
              <Text
                style={[
                  styles.mediumText,
                  {fontSize: 12, marginBottom: 12, color: '#707070'},
                ]}>
                담당자 {name}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                <StarRating
                  disabled={false}
                  emptyStar={require('../../src/assets/star_off.png')}
                  fullStar={require('../../src/assets/star_on.png')}
                  maxStars={5}
                  rating={Math.floor(rating)}
                  starSize={13}
                />
                <Text
                  style={[styles.normalText, {fontSize: 12, marginLeft: 5}]}>
                  {rating}
                </Text>
              </View>
            </View>
          </View>
          {/* // 회사정보 상단 fix */}
        </View>
        <View style={{paddingHorizontal: 20}}>
          {/* <View
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
            <TouchableWithoutFeedback
              onPress={() => Linking.openURL(`tel:${mobile}`)}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 12,
                }}>
                <Image
                  source={require('../../src/assets/call01.png')}
                  resizeMode="cover"
                  style={{width: 24, height: 24}}
                />
                <Text
                  style={[
                    styles.normalText,
                    {
                      fontSize: 14,
                      marginLeft: 5,
                    },
                  ]}>
                  전화하기
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <View
              style={{borderWidth: 0.5, height: '100%', borderColor: '#E3E3E3'}}
            />
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('MessageDetail')}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 12,
                }}>
                <Image
                  source={require('../../src/assets/msm01.png')}
                  resizeMode="cover"
                  style={{width: 24, height: 24}}
                />
                <Text
                  style={[
                    styles.normalText,
                    {
                      fontSize: 14,
                      marginLeft: 5,
                    },
                  ]}>
                  메세지보내기
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View> */}

          {/* 업체소개 */}
          <View>
            <Text style={[styles.mediumText, {fontSize: 16, marginBottom: 15}]}>
              업체소개
            </Text>
            <Text
              style={[
                styles.normalText,
                {fontSize: 14, lineHeight: 22, marginBottom: 5},
              ]}>
              {description
                ? description
                : '업체 소개글이 등록되어 있지 않습니다.'}
            </Text>

            <View style={{paddingVertical: 20, paddingLeft: 7}}>
              <Text
                style={[styles.normalText, {fontSize: 14, marginBottom: 5}]}>
                * 업무시간 :
                {openingTime ? openingTime : ' 현재 미등록 상태입니다.'}
                {/* 평일 09:00 ~ 18:00 */}
              </Text>
              <Text style={[styles.normalText, {fontSize: 14}]}>
                * 휴무일 안내 :
                {closedDay ? closedDay : ' 현재 미등록 상태입니다.'}
                {/* * 토, 일, 공휴일 휴무 */}
              </Text>
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
          <Text style={[styles.mediumText, {fontSize: 16, marginBottom: 10}]}>
            영업품목
          </Text>
          <Text
            style={[
              styles.normalText,
              {fontSize: 14, lineHeight: 24, marginBottom: 5},
            ]}>
            {used ? used : '영업품목이 등록되어 있지 않습니다.'}
          </Text>
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
            <Text style={[styles.mediumText, {fontSize: 16, marginRight: 12}]}>
              고객후기
            </Text>
            <Text style={[styles.normalText, {fontSize: 14, color: '#275696'}]}>
              총 리뷰수 26
            </Text>
          </View>
          {/* 고객후기 리스트 박스 */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('ReviewDetail')}
            style={{
              borderWidth: 1,
              borderColor: '#E3E3E3',
              borderRadius: 5,
              marginBottom: 10,
            }}>
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
                style={{width: 75, height: 70, position: 'relative'}}>
                <Text
                  style={[
                    styles.normalText,
                    {
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      fontSize: 10,
                      backgroundColor: 'rgba(0,0,0,0.45)',
                      color: '#fff',
                      padding: 5,
                    },
                  ]}>
                  +6
                </Text>
              </ImageBackground>
              <View style={{flexShrink: 2, marginLeft: 20}}>
                <Text
                  style={[styles.boldText, {fontSize: 14, marginBottom: 10}]}>
                  하나로세상(김*미 고객님)
                </Text>
                <Text
                  style={[styles.normalText, {fontSize: 14, lineHeight: 22}]}>
                  배송도 빠르고 프린트 퀄리티도 너무 좋아요 배송도 빠르고 프린트
                  퀄리티도 너무 좋아요
                </Text>
              </View>
            </View>
            <View
              style={{width: '100%', height: 1, backgroundColor: '#E3E3E3'}}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 20,
                paddingVertical: 10,
              }}>
              <View>
                <Text
                  style={[
                    styles.normalText,
                    {fontSize: 12, color: '#707070', marginBottom: 7},
                  ]}>
                  소통만족도
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../../src/images/rating04.png')}
                    resizeMode="cover"
                    style={{width: 55, height: 15, marginRight: 5}}
                  />
                  <Text style={[styles.normalText, {fontSize: 10}]}>4.0</Text>
                </View>
              </View>
              <View>
                <Text
                  style={[
                    styles.normalText,
                    {fontSize: 12, color: '#707070', marginBottom: 7},
                  ]}>
                  품질만족도
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../../src/images/rating.png')}
                    resizeMode="cover"
                    style={{width: 55, height: 15, marginRight: 5}}
                  />
                  <Text style={[styles.normalText, {fontSize: 10}]}>5.0</Text>
                </View>
              </View>
              <View>
                <Text
                  style={[
                    styles.normalText,
                    {fontSize: 12, color: '#707070', marginBottom: 7},
                  ]}>
                  납기만족도
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../../src/images/rating.png')}
                    resizeMode="cover"
                    style={{width: 55, height: 15, marginRight: 5}}
                  />
                  <Text style={[styles.normalText, {fontSize: 10}]}>5.0</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          {/* // 고객후기 리스트 박스 */}
          {/* 고객후기 리스트 박스 */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('ReviewDetail')}
            style={{
              borderWidth: 1,
              borderColor: '#E3E3E3',
              borderRadius: 5,
              marginBottom: 10,
            }}>
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
                style={{width: 75, height: 70, position: 'relative'}}>
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
              <View style={{flexShrink: 2, marginLeft: 20}}>
                <Text
                  style={[styles.boldText, {fontSize: 14, marginBottom: 10}]}>
                  신세계세상(정*주 고객님)
                </Text>
                <Text
                  style={[styles.normalText, {fontSize: 14, lineHeight: 22}]}>
                  퀄리티 하나는 정말 끝내줍니다. 믿고 맡기는 업체로 선정한 지 꽤
                  됩니다.
                </Text>
              </View>
            </View>
            <View
              style={{width: '100%', height: 1, backgroundColor: '#E3E3E3'}}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 20,
                paddingVertical: 10,
              }}>
              <View>
                <Text
                  style={[
                    styles.normalText,
                    {fontSize: 12, color: '#707070', marginBottom: 7},
                  ]}>
                  소통만족도
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../../src/images/rating04.png')}
                    resizeMode="cover"
                    style={{width: 55, height: 15, marginRight: 5}}
                  />
                  <Text style={[styles.normalText, {fontSize: 10}]}>4.0</Text>
                </View>
              </View>
              <View>
                <Text
                  style={[
                    styles.normalText,
                    {fontSize: 12, color: '#707070', marginBottom: 7},
                  ]}>
                  품질만족도
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../../src/images/rating.png')}
                    resizeMode="cover"
                    style={{width: 55, height: 15, marginRight: 5}}
                  />
                  <Text style={[styles.normalText, {fontSize: 10}]}>5.0</Text>
                </View>
              </View>
              <View>
                <Text
                  style={[
                    styles.normalText,
                    {fontSize: 12, color: '#707070', marginBottom: 7},
                  ]}>
                  납기만족도
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../../src/images/rating04.png')}
                    resizeMode="cover"
                    style={{width: 55, height: 15, marginRight: 5}}
                  />
                  <Text style={[styles.normalText, {fontSize: 10}]}>4.0</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          {/* // 고객후기 리스트 박스 */}
          {/* 고객후기 리스트 박스 */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('ReviewDetail')}
            style={{
              borderWidth: 1,
              borderColor: '#E3E3E3',
              borderRadius: 5,
              marginBottom: 10,
            }}>
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
                style={{width: 75, height: 70, position: 'relative'}}>
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
              <View style={{flexShrink: 2, marginLeft: 20}}>
                <Text
                  style={[styles.boldText, {fontSize: 14, marginBottom: 10}]}>
                  내안에바다(전*리 고객님)
                </Text>
                <Text
                  style={[styles.normalText, {fontSize: 14, lineHeight: 22}]}>
                  명함은 항상 여기서 주문해요. 고급지도 종류별로 다양하고
                  디지털로 찍어도 오프셋 뺨치게 잘나옵니다.
                </Text>
              </View>
            </View>
            <View
              style={{width: '100%', height: 1, backgroundColor: '#E3E3E3'}}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 20,
                paddingVertical: 10,
              }}>
              <View>
                <Text
                  style={[
                    styles.normalText,
                    {fontSize: 12, color: '#707070', marginBottom: 7},
                  ]}>
                  소통만족도
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../../src/images/rating.png')}
                    resizeMode="cover"
                    style={{width: 55, height: 15, marginRight: 5}}
                  />
                  <Text style={[styles.normalText, {fontSize: 10}]}>5.0</Text>
                </View>
              </View>
              <View>
                <Text
                  style={[
                    styles.normalText,
                    {fontSize: 12, color: '#707070', marginBottom: 7},
                  ]}>
                  품질만족도
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../../src/images/rating.png')}
                    resizeMode="cover"
                    style={{width: 55, height: 15, marginRight: 5}}
                  />
                  <Text style={[styles.normalText, {fontSize: 10}]}>5.0</Text>
                </View>
              </View>
              <View>
                <Text
                  style={[
                    styles.normalText,
                    {fontSize: 12, color: '#707070', marginBottom: 7},
                  ]}>
                  납기만족도
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../../src/images/rating04.png')}
                    resizeMode="cover"
                    style={{width: 55, height: 15, marginRight: 5}}
                  />
                  <Text style={[styles.normalText, {fontSize: 10}]}>4.0</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
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
              borderRadius: 5,
              marginTop: 20,
            }}>
            <Text
              style={[
                styles.normalText,
                {
                  textAlign: 'center',
                  fontSize: 16,
                  color: '#444444',
                  paddingVertical: 15,
                },
              ]}>
              고객후기 전체보기
            </Text>
          </TouchableOpacity>
          {/* // 고객후기 전체보기 버튼 */}
        </View>
        {/* // 고객후기 */}

        <Footer navigation={navigation} />
        <View style={{marginBottom: 50}} />
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: Dimensions.get('window').width,
          paddingVertical: 10,
          paddingHorizontal: 20,
          backgroundColor: '#fff',
          zIndex: 5,
          shadowRadius: 4,
          shadowOffset: {
            width: 8,
            height: 16,
          },
          shadowColor: '#000000',
          shadowOpacity: 0.3,
          elevation: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              dispatch(setCompanyId(companyId));
              navigation.navigate('Home', {
                screen: 'Order',
                params: {
                  screen: 'DirectOrder',
                  params: {bName: bName, name: name, cate1: cate1},
                },
              });
            }}
            // onPress={() => navigation.navigate('DirectOrder')}
            style={{width: '85%'}}>
            <View style={[styles.submitBtn]}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={[styles.mediumText, {fontSize: 18, color: '#fff'}]}>
                  견적 신청하기
                </Text>
                <Image
                  source={require('../../src/assets/orderbtn_plus.png')}
                  resizeMode="cover"
                  style={{width: 22, height: 22, marginLeft: 10}}
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} onPress={onLikeBtn}>
            <View>
              <Image
                source={
                  !like
                    ? require('../../src/assets/Dibson_off.png')
                    : require('../../src/assets/Dibson_on.png')
                }
                resizeMode="contain"
                style={{width: 50, height: 50, marginLeft: 10}}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
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
