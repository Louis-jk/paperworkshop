import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Dimensions,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  Linking,
  ActivityIndicator,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard'; // 클립보드 패키지
import DetailHeader from '../../Common/DetailHeader';
import Modal from './CancelModal';
import OrderAPI from '../../../src/api/OrderAPI';
import Partners from '../../../src/api/Partners';
import OrderDetail from './OrderDetail';
import {useSelector} from 'react-redux';
import moment from 'moment';
import 'moment/locale/ko';

const ReqDetailList = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;
  const pe_id = props.route.params.orderId;

  console.log('pe_id ???', pe_id);

  const [isLoading, setLoading] = React.useState(false);
  const [myOrderDetail, setMyOrderDetail] = React.useState([]);
  const [myOrderPartners, setMyOrderPartners] = React.useState([]);

  // Redux 에서 유저 정보 가져오기
  const {mb_id} = useSelector((state) => state.UserInfoReducer);

  // 나의 견적의뢰 삭제 0621
  const deleteMyOrderAPI = () => {
    setLoading(true);
    OrderAPI.deleteMyOrder(pe_id)
      .then((res) => {
        if (res.data.result === '1' && res.data.count > 0) {
          // navigation.navigate('MyOrder', {
          //   pe_id: pe_id,
          // });
          // navigation.navigate('MyOrder');
          Alert.alert(res.data.message, '', [
            {
              text: '확인',
              onPress: () => navigation.navigate('MyOrder'),
            },
          ]);
        } else {
          setLoading(false);
          Alert.alert(res.data.message, '', [
            {
              text: '확인',
            },
          ]);
        }
      })
      .catch((err) => {
        setLoading(false);
        Alert.alert(err, '관리자에게 문의하세요', [
          {
            text: '확인',
          },
        ]);
      });
  };

  // 나의 견적 상세 API 호출
  const getMyOrderDetailAPI = () => {
    setLoading(true);
    OrderAPI.getMyOrderDetail(pe_id, mb_id, '')
      .then((res) => {
        if (res.data.result === '1' && res.data.count > 0) {
          setMyOrderDetail(res.data.item[0]);
          if (
            res.data.item[0].list !== null ||
            res.data.item[0].list.length > 0
          ) {
            setMyOrderPartners(res.data.item[0].list);
            setLoading(false);
          }
          if (res.data.item[0].status === '8') {
            OrderAPI.getMyOrderDetail(
              pe_id,
              mb_id,
              res.data.item[0].list[0].company_id,
            ).then((res) => {
              if (res.data.result === '1' && res.data.count > 0) {
                setMyOrderDetail(res.data.item[0]);
                setLoading(false);
                if (
                  res.data.item[0].list !== null ||
                  res.data.item[0].list.length > 0
                ) {
                  setMyOrderPartners(res.data.item[0].list);
                  setLoading(false);
                }
              }
            });
          }
        } else {
          setLoading(false);
          Alert.alert(res.data.message, '', [
            {
              text: '확인',
            },
          ]);
        }
      })
      .catch((err) => {
        setLoading(false);
        Alert.alert(err, '관리자에게 문의하세요', [
          {
            text: '확인',
          },
        ]);
      });
  };

  // 파트너 선정(나의 견적에서 파트너 선정)
  const setEstimatePartnerAPI = (pd_id) => {
    setLoading(true);
    Partners.setEstimatePartner(pd_id)
      .then((res) => {
        if (res.data.result === '1') {
          setLoading(false);
          Alert.alert(res.data.message, '', [
            {
              text: '확인',
              onPress: () => navigation.navigate('MyOrder'),
            },
          ]);
        } else {
          setLoading(false);
          Alert.alert(res.data.message, '', [
            {
              text: '확인',
              onPress: () => navigation.navigate('MyOrder'),
            },
          ]);
        }
      })
      .catch((err) => {
        setLoading(false);
        Alert.alert(err, '관리자에게 문의하세요.', [
          {
            text: '확인',
            onPress: () => navigation.navigate('MyOrder'),
          },
        ]);
      });
  };

  // 파트너 선정(계약금 입금완료)
  const setDepositPartnerAPI = () => {
    setLoading(true);
    Partners.setDepositPartner(pe_id)
      .then((res) => {
        if (res.data.result === '1') {
          setLoading(false);
          Alert.alert(
            '계약금 입금완료 요청하였습니다.',
            '파트너회원이 입금확인할 때까지 기다려주세요.',
            [
              {
                text: '확인',
                onPress: () => navigation.navigate('MyOrder'),
              },
            ],
          );
        } else {
          setLoading(false);
          Alert.alert(res.data.message, '', [
            {
              text: '확인',
            },
          ]);
        }
      })
      .catch((err) => {
        setLoading(false);
        Alert.alert(err, '관리자에게 문의하세요.', [
          {
            text: '확인',
          },
        ]);
      });
  };

  // 파트너 선정(인쇄 제작요청)
  const setOrderProductAPI = () => {
    setLoading(true);
    Partners.setOrderProduct(pe_id)
      .then((res) => {
        if (res.data.result === '1') {
          setLoading(false);
          Alert.alert(
            '인쇄제작요청을 하였습니다.',
            '파트너스 회원이 제작완료 후 "납품완료" 처리를 하게 됩니다.',
            [
              {
                text: '확인',
                onPress: () => navigation.navigate('MyOrder'),
              },
            ],
          );
        } else {
          setLoading(false);
          Alert.alert(res.data.message, '', [
            {
              text: '확인',
            },
          ]);
        }
      })
      .catch((err) => {
        setLoading(false);
        Alert.alert(err, '관리자에게 문의하세요.', [
          {
            text: '확인',
          },
        ]);
      });
  };

  // 파트너 선정(수령완료)
  const setOrderCompleteAPI = () => {
    setLoading(true);
    Partners.setOrderComplete(pe_id)
      .then((res) => {
        setLoading(false);
        if (res.data.result === '1') {
          Alert.alert(res.data.message, '수령완료 하였습니다.', [
            {
              text: '확인',
              onPress: () => navigation.navigate('MyOrder'),
            },
          ]);
        } else {
          setLoading(false);
          Alert.alert(res.data.message, '', [
            {
              text: '확인',
            },
          ]);
        }
      })
      .catch((err) => {
        setLoading(false);
        Alert.alert(err, '관리자에게 문의하세요.', [
          {
            text: '확인',
          },
        ]);
      });
  };

  // React.useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     getMyOrderDetailAPI();
  //   });

  //   return unsubscribe;
  // }, [navigation]);

  React.useEffect(() => {
    getMyOrderDetailAPI();
  }, []);

  const copyToClipboard = (copyTxt) => {
    Clipboard.setString(copyTxt);
    Alert.alert('클립보드로 복사되었습니다.', copyTxt, [
      {
        text: '확인',
      },
    ]);
  };

  const [isModalVisible, setModalVisible] = React.useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const goCancelOrder = () => {
    delOrderAPI();
  };

  // 견적 요청 포기
  const delOrderAPI = () => {
    setLoading(true);
    OrderAPI.delOrder(pe_id)
      .then((res) => {
        if (res.data.result === '1' && res.data.count > 0) {
          setLoading(false);
          setModalVisible(!isModalVisible);
          navigation.navigate('CancelOrder');
        }
      })
      .catch((err) => {
        setLoading(false);
        Alert.alert(err, '관리자에게 문의하세요.', [
          {
            text: '확인',
          },
        ]);
      });
  };

  const goCopyOrder = async () => {
    await setModalVisible(!isModalVisible);
    await navigation.navigate('CopyOrder', {
      pe_id: pe_id,
      cate1: myOrderDetail.cate1,
    });
  };

  const renderRow = ({item, index}) => {
    return (
      <>
        <View
          style={{
            borderWidth: 1,
            borderRadius: 5,
            borderColor: '#E3E3E3',
            marginBottom: 10,
            marginHorizontal: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginVertical: 20,
              paddingHorizontal: 20,
            }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() =>
                navigation.navigate('PartnersDetail', {
                  screen: 'PartnersDetail',
                  params: {companyId: item.company_id},
                })
              }
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <Image
                source={{uri: `${item.mb_profile}`}}
                resizeMode="cover"
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  marginRight: 10,
                  borderWidth: 1,
                  borderColor: '#e5e5e5',
                }}
              />
              <Text
                style={[styles.mediumText, {fontSize: 14, color: '#000000'}]}>
                {item.businessName}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('PartnersDetail', {
                screen: 'PartnersDetail',
                params: {companyId: item.company_id},
              })
            }
            style={{paddingHorizontal: 20}}>
            <Text
              style={[
                styles.normalText,
                {fontSize: 14, color: '#111111', lineHeight: 20},
              ]}>
              {item.description !== null || item.description !== ''
                ? item.description
                : '소개글이 없습니다.'}
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 15,
              marginBottom: 20,
              paddingHorizontal: 20,
            }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate('FeedBack', {
                  cate1: myOrderDetail.cate1,
                  pd_id: item.pd_id,
                })
              }
              style={{
                borderWidth: 0.5,
                borderColor: '#275696',
                borderRadius: 20,
                paddingVertical: 12,
                width: '49%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={[styles.normalText, {fontSize: 12, color: '#275696'}]}>
                견적제안보기
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                if (myOrderDetail.status === '1') {
                  setEstimatePartnerAPI(item.pd_id);
                } else {
                  return false;
                }
              }}
              disabled={myOrderDetail.status !== '1' ? true : false}
              style={{
                borderWidth: 0.5,
                borderColor:
                  myOrderDetail.status !== '1' ? '#D4D4D4' : '#275696',
                borderRadius: 20,
                backgroundColor:
                  myOrderDetail.status !== '1' ? '#fff' : '#275696',
                paddingVertical: 12,
                width: '49%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={[
                  styles.normalText,
                  {
                    fontSize: 12,
                    color: myOrderDetail.status !== '1' ? '#D4D4D4' : '#fff',
                  },
                ]}>
                {myOrderDetail.status !== '1' ? '파트너 선정됨' : '파트너 선정'}
              </Text>
            </TouchableOpacity>
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
              marginVertical: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <Text
                style={[
                  styles.mediumText,
                  {fontSize: 14, color: '#111111', marginRight: 10},
                ]}>
                견적 금액
              </Text>
              <Text
                style={[styles.normalText, {fontSize: 14, color: '#366DE5'}]}>
                {item.total_price.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <Text
                style={[
                  styles.mediumText,
                  {fontSize: 14, color: '#111111', marginRight: 10},
                ]}>
                계약금(선금)
              </Text>
              <Text style={[styles.normalText, {fontSize: 14, color: '#000'}]}>
                {item.deposit_rate}%
              </Text>
            </View>
          </View>
        </View>
        {/* 파트너 전화하기 메세지 */}
        {myOrderDetail.status !== '0' &&
        myOrderDetail.status !== '1' &&
        myOrderDetail.status !== '2' &&
        myOrderDetail.status !== '9' ? (
          <View style={{paddingHorizontal: 20, marginBottom: 20}}>
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
                onPress={() =>
                  Linking.openURL(`tel:${myOrderDetail.list[0].company_tel}`)
                }>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 12,
                  }}>
                  <Image
                    source={require('../../../src/assets/call01.png')}
                    resizeMode="cover"
                    style={{width: 24, height: 24}}
                  />
                  <Text
                    style={[styles.normalText, {fontSize: 14, marginLeft: 5}]}>
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
                onPress={() =>
                  navigation.navigate('MessageDetail', {
                    screen: 'MessageDetail',
                    params: {
                      chatId: myOrderDetail.pe_id,
                      pmId: myOrderDetail.pm_id,
                    },
                  })
                }>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 12,
                  }}>
                  <Image
                    source={require('../../../src/assets/msm01.png')}
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
          </View>
        ) : null}
        {/* // 파트너 전화하기 메세지 */}

        {/* 파트너 전화하기 메세지 */}
        {myOrderDetail.cate1 === '2' &&
        myOrderDetail.status !== '0' &&
        myOrderDetail.status !== '1' &&
        myOrderDetail.status !== '9' ? (
          <View style={{paddingHorizontal: 20, marginBottom: 20}}>
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
                onPress={() =>
                  Linking.openURL(`tel:${myOrderDetail.list[0].company_tel}`)
                }>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 12,
                  }}>
                  <Image
                    source={require('../../../src/assets/call01.png')}
                    resizeMode="cover"
                    style={{width: 24, height: 24}}
                  />
                  <Text
                    style={[styles.normalText, {fontSize: 14, marginLeft: 5}]}>
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
                onPress={() =>
                  navigation.navigate('MessageDetail', {
                    screen: 'MessageDetail',
                    params: {
                      chatId: myOrderDetail.pe_id,
                      pmId: myOrderDetail.pm_id,
                    },
                  })
                }>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 12,
                  }}>
                  <Image
                    source={require('../../../src/assets/msm01.png')}
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
          </View>
        ) : null}
        {/* // 파트너 전화하기 메세지 */}
      </>
    );
  };

  console.log('myOrderDetail :: ', myOrderDetail);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Modal
        isVisible={isModalVisible}
        toggleModal={toggleModal}
        goCancelOrder={goCancelOrder}
        goCopyOrder={goCopyOrder}
      />
      <DetailHeader title={routeName} navigation={navigation} />
      {/* 입찰업체 리스트 */}
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
            backgroundColor: 'rgba(255,255,255,0.5)',
          }}>
          <ActivityIndicator size="large" color="#275696" />
        </View>
      )}

      <FlatList
        ListHeaderComponent={
          <>
            <View style={[styles.container, styles.wrap]}>
              <View style={styles.infoBox}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.infoStepDesc}>
                    {myOrderDetail.status === '0'
                      ? '견적요청'
                      : myOrderDetail.status === '1'
                      ? '입찰중'
                      : myOrderDetail.status === '2'
                      ? '파트너스최종선정 (견적확정대기)'
                      : myOrderDetail.status === '3'
                      ? '파트너스최종선정 (계약금입금대기)'
                      : myOrderDetail.status === '4'
                      ? '파트너스최종선정 (계약금입금완료)'
                      : myOrderDetail.status === '5'
                      ? '인쇄/제작요청'
                      : myOrderDetail.status === '6'
                      ? '인쇄/제작요청완료'
                      : myOrderDetail.status === '7'
                      ? '납품완료'
                      : myOrderDetail.status === '8'
                      ? '수령완료'
                      : myOrderDetail.status === '9'
                      ? '마감'
                      : null}
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      paddingVertical: 3,
                      paddingHorizontal: 5,
                      backgroundColor: '#275696',
                      color: '#fff',
                      borderRadius: 2,
                      marginLeft: 5,
                    }}>
                    {myOrderDetail.easy_yn === 'Y' ? '간편견적' : '세부견적'}
                  </Text>
                </View>
                <Text style={styles.infoStepTitle}>{myOrderDetail.title}</Text>
                <View style={styles.line} />
                <View style={styles.details}>
                  <Text style={styles.detailsTitle}>분류</Text>
                  <Text style={styles.detailsDesc}>
                    {myOrderDetail.cate1 === '0'
                      ? '일반인쇄'
                      : myOrderDetail.cate1 === '1'
                      ? '패키지'
                      : myOrderDetail.cate1 === '2'
                      ? '기타인쇄'
                      : null}
                  </Text>
                </View>
                <View style={styles.details}>
                  <Text style={styles.detailsTitle}>견적 마감일</Text>
                  <Text style={styles.detailsDesc}>
                    {moment(myOrderDetail.estimate_date).format('YYYY.MM.DD')}
                  </Text>
                </View>
                <View style={styles.detailsEnd}>
                  <View style={styles.detailsEnd}>
                    <Text style={styles.detailsTitle}>납품 희망일</Text>
                    <Text style={styles.detailsDesc}>
                      {moment(myOrderDetail.delivery_date).format('YYYY.MM.DD')}
                    </Text>
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() =>
                      navigation.navigate('OrderDetail', {
                        pe_id: pe_id,
                        cate1: myOrderDetail.cate1,
                      })
                    }
                    style={{alignSelf: 'flex-end'}}>
                    <Text
                      style={[
                        styles.normalText,
                        {
                          fontSize: 12,
                          textDecorationLine: 'underline',
                          color: '#A2A2A2',
                        },
                      ]}>
                      세부 내용 보기
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              {myOrderDetail.status !== '9' ? (
                myOrderDetail.status === '3' ? (
                  <>
                    <TouchableOpacity
                      onPress={() => setDepositPartnerAPI()}
                      activeOpacity={0.9}>
                      <View style={[styles.submitStepBtn, {marginTop: 20}]}>
                        <Text style={styles.submitStepBtnText}>
                          계약금 입금 완료
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={toggleModal} activeOpacity={0.9}>
                      <View style={[styles.submitBtn, {marginTop: 7}]}>
                        <Text style={styles.submitBtnText}>요청 포기</Text>
                      </View>
                    </TouchableOpacity>
                  </>
                ) : myOrderDetail.status === '4' ? (
                  <>
                    <View
                      style={[styles.submitStepBtnDisable, {marginTop: 20}]}>
                      <Text style={styles.submitStepBtnTextDisable}>
                        계약금 입금 확인 대기
                      </Text>
                    </View>

                    <TouchableOpacity onPress={toggleModal} activeOpacity={0.9}>
                      <View style={[styles.submitBtn, {marginTop: 7}]}>
                        <Text style={styles.submitBtnText}>요청 포기</Text>
                      </View>
                    </TouchableOpacity>
                  </>
                ) : myOrderDetail.status === '5' ? (
                  <>
                    <TouchableOpacity
                      onPress={() => setOrderProductAPI()}
                      activeOpacity={0.9}>
                      <View style={[styles.submitStepBtn, {marginTop: 20}]}>
                        <Text style={styles.submitStepBtnText}>
                          인쇄제작요청
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={toggleModal} activeOpacity={0.9}>
                      <View style={[styles.submitBtn, {marginTop: 7}]}>
                        <Text style={styles.submitBtnText}>요청 포기</Text>
                      </View>
                    </TouchableOpacity>
                  </>
                ) : myOrderDetail.status === '6' ? (
                  <>
                    <View
                      style={[styles.submitStepBtnDisable, {marginTop: 20}]}>
                      <Text style={styles.submitStepBtnTextDisable}>
                        인쇄제작요청완료
                      </Text>
                    </View>
                    <TouchableOpacity onPress={toggleModal} activeOpacity={0.9}>
                      <View style={[styles.submitBtn, {marginTop: 7}]}>
                        <Text style={styles.submitBtnText}>요청 포기</Text>
                      </View>
                    </TouchableOpacity>
                  </>
                ) : myOrderDetail.status === '7' ? (
                  <>
                    <TouchableOpacity
                      onPress={() => setOrderCompleteAPI()}
                      activeOpacity={0.9}>
                      <View style={[styles.submitBtn, {marginTop: 20}]}>
                        <Text style={styles.submitBtnText}>수령확인</Text>
                      </View>
                    </TouchableOpacity>
                  </>
                ) : myOrderDetail.status === '8' &&
                  myOrderDetail.review_yn === 'N' ? (
                  <>
                    <View
                      style={[styles.submitStepBtnDisable, {marginTop: 20}]}>
                      <Text style={styles.submitStepBtnTextDisable}>
                        수령완료
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('Review', {
                          screen: 'Review',
                          params: {
                            pe_id: pe_id,
                            partnerId: myOrderPartners[0].company_id,
                            userId: myOrderDetail.mb_id,
                          },
                        })
                      }
                      activeOpacity={0.9}>
                      <View style={[styles.submitBtn, {marginTop: 7}]}>
                        <Text style={styles.submitBtnText}>후기작성</Text>
                      </View>
                    </TouchableOpacity>
                  </>
                ) : myOrderDetail.status === '8' &&
                  myOrderDetail.review_yn === 'Y' ? (
                  <>
                    <View
                      style={[styles.submitStepBtnDisable, {marginTop: 20}]}>
                      <Text style={styles.submitStepBtnTextDisable}>
                        수령완료
                      </Text>
                    </View>
                    <View style={[styles.submitStepBtnDisable, {marginTop: 5}]}>
                      <Text style={styles.submitStepBtnTextDisable}>
                        후기작성완료
                      </Text>
                    </View>
                  </>
                ) : (
                  <TouchableOpacity onPress={toggleModal} activeOpacity={0.9}>
                    <View style={[styles.submitBtn, {marginTop: 20}]}>
                      <Text style={styles.submitBtnText}>요청 포기</Text>
                    </View>
                  </TouchableOpacity>
                )
              ) : (
                <>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('CopyOrder', {
                        pe_id: pe_id,
                        cate1: myOrderDetail.cate1,
                      })
                    }
                    activeOpacity={0.9}>
                    <View style={[styles.submitBtn, {marginTop: 20}]}>
                      <Text style={styles.submitBtnText}>복사 후 재등록</Text>
                    </View>
                  </TouchableOpacity>
                  {/* 0621 */}
                  <TouchableOpacity
                    onPress={() => deleteMyOrderAPI()}
                    activeOpacity={0.9}>
                    <View style={[styles.deleteBtn, {marginTop: 20}]}>
                      <Text style={styles.deleteBtnText}>견적 의뢰 삭제</Text>
                    </View>
                  </TouchableOpacity>
                </>
              )}
            </View>
            {/* 경계 라인 */}
            <View
              style={{
                height: 1,
                backgroundColor: '#F5F5F5',
                width: Dimensions.get('window').width,
              }}
            />
            <View
              style={{
                height: 6,
                backgroundColor: '#F5F5F5',
                width: Dimensions.get('window').width,
              }}
            />
            {/* // 경계 라인 */}

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginBottom: 15,
                paddingHorizontal: 20,
              }}>
              <Text style={[styles.orderInfoTitle, {marginRight: 10}]}>
                {myOrderDetail.status === '1'
                  ? '입찰업체'
                  : myOrderDetail.status === '2'
                  ? '파트너선정업체'
                  : myOrderDetail.status === '3'
                  ? '계약금입금대기'
                  : myOrderDetail.status === '4'
                  ? '계약금입금완료'
                  : myOrderDetail.status === '5'
                  ? '인쇄제작요청가능'
                  : myOrderDetail.status === '6'
                  ? '인쇄제작요청완료'
                  : myOrderDetail.status === '7'
                  ? '납품완료'
                  : myOrderDetail.status === '8'
                  ? '수령완료'
                  : myOrderDetail.status === '9'
                  ? '마감'
                  : null}
              </Text>
              {myOrderDetail.status === '1' && (
                <Text style={[styles.orderInfoTitleRow, {color: '#366DE5'}]}>
                  총 견적 {myOrderDetail.ecnt}
                </Text>
              )}
              {myOrderDetail.status === '2' && (
                <Text style={[styles.orderInfoTitleRow, {color: '#366DE5'}]}>
                  현재 견적확정 대기중입니다.
                </Text>
              )}
              {myOrderDetail.status === '3' && (
                <Text style={[styles.orderInfoTitleRow, {color: '#366DE5'}]}>
                  현재 계약금 입금 대기중입니다.
                </Text>
              )}
              {myOrderDetail.status === '4' && (
                <Text style={[styles.orderInfoTitleRow, {color: '#366DE5'}]}>
                  현재 계약금 입금확인 대기중입니다.
                </Text>
              )}
              {myOrderDetail.status === '5' && (
                <Text style={[styles.orderInfoTitleRow, {color: '#366DE5'}]}>
                  인쇄 제작 요청을 하실 수 있습니다.
                </Text>
              )}
              {myOrderDetail.status === '6' && (
                <Text style={[styles.orderInfoTitleRow, {color: '#366DE5'}]}>
                  인쇄 제작 요청을 한 상태입니다.
                </Text>
              )}
              {myOrderDetail.status === '7' && (
                <Text style={[styles.orderInfoTitleRow, {color: '#366DE5'}]}>
                  파트너스가 납품 완료한 상태입니다.
                </Text>
              )}
              {myOrderDetail.status === '8' && (
                <Text style={[styles.orderInfoTitleRow, {color: '#366DE5'}]}>
                  수령 완료된 견적 건입니다.
                </Text>
              )}
              {myOrderDetail.status === '9' && (
                <Text style={[styles.orderInfoTitleRow, {color: '#366DE5'}]}>
                  이 견적은 마감된 견적입니다.
                </Text>
              )}
            </View>
          </>
        }
        data={myOrderPartners}
        renderItem={renderRow}
        keyExtractor={(list, index) => index.toString()}
        numColumns={1}
        // pagingEnabled={true}
        persistentScrollbar={true}
        showsVerticalScrollIndicator={false}
        progressViewOffset={true}
        refreshing={true}
        style={{
          backgroundColor: '#fff',
        }}
        ListEmptyComponent={
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
              height: Dimensions.get('window').height - 500,
              paddingHorizontal: 20,
            }}>
            <Text style={{fontFamily: 'SCDream4'}}>
              입찰한 업체가 없습니다.
            </Text>
          </View>
        }
        ListFooterComponent={
          myOrderDetail.status === '3' ? (
            <View style={{paddingHorizontal: 20}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'baseline',
                }}>
                <Text
                  style={{
                    fontFamily: 'SCDream4',
                    fontSize: 12,
                    lineHeight: 18,
                    marginRight: 5,
                    color: '#366DE5',
                  }}>
                  ※
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginBottom: 10,
                    flexWrap: 'wrap',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'SCDream4',
                      fontSize: 12,
                      lineHeight: 18,
                      color: '#366DE5',
                    }}>
                    계약금을 아래의 계좌로 입금해주시고
                  </Text>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      // backgroundColor: '#275696',
                      borderWidth: 1,
                      borderColor: '#275696',
                      marginHorizontal: 5,
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      borderRadius: 5,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'SCDream5',
                        fontSize: 8,
                        color: '#275696',
                      }}>
                      계약금 입금완료
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontFamily: 'SCDream4',
                      fontSize: 12,
                      lineHeight: 18,
                      color: '#366DE5',
                    }}>
                    을 눌러주세요.
                  </Text>
                </View>
              </View>
              <View style={{marginBottom: 20}}>
                <View style={styles.bankInfoWrap}>
                  <View style={styles.bankInfoTitleWrap}>
                    <Text style={{fontFamily: 'SCDream4'}}>은행명</Text>
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() =>
                      copyToClipboard(myOrderDetail.list[0].bank_name)
                    }
                    style={{
                      paddingVertical: 10,
                      paddingHorizontal: 10,
                      width: '100%',
                    }}>
                    <Text style={{fontFamily: 'SCDream4'}}>
                      {myOrderDetail.list[0].bank_name}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.bankInfoWrap}>
                  <View style={styles.bankInfoTitleWrap}>
                    <Text style={{fontFamily: 'SCDream4'}}>계좌번호</Text>
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() =>
                      copyToClipboard(myOrderDetail.list[0].bank_account)
                    }
                    style={{
                      paddingVertical: 10,
                      paddingHorizontal: 10,
                      width: '100%',
                    }}>
                    <Text style={{fontFamily: 'SCDream4'}}>
                      {myOrderDetail.list[0].bank_account}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.bankInfoWrap}>
                  <View style={styles.bankInfoTitleWrap}>
                    <Text style={{fontFamily: 'SCDream4'}}>예금주</Text>
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() =>
                      copyToClipboard(myOrderDetail.list[0].bank_depositor)
                    }
                    style={{
                      paddingVertical: 10,
                      paddingHorizontal: 10,
                      width: '100%',
                    }}>
                    <Text style={{fontFamily: 'SCDream4'}}>
                      {myOrderDetail.list[0].bank_depositor}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) : null
        }
      />

      {/* // 입찰업체 리스트 */}
    </View>
  );
};

const styles = StyleSheet.create({
  bankInfoWrap: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#E3E3E3',
    marginBottom: 5,
  },
  bankInfoTitleWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    paddingVertical: 10,
    width: 100,
  },
  container: {
    backgroundColor: '#fff',
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrap: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  infoBox: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
  },
  infoStepDesc: {
    fontFamily: 'SCDream4',
    fontSize: 12,
    color: '#275696',
    lineHeight: 23,
  },
  infoStepTitle: {
    fontFamily: 'SCDream5',
    fontSize: 16,
    color: '#000000',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#E3E3E3',
    marginVertical: 20,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 5,
  },
  detailsTitle: {
    fontFamily: 'SCDream4',
    width: 100,
    fontSize: 14,
    color: '#A2A2A2',
  },
  detailsDesc: {
    fontFamily: 'SCDream4',
    fontSize: 14,
    color: '#000',
  },
  detailsEnd: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderInfoTitle: {
    fontFamily: 'SCDream5',
    fontSize: 16,
    color: '#000000',
    marginTop: 20,
  },
  orderInfoTitleRow: {
    fontFamily: 'SCDream4',
    fontSize: 14,
    marginTop: 20,
  },
  orderInfoDesc: {
    fontFamily: 'SCDream4',
    fontSize: 15,
    color: '#000',
    marginBottom: 10,
  },
  textInput: {
    fontFamily: 'SCDream4',
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 4,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    marginRight: 5,
  },
  pickerWrap: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  wd50per: {
    width: '50%',
  },
  mgB10: {
    marginBottom: 10,
  },
  mgB20: {
    marginBottom: 20,
  },
  mgB30: {
    marginBottom: 30,
  },
  mgB40: {
    marginBottom: 40,
  },
  orderInfoContentRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  orderInfoContentTitle: {
    fontFamily: 'SCDream4',
    fontSize: 15,
    color: '#111',
  },
  orderInfoContentDetail: {
    fontFamily: 'SCDream4',
    fontSize: 14,
    color: '#707070',
  },
  submitStepBtn: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#275696',
    backgroundColor: '#fff',
    width: '100%',
    paddingVertical: 15,
  },
  submitStepBtnText: {
    fontFamily: 'SCDream4',
    fontSize: 16,
    color: '#275696',
    textAlign: 'center',
  },
  submitStepBtnDisable: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#D4D4D4',
    backgroundColor: '#fff',
    width: '100%',
    paddingVertical: 15,
  },
  submitStepBtnTextDisable: {
    fontFamily: 'SCDream4',
    fontSize: 16,
    color: '#D4D4D4',
    textAlign: 'center',
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
    fontFamily: 'SCDream4',
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  submitBtnBorder: {
    borderWidth: 1,
    borderColor: '#275696',
    borderRadius: 5,
    backgroundColor: '#fff',
    width: '100%',
    paddingVertical: 15,
  },
  submitBtnBorderText: {
    fontSize: 16,
    color: '#275696',
    textAlign: 'center',
  },
  deleteBtn: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#cc2900',
    backgroundColor: '#cc2900',
    width: '100%',
    paddingVertical: 15,
  },
  deleteBtnText: {
    fontFamily: 'SCDream4',
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

export default ReqDetailList;
