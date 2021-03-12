import * as React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import DetailHeader from '../../Common/DetailHeader';
import OrderAPI from '../../../src/api/OrderAPI';

const OrderDetail = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;
  const pe_id = props.route.params.pe_id;
  const cate1 = props.route.params.cate1;

  const [details, setDetails] = React.useState([]);

  // 기타인쇄 견적이 아닌 "일반인쇄", "패키지 인쇄의 경우"
  const [info01, setInfo01] = React.useState([]); // 제작정보 사이즈 등 정보
  const [info02, setInfo02] = React.useState([]); // 지류 지종 평량 골 등의 정보
  const [info03, setInfo03] = React.useState([]); // 인쇄도수, 인쇄감리, 인쇄교정 등의 정보
  const [info04, setInfo04] = React.useState([]); // 후가공 정보
  const [isLoading, setLoading] = React.useState(false);

  console.log('OrderDetail props2', props);

  const getMyOrderParticularsAPI = () => {
    setLoading(true);
    let method = '';

    if (cate1 === '0') {
      method = 'proc_my_real_estimate_detail';
    } else if (cate1 === '1') {
      method = 'proc_my_real_estimate_detail2';
    } else {
      method = 'proc_my_real_estimate_detail3';
    }

    OrderAPI.getMyOrderParticulars(method, pe_id)
      .then((res) => {
        console.log('메소드 실행 결과 값', res);
        if (res.data.result === '1' && res.data.count > 0) {
          setDetails(res.data.item.basic);
          if (cate1 !== '2') {
            setInfo01(res.data.item.basic2);
            setInfo02(res.data.item.feeder);
            setInfo03(res.data.item.print);
            setInfo04(res.data.item.end);
          }
          setLoading(false);
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
    getMyOrderParticularsAPI();
  }, []);

  console.log('details', details);

  return (
    <>
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

      <DetailHeader title={routeName} navigation={navigation} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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
            <Text style={styles.infoStepTitle}>{details.title}</Text>
            <View style={styles.line} />
            <View style={styles.details}>
              <Text style={styles.detailsTitle}>분류</Text>
              <Text style={styles.detailsDesc}>{details.ca_name}</Text>
            </View>
            <View style={styles.details}>
              <Text style={styles.detailsTitle}>견적 마감일</Text>
              <Text style={styles.detailsDesc}>{details.estimate_date}</Text>
            </View>
            <View style={styles.details}>
              <Text style={styles.detailsTitle}>납품 희망일</Text>
              <Text style={styles.detailsDesc}>{details.delivery_date}</Text>
            </View>
            <View style={styles.details}>
              <Text style={styles.detailsTitle}>디자인 의뢰</Text>
              <Text style={styles.detailsDesc}>
                {details.design_print === 'P'
                  ? '인쇄만 의뢰'
                  : details.design_print === 'D'
                  ? '인쇄 + 디자인의뢰'
                  : null}
              </Text>
            </View>
            <View style={styles.details}>
              <Text style={styles.detailsTitle}>인쇄 업체 선호 지역</Text>
              <Text style={styles.detailsDesc}>
                {details.favor_area === 'seoul'
                  ? '서울'
                  : details.favor_area === 'busan'
                  ? '부산'
                  : details.favor_area === 'daegu'
                  ? '대구'
                  : details.favor_area === 'incheon'
                  ? '인천'
                  : details.favor_area === 'gwangju'
                  ? '광주'
                  : details.favor_area === 'sejong'
                  ? '세종'
                  : details.favor_area === 'ulsan'
                  ? '울산'
                  : details.favor_area === 'gyeongi'
                  ? '경기'
                  : details.favor_area === 'gangwon'
                  ? '강원'
                  : details.favor_area === 'choongcheong'
                  ? '충청'
                  : details.favor_area === 'jeonra'
                  ? '전라'
                  : details.favor_area === 'gyeongsang'
                  ? '경상'
                  : details.favor_area === 'jeju'
                  ? '제주'
                  : null}
              </Text>
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
            {details.pe_file ? (
              <>
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
              </>
            ) : (
              <Text
                style={{
                  fontFamily: 'SCDream4',
                  color: '#B5B5B5',
                  fontSize: 13,
                }}>
                첨부파일이 없습니다.
              </Text>
            )}
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

        {cate1 === '2' ? (
          <View style={[styles.wrap, {marginVertical: 10}]}>
            <Text
              style={[
                styles.mediumText,
                {fontSize: 16, color: '#275696', marginBottom: 10},
              ]}>
              희망 인쇄물 기입사항
            </Text>
            <View style={[styles.infoBox, {marginBottom: 10}]}>
              <View style={styles.details}>
                <Text style={styles.detailsTitle02}>{details.memo}</Text>
              </View>
            </View>
          </View>
        ) : null}
        {cate1 !== '2' ? (
          <>
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
                  {cate1 === '1' ? (
                    <Text style={styles.detailsDesc}>
                      {info01.pwidth}/{info01.plength}/{info01.pheight}
                    </Text>
                  ) : (
                    <Text style={styles.detailsDesc}>10/10/10</Text>
                  )}
                </View>
                <View style={styles.details}>
                  <Text style={styles.detailsTitle02}>수량</Text>
                  <Text style={styles.detailsDesc}>
                    {info01.cnt !== '0' ? info01.cnt : info01.cnt_etc}
                  </Text>
                </View>
                {cate1 === '1' ? (
                  <View style={styles.details}>
                    <Text style={styles.detailsTitle02}>목형</Text>
                    <Text style={styles.detailsDesc}>
                      {info01.wood_pattern === 'Y' ? '있음' : '없음'}
                    </Text>
                  </View>
                ) : null}
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
                  <Text style={styles.detailsDesc}>(전면) 1도</Text>
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
          </>
        ) : null}
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
  },
  detailsTitle02: {
    fontFamily: 'SCDream4',
    width: 200,
    fontSize: 14,
    lineHeight: 22,
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

export default OrderDetail;
