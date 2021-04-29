import * as React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Image,
  Alert,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';

import moment from 'moment';
import 'moment/locale/ko';

import DetailHeader from '../../Common/DetailHeader';
import OrderAPI from '../../../src/api/OrderAPI';

const index = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  const {mb_id} = useSelector((state) => state.UserInfoReducer);
  const [myOrders, setMyOrders] = React.useState([]);
  const [visibleStep01, setVisibleStep01] = React.useState(false);
  const [visibleStep02, setVisibleStep02] = React.useState(false);
  const [step01, setStep01] = React.useState(''); // 셀렉트 박스(진행현황) 표시될 선택된 값 담기
  const [status, setStatus] = React.useState(''); // 셀렉트 박스(진행현황) 중 API 호출 값 담기
  const [step02, setStep02] = React.useState(''); // 셀렉트 박스(분류('패키지','일반','기타')) 표시될 선택된 값 담기
  const [cate1, setCate1] = React.useState(''); // 셀렉트 박스(분류('패키지','일반','기타')) 중 API 호출 값 담기
  const [keyword, setKeyword] = React.useState(''); // 셀렉트 박스(분류('패키지','일반','기타')) 중 API 호출 값 담기
  const [search, setSearch] = React.useState(''); // 셀렉트 박스(분류('패키지','일반','기타')) 중 API 호출 값 담기
  const [isLoading, setLoading] = React.useState(false);

  const searchForm = () => {
    setSearch(keyword);
    getMyOrderAPI();
  };

  const getMyOrderAPI = () => {
    setLoading(true);

    OrderAPI.getMyOrder(mb_id, status, cate1, search)
      .then((res) => {
        if (res.data.result === '1' && res.data.count > 0) {
          console.log("result :: ", res);
          setMyOrders(res.data.item);
        } else {
          setMyOrders(null);
        }
        setLoading(false);
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

  React.useEffect(() => {
    getMyOrderAPI();
  }, [status, cate1, search]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getMyOrderAPI();
    });

    return unsubscribe;
  }, [navigation]);

  const toggleMenu01 = () => {
    setVisibleStep01((prev) => !prev);
  };

  const toggleMenu02 = () => {
    setVisibleStep02((prev) => !prev);
  };

  console.log('myOrders', myOrders);

  const renderRow = ({item, index}) => {
    return (
      <View>
        <View style={{paddingHorizontal: 20}} key={index}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              setStep01('');
              setStep02('');
              setStatus('');
              setCate1('');
              setSearch('');
              setKeyword('');

              navigation.navigate('MyOrderReqDetailList', {
                orderId: item.pe_id,
              });
            }}
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
                  {item.status === '0' || item.status === '1' ? (
                    <View style={styles.listStep02Badge}>
                      <Text
                        style={[
                          styles.listStep02BadgeText,
                          {color: '#275696'},
                        ]}>
                        {item.status === '0'
                          ? '견적요청'
                          : item.status === '1'
                          ? '입찰중'
                          : null}
                      </Text>
                    </View>
                  ) : item.status === '2' || item.status === '3' ? (
                    <View style={styles.listStep02BadgePayReq}>
                      <Text
                        style={[
                          styles.listStep02BadgeText,
                          {color: '#275696'},
                        ]}>
                        파트너스 최종 선정 (
                        {item.status === '2'
                          ? '견적 확정 대기'
                          : item.status === '3'
                          ? '계약금 입금대기'
                          : null}
                        )
                      </Text>
                    </View>
                  ) : item.status === '4' ||
                    item.status === '5' ||
                    item.status === '6' ||
                    item.status === '7' ||
                    item.status === '8' ||
                    item.status === '9' ? (
                    <View style={styles.listStep02BadgePayComplete}>
                      <Text
                        style={[styles.listStep02BadgeText, {color: '#fff'}]}>
                        {item.status === '4'
                          ? '계약금 입금 완료'
                          : item.status === '5'
                          ? '인쇄 제작 요청 가능'
                          : item.status === '6'
                          ? '인쇄 제작 요청 완료'
                          : item.status === '7'
                          ? '납품완료'
                          : item.status === '8'
                          ? '수령완료'
                          : item.status === '9'
                          ? '마감'
                          : null}
                      </Text>
                    </View>
                  ) : null}
                  {item.status === '1' && (
                    <Text
                      style={[
                        styles.normalText,
                        {fontSize: 13, marginLeft: 5, color: '#000000'},
                      ]}>
                      {item.ecnt}건
                    </Text>
                  )}
                  <Text
                    style={[
                      styles.normalText,
                      {fontSize: 13, marginLeft: 5, color: '#366DE5'},
                    ]}>
                    {item.new_yn === 'Y' ? 'NEW' : null}
                  </Text>
                </View>
                <Text style={styles.listTitle}>{item.title}</Text>
                <Text style={styles.listDesc}>{item.ca_name}</Text>
              </View>
              <View
                style={{
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                }}>
                {/* <Text style={styles.listStep02}>입찰중</Text> */}
                <Text style={styles.listDday02}>
                  {moment(item.edate).format('YY.MM.DD')}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.line} />
      </View>
    );
  };

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
              width: '59%',
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
                style={{
                  fontFamily: 'SCDream4',
                  width: '80%',
                  color: step01 ? '#000' : '#A2A2A2',
                }}
                editable={false}
                collapsable={true}
              />
              <Image
                source={
                  visibleStep01
                    ? require('../../../src/assets/arr01_top.png')
                    : require('../../../src/assets/arr01.png')
                }
                style={{width: 25, height: 25}}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              zIndex: 2000,
              position: 'relative',
              width: '39%',
              borderWidth: 1,
              borderColor: '#E3E3E3',
              borderTopRightRadius: 4,
              borderTopLeftRadius: 4,
              borderBottomRightRadius: visibleStep02 ? 0 : 4,
              borderBottomLeftRadius: visibleStep02 ? 0 : 4,
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
                style={{
                  fontFamily: 'SCDream4',
                  width: '80%',
                  color: step02 ? '#000' : '#A2A2A2',
                }}
                editable={false}
              />
              <Image
                source={
                  visibleStep02
                    ? require('../../../src/assets/arr01_top.png')
                    : require('../../../src/assets/arr01.png')
                }
                style={{width: 25, height: 25}}
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
          <TextInput
            value={keyword}
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
            onChangeText={(text) => setKeyword(text)}
            onSubmitEditing={() => searchForm()}
            autoCapitalize="none"
            keyboardType="ascii-capable"
          />
          <TouchableOpacity
            onPress={() => searchForm()}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#275696',
              borderRadius: 4,
              height: 50,
            }}>
            <Text
              style={[
                styles.normalText,
                {color: '#fff', paddingHorizontal: 20},
              ]}>
              검색
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* // 카테고리 선택 및 검색 부분 */}

      <View style={{zIndex: -1000, backgroundColor: '#fff'}}>
        {/* 리스트 출력 부분 */}

        <FlatList
          data={myOrders}
          nestedScrollEnabled={true}
          renderItem={renderRow}
          keyExtractor={(list, index) => index.toString()}
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
                height: Dimensions.get('window').height,
              }}>
              <Text style={{marginTop: -300, fontFamily: 'SCDream4'}}>
                견적 의뢰 건이 없습니다.
              </Text>
            </View>
          }
        />

        {/* // 리스트 출력 부분 */}
      </View>

      {visibleStep01 && (
        <ScrollView
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{zIndex: 1000}}
          style={{
            position: 'absolute',
            top: 126,
            left: 20,
            backgroundColor: '#fff',
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
              setStep01('전체');
              setStatus('');
              setVisibleStep01(false);
            }}>
            <Text style={{fontSize: 14, fontFamily: 'SCDream4'}}>전체</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 10,
            }}
            onPress={() => {
              setStep01('견적요청');
              setStatus('0');
              setVisibleStep01(false);
            }}>
            <Text style={{fontSize: 14, fontFamily: 'SCDream4'}}>견적요청</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 10,
            }}
            onPress={() => {
              setStep01('입찰중');
              setStatus('1');
              setVisibleStep01(false);
            }}>
            <Text style={{fontSize: 14, fontFamily: 'SCDream4'}}>입찰중</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 10,
            }}
            onPress={() => {
              setStep01('파트너최종선정(견적확정대기)');
              setStatus('2');
              setVisibleStep01(false);
            }}>
            <Text style={{fontSize: 14, fontFamily: 'SCDream4'}}>
              파트너최종선정(견적확정대기)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 10,
            }}
            onPress={() => {
              setStep01('파트너최종선정(계약금입금대기)');
              setStatus('3');
              setVisibleStep01(false);
            }}>
            <Text style={{fontSize: 14, fontFamily: 'SCDream4'}}>
              파트너최종선정(계약금입금대기)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 10,
            }}
            onPress={() => {
              setStep01('파트너최종선정(계약금입금완료)');
              setStatus('4');
              setVisibleStep01(false);
            }}>
            <Text style={{fontSize: 14, fontFamily: 'SCDream4'}}>
              파트너최종선정(계약금입금완료)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 10,
            }}
            onPress={() => {
              setStep01('인쇄제작요청가능');
              setStatus('5');
              setVisibleStep01(false);
            }}>
            <Text style={{fontSize: 14, fontFamily: 'SCDream4'}}>
              인쇄제작요청가능
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 10,
            }}
            onPress={() => {
              setStep01('인쇄제작요청완료');
              setStatus('6');
              setVisibleStep01(false);
            }}>
            <Text style={{fontSize: 14, fontFamily: 'SCDream4'}}>
              인쇄제작요청완료
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 10,
            }}
            onPress={() => {
              setStep01('납품완료');
              setStatus('7');
              setVisibleStep01(false);
            }}>
            <Text style={{fontSize: 14, fontFamily: 'SCDream4'}}>납품완료</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 10,
            }}
            onPress={() => {
              setStep01('수령완료');
              setStatus('8');
              setVisibleStep01(false);
            }}>
            <Text style={{fontSize: 14, fontFamily: 'SCDream4'}}>수령완료</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 10,
            }}
            onPress={() => {
              setStep01('마감');
              setStatus('9');
              setVisibleStep01(false);
            }}>
            <Text style={{fontSize: 14, fontFamily: 'SCDream4'}}>마감</Text>
          </TouchableOpacity>
        </ScrollView>
      )}

      {visibleStep02 && (
        <ScrollView
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{zIndex: 1000}}
          style={{
            position: 'absolute',
            top: 126,
            right: 20,
            backgroundColor: '#fff',
            width: '35.2%',
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
              setStep02('전체');
              setCate1('');
              setVisibleStep02(false);
            }}>
            <Text style={{fontSize: 14, fontFamily: 'SCDream4'}}>전체</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 10,
            }}
            onPress={() => {
              setStep02('패키지');
              setCate1('1');
              setVisibleStep02(false);
            }}>
            <Text style={{fontSize: 14, fontFamily: 'SCDream4'}}>패키지</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 10,
            }}
            onPress={() => {
              setStep02('일반인쇄물');
              setCate1('0');
              setVisibleStep02(false);
            }}>
            <Text style={{fontSize: 14, fontFamily: 'SCDream4'}}>
              일반인쇄물
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 10,
            }}
            onPress={() => {
              setStep02('기타인쇄물');
              setCate1('2');
              setVisibleStep02(false);
            }}>
            <Text style={{fontSize: 14, fontFamily: 'SCDream4'}}>
              기타인쇄물
            </Text>
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
    borderColor: '#275696',
    // borderColor: '#F5F5F5',
    borderRadius: 2,
    backgroundColor: '#275696',
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
