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
  Alert,
  ActivityIndicator,
  FlatList,
} from 'react-native';

import Carousel from 'react-native-snap-carousel';
import StarRating from 'react-native-star-rating';
import {useDispatch, useSelector} from 'react-redux';

import Header from '../Common/DetailHeader';
import Footer from '../Common/Footer';

import {setCompanyId} from '../../Modules/OrderReducer';
import {setPartnerLocation} from '../../Modules/OrderHandlerReducer';
import PartnersAPI from '../../src/api/Partners';

const Detail = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  const companyId = props.route.params.companyId;

  console.log('파트너 디테일', props);

  const dispatch = useDispatch();
  const {mb_id} = useSelector((state) => state.UserInfoReducer); // 내 아이디 가져오기(redux)

  const [myFaverP, setMyFavorP] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);
  const [like, setLike] = React.useState(false);
  const [detail, setDetail] = React.useState({});
  const [reviews, setReviews] = React.useState([]);

  // 파트너 상세 가져오기
  const getPartnerDetail = () => {
    setLoading(true);
    PartnersAPI.getPartnerChoise(companyId, mb_id)
      .then((res) => {
        if (res.data.result === '1') {
          setDetail(res.data.item[0]);
          setLoading(false);
        } else {
          Alert.alert(res.data.message, '', [
            {
              text: '확인',
            },
          ]);
          setLoading(false);
        }
      })
      .catch((err) => {
        Alert.alert(err, '관리자에게 문의하세요', [
          {
            text: '확인',
          },
        ]);
        setLoading(false);
      });
  };

  // 파트너 고객후기 가져오기
  const getReview = () => {
    // setLoading(true);
    PartnersAPI.getReview(companyId)
      .then((res) => {
        console.log('review res', res);
        if (res.data.result === '1' && res.data.count > 0) {
          setReviews(res.data.item);
        } else {
          setReviews(null);
        }
      })
      .catch((err) => {
        Alert.alert(err, '관리자에게 문의하세요.', [
          {
            text: '확인',
          },
        ]);
      });
  };

  React.useEffect(() => {
    getPartnerDetail();
    getReview();
    return () => {
      getPartnerDetail();
      getReview();
    };
  }, []);

  const onLikeBtn = (payload) => {
    // setLike((prev) => !prev);
    PartnersAPI.setFavorPartner(mb_id, payload)
      .then((res) => {
        console.log('찜 결과', res);
        if (
          res.data.result === '1' &&
          res.data.message === '찜하기가 취소되었습니다.'
        ) {
          setLike(false);
          checkMyFavorP();
        } else if (
          res.data.result === '1' &&
          res.data.message === '찜하기가 완료되었습니다.'
        ) {
          setLike(true);
          checkMyFavorP();
        }
      })
      .catch((err) => {
        Alert.alert(res.data.message, err, [
          {
            text: '확인',
          },
        ]);
      });
  };

  // 찜한 파트너 확인
  const checkFavor = () => {
    console.log('myFaverP', myFaverP);

    const a =
      myFaverP.length !== 0 &&
      myFaverP.some((element) => {
        //유저정보가 들어와야
        console.log(element.company_id);
        return element.company_id === props.route.params.companyId;
      });
    return a;
  };

  const checkMyFavorP = () => {
    PartnersAPI.getMyPartners(mb_id, null, null, null, null)
      .then((res) => {
        console.log('내 찜 파트너 목록', res);
        if (res.data.result === '1' && res.data.count > 0) {
          setMyFavorP(res.data.item);
        } else {
          Alert.alert(res.data.message, '', [
            {
              text: '확인',
            },
          ]);
        }
      })
      .catch((err) => {
        Alert.alert(res.data.message, err, [
          {
            text: '확인',
          },
        ]);
      });
  };

  React.useEffect(() => {
    checkMyFavorP();
  }, []);

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

  console.log('detail', detail);

  const renderRow = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate('ReviewDetail', {
            screen: 'ReviewDetail',
            params: {reviewID: item.pr_id, companyId: companyId},
          })
        }
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
            source={{uri: `${item.bf_file[0]}`}}
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
              {`+${item.img_cnt}`}
            </Text>
          </ImageBackground>
          <View style={{flexShrink: 2, marginLeft: 20}}>
            <Text style={[styles.boldText, {fontSize: 14, marginBottom: 10}]}>
              {item.company_name
                ? `${item.company_name}(${item.mb_name} 고객님)`
                : `${item.mb_name} 고객님`}
            </Text>
            <Text style={[styles.normalText, {fontSize: 14, lineHeight: 22}]}>
              {item.review_content}
            </Text>
          </View>
        </View>
        <View style={{width: '100%', height: 1, backgroundColor: '#E3E3E3'}} />
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
              <StarRating
                disabled={false}
                emptyStar={require('../../src/assets/star_off.png')}
                fullStar={require('../../src/assets/star_on.png')}
                maxStars={5}
                rating={Math.floor(item.grade1)}
                starSize={12}
              />
              <Text style={[styles.normalText, {fontSize: 12, marginLeft: 5}]}>
                {`${item.grade1}.0`}
              </Text>
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
              <StarRating
                disabled={false}
                emptyStar={require('../../src/assets/star_off.png')}
                fullStar={require('../../src/assets/star_on.png')}
                maxStars={5}
                rating={Math.floor(item.grade2)}
                starSize={12}
              />
              <Text style={[styles.normalText, {fontSize: 12, marginLeft: 5}]}>
                {`${item.grade2}.0`}
              </Text>
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
              <StarRating
                disabled={false}
                emptyStar={require('../../src/assets/star_off.png')}
                fullStar={require('../../src/assets/star_on.png')}
                maxStars={5}
                rating={Math.floor(item.grade3)}
                starSize={12}
              />
              <Text style={[styles.normalText, {fontSize: 12, marginLeft: 5}]}>
                {`${item.grade3}.0`}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Header title={routeName} navigation={navigation} />
      {isLoading ? (
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
            backgroundColor: 'rgba(255,255,255,0.5)',
          }}>
          <ActivityIndicator size="large" color="#275696" />
        </View>
      ) : (
        <>
          <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}>
            <View
              style={{
                position: 'relative',
                backgroundColor: '#fff',
                justifyContent: 'flex-start',
                marginBottom: 20,
              }}>
              {detail &&
              detail.portfolioImg &&
              detail.portfolioImg.length > 1 ? (
                <Carousel
                  ref={carouselRef}
                  data={detail.portfolioImg}
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
              {detail &&
              detail.portfolioImg &&
              detail.portfolioImg.length > 1 ? (
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
                    style={{
                      borderWidth: 0.2,
                      height: 15,
                      borderColor: '#D4D4D4',
                    }}
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
                    style={[
                      styles.mediumText,
                      {fontSize: 20, marginBottom: 5},
                    ]}>
                    {detail.businessName}
                  </Text>
                  <Text
                    style={[
                      styles.mediumText,
                      {fontSize: 12, marginBottom: 12, color: '#707070'},
                    ]}>
                    담당자 {detail.name}
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
                      rating={Math.floor(detail.rate)}
                      starSize={13}
                    />
                    <Text
                      style={[
                        styles.normalText,
                        {fontSize: 12, marginLeft: 5},
                      ]}>
                      {detail.rate}
                    </Text>
                  </View>
                </View>
              </View>
              {/* // 회사정보 상단 fix */}
            </View>
            <View style={{paddingHorizontal: 20}}>
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
                <TouchableWithoutFeedback
                  onPress={() => Linking.openURL(`tel:${detail.mobile}`)}>
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
                  style={{
                    borderWidth: 0.5,
                    height: '100%',
                    borderColor: '#E3E3E3',
                  }}
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
              </View>

              {/* 업체소개 */}
              <View style={{marginTop: 20}}>
                <Text
                  style={[styles.mediumText, {fontSize: 16, marginBottom: 15}]}>
                  업체소개
                </Text>
                <Text
                  style={[
                    styles.normalText,
                    {fontSize: 14, lineHeight: 22, marginBottom: 5},
                  ]}>
                  {detail.description
                    ? detail.description
                    : '업체 소개글이 등록되어 있지 않습니다.'}
                </Text>

                <View style={{paddingVertical: 20, paddingLeft: 7}}>
                  <Text
                    style={[
                      styles.normalText,
                      {fontSize: 14, marginBottom: 5},
                    ]}>
                    * 업무시간 :
                    {detail.mb_7 ? detail.mb_7 : ' 현재 미등록 상태입니다.'}
                    {/* 평일 09:00 ~ 18:00 */}
                  </Text>
                  <Text style={[styles.normalText, {fontSize: 14}]}>
                    * 휴무일 안내 :
                    {detail.mb_8 ? detail.mb_8 : ' 현재 미등록 상태입니다.'}
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
              <Text
                style={[styles.mediumText, {fontSize: 16, marginBottom: 10}]}>
                영업품목
              </Text>
              <Text
                style={[
                  styles.normalText,
                  {fontSize: 14, lineHeight: 24, marginBottom: 5},
                ]}>
                {detail.used
                  ? detail.used
                  : '영업품목이 등록되어 있지 않습니다.'}
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
                <Text
                  style={[styles.mediumText, {fontSize: 16, marginRight: 12}]}>
                  고객후기
                </Text>
                <Text
                  style={[styles.normalText, {fontSize: 14, color: '#275696'}]}>
                  총 리뷰수 {detail.review_total}
                </Text>
              </View>

              {/* 리뷰 */}
              <FlatList
                data={reviews}
                renderItem={renderRow}
                keyExtractor={(item, index) => index.toString()}
                numColumns={1}
                persistentScrollbar={true}
                showsVerticalScrollIndicator={false}
                progressViewOffset={true}
                refreshing={true}
                style={{backgroundColor: '#fff'}}
                ListEmptyComponent={
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 150,
                    }}>
                    <Text style={{fontFamily: 'SCDream4'}}>
                      등록된 리뷰가 없습니다.
                    </Text>
                  </View>
                }
              />
              {/* // 리뷰 */}
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
                  dispatch(setPartnerLocation(detail.location));
                  navigation.navigate('Home', {
                    screen: 'Order',
                    params: {
                      screen: 'DirectOrder',
                      params: {
                        bName: detail.businessName,
                        name: detail.name,
                        cate1: detail.cate1,
                        location: detail.location,
                      },
                    },
                  });
                }}
                style={{width: '85%'}}>
                <View style={[styles.submitBtn]}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={[
                        styles.mediumText,
                        {fontSize: 18, color: '#fff'},
                      ]}>
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
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => onLikeBtn(companyId)}>
                <View>
                  <Image
                    source={
                      !checkFavor()
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
      )}
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
