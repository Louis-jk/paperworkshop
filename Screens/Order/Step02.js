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
  ActivityIndicator,
} from 'react-native';

import {Formik} from 'formik';
import * as yup from 'yup';
// import { Picker } from '@react-native-community/picker';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import 'moment/locale/ko';
import DocumentPicker from 'react-native-document-picker';
import {useSelector, useDispatch} from 'react-redux';

import {
  setUserTitle,
  setUserName,
  setUserMobile,
  setUserCompany,
  setUserDesign,
  setUserLocation,
  setUserDelivery,
  setUserEstimate,
  setUserFileUrl,
  setUserFileType,
  setUserFileName,
  setUserFileSize,
  setUserMemo,
} from '../../Modules/OrderReducer';
import DetailHeader from '../Common/DetailHeader';

const Step02 = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;
  const propsScreenName = props.route.params.screen;

  console.log('Step02 props', props);

  const dispatch = useDispatch();

  const [date, setDate] = React.useState(new Date());
  const [mode01, setMode01] = React.useState('date');
  const [mode02, setMode02] = React.useState('date');
  const [show01, setShow01] = React.useState(false);
  const [show02, setShow02] = React.useState(false);

  // const [title, setTitle] = React.useState(null); // 제작명 (필수)
  // const [name, setName] = React.useState(null); // 고객명 (필수)
  // const [mobile, setMobile] = React.useState(null); // 휴대폰 번호 (필수)
  const [company, setCompany] = React.useState(null); // 회사명 (선택)
  const [designOrder, setDesignOrder] = React.useState('P'); // 디자인 의뢰 (필수) : 인쇄만 의뢰/인쇄+디자인의뢰
  const [location, setLocation] = React.useState(null); // 인쇄 업체 선호 지역 (필수)
  const [deliveryDate, setDeliveryDate] = React.useState(new Date()); // 납품 희망일 (필수)
  const [estimateDate, setEstimateDate] = React.useState(new Date()); // 견적 마감일 (필수)
  // const [file, setFile] = React.useState(null); // 파일 첨부 (선택)
  const [memo, setMemo] = React.useState(null); // 메모 (선택)

  const onChange01 = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow01(Platform.OS === 'ios');

    if (selectedDate < date) {
      Alert.alert(
        '오늘 이전 날짜는 선택이 불가능 합니다.',
        '날짜를 다시 선택해주세요.',
        [
          {
            text: '확인',
          },
        ],
      );
      setEstimateDate(date);
    } else {
      setDeliveryDate(currentDate);
    }
  };

  const onChange02 = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow02(Platform.OS === 'ios');

    if (selectedDate < date) {
      Alert.alert(
        '오늘 이전 날짜는 선택이 불가능 합니다.',
        '날짜를 다시 선택해주세요.',
        [
          {
            text: '확인',
          },
        ],
      );
      setEstimateDate(date);
    } else {
      setEstimateDate(currentDate);
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

  const [fileUrlCurrent, setFileUrlCurrent] = React.useState(null);
  const [fileTypeCurrent, setFileTypeCurrent] = React.useState(null);
  const [fileNameCurrent, setFileNameCurrent] = React.useState(null);
  const [fileSizeCurrent, setFileSizeCurrent] = React.useState(null);
  const [extension, setExtension] = React.useState(null);

  // 파일 업로드 (document picker)
  const filePicker = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      // console.log('이미지', res);
      const imgName = res.name.split('.');
      const extArray = res.type.split('/');
      setFileUrlCurrent(res.uri);
      setFileTypeCurrent(res.type);
      setFileNameCurrent(imgName[0]);
      setFileSizeCurrent(res.size);
      setExtension(extArray[1]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  // 유효성 체크
  const validationSchema = yup.object().shape({
    order_title: yup.string().required('제작명을 입력해주세요.').label('Title'),
    order_name: yup.string().required('고객명을 입력해주세요.').label('Name'),
    order_mobile: yup
      .string()
      .required('휴대폰 번호를 입력해주세요.')
      .label('Mobile'),
  });

  console.log('deliveryDate', deliveryDate);

  // 다음 스텝
  const nextStep = (title, name, mobile) => {
    dispatch(setUserTitle(title));
    dispatch(setUserName(name));
    dispatch(setUserMobile(mobile));
    dispatch(setUserCompany(company));
    dispatch(setUserDesign(designOrder));
    dispatch(setUserLocation(location));
    dispatch(setUserDelivery(moment(deliveryDate).format('YYYY-MM-DD')));
    dispatch(setUserEstimate(moment(estimateDate).format('YYYY-MM-DD')));
    dispatch(setUserFileUrl(fileUrlCurrent));
    dispatch(setUserFileName(fileNameCurrent));
    dispatch(setUserFileType(fileTypeCurrent));
    dispatch(setUserFileSize(fileSizeCurrent));
    dispatch(setUserMemo(memo));
    navigation.navigate('OrderStep03', {
      screen: propsScreenName === 'DirectOrder' ? propsScreenName : null,
    });
  };

  return (
    <>
      <DetailHeader
        title={propsScreenName === 'DirectOrder' ? propsScreenName : routeName}
        navigation={navigation}
      />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Formik
          initialValues={{
            order_title: '',
            order_name: '',
            order_mobile: '',
          }}
          onSubmit={(values, actions) => {
            if (location) {
              nextStep(
                values.order_title,
                values.order_name,
                values.order_mobile,
              );
            }
            setTimeout(() => {
              actions.setSubmitting(false);
            }, 1000);
          }}
          validationSchema={validationSchema}>
          {(formikProps) => (
            <View style={{paddingHorizontal: 20, paddingVertical: 20}}>
              <View style={styles.profileBox}>
                <Text
                  style={[styles.boldText, {fontSize: 16, marginBottom: 20}]}>
                  기본 정보
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginBottom: 10,
                  }}>
                  <Text style={[styles.profileTitle, {marginRight: 5}]}>
                    제작명
                  </Text>
                  <Text style={[styles.profileRequired]}>(필수)</Text>
                </View>
                <TextInput
                  // value={title}
                  placeholder="제작명을 입력해주세요."
                  placeholderTextColor="#A2A2A2"
                  style={[
                    styles.normalText,
                    {
                      fontSize: 14,
                      borderWidth: 1,
                      borderColor: '#E3E3E3',
                      borderRadius: 4,
                      paddingHorizontal: 10,
                      marginBottom: 5,
                    },
                  ]}
                  // onChangeText={(text) => setTitle(text)}
                  onChangeText={formikProps.handleChange('order_title')}
                  autoCapitalize="none"
                  onBlur={formikProps.handleBlur('order_title')}
                />
                {formikProps.touched.order_title &&
                  formikProps.errors.order_title && (
                    <Text
                      style={{
                        width: '100%',
                        fontFamily: 'SCDream4',
                        fontSize: 12,
                        lineHeight: 18,
                        color: '#366DE5',
                        marginBottom: 5,
                      }}>
                      {formikProps.touched.order_title &&
                        formikProps.errors.order_title}
                    </Text>
                  )}
              </View>

              {/* 고객명  */}
              <View style={{marginBottom: 20}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginBottom: 10,
                  }}>
                  <Text style={[styles.profileTitle, {marginRight: 5}]}>
                    고객명
                  </Text>
                  <Text style={[styles.profileRequired]}>(필수)</Text>
                </View>
                <TextInput
                  // value={name}
                  placeholder="고객명을 입력해주세요."
                  placeholderTextColor="#A2A2A2"
                  style={[
                    styles.normalText,
                    {
                      fontSize: 14,
                      borderWidth: 1,
                      borderColor: '#E3E3E3',
                      borderRadius: 4,
                      paddingHorizontal: 10,
                      marginBottom: 5,
                    },
                  ]}
                  onChangeText={formikProps.handleChange('order_name')}
                  autoCapitalize="none"
                  onBlur={formikProps.handleBlur('order_name')}
                />
                {formikProps.touched.order_name &&
                  formikProps.errors.order_name && (
                    <Text
                      style={{
                        width: '100%',
                        fontFamily: 'SCDream4',
                        fontSize: 12,
                        lineHeight: 18,
                        color: '#366DE5',
                        marginBottom: 5,
                      }}>
                      {formikProps.touched.order_name &&
                        formikProps.errors.order_name}
                    </Text>
                  )}
              </View>
              {/* // 고객명  */}

              {/* 휴대폰 번호  */}
              <View style={{marginBottom: 20}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginBottom: 10,
                  }}>
                  <Text style={[styles.profileTitle, {marginRight: 5}]}>
                    휴대폰 번호
                  </Text>
                  <Text style={[styles.profileRequired]}>(필수)</Text>
                </View>
                <TextInput
                  // value={mobile}
                  placeholder="휴대폰 번호를 입력해주세요."
                  placeholderTextColor="#A2A2A2"
                  style={[
                    styles.normalText,
                    {
                      fontSize: 14,
                      borderWidth: 1,
                      borderColor: '#E3E3E3',
                      borderRadius: 4,
                      paddingHorizontal: 10,
                      marginBottom: 5,
                    },
                  ]}
                  onChangeText={formikProps.handleChange('order_mobile')}
                  autoCapitalize="none"
                  onBlur={formikProps.handleBlur('order_mobile')}
                  keyboardType="number-pad"
                />
                {formikProps.touched.order_mobile &&
                  formikProps.errors.order_mobile && (
                    <Text
                      style={{
                        width: '100%',
                        fontFamily: 'SCDream4',
                        fontSize: 12,
                        lineHeight: 18,
                        color: '#366DE5',
                        marginBottom: 5,
                      }}>
                      {formikProps.touched.order_mobile &&
                        formikProps.errors.order_mobile}
                    </Text>
                  )}
              </View>
              {/* // 휴대폰 번호  */}

              {/* 회사명  */}
              <View style={{marginBottom: 20}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginBottom: 10,
                  }}>
                  <Text style={[styles.profileTitle, {marginRight: 5}]}>
                    회사명
                  </Text>
                  <Text style={[styles.profileRequired, {color: '#707070'}]}>
                    (선택)
                  </Text>
                </View>
                <TextInput
                  value={company}
                  placeholder="회사명을 입력해주세요."
                  placeholderTextColor="#A2A2A2"
                  style={[
                    styles.normalText,
                    {
                      fontSize: 14,
                      borderWidth: 1,
                      borderColor: '#E3E3E3',
                      borderRadius: 4,
                      paddingHorizontal: 10,
                      marginBottom: 5,
                    },
                  ]}
                  onChangeText={(text) => setCompany(text)}
                  autoCapitalize="none"
                />
              </View>
              {/* // 회사명  */}

              {/* 디자인 의뢰  */}
              <View style={{marginBottom: 25}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginBottom: 10,
                  }}>
                  <Text style={[styles.profileTitle, {marginRight: 5}]}>
                    디자인 의뢰
                  </Text>
                  <Text style={[styles.profileRequired]}>(필수)</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    activeOpacity={1}
                    hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                    onPress={() => setDesignOrder('P')}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      marginRight: 50,
                    }}>
                    <Image
                      source={
                        designOrder === 'P'
                          ? require('../../src/assets/radio_on.png')
                          : require('../../src/assets/radio_off.png')
                      }
                      resizeMode="contain"
                      style={{width: 20, height: 20, marginRight: 5}}
                    />
                    <Text style={[styles.normalText, {fontSize: 14}]}>
                      인쇄만 의뢰
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={1}
                    hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                    onPress={() => setDesignOrder('D')}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={
                        designOrder === 'D'
                          ? require('../../src/assets/radio_on.png')
                          : require('../../src/assets/radio_off.png')
                      }
                      resizeMode="contain"
                      style={{width: 20, height: 20, marginRight: 5}}
                    />
                    <Text style={[styles.normalText, {fontSize: 14}]}>
                      인쇄 + 디자인 의뢰
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              {/* // 디자인 의뢰  */}

              {/* 인쇄 업체 선호 지역  */}
              <View style={{marginBottom: 20}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginBottom: 10,
                  }}>
                  <Text style={[styles.profileTitle, {marginRight: 5}]}>
                    인쇄 업체 선호 지역
                  </Text>
                  <Text style={[styles.profileRequired]}>(필수)</Text>
                </View>
                <DropDownPicker
                  placeholder={'선호지역을 입력해주세요.'}
                  placeholderStyle={{
                    fontSize: 14,
                    color: '#A2A2A2',
                    fontWeight: '400',
                  }}
                  value={location}
                  activeLabelStyle={{color: '#000'}}
                  activeItemStyle={{color: '#000'}}
                  selectedLabelStyle={{color: '#000'}}
                  items={[
                    {label: '서울', value: 'seoul'},
                    {label: '부산', value: 'busan'},
                    {label: '대구', value: 'daegu'},
                    {label: '인천', value: 'incheon'},
                    {label: '광주', value: 'gwangju'},
                    {label: '세종/대전/청주', value: 'sejong'},
                    {label: '울산', value: 'ulsan'},
                    {label: '경기', value: 'gyeongi'},
                    {label: '강원', value: 'gangwon'},
                    {label: '충청', value: 'choongcheong'},
                    {label: '전라', value: 'jeonra'},
                    {label: '경상', value: 'gyeongsang'},
                    {label: '제주', value: 'jeju'},
                  ]}
                  containerStyle={{height: 50}}
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
                  labelStyle={{fontFamily: 'SCDream4', color: '#A2A2A2'}}
                  dropDownStyle={{backgroundColor: '#fff'}}
                  onChangeItem={(item) => setLocation(item.value)}
                  autoCapitalize="none"
                  onBlur={formikProps.handleBlur('order_location')}
                  customArrowDown={() => (
                    <Image
                      source={require('../../src/assets/arr01.png')}
                      style={{width: 25, height: 25}}
                      resizeMode="contain"
                    />
                  )}
                  customArrowUp={() => (
                    <Image
                      source={require('../../src/assets/arr01_top.png')}
                      style={{width: 25, height: 25}}
                      resizeMode="contain"
                    />
                  )}
                />
                {!location && (
                  <Text
                    style={{
                      width: '100%',
                      fontFamily: 'SCDream4',
                      fontSize: 12,
                      lineHeight: 18,
                      color: '#366DE5',
                      marginVertical: 5,
                    }}>
                    지역을 선택해주세요.
                  </Text>
                )}
              </View>
              {/* // 인쇄 업체 선호 지역  */}

              {/* 납품 희망일, 견적 마감일  */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 20,
                  zIndex: -10,
                }}>
                <View style={{width: '50%', paddingRight: 5}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      marginBottom: 10,
                    }}>
                    <Text style={[styles.profileTitle, {marginRight: 5}]}>
                      납품 희망일
                    </Text>
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
                      value={moment(deliveryDate).format('YY-MM-DD')}
                      placeholder="00-00-00"
                      placeholderTextColor="#A2A2A2"
                      style={[
                        styles.normalText,
                        {
                          paddingHorizontal: 10,
                          width: '70%',
                          color: deliveryDate ? '#111' : '#A2A2A2',
                        },
                      ]}
                      autoCapitalize="none"
                      editable={false}
                    />
                    <Image
                      source={require('../../src/assets/icon03.png')}
                      resizeMode="contain"
                      style={{width: 30, height: 30, marginRight: 10}}
                    />
                  </TouchableOpacity>
                </View>
                {show01 && (
                  <DateTimePicker
                    testID="dateTimePicker01"
                    value={deliveryDate}
                    mode={mode01}
                    is24Hour={true}
                    display="default"
                    onChange={onChange01}
                  />
                )}
                <View style={{width: '50%', paddingLeft: 5}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      marginBottom: 10,
                    }}>
                    <Text style={[styles.profileTitle, {marginRight: 5}]}>
                      견적 마감일
                    </Text>
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
                      value={moment(estimateDate).format('YY-MM-DD')}
                      placeholder="00-00-00"
                      placeholderTextColor="#A2A2A2"
                      style={[
                        styles.normalText,
                        {
                          paddingHorizontal: 10,
                          width: '70%',
                          color: estimateDate ? '#111' : '#A2A2A2',
                        },
                      ]}
                      autoCapitalize="none"
                      editable={false}
                    />
                    <Image
                      source={require('../../src/assets/icon03.png')}
                      resizeMode="contain"
                      style={{width: 30, height: 30, marginRight: 10}}
                    />
                  </TouchableOpacity>
                </View>
                {show02 && (
                  <DateTimePicker
                    testID="dateTimePicker02"
                    value={estimateDate}
                    mode={mode02}
                    is24Hour={true}
                    display="default"
                    onChange={onChange02}
                  />
                )}
              </View>
              {/* // 납품 희망일, 견적 마감일  */}

              {/* 파일 첨부  */}
              <View style={{marginBottom: 20, zIndex: -10}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginBottom: 10,
                  }}>
                  <Text style={[styles.profileTitle, {marginRight: 5}]}>
                    파일 첨부
                  </Text>
                  <Text style={[styles.profileRequired, {color: '#707070'}]}>
                    (선택)
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginBottom: 5,
                  }}>
                  <TextInput
                    value={
                      fileNameCurrent
                        ? `${fileNameCurrent}.${
                            extension === 'jpeg' ? 'jpg' : extension
                          }`
                        : null
                    }
                    placeholder="파일을 선택해주세요."
                    placeholderTextColor="#A2A2A2"
                    style={[
                      styles.normalText,
                      {
                        flex: 1,
                        borderWidth: 1,
                        borderColor: '#E3E3E3',
                        borderRadius: 4,
                        paddingHorizontal: 10,
                        marginRight: 10,
                      },
                    ]}
                    editable={false}
                  />
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={filePicker}
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#275696',
                      borderRadius: 4,
                      height: 50,
                      paddingHorizontal: 20,
                    }}>
                    <Text
                      style={[
                        styles.normalText,
                        {color: '#fff', textAlign: 'center'},
                      ]}>
                      파일 선택
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                  }}>
                  <Text
                    style={[
                      styles.normalText,
                      {
                        fontSize: 12,
                        color: '#366DE5',
                        lineHeight: 18,
                        marginRight: 5,
                      },
                    ]}>
                    *
                  </Text>
                  <Text
                    style={[
                      styles.normalText,
                      {fontSize: 12, color: '#366DE5', lineHeight: 18},
                    ]}>
                    인쇄/패키지 제작에 참고 할 수 있는 자료가 있다면
                    첨부해주세요.
                  </Text>
                </View>
              </View>
              {/* // 파일 첨부  */}

              {/* 메모  */}
              <View style={{marginBottom: 20}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginBottom: 10,
                  }}>
                  <Text style={[styles.profileTitle, {marginRight: 5}]}>
                    메모
                  </Text>
                  <Text style={[styles.profileRequired, {color: '#707070'}]}>
                    (선택)
                  </Text>
                </View>
                <TextInput
                  value={memo}
                  placeholder="메모를 입력해주세요."
                  placeholderTextColor="#A2A2A2"
                  style={[
                    styles.normalText,
                    {
                      borderRadius: 5,
                      backgroundColor: '#F5F5F5',
                      height: 120,
                      flex: 1,
                      textAlignVertical: 'top',
                      paddingLeft: 10,
                      paddingVertical: 10,
                    },
                  ]}
                  onChangeText={(text) => setMemo(text)}
                  multiline={true}
                  autoCapitalize="none"
                />
              </View>
              {/* // 메모  */}

              {/* 이전, 다음 버튼 부분 (Prev, Next) */}
              {formikProps.isSubmitting ? (
                <ActivityIndicator size="large" color="#275696" />
              ) : (
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
                      marginBottom: 20,
                    }}>
                    <View
                      style={{
                        borderWidth: 0.5,
                        height: '100%',
                        borderColor: '#E3E3E3',
                      }}
                    />
                    <TouchableWithoutFeedback
                      onPress={() => navigation.goBack()}>
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
                      style={{
                        borderWidth: 0.5,
                        height: '100%',
                        borderColor: '#E3E3E3',
                      }}
                    />
                    <TouchableWithoutFeedback
                      onPress={formikProps.handleSubmit}>
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
                          다음
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                </View>
              )}
              {/* // 이전, 다음 버튼 부분 (Prev, Next) */}
            </View>
          )}
        </Formik>
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

export default Step02;
