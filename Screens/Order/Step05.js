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
} from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';

import DetailHeader from '../Common/DetailHeader';
import Footer from '../Common/Footer';

const Step05 = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  //  지류 선택
  const [paper, setPaper] = React.useState('normal');

  const setPaperChoise = (v) => {
    setPaper(v);
  };

  //  고급지 일 경우 - 지종 선택
  const [paperType, setPaperType] = React.useState('지종 선택');

  const setPaperTypeChoise = (v) => {
    setPaperType(v);
  };

  //  고급지 일 경우 - 지종 선택 - 세부 선택
  const [paperTypeDetail, setPaperTypeDetail] = React.useState('세부 선택');

  const setPaperTypeDetailChoise = (v) => {
    setPaperTypeDetail(v);
  };

  //  고급지 일 경우 - 평량
  const [weight, setWeight] = React.useState('평량 선택');

  const setWeightChoise = (v) => {
    setWeight(v);
  };

  //  인쇄도수
  const [print, setPrint] = React.useState('도수 선택');

  const setPrintColor = (v) => {
    setPrint(v);
  };

  //  인쇄교정
  const [color, setColor] = React.useState('y');

  const setColorChoise = (v) => {
    setColor(v);
  };

  //  인쇄감리
  const [check, setCheck] = React.useState('y');

  const setCheckChoise = (v) => {
    setCheck(v);
  };

  return (
    <>
      <DetailHeader title={routeName} navigation={navigation} />

      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          paddingHorizontal: 20,
          paddingVertical: 20,
          backgroundColor: '#fff',
        }}>
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          <View style={styles.wrap}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={[styles.boldText, { fontSize: 16, color: '#000000' }]}>지류 선택</Text>
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

          <View style={styles.wrap}>
            {/* 지류 선택  */}
            <View style={{ marginBottom: paper === 'normal' ? 40 : 25 }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                <Text style={[styles.profileTitle, { marginRight: 5 }]}>구분</Text>
                {/* <Text style={[styles.profileRequired]}>(필수)</Text> */}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  activeOpacity={1}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  onPress={() => setPaperChoise('normal')}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginRight: 20,
                  }}>
                  <Image
                    source={
                      paper === 'normal'
                        ? require('../../src/assets/radio_on.png')
                        : require('../../src/assets/radio_off.png')
                    }
                    resizeMode="contain"
                    style={{ width: 20, height: 20, marginRight: 5 }}
                  />
                  <Text style={[styles.normalText, { fontSize: 14 }]}>일반(백판지,마닐라류)</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={1}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  onPress={() => setPaperChoise('premium')}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={
                      paper === 'premium'
                        ? require('../../src/assets/radio_on.png')
                        : require('../../src/assets/radio_off.png')
                    }
                    resizeMode="contain"
                    style={{ width: 20, height: 20, marginRight: 5 }}
                  />
                  <Text style={[styles.normalText, { fontSize: 14 }]}>고급(특수지,CCP류)</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* // 지류 선택  */}

            {/* 지종 선택 -- 고급일 경우에만  */}
            {paper === 'premium' && (
              <View style={{ marginBottom: 40 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginBottom: 10,
                  }}>
                  <Text style={[styles.profileTitle, { marginRight: 5 }]}>지종</Text>
                  {/* <Text style={[styles.profileRequired]}>(필수)</Text> */}
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: paperType === 'direct' ? 0 : 25,
                  }}>
                  <View style={{ width: '49%' }}>
                    <DropDownPicker
                      placeholder={'지종 선택'}
                      placeholderStyle={{ fontSize: 14, color: '#A2A2A2', fontWeight: '400' }}
                      activeLabelStyle={{ color: '#000' }}
                      activeItemStyle={{ color: '#000' }}
                      selectedLabelStyle={{ color: '#000' }}
                      value={paperType}
                      items={[
                        { label: 'CCP지', value: 'CCP지' },
                        { label: '친환경 용지', value: '친환경 용지' },
                        { label: '크라프트', value: '크라프트' },
                        { label: '특수지(국산)', value: '특수지(국산)' },
                        { label: '특수지(수입)', value: '특수지(수입)' },
                        { label: '직접입력', value: 'direct' },
                      ]}
                      containerStyle={{ height: 50 }}
                      style={{
                        backgroundColor: '#fff',
                        borderTopRightRadius: 4,
                        borderTopLeftRadius: 4,
                        borderBottomRightRadius: 4,
                        borderBottomLeftRadius: 4,
                      }}
                      itemStyle={{
                        justifyContent: 'flex-start',
                        paddingVertical: 10,
                      }}
                      labelStyle={{ fontFamily: 'SCDream4', color: '#A2A2A2' }}
                      dropDownStyle={{ backgroundColor: '#fff' }}
                      onChangeItem={(item) => setPaperTypeChoise(item.value)}
                      customArrowDown={() => (
                        <Image
                          source={require('../../src/assets/arr01.png')}
                          style={{ width: 25, height: 25 }}
                          resizeMode="contain"
                        />
                      )}
                      customArrowUp={() => (
                        <Image
                          source={require('../../src/assets/arr01_top.png')}
                          style={{ width: 25, height: 25 }}
                          resizeMode="contain"
                        />
                      )}
                    />
                  </View>
                  <View style={{ width: '49%' }}>
                    <DropDownPicker
                      placeholder={'세부 선택'}
                      placeholderStyle={{ fontSize: 14, color: '#A2A2A2', fontWeight: '400' }}
                      activeLabelStyle={{ color: '#000' }}
                      activeItemStyle={{ color: '#000' }}
                      selectedLabelStyle={{ color: '#000' }}
                      value={paperType === 'direct' ? '없음' : paperTypeDetail}
                      items={[
                        { label: '세부 선택01', value: '세부 선택01' },
                        { label: '세부 선택02', value: '세부 선택02' },
                        { label: '세부 선택03', value: '세부 선택03' },
                        { label: '없음', value: '없음' },
                      ]}
                      containerStyle={{ height: 50 }}
                      style={{
                        backgroundColor: '#fff',
                        borderTopRightRadius: 4,
                        borderTopLeftRadius: 4,
                        borderBottomRightRadius: 4,
                        borderBottomLeftRadius: 4,
                      }}
                      itemStyle={{
                        justifyContent: 'flex-start',
                        paddingVertical: 10,
                      }}
                      labelStyle={{ fontFamily: 'SCDream4', color: '#A2A2A2' }}
                      dropDownStyle={{ backgroundColor: '#fff' }}
                      onChangeItem={(item) => setPaperTypeDetailChoise(item.value)}
                      customArrowDown={() => (
                        <Image
                          source={require('../../src/assets/arr01.png')}
                          style={{ width: 25, height: 25 }}
                          resizeMode="contain"
                        />
                      )}
                      customArrowUp={() => (
                        <Image
                          source={require('../../src/assets/arr01_top.png')}
                          style={{ width: 25, height: 25 }}
                          resizeMode="contain"
                        />
                      )}
                    />
                  </View>
                </View>
                {paperType === 'direct' && (
                  <TextInput
                    value=""
                    placeholder="지종을 직접 입력해주세요."
                    placeholderTextColor="#A2A2A2"
                    style={[
                      styles.normalText,
                      {
                        borderWidth: 1,
                        borderColor: '#E3E3E3',
                        borderRadius: 4,
                        paddingHorizontal: 10,
                        marginTop: 5,
                        marginBottom: 25,
                      },
                    ]}
                    autoCapitalize="none"
                  />
                )}

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginBottom: 10,
                  }}>
                  <Text style={[styles.profileTitle, { marginRight: 5 }]}>평량</Text>
                  {/* <Text style={[styles.profileRequired]}>(필수)</Text> */}
                </View>
                <View style={{ width: '49%' }}>
                  <DropDownPicker
                    placeholder={'평량 선택'}
                    placeholderStyle={{ fontSize: 14, color: '#A2A2A2', fontWeight: '400' }}
                    activeLabelStyle={{ color: '#000' }}
                    activeItemStyle={{ color: '#000' }}
                    selectedLabelStyle={{ color: '#000' }}
                    value={weight}
                    items={[
                      { label: '평량01', value: '평량01' },
                      { label: '평량02', value: '평량02' },
                      { label: '평량03', value: '평량03' },
                      { label: '평량04', value: '평량04' },
                      { label: '평량05', value: '평량05' },
                    ]}
                    containerStyle={{ height: 50 }}
                    style={{
                      backgroundColor: '#fff',
                      borderTopRightRadius: 4,
                      borderTopLeftRadius: 4,
                      borderBottomRightRadius: 4,
                      borderBottomLeftRadius: 4,
                    }}
                    itemStyle={{
                      justifyContent: 'flex-start',
                      paddingVertical: 10,
                    }}
                    labelStyle={{ fontFamily: 'SCDream4', color: '#A2A2A2' }}
                    dropDownStyle={{ backgroundColor: '#fff' }}
                    onChangeItem={(item) => setWeightChoise(item.value)}
                    customArrowDown={() => (
                      <Image
                        source={require('../../src/assets/arr01.png')}
                        style={{ width: 25, height: 25 }}
                        resizeMode="contain"
                      />
                    )}
                    customArrowUp={() => (
                      <Image
                        source={require('../../src/assets/arr01_top.png')}
                        style={{ width: 25, height: 25 }}
                        resizeMode="contain"
                      />
                    )}
                  />
                </View>
              </View>
            )}
            {/* // 지종 선택 -- 고급일 경우에만  */}

            {/* 인쇄 도수  */}
            <View style={{ marginBottom: 20 }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                <Text
                  style={[styles.boldText, { fontSize: 16, color: '#000000', marginBottom: 10 }]}>
                  인쇄도수/교정/감리 선택
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                <Text style={[styles.profileTitle, { marginRight: 5 }]}>인쇄도수</Text>
                {/* <Text style={[styles.profileRequired]}>(필수)</Text> */}
              </View>
              <DropDownPicker
                placeholder={'도수 선택'}
                placeholderStyle={{ fontSize: 14, color: '#A2A2A2', fontWeight: '400' }}
                activeLabelStyle={{ color: '#000' }}
                activeItemStyle={{ color: '#000' }}
                selectedLabelStyle={{ color: '#000' }}
                value={print}
                items={[
                  { label: '(전면) 1도', value: '(전면) 1도' },
                  { label: '(전면) 4도', value: '(전면) 4도' },
                  { label: '(전면) 4도 + 별색 1도', value: '(전면) 4도 + 별색 1도' },
                  { label: '(전면) 4도 + (후면) 1도', value: '(전면) 4도 + (후면) 1도' },
                  {
                    label: '(전면) 4도 + 별색 1도 + (후면) 1도',
                    value: '(전면) 4도 + 별색 1도 + (후면) 1도',
                  },
                  { label: '(전면) 별색 1도', value: '(전면) 별색 1도' },
                  { label: '(전면) 별색 2도', value: '(전면) 별색 2도' },
                  { label: '인쇄없음', value: '인쇄없음' },
                ]}
                containerStyle={{ height: 50 }}
                style={{
                  backgroundColor: '#fff',
                  borderTopRightRadius: 4,
                  borderTopLeftRadius: 4,
                  borderBottomRightRadius: 4,
                  borderBottomLeftRadius: 4,
                }}
                itemStyle={{
                  justifyContent: 'flex-start',
                  paddingVertical: 10,
                }}
                labelStyle={{ fontFamily: 'SCDream4', color: '#A2A2A2' }}
                dropDownStyle={{ backgroundColor: '#fff' }}
                onChangeItem={(item) => setPrintColor(item.value)}
                customArrowDown={() => (
                  <Image
                    source={require('../../src/assets/arr01.png')}
                    style={{ width: 25, height: 25 }}
                    resizeMode="contain"
                  />
                )}
                customArrowUp={() => (
                  <Image
                    source={require('../../src/assets/arr01_top.png')}
                    style={{ width: 25, height: 25 }}
                    resizeMode="contain"
                  />
                )}
              />
            </View>
            {/* // 인쇄 도수  */}

            {/* 인쇄 교정  */}
            <View style={{ marginBottom: 25 }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                <Text style={[styles.profileTitle, { marginRight: 5 }]}>인쇄교정</Text>
                {/* <Text style={[styles.profileRequired]}>(필수)</Text> */}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  activeOpacity={1}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  onPress={() => setColorChoise('y')}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginRight: 20,
                  }}>
                  <Image
                    source={
                      color === 'y'
                        ? require('../../src/assets/radio_on.png')
                        : require('../../src/assets/radio_off.png')
                    }
                    resizeMode="contain"
                    style={{ width: 20, height: 20, marginRight: 5 }}
                  />
                  <Text style={[styles.normalText, { fontSize: 14 }]}>있음</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={1}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  onPress={() => setColorChoise('n')}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={
                      color === 'n'
                        ? require('../../src/assets/radio_on.png')
                        : require('../../src/assets/radio_off.png')
                    }
                    resizeMode="contain"
                    style={{ width: 20, height: 20, marginRight: 5 }}
                  />
                  <Text style={[styles.normalText, { fontSize: 14 }]}>없음</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* // 인쇄 교정  */}

            {/* 인쇄 감리  */}
            <View style={{ marginBottom: 25 }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                <Text style={[styles.profileTitle, { marginRight: 5 }]}>인쇄감리</Text>
                {/* <Text style={[styles.profileRequired]}>(필수)</Text> */}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  activeOpacity={1}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  onPress={() => setCheckChoise('y')}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginRight: 20,
                  }}>
                  <Image
                    source={
                      check === 'y'
                        ? require('../../src/assets/radio_on.png')
                        : require('../../src/assets/radio_off.png')
                    }
                    resizeMode="contain"
                    style={{ width: 20, height: 20, marginRight: 5 }}
                  />
                  <Text style={[styles.normalText, { fontSize: 14 }]}>있음</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={1}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  onPress={() => setCheckChoise('n')}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={
                      check === 'n'
                        ? require('../../src/assets/radio_on.png')
                        : require('../../src/assets/radio_off.png')
                    }
                    resizeMode="contain"
                    style={{ width: 20, height: 20, marginRight: 5 }}
                  />
                  <Text style={[styles.normalText, { fontSize: 14 }]}>없음</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* // 인쇄 감리  */}
          </View>
        </ScrollView>

        <View style={{ width: '100%' }}>
          {/* 이전, 다음 버튼 부분 (Prev, Next) */}
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: '#E3E3E3',
                borderRadius: 5,
                backgroundColor: '#fff',
                marginBottom: 0,
              }}>
              <View style={{ borderWidth: 0.5, height: '100%', borderColor: '#E3E3E3' }} />
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
                    style={{ width: 16, height: 16, marginRight: 7 }}
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
              <View style={{ borderWidth: 0.5, height: '100%', borderColor: '#E3E3E3' }} />
              <TouchableWithoutFeedback onPress={() => navigation.navigate('OrderStep06')}>
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
                    style={{ width: 16, height: 16, marginLeft: 7 }}
                  />
                  <Text
                    style={[
                      styles.normalText,
                      {
                        fontSize: 14,
                        letterSpacing: -1,
                      },
                    ]}>
                    다음
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
          {/* // 이전, 다음 버튼 부분 (Prev, Next) */}
        </View>
      </View>
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
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  profileBox: {
    marginBottom: 10,
  },
  profileTitle: {
    fontFamily: 'SCDream5',
    fontSize: 15,
    color: '#111',
  },
  profileRequired: {
    fontFamily: 'SCDream4',
    fontSize: 14,
    color: '#366DE5',
  },
  profileDesc: {
    fontSize: 15,
    lineHeight: 16,
    color: '#111',
  },
  prevNextBtn: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 4,
    backgroundColor: '#fff',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  prevNextBtnText: {
    fontSize: 16,
    color: '#111',
    textAlign: 'center',
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
  picker: {
    width: 180,
  },
  listWrap: {
    paddingVertical: 20,
  },
  listTitle: {
    fontSize: 14,
    lineHeight: 19,
    marginBottom: 5,
  },
  listDesc: {
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
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#E3E3E3',
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

export default Step05;
