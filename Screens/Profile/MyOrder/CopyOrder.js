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
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import 'moment/locale/ko';

import DetailHeader from '../../Common/DetailHeader';
import Modal from './CancelModal';

const CopyOrder = (props) => {
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
      <Modal
        isVisible={isModalVisible}
        toggleModal={toggleModal}
        goCancelOrder={goCancelOrder}
        navigation={navigation}
      />
      <DetailHeader title={routeName} navigation={navigation} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#EFF6FF',
            paddingVertical: 25,
          }}>
          <Image
            source={require('../../../src/assets/icon_bikkuri_blue.png')}
            resizeMode="contain"
            style={{ width: 30, height: 30, marginBottom: 12 }}
          />
          <Text style={[styles.normalText, { fontSize: 14, color: '#275696', marginBottom: 2 }]}>
            견적 내용을 확인 하신 후, 변경하실 정보를 입력해주세요.
          </Text>
          <Text style={[styles.normalText, { fontSize: 14, color: '#275696' }]}>
            재접수를 하시면 기존 입찰 업체는 모두 사라집니다.
          </Text>
        </View>
        <View style={styles.wrap}>
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.9}>
            <View style={[styles.cancelBtn, { marginTop: 10, marginBottom: 5 }]}>
              <Text style={styles.cancelBtnText}>계약 포기 취소</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('CancelOrder')} activeOpacity={0.9}>
            <View style={[styles.submitBtn]}>
              <Text style={styles.submitBtnText}>최종 선택 포기</Text>
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
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 20,
              }}>
              <Text style={[styles.orderInfoTitle, { marginRight: 10 }]}>기존 정보</Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('OrderDetail')}
                style={{ alignSelf: 'flex-end' }}>
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

            {/* 제목 */}
            <View style={{ marginBottom: 15 }}>
              <Text style={[styles.profileTitle, { marginBottom: 7 }]}>제목</Text>
              <TextInput
                placeholder="중소기업 선물용 쇼핑백 제작 요청합니다."
                placeholderTextColor="#000000"
                style={[
                  styles.normalText,
                  {
                    borderWidth: 1,
                    borderColor: '#E3E3E3',
                    borderRadius: 4,
                    paddingHorizontal: 10,
                    marginBottom: 5,
                  },
                ]}
                autoCapitalize="none"
              />
            </View>
            {/* // 제목 */}

            {/* 분류 */}
            <View style={{ marginBottom: 15 }}>
              <Text style={[styles.profileTitle, { marginBottom: 7 }]}>분류</Text>
              <TextInput
                placeholder="단상자/선물세트/쇼핑백"
                placeholderTextColor="#000000"
                style={[
                  styles.normalText,
                  {
                    borderWidth: 1,
                    borderColor: '#E3E3E3',
                    borderRadius: 4,
                    paddingHorizontal: 10,
                    marginBottom: 5,
                  },
                ]}
                autoCapitalize="none"
              />
            </View>
            {/* // 분류 */}

            {/* 납품 희망일 */}
            <View style={{ marginBottom: 15 }}>
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
                  marginBottom: 2,
                }}>
                <TextInput
                  value={moment(arriveDate).format('YY-MM-DD')}
                  placeholder="00-00-00"
                  placeholderTextColor="#A2A2A2"
                  style={[
                    styles.normalText,
                    {
                      paddingHorizontal: 10,
                      width: '70%',
                    },
                  ]}
                  autoCapitalize="none"
                  editable={false}
                />
                <Image
                  source={require('../../../src/assets/icon03.png')}
                  resizeMode="contain"
                  style={{ width: 30, height: 30, marginRight: 10 }}
                />
              </TouchableOpacity>
              <Text
                style={[styles.profileRequired, { fontSize: 13, marginTop: 5, marginBottom: 5 }]}>
                * 납품 희망일은 현재일 기준 7일 이후부터 선택 가능합니다.
              </Text>
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
            </View>
            {/* // 납품 희망일 */}

            {/* 견적 마감일 */}
            <View style={{ marginBottom: 15 }}>
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
                  style={[
                    styles.normalText,
                    {
                      paddingHorizontal: 10,
                      width: '70%',
                    },
                  ]}
                  autoCapitalize="none"
                  editable={false}
                />
                <Image
                  source={require('../../../src/assets/icon03.png')}
                  resizeMode="contain"
                  style={{ width: 30, height: 30, marginRight: 10 }}
                />
              </TouchableOpacity>
              {show02 && (
                <DateTimePicker
                  testID="dateTimePicker01"
                  value={dDayDate}
                  mode={mode02}
                  is24Hour={true}
                  display="default"
                  onChange={onChange02}
                />
              )}
            </View>
            {/* // 견적 마감일 */}
            <View style={{ marginVertical: 10 }} />
            <TouchableOpacity onPress={() => Alert.alert('복사 후 재등록')} activeOpacity={0.9}>
              <View style={[styles.submitBtn]}>
                <Text style={styles.submitBtnText}>복사 후 재등록</Text>
              </View>
            </TouchableOpacity>
          </View>
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
    fontFamily: 'SCDream4',
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
    fontFamily: 'SCDream4',
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
    fontFamily: 'SCDream4',
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
  cancelBtn: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#275696',
    backgroundColor: '#fff',
    width: '100%',
    paddingVertical: 15,
  },
  cancelBtnText: {
    fontFamily: 'SCDream4',
    fontSize: 16,
    color: '#275696',
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
    fontFamily: 'SCDream4',
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

export default CopyOrder;
