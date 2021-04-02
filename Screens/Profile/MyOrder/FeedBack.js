import * as React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';

import DetailHeader from '../../Common/DetailHeader';
import OrderAPI from '../../../src/api/OrderAPI';

const FeedBack = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;
  const pd_id = props.route.params.pd_id;

  const [feedBack, setFeedBack] = React.useState(null);

  const getOfferDetailAPI = () => {
    OrderAPI.getOfferDetail(pd_id)
      .then((res) => {
        if (res.data.result === '1') {
          setFeedBack(res.data.item);
        }
        console.log('제안 상세', res);
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
    getOfferDetailAPI();
  }, []);

  console.log('feedBack', feedBack);

  return (
    <>
      <DetailHeader title={routeName} navigation={navigation} />
      {feedBack !== null && (
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}>
          <View style={styles.wrap}>
            <Text
              style={[
                styles.mediumText,
                {fontSize: 16, color: '#275696', marginBottom: 10},
              ]}>
              기본 정보
            </Text>
            <View style={[styles.infoBox, {marginBottom: 20}]}>
              <Text style={styles.infoStepDesc}>제목</Text>
              <Text style={styles.infoStepTitle}>
                중소기업 선물용 쇼핑백 제작 요청합니다.
              </Text>
              <View style={styles.line} />
              <View style={styles.details}>
                <Text style={styles.detailsTitle}>분류</Text>
                <Text style={styles.detailsDesc}>단상자/선물세트/쇼핑백</Text>
              </View>
              <View style={styles.details}>
                <Text style={styles.detailsTitle}>견적 마감일</Text>
                <Text style={styles.detailsDesc}>2020.11.01</Text>
              </View>
              <View style={styles.details}>
                <Text style={styles.detailsTitle}>납품 희망일</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.detailsDesc}>2020.12.01</Text>
                  <Text
                    style={[
                      styles.detailsDesc,
                      {color: '#275696', marginLeft: 5},
                    ]}>
                    (조정필요)
                  </Text>
                </View>
              </View>
              <View style={styles.details}>
                <Text style={styles.detailsTitle}>디자인 의뢰</Text>
                <Text style={styles.detailsDesc}>인쇄만 의뢰</Text>
              </View>
              <View style={styles.details}>
                <Text style={styles.detailsTitle}>인쇄 업체 선호 지역</Text>
                <Text style={styles.detailsDesc}>서울</Text>
              </View>
            </View>
            <Text
              style={[
                styles.normalText,
                {fontSize: 14, color: '#A2A2A2', marginBottom: 10},
              ]}>
              첨부파일
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../../src/assets/img02.png')}
                resizeMode="cover"
                style={{
                  width: 114,
                  height: 114,
                  borderRadius: 5,
                  marginRight: 10,
                }}
              />
              <Image
                source={require('../../../src/assets/img03.png')}
                resizeMode="cover"
                style={{
                  width: 114,
                  height: 114,
                  borderRadius: 5,
                  marginRight: 10,
                }}
              />
              <Image
                source={require('../../../src/assets/img04.png')}
                resizeMode="cover"
                style={{
                  width: 114,
                  height: 114,
                  borderRadius: 5,
                  marginRight: 10,
                }}
              />
            </View>
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

          <View style={[styles.wrap, {marginVertical: 10}]}>
            <Text
              style={[
                styles.mediumText,
                {fontSize: 16, color: '#275696', marginBottom: 10},
              ]}>
              타입 선택
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={[styles.normalText, {fontSize: 16, color: '#000000'}]}>
                박스 타입
              </Text>
              <Text
                style={[styles.normalText, {fontSize: 16, color: '#000000'}]}>
                B형 십자
              </Text>
            </View>
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

          <View style={[styles.wrap, {marginVertical: 10}]}>
            <Text
              style={[
                styles.mediumText,
                {fontSize: 16, color: '#275696', marginBottom: 10},
              ]}>
              제작 정보
            </Text>
            <View style={[styles.infoBox, {marginBottom: 10}]}>
              <View style={styles.details}>
                <Text style={styles.detailsTitle02}>
                  가로/세로/높이 규격 (단위:mm)
                </Text>
                <Text style={styles.detailsDesc}>10/10/10</Text>
              </View>
              <View style={styles.details}>
                <Text style={styles.detailsTitle02}>수량</Text>
                <Text style={styles.detailsDesc}>500</Text>
              </View>
              <View style={styles.details}>
                <Text style={styles.detailsTitle02}>목형</Text>
                <Text style={styles.detailsDesc}>있음</Text>
              </View>
            </View>
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

          <View style={[styles.wrap, {marginVertical: 10}]}>
            <Text
              style={[
                styles.mediumText,
                {fontSize: 16, color: '#275696', marginBottom: 10},
              ]}>
              지류 선택
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={[styles.normalText, {fontSize: 16, color: '#000000'}]}>
                구분
              </Text>
              <Text
                style={[styles.normalText, {fontSize: 16, color: '#000000'}]}>
                일반(백판지,마닐라류)
              </Text>
            </View>
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

          <View style={[styles.wrap, {marginVertical: 10}]}>
            <Text
              style={[
                styles.mediumText,
                {fontSize: 16, color: '#275696', marginBottom: 10},
              ]}>
              인쇄도수/교정/감리 선택
            </Text>
            <View style={[styles.infoBox, {marginBottom: 10}]}>
              <View style={styles.details}>
                <Text style={styles.detailsTitle02}>인쇄도수</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.detailsDesc}>(전면) 1도</Text>
                  <Text
                    style={[
                      styles.detailsDesc,
                      {color: '#275696', marginLeft: 5},
                    ]}>
                    (조정필요)
                  </Text>
                </View>
              </View>
              <View style={styles.details}>
                <Text style={styles.detailsTitle02}>인쇄교정</Text>
                <Text style={styles.detailsDesc}>있음</Text>
              </View>
              <View style={styles.details}>
                <Text style={styles.detailsTitle02}>인쇄감리</Text>
                <Text style={styles.detailsDesc}>있음</Text>
              </View>
            </View>
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

          <View style={[styles.wrap, {marginVertical: 10}]}>
            <Text
              style={[
                styles.mediumText,
                {fontSize: 16, color: '#275696', marginBottom: 10},
              ]}>
              후가공
            </Text>
            <View style={[styles.infoBox, {marginBottom: 10}]}>
              <View style={styles.details}>
                <Text style={styles.detailsTitle02}>박가공</Text>
                <Text style={styles.detailsDesc}>있음</Text>
              </View>
              <View style={styles.details}>
                <Text style={styles.detailsTitle02}>형압</Text>
                <Text style={styles.detailsDesc}>있음</Text>
              </View>
              <View style={styles.details}>
                <Text style={styles.detailsTitle02}>부분 실크</Text>
                <Text style={styles.detailsDesc}>있음</Text>
              </View>
              <View style={styles.details}>
                <Text style={styles.detailsTitle02}>코팅</Text>
                <Text style={styles.detailsDesc}>코팅 없음</Text>
              </View>
            </View>
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

          <View style={[styles.wrap, {marginVertical: 10}]}>
            <Text
              style={[
                styles.mediumText,
                {fontSize: 16, color: '#275696', marginBottom: 10},
              ]}>
              견적 금액
            </Text>
            <View style={[styles.infoBox, {marginBottom: 10}]}>
              <View style={styles.details}>
                <Text style={styles.detailsTitle02}>제작비</Text>
                <Text style={styles.detailsDesc}>
                  {' '}
                  {feedBack.estimate.production_price.replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    ',',
                  )}
                  원
                </Text>
              </View>
              <View style={styles.details}>
                <Text style={styles.detailsTitle02}>디자인비</Text>
                <Text style={styles.detailsDesc}>
                  {feedBack.estimate.design_price.replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    ',',
                  )}
                  원
                </Text>
              </View>
              <View style={styles.details}>
                <Text style={styles.detailsTitle02}>배송비</Text>
                <Text style={styles.detailsDesc}>
                  {feedBack.estimate.reduce_price.replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    ',',
                  )}
                  원
                </Text>
              </View>
              <View style={styles.details}>
                <Text style={styles.detailsTitle02}>총 비용</Text>
                <Text style={styles.detailsDesc}>
                  {feedBack.estimate.total_price.replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    ',',
                  )}
                  원
                </Text>
              </View>
            </View>
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

          <View style={[styles.wrap, {marginVertical: 10}]}>
            <Text
              style={[
                styles.mediumText,
                {fontSize: 16, color: '#275696', marginBottom: 10},
              ]}>
              계약금(선금) 비율
            </Text>
            <View style={[styles.infoBox, {marginBottom: 10}]}>
              <View style={styles.details}>
                <Text style={styles.detailsTitle02}>계약금(선금) 비율</Text>
                <Text style={styles.detailsDesc}>
                  {feedBack.estimate.deposit_rate}%
                </Text>
              </View>
              <View style={styles.details}>
                <Text style={styles.detailsTitle02}>계약금(선금)</Text>
                <Text style={styles.detailsDesc}>
                  {feedBack.estimate.deposit.replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    ',',
                  )}
                  원
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                marginBottom: 10,
              }}>
              <Text
                style={[
                  styles.normalText,
                  {
                    fontSize: 12,
                    color: '#275696',
                    lineHeight: 18,
                    marginRight: 3,
                  },
                ]}>
                ※
              </Text>
              <Text
                style={[
                  styles.normalText,
                  {fontSize: 12, color: '#275696', lineHeight: 18},
                ]}>
                파트너사선정이 확정되면 입금계좌정보는 알림 메시지를 통해 확인
                가능합니다.
              </Text>
            </View>
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

          <View style={[styles.wrap, {marginVertical: 10}]}>
            <Text
              style={[
                styles.mediumText,
                {fontSize: 16, color: '#275696', marginBottom: 10},
              ]}>
              피드백 내용
            </Text>
            <View style={[styles.infoBox, {marginBottom: 10}]}>
              <View style={styles.details}>
                <Text
                  style={[
                    styles.detailsTitle02,
                    {color: '#111', lineHeight: 22, width: '100%'},
                  ]}>
                  {feedBack.estimate.estimate_content}
                </Text>
              </View>
            </View>
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

          <View style={[styles.wrap, {marginVertical: 10}]}>
            <Text
              style={[
                styles.mediumText,
                {fontSize: 16, color: '#275696', marginBottom: 10},
              ]}>
              견적서 파일
            </Text>
            <View style={[styles.infoBox, {marginBottom: 10}]}>
              <TouchableOpacity
                onPress={() => Alert.alert('다운로드')}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  borderRadius: 5,
                  marginRight: 10,
                }}>
                <Image
                  source={require('../../../src/assets/down.png')}
                  resizeMode="cover"
                  style={{width: 30, height: 30, marginRight: 10}}
                />
                <Text style={styles.normalText}>
                  {feedBack.estimate.bf_file_source}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}
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
    fontFamily: 'SCDream4',
    fontSize: 14,
    color: '#A2A2A2',
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  detailsTitle: {
    fontFamily: 'SCDream4',
    width: 150,
    fontSize: 14,
    color: '#A2A2A2',
  },
  detailsDesc: {
    fontFamily: 'SCDream4',
    fontSize: 14,
    color: '#000',
    marginTop: 5,
  },
  detailsTitle02: {
    fontFamily: 'SCDream4',
    width: 200,
    fontSize: 14,
    color: '#A2A2A2',
  },
  detailsEnd: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderInfoTitle: {
    fontFamily: 'SCDream4',
    fontSize: 18,
    color: '#000000',
    marginTop: 20,
    marginBottom: 25,
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

export default FeedBack;
