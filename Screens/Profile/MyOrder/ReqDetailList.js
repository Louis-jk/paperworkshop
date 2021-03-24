import * as React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import DetailHeader from '../../Common/DetailHeader';
import Modal from './CancelModal';
import OrderAPI from '../../../src/api/OrderAPI';
import Partners from '../../../src/api/Partners';

const ReqDetailList = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;
  const pe_id = props.route.params.orderId;

  const [myOrderDetail, setMyOrderDetail] = React.useState([]);
  const [myOrderPartners, setMyOrderPartners] = React.useState([]);

  console.log('OrderDetail props', props);

  const getMyOrderDetailAPI = () => {
    OrderAPI.getMyOrderDetail(pe_id)
      .then((res) => {
        console.log('ReqDetail 결과값', res);
        if (res.data.result === '1' && res.data.count > 0) {
          setMyOrderDetail(res.data.item[0]);
          if (
            res.data.item[0].list !== null ||
            res.data.item[0].list.length > 0
          ) {
            setMyOrderPartners(res.data.item[0].list);
          }
        } else {
          Alert.alert(res.data.message, '', [
            {
              text: '확인',
            },
          ]);
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

  const setEstimatePartnerAPI = (pd_id) => {
    Partners.setEstimatePartner(pd_id).then((res) => {
      if (res.data.result === '1') {
        Alert.alert(res.data.message, '', [
          {
            text: '확인',
            onPress: () => navigation.navigate('MyOrder'),
          },
        ]);
      } else {
        Alert.alert(res.data.message, '', [
          {
            text: '확인',
          },
        ]);
      }
    });
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getMyOrderDetailAPI();
    });

    return unsubscribe;
  }, [navigation]);

  console.log('myOrderDetail', myOrderDetail);
  console.log('myOrderPartners', myOrderPartners);

  const [isModalVisible, setModalVisible] = React.useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const goCancelOrder = () => {
    delOrderAPI();
  };

  const delOrderAPI = () => {
    OrderAPI.delOrder(pe_id)
      .then((res) => {
        console.log('요청 취소 결과값', res);
        if (res.data.result === '1' && res.data.count > 0) {
          setModalVisible(!isModalVisible);
          navigation.navigate('CancelOrder');
        }
        //  else {
        //   Alert.alert(res.data.message, '', [
        //     {
        //       text: '확인',
        //     },
        //   ]);
        // }
      })
      .catch((err) => {
        Alert.alert(err, '관리자에게 문의하세요.', [
          {
            text: '확인',
          },
        ]);
      });
  };

  const goCopyOrder = async () => {
    await setModalVisible(!isModalVisible);
    await navigation.navigate('CopyOrder');
  };

  const renderRow = ({item, index}) => {
    return (
      <View
        style={{
          borderWidth: 1,
          borderRadius: 5,
          borderColor: '#E3E3E3',
          marginBottom: 10,
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
            <Text style={[styles.mediumText, {fontSize: 14, color: '#000000'}]}>
              {item.businessName}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{paddingHorizontal: 20}}>
          <Text
            style={[
              styles.normalText,
              {fontSize: 14, color: '#111111', lineHeight: 20},
            ]}>
            {item.description !== null || item.description !== ''
              ? item.description
              : '소개글이 없습니다.'}
          </Text>
        </View>
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
            onPress={() => navigation.navigate('FeedBack')}
            style={{
              borderWidth: 0.5,
              borderColor: '#275696',
              borderRadius: 20,
              paddingVertical: 12,
              width: '49%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={[styles.normalText, {fontSize: 12, color: '#275696'}]}>
              견적제안보기
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              if (myOrderDetail.status === '1') {
                setEstimatePartnerAPI(item.pd_id);
              } else if (myOrderDetail.status === '2') {
                Alert.alert(
                  '견적확정 대기중입니다.',
                  '파트너회원이 견적을 확정할 때까지 기다려주세요.',
                  [
                    {
                      text: '확인',
                    },
                  ],
                );
              } else if (myOrderDetail.status === '3') {
                Alert.alert(
                  '계약금 입금완료 요청하였습니다.',
                  '파트너회원이 입금확인할 때까지 기다려주세요.',
                  [
                    {
                      text: '확인',
                    },
                  ],
                );
              } else {
                return false;
              }
            }}
            style={{
              borderWidth: 0.5,
              borderColor: '#275696',
              borderRadius: 20,
              backgroundColor: '#275696',
              paddingVertical: 12,
              width: '49%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={[styles.normalText, {fontSize: 12, color: '#fff'}]}>
              {myOrderDetail.status === '1'
                ? '파트너 선정'
                : myOrderDetail.status === '2'
                ? '파트너 선정됨'
                : myOrderDetail.status === '3'
                ? '계약금 입금완료'
                : null}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{width: '100%', height: 1, backgroundColor: '#E3E3E3'}} />
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
            <Text style={[styles.normalText, {fontSize: 14, color: '#366DE5'}]}>
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
            <Text style={[styles.normalText, {fontSize: 14, color: '#A2A2A2'}]}>
              {item.deposit_rate}%
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Modal
        isVisible={isModalVisible}
        toggleModal={toggleModal}
        goCancelOrder={goCancelOrder}
        goCopyOrder={goCopyOrder}
      />
      <DetailHeader title={routeName} navigation={navigation} />
      <View style={[styles.container, styles.wrap]}>
        <View style={styles.infoBox}>
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
              ? '인쇄제작요청'
              : myOrderDetail.status === '6'
              ? '납품완료'
              : myOrderDetail.status === '7'
              ? '수령완료'
              : myOrderDetail.status === '8'
              ? '마감'
              : null}
          </Text>
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
              {myOrderDetail.estimate_date}
            </Text>
          </View>
          <View style={styles.detailsEnd}>
            <View style={styles.detailsEnd}>
              <Text style={styles.detailsTitle}>납품 희망일</Text>
              <Text style={styles.detailsDesc}>
                {myOrderDetail.delivery_date}
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
        {myOrderDetail.status !== '8' ? (
          <TouchableOpacity onPress={toggleModal} activeOpacity={0.9}>
            <View style={[styles.submitBtn, {marginTop: 20}]}>
              <Text style={styles.submitBtnText}>요청 포기</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => navigation.navigate('CopyOrder')}
            activeOpacity={0.9}>
            <View style={[styles.submitBtn, {marginTop: 20}]}>
              <Text style={styles.submitBtnText}>복사 후 재등록</Text>
            </View>
          </TouchableOpacity>
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
          backgroundColor: '#F5F5F5',
          width: Dimensions.get('window').width,
        }}
      />
      {/* // 경계 라인 */}

      <View style={{flex: 1, paddingHorizontal: 20}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginBottom: 15,
          }}>
          <Text style={[styles.orderInfoTitle, {marginRight: 10}]}>
            {myOrderDetail.status === '1'
              ? '입찰업체'
              : myOrderDetail.status === '2'
              ? '파트너선정업체'
              : myOrderDetail.status === '3'
              ? '파트너선정업체'
              : null}
          </Text>
          {myOrderDetail.status === '1' && (
            <Text style={[styles.orderInfoTitleRow, {color: '#275696'}]}>
              총 견적 {myOrderDetail.ecnt}
            </Text>
          )}
          {myOrderDetail.status === '2' && (
            <Text style={[styles.orderInfoTitleRow, {color: '#275696'}]}>
              현재 견적확정 대기중입니다.
            </Text>
          )}
          {myOrderDetail.status === '3' && (
            <Text style={[styles.orderInfoTitleRow, {color: '#275696'}]}>
              현재 계약금 입금 대기중입니다.
            </Text>
          )}
        </View>

        {/* 입찰업체 리스트 */}

        <FlatList
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
              }}>
              <Text style={{fontFamily: 'SCDream4'}}>
                입찰한 업체가 없습니다.
              </Text>
            </View>
          }
        />

        {/* // 입찰업체 리스트 */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
