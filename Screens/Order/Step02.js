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

import { Picker } from '@react-native-community/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import 'moment/locale/ko';

import DetailHeader from '../Common/DetailHeader';
import Footer from '../Common/Footer';

const Step02 = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  const [category01, setCategory01] = React.useState(null);
  const [category02, setCategory02] = React.useState(null);
  const [value, setValue] = React.useState(null);

  const [order, setOrder] = React.useState('print');

  const setOrderDesign = (v) => {
    setOrder(v);
  };

  const [date, setDate] = React.useState(new Date());
  const [arriveDate, setArriveDate] = React.useState(new Date());
  const [dDayDate, setdDayDate] = React.useState(new Date());
  const [mode01, setMode01] = React.useState('date');
  const [mode02, setMode02] = React.useState('date');
  const [show01, setShow01] = React.useState(false);
  const [show02, setShow02] = React.useState(false);

  const onChange01 = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow01(Platform.OS === 'ios');

    if (selectedDate < date) {
      Alert.alert('오늘 이전 날짜는 선택이 불가능 합니다.', '날짜를 다시 선택해주세요.', [
        {
          text: '확인',
        },
      ]);
      setdDayDate(date);
    } else {
      setArriveDate(currentDate);
    }
  };

  const onChange02 = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow02(Platform.OS === 'ios');

    if (selectedDate < date) {
      Alert.alert('오늘 이전 날짜는 선택이 불가능 합니다.', '날짜를 다시 선택해주세요.', [
        {
          text: '확인',
        },
      ]);
      setdDayDate(date);
    } else {
      setdDayDate(currentDate);
    }
  };

  const showMode01 = (currentMode) => {
    setShow01(true);
    setMode01(currentMode);
  };

  const showMode02 = (currentMode) => {
    setShow02(true);
    setMode02(currentMode);
  };

  const showDatepicker01 = () => {
    showMode01('date');
  };

  const showDatepicker02 = () => {
    showMode02('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <>
      <DetailHeader title={routeName} navigation={navigation} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
          <View style={styles.profileBox}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 20 }}>기본 정보</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <Text style={[styles.profileTitle, { marginRight: 5 }]}>제작명</Text>
              <Text style={[styles.profileRequired]}>(필수)</Text>
            </View>
            <TextInput
              placeholder="제작명을 입력해주세요."
              placeholderTextColor="#A2A2A2"
              style={{
                borderWidth: 1,
                borderColor: '#E3E3E3',
                borderRadius: 4,
                paddingHorizontal: 10,
                marginBottom: 5,
              }}
              autoCapitalize="none"
            />
          </View>

          {/* 고객명  */}
          <View style={{ marginBottom: 20 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <Text style={[styles.profileTitle, { marginRight: 5 }]}>고객명</Text>
              <Text style={[styles.profileRequired]}>(필수)</Text>
            </View>
            <TextInput
              placeholder="고객명을 입력해주세요."
              placeholderTextColor="#A2A2A2"
              style={{
                borderWidth: 1,
                borderColor: '#E3E3E3',
                borderRadius: 4,
                paddingHorizontal: 10,
                marginBottom: 5,
              }}
              autoCapitalize="none"
            />
          </View>
          {/* // 고객명  */}

          {/* 휴대폰 번호  */}
          <View style={{ marginBottom: 20 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <Text style={[styles.profileTitle, { marginRight: 5 }]}>휴대폰 번호</Text>
              <Text style={[styles.profileRequired]}>(필수)</Text>
            </View>
            <TextInput
              placeholder="휴대폰 번호를 입력해주세요."
              placeholderTextColor="#A2A2A2"
              style={{
                borderWidth: 1,
                borderColor: '#E3E3E3',
                borderRadius: 4,
                paddingHorizontal: 10,
                marginBottom: 5,
              }}
              autoCapitalize="none"
            />
          </View>
          {/* // 휴대폰 번호  */}

          {/* 회사명  */}
          <View style={{ marginBottom: 20 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <Text style={[styles.profileTitle, { marginRight: 5 }]}>회사명</Text>
              <Text style={[styles.profileRequired, { color: '#707070' }]}>(선택)</Text>
            </View>
            <TextInput
              placeholder="회사명을 입력해주세요."
              placeholderTextColor="#A2A2A2"
              style={{
                borderWidth: 1,
                borderColor: '#E3E3E3',
                borderRadius: 4,
                paddingHorizontal: 10,
                marginBottom: 5,
              }}
              autoCapitalize="none"
            />
          </View>
          {/* // 회사명  */}

          {/* 디자인 의뢰  */}
          <View style={{ marginBottom: 25 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <Text style={[styles.profileTitle, { marginRight: 5 }]}>디자인 의뢰</Text>
              <Text style={[styles.profileRequired]}>(필수)</Text>
            </View>
            <View
              style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
              <TouchableOpacity
                activeOpacity={1}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                onPress={() => setOrderDesign('print')}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  marginRight: 50,
                }}>
                <Image
                  source={
                    order === 'print'
                      ? require('../../src/assets/radio_on.png')
                      : require('../../src/assets/radio_off.png')
                  }
                  resizeMode="contain"
                  style={{ width: 20, height: 20, marginRight: 5 }}
                />
                <Text style={{ fontSize: 14 }}>인쇄만 의뢰</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                onPress={() => setOrderDesign('design')}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                <Image
                  source={
                    order === 'design'
                      ? require('../../src/assets/radio_on.png')
                      : require('../../src/assets/radio_off.png')
                  }
                  resizeMode="contain"
                  style={{ width: 20, height: 20, marginRight: 5 }}
                />
                <Text style={{ fontSize: 14 }}>인쇄 + 디자인 의뢰</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* // 디자인 의뢰  */}

          {/* 입쇄 업체 선호 지역  */}
          <View style={{ marginBottom: 20 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <Text style={[styles.profileTitle, { marginRight: 5 }]}>입쇄 업체 선호 지역</Text>
              <Text style={[styles.profileRequired]}>(필수)</Text>
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#E3E3E3',
                borderRadius: 4,
                backgroundColor: '#fff',
              }}>
              <Picker
                selectedValue={category01} //제일 위 선택란에 누른 아이템이 표시된다
                onValueChange={(itemValue, itemIndex) => {
                  setCategory01(itemValue);
                }}
                style={{ color: '#A2A2A2' }}
                mode="dialog">
                <Picker.Item label="선호지역을 입력해주세요." value="" />
                <Picker.Item label="서울" value="1" />
                <Picker.Item label="부산" value="2" />
                <Picker.Item label="대구" value="3" />
                <Picker.Item label="인천" value="4" />
                <Picker.Item label="광주" value="5" />
                <Picker.Item label="세종/대전/청주" value="6" />
                <Picker.Item label="울산" value="7" />
                <Picker.Item label="경기" value="8" />
                <Picker.Item label="강원" value="9" />
                <Picker.Item label="충청" value="10" />
                <Picker.Item label="전라북도" value="11" />
                <Picker.Item label="전라남도" value="12" />
                <Picker.Item label="경상북도" value="13" />
                <Picker.Item label="경상남도" value="14" />
                <Picker.Item label="제주" value="15" />
              </Picker>
            </View>
          </View>
          {/* // 입쇄 업체 선호 지역  */}

          {/* 납품 희망일, 견적 마감일  */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 20,
            }}>
            <View style={{ width: '50%', paddingRight: 5 }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                <Text style={[styles.profileTitle, { marginRight: 5 }]}>납품 희망일</Text>
                <Text style={[styles.profileRequired]}>(필수)</Text>
              </View>
              <TouchableOpacity
                activeOpacity={1}
                onPress={showDatepicker01}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: '#E3E3E3',
                  borderRadius: 4,
                  marginBottom: 5,
                }}>
                <TextInput
                  value={moment(arriveDate).format('YY-MM-DD')}
                  placeholder="00-00-00"
                  placeholderTextColor="#A2A2A2"
                  style={{
                    paddingHorizontal: 10,
                    width: '70%',
                  }}
                  autoCapitalize="none"
                  editable={false}
                />
                <Image
                  source={require('../../src/assets/icon03.png')}
                  resizeMode="contain"
                  style={{ width: 30, height: 30, marginRight: 10 }}
                />
              </TouchableOpacity>
            </View>
            {show01 && (
              <DateTimePicker
                testID="dateTimePicker01"
                value={arriveDate}
                mode={mode01}
                is24Hour={true}
                display="default"
                onChange={onChange01}
              />
            )}
            <View style={{ width: '50%', paddingLeft: 5 }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                <Text style={[styles.profileTitle, { marginRight: 5 }]}>견적 마감일</Text>
                <Text style={[styles.profileRequired]}>(필수)</Text>
              </View>
              <TouchableOpacity
                activeOpacity={1}
                onPress={showDatepicker02}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: '#E3E3E3',
                  borderRadius: 4,
                  marginBottom: 5,
                }}>
                <TextInput
                  value={moment(dDayDate).format('YY-MM-DD')}
                  placeholder="00-00-00"
                  placeholderTextColor="#A2A2A2"
                  style={{
                    paddingHorizontal: 10,
                    width: '70%',
                  }}
                  autoCapitalize="none"
                  editable={false}
                />
                <Image
                  source={require('../../src/assets/icon03.png')}
                  resizeMode="contain"
                  style={{ width: 30, height: 30, marginRight: 10 }}
                />
              </TouchableOpacity>
            </View>
            {show02 && (
              <DateTimePicker
                testID="dateTimePicker02"
                value={dDayDate}
                mode={mode02}
                is24Hour={true}
                display="default"
                onChange={onChange02}
              />
            )}
          </View>
          {/* // 납품 희망일, 견적 마감일  */}

          {/* 파일 첨부  */}
          <View style={{ marginBottom: 20 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <Text style={[styles.profileTitle, { marginRight: 5 }]}>파일 첨부</Text>
              <Text style={[styles.profileRequired, { color: '#707070' }]}>(선택)</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginBottom: 5,
              }}>
              <TextInput
                value=""
                placeholder="파일을 선택해주세요."
                placeholderTextColor="#A2A2A2"
                style={{
                  flex: 1,
                  borderWidth: 1,
                  borderColor: '#E3E3E3',
                  borderRadius: 4,
                  paddingHorizontal: 10,
                  marginRight: 10,
                }}
                editable={false}
              />
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#275696',
                  borderRadius: 4,
                  height: 50,
                  paddingHorizontal: 20,
                }}>
                <Text style={{ color: '#fff', textAlign: 'center' }}>파일 선택</Text>
              </TouchableOpacity>
            </View>
            <Text style={{ fontSize: 13, color: '#366DE5' }}>
              * 인쇄/패키지 제작에 참고 할 수 있는 자료가 있다면 첨부해주세요.
            </Text>
          </View>
          {/* // 파일 첨부  */}

          {/* 메모  */}
          <View style={{ marginBottom: 20 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <Text style={[styles.profileTitle, { marginRight: 5 }]}>메모</Text>
              <Text style={[styles.profileRequired, { color: '#707070' }]}>(선택)</Text>
            </View>
            <TextInput
              placeholder="메모를 입력해주세요."
              placeholderTextColor="#A2A2A2"
              style={{
                borderRadius: 5,
                backgroundColor: '#F5F5F5',
                height: 120,
                flex: 1,
                textAlignVertical: 'top',
                paddingLeft: 10,
                paddingVertical: 10,
              }}
              multiline={true}
            />
          </View>
          {/* // 메모  */}
        </View>

        {/* 이전, 다음 버튼 부분 (Prev, Next) */}
        <View style={{ paddingHorizontal: 20 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#E3E3E3',
              borderRadius: 5,
              backgroundColor: '#fff',
              marginBottom: 20,
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
                  style={{
                    fontSize: 14,
                    color: '#707070',
                    letterSpacing: -1,
                  }}>
                  이전
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <View style={{ borderWidth: 0.5, height: '100%', borderColor: '#E3E3E3' }} />
            <TouchableWithoutFeedback onPress={() => navigation.navigate('OrderStep03')}>
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
                  style={{
                    fontSize: 14,
                    letterSpacing: -1,
                  }}>
                  다음
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
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
  profileBox: {
    marginBottom: 20,
  },
  profileTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#111',
  },
  profileRequired: {
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
});

export default Step02;
