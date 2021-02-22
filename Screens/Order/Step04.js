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
  ImageBackground,
} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import {useSelector, useDispatch} from 'react-redux';

import DetailHeader from '../Common/DetailHeader';
import Modal from './easyOrderModal';
import {
  setUserPwidth,
  setUserPlength,
  setUserPheight,
  setUserCnt,
  setUserCntEtc,
  setUserWoodPattern,
  setUserEasyYn,
} from '../../Modules/OrderReducer';

const Step04 = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  const {type_details} = useSelector((state) => state.OrderHandlerReducer);
  const dispatch = useDispatch();

  const [type, setType] = React.useState('');

  const checkType = (v) => {
    setType(v);
  };

  const [getQuantity, setGetQuantity] = React.useState([]);

  React.useEffect(() => {
    setGetQuantity(type_details[0].making_cnt);
  }, []);

  const goEasyComplete = async () => {
    await setModalVisible(!isModalVisible);
    await navigation.navigate('easyOrderComplete');
  };

  const [pWidth, setPwidth] = React.useState(null);
  const [pLength, setPlength] = React.useState(null);
  const [pHeight, setPheight] = React.useState(null);
  const [quantity, setQuantity] = React.useState(null);
  const [quantityDirect, setQuantityDirect] = React.useState(null);
  const setOrderQuantity = (v) => {
    setQuantity(v);
  };

  const [pattern, setPattern] = React.useState(true);
  const setIsPattern = (b) => {
    setPattern(b);
  };

  // 간단 견적 전 모달
  const [isModalVisible, setModalVisible] = React.useState(false);

  const toggleModal = () => {
    dispatch(setUserPwidth(pWidth));
    dispatch(setUserPlength(pLength));
    dispatch(setUserPheight(pHeight));

    if (quantity !== 'direct') {
      dispatch(setUserCnt(quantity));
    } else {
      dispatch(setUserCntEtc(quantityDirect));
    }

    if (pattern) {
      dispatch(setUserWoodPattern('Y'));
    } else {
      dispatch(setUserWoodPattern('N'));
    }

    // dispatch(setUserEasyYn('Y'))

    setModalVisible(!isModalVisible);
  };

  return (
    <>
      <Modal
        isVisible={isModalVisible}
        toggleModal={toggleModal}
        goEasyComplete={goEasyComplete}
      />
      <DetailHeader title={routeName} navigation={navigation} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.wrap}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <Text style={[styles.boldText, {fontSize: 16, color: '#000000'}]}>
              제작 정보
            </Text>
            {/* <TouchableOpacity
              activeOpacity={0.8}
              onPress={toggleModal}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Text style={[styles.normalText, { fontSize: 13, color: '#366DE5' }]}>
                *이전 단계 입력 내용 자동 저장
              </Text>
            </TouchableOpacity> */}
          </View>
        </View>

        {/* 가로 규격 */}
        <View style={[styles.wrap]}>
          <View
            style={[
              styles.details,
              {
                marginBottom: 10,
              },
            ]}>
            <Text
              style={[
                styles.mediumText,
                {fontSize: 15, color: '#000000', marginRight: 5},
              ]}>
              가로 규격
            </Text>
            <Text style={[styles.normalText, {fontSize: 14, color: '#000000'}]}>
              (mm)
            </Text>
          </View>
          <TextInput
            value={pWidth}
            placeholder="예) 10"
            placeholderTextColor="#A2A2A2"
            style={[
              styles.normalText,
              {
                borderWidth: 1,
                borderColor: '#E3E3E3',
                borderRadius: 4,
                paddingHorizontal: 10,
              },
            ]}
            onChangeText={(text) => setPwidth(text)}
            autoCapitalize="none"
            keyboardType="number-pad"
          />
        </View>
        {/* // 가로 규격 */}

        {/* 세로 규격 */}
        <View style={[styles.wrap]}>
          <View
            style={[
              styles.details,
              {
                marginBottom: 10,
              },
            ]}>
            <Text
              style={[
                styles.mediumText,
                {fontSize: 15, color: '#000000', marginRight: 5},
              ]}>
              세로 규격
            </Text>
            <Text style={[styles.normalText, {fontSize: 14, color: '#000000'}]}>
              (mm)
            </Text>
          </View>
          <TextInput
            value={pLength}
            placeholder="예) 10"
            placeholderTextColor="#A2A2A2"
            style={[
              styles.normalText,
              {
                borderWidth: 1,
                borderColor: '#E3E3E3',
                borderRadius: 4,
                paddingHorizontal: 10,
              },
            ]}
            onChangeText={(text) => setPlength(text)}
            autoCapitalize="none"
            keyboardType="number-pad"
          />
        </View>
        {/* // 세로 규격 */}

        {/* 높이 규격 */}
        <View style={[styles.wrap]}>
          <View
            style={[
              styles.details,
              {
                marginBottom: 10,
              },
            ]}>
            <Text
              style={[
                styles.mediumText,
                {fontSize: 15, color: '#000000', marginRight: 5},
              ]}>
              높이 규격
            </Text>
            <Text style={[styles.normalText, {fontSize: 14, color: '#000000'}]}>
              (mm)
            </Text>
          </View>
          <TextInput
            value={pHeight}
            placeholder="예) 10"
            placeholderTextColor="#A2A2A2"
            style={[
              styles.normalText,
              {
                borderWidth: 1,
                borderColor: '#E3E3E3',
                borderRadius: 4,
                paddingHorizontal: 10,
              },
            ]}
            onChangeText={(text) => setPheight(text)}
            autoCapitalize="none"
            keyboardType="number-pad"
          />
        </View>
        {/* // 높이 규격 */}

        {/* 수량 */}
        <View style={[styles.wrap]}>
          <View
            style={[
              styles.details,
              {
                marginBottom: 10,
              },
            ]}>
            <Text
              style={[
                styles.mediumText,
                {fontSize: 15, color: '#000000', marginRight: 5},
              ]}>
              수량
            </Text>
          </View>

          <View
            style={[
              styles.details,
              {
                marginBottom: 15,
              },
            ]}>
            {getQuantity
              ? getQuantity.map((q, idx) => (
                  <TouchableOpacity
                    key={idx}
                    activeOpacity={1}
                    hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                    onPress={() => setOrderQuantity(q)}
                    style={[
                      styles.details,
                      {
                        marginRight: 20,
                      },
                    ]}>
                    <Image
                      source={
                        quantity === q
                          ? require('../../src/assets/radio_on.png')
                          : require('../../src/assets/radio_off.png')
                      }
                      resizeMode="contain"
                      style={{width: 20, height: 20, marginRight: 5}}
                    />
                    <Text
                      style={[
                        styles.normalText,
                        {fontSize: 14, color: '#000'},
                      ]}>
                      {q}
                    </Text>
                  </TouchableOpacity>
                ))
              : null}
          </View>
          <View>
            <TouchableOpacity
              activeOpacity={1}
              hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
              onPress={() => setOrderQuantity('direct')}
              style={[
                styles.details,
                {
                  marginBottom: 10,
                },
              ]}>
              <Image
                source={
                  quantity === 'direct'
                    ? require('../../src/assets/radio_on.png')
                    : require('../../src/assets/radio_off.png')
                }
                resizeMode="contain"
                style={{width: 20, height: 20, marginRight: 5}}
              />
              <Text style={[styles.normalText, {fontSize: 14, color: '#000'}]}>
                직접 입력
              </Text>
            </TouchableOpacity>
            <TextInput
              value={quantityDirect}
              placeholder="직접 입력해주세요."
              placeholderTextColor="#A2A2A2"
              onChangeText={(text) => setQuantityDirect(text)}
              onFocus={() => {
                setQuantity('direct');
              }}
              style={[
                styles.normalText,
                {
                  borderWidth: 1,
                  borderColor: '#E3E3E3',
                  borderRadius: 4,
                  paddingHorizontal: 10,
                },
              ]}
              autoCapitalize="none"
              keyboardType="number-pad"
            />
          </View>
        </View>
        {/* // 수량 */}

        {/* 목형 */}
        <View style={[styles.wrap, {marginBottom: 25}]}>
          <View
            style={[
              styles.details,
              {
                marginBottom: 10,
              },
            ]}>
            <Text style={{fontSize: 15, color: '#000000', marginRight: 5}}>
              목형
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => setIsPattern(true)}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: pattern ? '#275696' : '#E3E3E3',
                borderRadius: 4,
                backgroundColor: '#fff',
                width: '49%',
                paddingVertical: 15,
              }}>
              <Text
                style={[
                  pattern ? styles.mediumText : styles.normalText,
                  {
                    fontSize: 14,
                    color: pattern ? '#275696' : '#A2A2A2',
                  },
                ]}>
                있음
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => setIsPattern(false)}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: !pattern ? '#275696' : '#E3E3E3',
                borderRadius: 4,
                backgroundColor: '#fff',
                width: '49%',
                paddingVertical: 15,
              }}>
              <Text
                style={[
                  !pattern ? styles.mediumText : styles.normalText,
                  {
                    fontSize: 14,
                    color: !pattern ? '#275696' : '#A2A2A2',
                  },
                ]}>
                없음
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* // 목형 */}

        <View style={{paddingHorizontal: 20}}>
          <TouchableOpacity onPress={toggleModal} activeOpacity={0.8}>
            <View style={[styles.submitBtn, {marginBottom: 10}]}>
              <Text style={styles.submitBtnText}>간단 견적 제출</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* 이전, 다음 버튼 부분 (Prev, Next) */}
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
              marginBottom: 35,
            }}>
            <View
              style={{borderWidth: 0.5, height: '100%', borderColor: '#E3E3E3'}}
            />
            <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 15,
                }}>
                <Image
                  source={require('../../src/assets/prevUnActiveArrow.png')}
                  resizeMode="contain"
                  style={{width: 16, height: 16, marginRight: 7}}
                />
                <Text
                  style={[
                    styles.normalText,
                    {
                      fontSize: 14,
                      color: '#707070',
                      letterSpacing: -1,
                    },
                  ]}>
                  이전
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <View
              style={{borderWidth: 0.5, height: '100%', borderColor: '#E3E3E3'}}
            />
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('OrderStep05')}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row-reverse',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 15,
                }}>
                <Image
                  source={require('../../src/assets/nextActiveArrow.png')}
                  resizeMode="contain"
                  style={{width: 16, height: 16, marginLeft: 7}}
                />
                <Text
                  style={[
                    styles.normalText,
                    {
                      fontSize: 14,
                      letterSpacing: -1,
                    },
                  ]}>
                  세부 견적 작성
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
        {/* 간단 견적 제출시 안내 멘트 - 하단 */}
        <View style={{backgroundColor: '#F5F5F5'}}>
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 30,
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
            }}>
            <Text
              style={[
                styles.normalText,
                {
                  fontSize: 12,
                  color: '#707070',
                  lineHeight: 18,
                  marginRight: 5,
                },
              ]}>
              -
            </Text>
            <Text
              style={[
                styles.normalText,
                {fontSize: 12, color: '#707070', lineHeight: 18},
              ]}>
              간단 견적 제출 시, 최고관리자가 확인 및 추가 입력 후, 입찰할
              파트너스 회원들을 지정
            </Text>
          </View>
        </View>
        {/* // 간단 견적 제출시 안내 멘트 - 하단 */}
        {/* // 이전, 다음 버튼 부분 (Prev, Next) */}
      </ScrollView>
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

  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#E3E3E3',
    marginVertical: 20,
  },
  details: {
    fontFamily: 'SCDream4',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  detailsTitle: {
    fontFamily: 'SCDream4',
    width: 70,
    fontSize: 14,
    color: '#979797',
  },
  detailsDesc: {
    fontFamily: 'SCDream4',
    fontSize: 14,
    color: '#000',
  },
  submitBtn: {
    borderRadius: 5,
    backgroundColor: '#275696',
    width: '100%',
    paddingVertical: 15,
  },
  submitBtnText: {
    fontFamily: 'SCDream5',
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
    fontFamily: 'SCDream4',
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
    position: 'relative',
    top: 0,
    left: 0,
    width: 120,
    height: 120,
    borderRadius: 100,
    backgroundColor: '#DFE6EF',
  },
  categoryItemImgHover: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  categoryItemText: {
    fontFamily: 'SCDream4',
    width: 100,
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 18,
    color: '#000',
    marginTop: 10,
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

export default Step04;
