import * as React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  Dimensions,
  TextInput,
  Button,
  Image,
  Alert,
  Platform,
} from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';

import DetailHeader from '../../Common/DetailHeader';

const index = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  const [category01, setCategory01] = React.useState(null);

  let data = [
    {
      value: 'Banana',
    },
    {
      value: 'Mango',
    },
    {
      value: 'Pear',
    },
  ];

  const [visibleStep01, setVisibleStep01] = React.useState(false);
  const [visibleStep02, setVisibleStep02] = React.useState(false);
  const [step01, setStep01] = React.useState('');
  const [step02, setStep02] = React.useState('');

  const toggleMenu01 = () => {
    setVisibleStep01((prev) => !prev);
  };

  const toggleMenu02 = () => {
    setVisibleStep02((prev) => !prev);
  };

  return (
    <>
      <DetailHeader title={routeName} navigation={navigation} />
      {/* 카테고리 선택 및 검색 부분 */}
      <View
        style={{
          width: Dimensions.get('window').width,
          backgroundColor: '#F5F5F5',
          paddingHorizontal: 20,
          paddingVertical: 20,
          zIndex: 999,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <View
            style={{
              zIndex: 2000,
              position: 'relative',
              width: '49%',
              borderWidth: 1,
              borderColor: '#E3E3E3',
              borderTopRightRadius: 4,
              borderTopLeftRadius: 4,
              borderBottomRightRadius: visibleStep01 ? 0 : 4,
              borderBottomLeftRadius: visibleStep01 ? 0 : 4,
              paddingHorizontal: 10,
              backgroundColor: '#fff',
            }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={toggleMenu01}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TextInput
                value={step01}
                placeholder="진행현황 선택"
                style={{ fontFamily: 'SCDream4', width: '80%', color: step01 ? '#000' : '#A2A2A2' }}
                editable={false}
                collapsable={true}
              />
              <Image
                source={
                  visibleStep01
                    ? require('../../../src/assets/arr01_top.png')
                    : require('../../../src/assets/arr01.png')
                }
                style={{ width: 25, height: 25 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              zIndex: 2000,
              position: 'relative',
              width: '49%',
              borderWidth: 1,
              borderColor: '#E3E3E3',
              borderTopRightRadius: 4,
              borderTopLeftRadius: 4,
              borderBottomRightRadius: visibleStep01 ? 0 : 4,
              borderBottomLeftRadius: visibleStep01 ? 0 : 4,
              paddingHorizontal: 10,
              backgroundColor: '#fff',
            }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={toggleMenu02}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TextInput
                value={step02}
                placeholder="분류 선택"
                style={{ fontFamily: 'SCDream4', width: '80%', color: step02 ? '#000' : '#A2A2A2' }}
                editable={false}
              />
              <Image
                source={
                  visibleStep02
                    ? require('../../../src/assets/arr01_top.png')
                    : require('../../../src/assets/arr01.png')
                }
                style={{ width: 25, height: 25 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <TextInput
              placeholder="제목을 입력하세요."
              style={[
                styles.normalText,
                {
                  borderWidth: 1,
                  borderColor: '#E3E3E3',
                  borderRadius: 4,
                  backgroundColor: '#fff',
                  paddingHorizontal: 15,
                  flex: 2,
                  marginRight: 5,
                },
              ]}
            />
            <TouchableWithoutFeedback>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#275696',
                  borderRadius: 4,
                }}>
                <Text style={[styles.normalText, { color: '#fff', paddingHorizontal: 20 }]}>
                  검색
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
      {/* // 카테고리 선택 및 검색 부분 */}

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ zIndex: -1000 }}>
        {/* 리스트 출력 부분 */}

        {/* 입찰중 */}
        <View style={{ paddingHorizontal: 20 }}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate('MyOrderReqDetailList')}
            activeOpacity={0.8}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={styles.listWrap}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginBottom: 5,
                  }}>
                  <View style={styles.listStep02Badge}>
                    <Text style={[styles.listStep02BadgeText, { color: '#275696' }]}>견적진행</Text>
                  </View>
                  <Text
                    style={[styles.normalText, { fontSize: 13, marginLeft: 5, color: '#000000' }]}>
                    3건
                  </Text>
                  <Text
                    style={[styles.normalText, { fontSize: 13, marginLeft: 5, color: '#366DE5' }]}>
                    NEW
                  </Text>
                </View>
                <Text style={styles.listTitle}>중소기업 선물용 쇼핑백 제작 요청합니다.</Text>
                <Text style={styles.listDesc}>칼라 박스 - B형 십자 (경기/김성규)</Text>
              </View>
              <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                <Text style={styles.listStep02}>입찰중</Text>
                <Text style={styles.listDday02}>20.11.10</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.line} />
        {/* // 입찰중 */}

        {/* 파트너 선정 - 선금 입금 요청 대기 */}
        <View style={{ paddingHorizontal: 20 }}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate('SelectPartnerStep01')}
            activeOpacity={0.8}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={styles.listWrap}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginBottom: 5,
                  }}>
                  <View style={styles.listStep02BadgePayReq}>
                    <Text style={[styles.listStep02BadgeText, { color: '#275696' }]}>
                      선금 입금 요청 대기
                    </Text>
                  </View>
                  <Text
                    style={[styles.normalText, { fontSize: 13, marginLeft: 5, color: '#366DE5' }]}>
                    NEW
                  </Text>
                </View>
                <Text style={styles.listTitle}>중소기업 선물용 쇼핑백 제작 요청합니다.</Text>
                <Text style={styles.listDesc}>칼라 박스 - B형 십자 (경기/김성규)</Text>
              </View>
              <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                <Text style={styles.listStep02}>파트너 선정</Text>
                <Text style={styles.listDday02}>20.11.10</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.line} />
        {/* // 파트너 선정 - 선금 입금 요청 대기 */}

        {/* 파트너 선정 - 계약금 입금 대기 */}
        <View style={{ paddingHorizontal: 20 }}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate('SelectPartnerStep02')}
            activeOpacity={0.8}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={styles.listWrap}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginBottom: 5,
                  }}>
                  <View style={styles.listStep02BadgePayReq}>
                    <Text style={[styles.listStep02BadgeText, { color: '#275696' }]}>
                      계약금 입금 대기
                    </Text>
                  </View>
                  <Text
                    style={[styles.normalText, { fontSize: 13, marginLeft: 5, color: '#366DE5' }]}>
                    NEW
                  </Text>
                </View>
                <Text style={styles.listTitle}>중소기업 선물용 쇼핑백 제작 요청합니다.</Text>
                <Text style={styles.listDesc}>칼라 박스 - B형 십자 (경기/김성규)</Text>
              </View>
              <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                <Text style={styles.listStep02}>파트너 선정</Text>
                <Text style={styles.listDday02}>20.11.10</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.line} />
        {/* // 파트너 선정 - 계약금 입금 대기 */}

        {/* 파트너 선정 - 계약금 입금 완료 */}
        <View style={{ paddingHorizontal: 20 }}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate('SelectPartnerStep03')}
            activeOpacity={0.8}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={styles.listWrap}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginBottom: 5,
                  }}>
                  <View style={styles.listStep02BadgePayComplete}>
                    <Text style={[styles.listStep02BadgeText, { color: '#000000' }]}>
                      계약금 입금 완료
                    </Text>
                  </View>
                  <Text
                    style={[styles.normalText, { fontSize: 13, marginLeft: 5, color: '#366DE5' }]}>
                    NEW
                  </Text>
                </View>
                <Text style={styles.listTitle}>중소기업 선물용 쇼핑백 제작 요청합니다.</Text>
                <Text style={styles.listDesc}>칼라 박스 - B형 십자 (경기/김성규)</Text>
              </View>
              <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                <Text style={styles.listStep02}>파트너 선정</Text>
                <Text style={styles.listDday02}>20.11.10</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.line} />
        {/* // 파트너 선정 - 계약금 입금 완료 */}

        {/* 납품 완료 */}
        <View style={{ paddingHorizontal: 20 }}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate('Receive')}
            activeOpacity={0.8}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={styles.listWrap}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginBottom: 5,
                  }}>
                  <View style={styles.listStep02BadgePayComplete}>
                    <Text style={[styles.listStep02BadgeText, { color: '#000000' }]}>
                      납품 완료
                    </Text>
                  </View>
                  {/* <Text style={{ fontSize: 13, marginLeft: 5, color: '#366DE5' }}>NEW</Text> */}
                </View>
                <Text style={styles.listTitle}>중소기업 선물용 쇼핑백 제작 요청합니다.</Text>
                <Text style={styles.listDesc}>칼라 박스 - B형 십자 (경기/김성규)</Text>
              </View>
              <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                <Text style={[styles.listStep02, { color: '#000' }]}>납품 완료</Text>
                <Text style={styles.listDday02}>20.11.10</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.line} />
        {/* // 납품 완료 */}

        {/* 마감 */}
        <View style={{ paddingHorizontal: 20 }}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate('Done')}
            activeOpacity={0.8}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={styles.listWrap}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginBottom: 5,
                  }}>
                  <View style={styles.listStep02BadgeTimeOver}>
                    <Text style={[styles.listStep02BadgeText, { color: '#000000' }]}>
                      수령 완료
                    </Text>
                  </View>
                  {/* <Text style={{ fontSize: 13, marginLeft: 5, color: '#366DE5' }}>NEW</Text> */}
                </View>
                <Text style={styles.listTitle}>중소기업 선물용 쇼핑백 제작 요청합니다.</Text>
                <Text style={styles.listDesc}>칼라 박스 - B형 십자 (경기/김성규)</Text>
              </View>
              <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                <Text style={[styles.listStep02, { color: '#000' }]}>마감</Text>
                <Text style={styles.listDday02}>20.11.10</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.line} />
        {/* // 마감 */}

        {/* // 리스트 출력 부분 */}
      </ScrollView>

      {visibleStep01 && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ zIndex: 1000 }}
          style={{
            position: 'absolute',
            top: 126,
            left: 20,
            backgroundColor: '#fff',
            width: '44.25%',
            zIndex: 1000,
            borderWidth: 1,
            borderColor: '#E3E3E3',
            paddingVertical: 10,
            borderBottomRightRadius: 4,
            borderBottomLeftRadius: 4,
          }}>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 10,
            }}
            onPress={() => {
              setStep01('입찰중');
              setVisibleStep01(false);
            }}>
            <Text style={{ fontSize: 14, fontFamily: 'SCDream4' }}>입찰중</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 10,
            }}
            onPress={() => {
              setStep01('파트너선정');
              setVisibleStep01(false);
            }}>
            <Text style={{ fontSize: 14, fontFamily: 'SCDream4' }}>파트너선정</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 10,
            }}
            onPress={() => {
              setStep01('마감');
              setVisibleStep01(false);
            }}>
            <Text style={{ fontSize: 14, fontFamily: 'SCDream4' }}>마감</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 10,
            }}
            onPress={() => {
              setStep01('제작요청');
              setVisibleStep01(false);
            }}>
            <Text style={{ fontSize: 14, fontFamily: 'SCDream4' }}>제작요청</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 10,
            }}
            onPress={() => {
              setStep01('납품완료');
              setVisibleStep01(false);
            }}>
            <Text style={{ fontSize: 14, fontFamily: 'SCDream4' }}>납품완료</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 10,
            }}
            onPress={() => {
              setStep01('수령완료');
              setVisibleStep01(false);
            }}>
            <Text style={{ fontSize: 14, fontFamily: 'SCDream4' }}>수령완료</Text>
          </TouchableOpacity>
        </ScrollView>
      )}

      {visibleStep02 && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ zIndex: 1000 }}
          style={{
            position: 'absolute',
            top: 126,
            right: 20,
            backgroundColor: '#fff',
            width: '44.25%',
            zIndex: 1000,
            borderWidth: 1,
            borderColor: '#E3E3E3',
            paddingVertical: 10,
            borderBottomRightRadius: 4,
            borderBottomLeftRadius: 4,
          }}>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 10,
            }}
            onPress={() => {
              setStep02('패키지');
              setVisibleStep02(false);
            }}>
            <Text style={{ fontSize: 14, fontFamily: 'SCDream4' }}>패키지</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 10,
            }}
            onPress={() => {
              setStep02('일반인쇄물');
              setVisibleStep02(false);
            }}>
            <Text style={{ fontSize: 14, fontFamily: 'SCDream4' }}>일반인쇄물</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 10,
            }}
            onPress={() => {
              setStep02('기타인쇄물');
              setVisibleStep02(false);
            }}>
            <Text style={{ fontSize: 14, fontFamily: 'SCDream4' }}>기타인쇄물</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  flexRowCenter: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  wrap: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  infoBox: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
  },
  infoStepDesc: {
    fontSize: 14,
    color: '#A2A2A2',
    lineHeight: 23,
  },
  infoStepTitle: {
    fontSize: 16,
    color: '#000000',
  },
  listWrap: {
    marginVertical: 20,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#E3E3E3',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 2.5,
  },
  detailsTitle: {
    width: 70,
    fontSize: 14,
    color: '#979797',
  },
  detailsDesc: {
    fontSize: 14,
    color: '#000',
  },
  submitBtn: {
    borderRadius: 4,
    backgroundColor: '#275696',
    width: '100%',
    paddingVertical: 15,
  },
  submitBtnText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  cancelBtn: {
    borderRadius: 4,
    backgroundColor: '#F5F5F5',
    width: '100%',
    paddingVertical: 15,
  },
  cancelBtnText: {
    fontSize: 16,
    color: '#111',
    textAlign: 'center',
  },
  categoryWrap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E3E3E3',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
    marginBottom: 10,
  },
  categoryItem: {
    height: 150,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  categoryItemImg: {
    width: 120,
    height: 120,
    borderRadius: 100,
    backgroundColor: '#DFE6EF',
  },
  categoryItemText: {
    width: 100,
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 18,
    color: '#000',
    marginTop: 10,
  },
  listTitle: {
    fontFamily: 'SCDream4',
    fontSize: 14,
    lineHeight: 19,
    marginBottom: 5,
  },
  listDesc: {
    fontFamily: 'SCDream4',
    fontSize: 12,
    lineHeight: 16,
    color: '#A2A2A2',
  },
  listStep: {
    fontSize: 14,
    color: '#275696',
  },
  listDday: {
    alignSelf: 'flex-end',
    fontSize: 14,
    color: '#A2A2A2',
  },
  listStep02: {
    fontFamily: 'SCDream4',
    fontSize: 14,
    color: '#275696',
    marginBottom: 2,
  },
  listDday02: {
    fontFamily: 'SCDream4',
    alignSelf: 'flex-end',
    fontSize: 14,
    color: '#000000',
  },
  listStep03: {
    fontFamily: 'SCDream4',
    fontSize: 14,
    color: '#000000',
  },
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
    fontFamily: 'SCDream4',
    fontSize: 12,
    color: '#000000',
    paddingVertical: 2,
    paddingHorizontal: 5,
  },
  listStep03Badge: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    backgroundColor: '#F5F5F5',
    borderRadius: 2,
    alignSelf: 'flex-start',
  },
  listStep03BadgeText: {
    fontFamily: 'SCDream4',
    fontSize: 12,
    color: '#000000',
    paddingVertical: 2,
    paddingHorizontal: 5,
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

export default index;
