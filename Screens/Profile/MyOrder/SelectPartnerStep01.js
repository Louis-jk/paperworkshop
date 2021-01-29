import * as React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Alert,
  Dimensions,
  Image,
  TouchableOpacity,
  Linking,
  TouchableWithoutFeedback,
} from 'react-native';
import DetailHeader from '../../Common/DetailHeader';
import Modal from './CancelModal';

const SelectPartnerStep01 = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  const [isModalVisible, setModalVisible] = React.useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const goCancelOrder = async () => {
    await setModalVisible(!isModalVisible);
    await navigation.navigate('CancelOrder');
  };

  const goCopyOrder = async () => {
    await setModalVisible(!isModalVisible);
    await navigation.navigate('CopyOrder');
  };

  return (
    <>
      <Modal
        isVisible={isModalVisible}
        toggleModal={toggleModal}
        goCancelOrder={goCancelOrder}
        goCopyOrder={goCopyOrder}
      />
      <DetailHeader title={routeName} navigation={navigation} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.wrap}>
          <View style={styles.infoBox}>
            <Text style={styles.infoStepDesc}>파트너 선정</Text>
            <Text style={styles.infoStepTitle}>중소기업 선물용 쇼핑백 제작 요청합니다.</Text>
            <View style={styles.line} />
            <View style={styles.details}>
              <Text style={styles.detailsTitle}>분류</Text>
              <Text style={styles.detailsDesc}>단상자/선물세트/쇼핑백</Text>
            </View>
            <View style={styles.details}>
              <Text style={styles.detailsTitle}>견적 마감일</Text>
              <Text style={styles.detailsDesc}>2020.11.01</Text>
            </View>
            <View style={styles.detailsEnd}>
              <View style={styles.detailsEnd}>
                <Text style={styles.detailsTitle}>납품 희망일</Text>
                <Text style={styles.detailsDesc}>2020.12.01</Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('OrderDetail')}
                style={{ alignSelf: 'flex-end' }}>
                <Text
                  style={{
                    fontSize: 12,
                    textDecorationLine: 'underline',
                    color: '#A2A2A2',
                  }}>
                  세부 내용 보기
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity onPress={toggleModal} activeOpacity={0.9}>
            <View style={[styles.submitBtn, { marginTop: 20 }]}>
              <Text style={styles.submitBtnText}>요청 포기</Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* 경계 라인 */}
        <View
          style={{
            height: 1,
            backgroundColor: '#E3E3E3',
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

        <View style={styles.wrap}>
          {/* 최종 선정 업체 */}
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginBottom: 15,
              }}>
              <Text style={[styles.orderInfoTitle, { marginRight: 10 }]}>최종 선정 업체</Text>
              {/* <Text style={[styles.orderInfoTitleRow, { color: '#275696' }]}>총 견적 3</Text> */}
            </View>
            {/* 입찰업체 리스트 */}
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
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../../../src/images/p01.png')}
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
                  <View>
                    <Text style={{ fontSize: 14, color: '#000000', fontWeight: 'bold' }}>
                      삼보인쇄
                    </Text>
                    <Text style={{ fontSize: 14, color: '#000000' }}>010-1234-5678</Text>
                  </View>
                </View>
              </View>
              <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
                <Text style={{ fontSize: 14, color: '#111111', lineHeight: 20 }}>
                  안녕하세요. 20년 인쇄업체 전통을 자랑하는 삼보인쇄입니다. 제작 요청하신 중소기업
                  선물용 쇼핑백 30건 이상 진행했습니다. 선물세트 추가 비용 5만원입니다.
                </Text>
              </View>
              <View style={{ width: '100%', height: 1, backgroundColor: '#E3E3E3' }} />
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
                  <Text style={{ fontSize: 14, color: '#111111', marginRight: 10 }}>견적 금액</Text>
                  <Text style={{ fontSize: 14, color: '#366DE5' }}>200,000원</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <Text style={{ fontSize: 14, color: '#111111', marginRight: 10 }}>
                    계약금(선금)
                  </Text>
                  <Text style={{ fontSize: 14, color: '#A2A2A2' }}>10%</Text>
                </View>
              </View>
            </View>
            {/* // 입찰업체 리스트 */}

            {/* 전화하기, 메세지보내기 */}
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
              <TouchableWithoutFeedback onPress={() => Linking.openURL(`tel:010-1234-5678`)}>
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
                    style={{ width: 24, height: 24 }}
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
              <TouchableWithoutFeedback onPress={() => navigation.navigate('MessageDetail')}>
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
                    style={{ width: 24, height: 24 }}
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
            {/* // 전화하기, 메세지보내기  */}
          </View>
          {/* // 최종 선정 업체 */}

          {/* 진행 현황 */}
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginBottom: 15,
              }}>
              <Text style={[styles.orderInfoTitle, { marginRight: 10 }]}>진행 현황</Text>
              {/* <Text style={[styles.orderInfoTitleRow, { color: '#275696' }]}>총 견적 3</Text> */}
            </View>
            <View
              style={{
                alignSelf: 'flex-start',
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 5,
                paddingVertical: 5,
                backgroundColor: '#EFF6FF',
                marginBottom: 10,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  color: '#275696',
                }}>
                선금 입금 요청 대기
              </Text>
            </View>
            <View style={{ marginBottom: 50 }}>
              <Text style={{ fontSize: 14, lineHeight: 20 }}>
                파트너스로부터 견적이 최종 확정되면,
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                <Text style={{ fontSize: 14, lineHeight: 20 }}>견적 건 진행을 위한</Text>
                <Text style={{ fontSize: 14, fontWeight: 'bold', lineHeight: 20 }}>
                  {' '}
                  계약금 계좌가 공유
                </Text>
                <Text style={{ fontSize: 14, lineHeight: 20 }}> 됩니다.</Text>
              </View>
            </View>
          </View>
          {/* // 진행 현황 */}
        </View>
      </ScrollView>
    </>
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
    fontSize: 12,
    color: '#275696',
    lineHeight: 23,
  },
  infoStepTitle: {
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
    width: 100,
    fontSize: 14,
    color: '#A2A2A2',
  },
  detailsDesc: {
    fontSize: 14,
    color: '#000',
  },
  detailsEnd: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderInfoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 20,
  },
  orderInfoTitleRow: {
    fontSize: 14,
    marginTop: 20,
  },
  orderInfoDesc: {
    fontSize: 15,
    color: '#000',
    marginBottom: 10,
  },
  textInput: {
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
    fontSize: 15,
    color: '#111',
  },
  orderInfoContentDetail: {
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
});

export default SelectPartnerStep01;
