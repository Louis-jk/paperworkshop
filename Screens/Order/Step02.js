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

import OrderAPI from '../../src/api/OrderAPI';
import Modal from './EtcOrderModal';

const Step02 = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;
  const propsScreenName = props.route.params.screen;

  const {cate1, ca_id} = useSelector((state) => state.OrderReducer);
  const {partner_location} = useSelector((state) => state.OrderHandlerReducer);
  const {mb_id} = useSelector((state) => state.UserInfoReducer);

  const titleRef = React.useRef(null); // 제작명 TextInpu
  const nameRef = React.useRef(null); // 고객명 TextInpu
  const mobileRef = React.useRef(null); // 휴대폰번호 TextInpu
  const companyRef = React.useRef(null); // 휴대폰번호 TextInpu
  const memoRef = React.useRef(null); // 메모 TextInpu

  const dispatch = useDispatch();

  const [date, setDate] = React.useState(new Date());
  const [mode01, setMode01] = React.useState('date');
  const [mode02, setMode02] = React.useState('date');
  const [show01, setShow01] = React.useState(false);
  const [show02, setShow02] = React.useState(false);

  // 기타인쇄물 견적 전 모달
  const [isModalVisible, setModalVisible] = React.useState(false);

  const [title, setTitle] = React.useState(null); // 제작명 (필수)
  const [name, setName] = React.useState(null); // 고객명 (필수)
  const [mobile, setMobile] = React.useState(null); // 휴대폰 번호 (필수)
  const [company, setCompany] = React.useState(null); // 회사명 (선택)
  const [designOrder, setDesignOrder] = React.useState('P'); // 디자인 의뢰 (필수) : 인쇄만 의뢰/인쇄+디자인의뢰
  const [defaultLocat, setDefaultLocat] = React.useState([]); // 다일렉트 견적일 경우 해당 파트너스 등록 지역 초기 담기
  const [location, setLocation] = React.useState(null); // 인쇄 업체 선호 지역 (필수)
  const [deliveryDate, setDeliveryDate] = React.useState(new Date()); // 납품 희망일 (필수)
  const [estimateDate, setEstimateDate] = React.useState(new Date()); // 견적 마감일 (필수)

  const [titleError, setTitleError] = React.useState(false); // 제작명 (필수) 값 없을 때 에러 표시
  const [nameError, setNameError] = React.useState(false); // 고객명 (필수) 값 없을 때 에러 표시
  const [mobileError, setMobileError] = React.useState(false); // 휴대폰 번호 (필수) 값 없을 때 에러 표시
  const [memoError, setMemoError] = React.useState(false); // 기타인쇄일 경우 메모(필수) 값 없을 때 에러 표시

  // const [file, setFile] = React.useState(null); // 파일 첨부 (선택)
  const [memo, setMemo] = React.useState(null); // 메모 (선택)

  React.useEffect(() => {
    if (props.route.params.screen === 'DirectOrder') {
      let pLocation = partner_location.split(',');
      setDefaultLocat(pLocation);
    }
  }, []);

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
  const [fileNameCurrent, setFileNameCurrent] = React.useState(null); // 확장자 분리 이미지명
  const [fileName, setFileName] = React.useState(null); // 확장자 달린 이미지명
  const [fileSizeCurrent, setFileSizeCurrent] = React.useState(null);
  const [extension, setExtension] = React.useState(null);

  // 파일 업로드 (document picker)
  const filePicker = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      const imgName = res.name.split('.');
      const extArray = res.type.split('/');
      setFileUrlCurrent(res.uri);
      setFileTypeCurrent(res.type);
      setFileName(res.name);
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

  const [source, setSource] = React.useState('');
  // const [deliDate, setDeliDate] = React.useState('');
  // const [estiDate, setEstiDate] = React.useState('');

  const sendOrderBefore = () => {
    let deli = moment(deliveryDate).format('YYYY-MM-DD'); // 납품 희망일 형식 변환
    let esti = moment(estimateDate).format('YYYY-MM-DD'); // 견적 마감일 형식 변환
    // setDeliDate(deli);
    // setEstiDate(esti);

    if (fileUrlCurrent && fileTypeCurrent && fileName !== null) {
      setSource({
        uri: fileUrlCurrent,
        type: fileTypeCurrent,
        name: fileName,
      });
      sendOrderAPI(deli, esti);
    } else {
      sendOrderAPI(deli, esti);
    }
  };

  const sendOrderAPI = (deli, esti) => {
    const frmdata = new FormData();
    frmdata.append('method', 'proc_estimate_etc');
    frmdata.append('cate1', cate1);
    frmdata.append('ca_id', ca_id);
    frmdata.append('mb_id', mb_id);
    frmdata.append('title', title);
    frmdata.append('company', company ? company : '');
    frmdata.append('mb_name', name);
    frmdata.append('mb_hp', mobile);
    frmdata.append('design_print', designOrder);
    frmdata.append('favor_area', location);
    frmdata.append('memo', memo);
    frmdata.append('delivery_date', deli);
    frmdata.append('estimate_date', esti);
    frmdata.append('pe_file[]', source);
    frmdata.append('status', '0');

    OrderAPI.sendOrder(frmdata)
      .then((res) => {
        if (res.data.result === '1' && res.data.count > 0) {
          setModalVisible(!isModalVisible);
          navigation.navigate('easyOrderComplete');
        } else if (res.data.result === '1' && res.data.count <= 0) {
          Alert.alert(res.data.message, '', [
            {
              text: '확인',
            },
          ]);
        } else {
          Alert.alert(res.data.message, '관리자에게 문의하세요', [
            {
              text: '확인',
            },
          ]);
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

  // 유효성 체크
  const validationSchema = yup.object().shape({
    order_title: yup.string().required('제작명을 입력해주세요.').label('Title'),
    order_name: yup.string().required('고객명을 입력해주세요.').label('Name'),
    order_mobile: yup
      .string()
      .matches(/^\d+$/, '숫자만 입력 가능합니다.')
      .required('휴대폰 번호를 입력해주세요.')
      .min(10, '휴대폰 번호를 정확히 입력해주세요.')
      .max(11, '휴대폰 번호를 정확히 입력해주세요.')
      .label('Mobile'),
  });

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
    dispatch(setUserFileName(fileName));
    dispatch(setUserFileType(fileTypeCurrent));
    dispatch(setUserFileSize(fileSizeCurrent));
    dispatch(setUserMemo(memo));
    navigation.navigate('OrderStep03', {
      screen: propsScreenName === 'DirectOrder' ? propsScreenName : null,
    });
  };

  // 기타인쇄 견적신청
  const toggleModal = () => {
    // Alert.alert('기타인쇄 견적을 신청하시겠습니까?');
    if (title === null) {
      setTitleError(true);
      titleRef.current.focus();
    } else if (name === null) {
      setNameError(true);
      nameRef.current.focus();
    } else if (mobile === null) {
      setMobileError(true);
      mobileRef.current.focus();
    } else if (location === null) {
      Alert.alert('인쇄 업체 선호 지역을 선택해주세요.', '', [
        {
          text: '확인',
        },
      ]);
    } else if (memo === null) {
      setMemoError(true);
      memoRef.current.focus();
    } else {
      setModalVisible(!isModalVisible);
    }
    // setModalVisible(!isModalVisible);
  };

  return (
    <>
      <Modal
        isVisible={isModalVisible}
        toggleModal={toggleModal}
        sendOrder={sendOrderBefore}
      />
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
            if (!location) {
              Alert.alert('인쇄 업체 선호 지역을 선택해주세요.', '', [
                {
                  text: '확인',
                },
              ]);
            } else {
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
                  ref={titleRef}
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
                  onChangeText={(value) => {
                    setTitle(value);
                    setTitleError(false);
                    formikProps.setFieldValue('order_title', value);
                  }}
                  onSubmitEditing={() => nameRef.current.focus()}
                  autoCapitalize="none"
                  onBlur={formikProps.handleBlur('order_title')}
                />
                {titleError && (
                  <Text
                    style={{
                      width: '100%',
                      fontFamily: 'SCDream4',
                      fontSize: 12,
                      lineHeight: 18,
                      color: '#366DE5',
                      marginBottom: 5,
                    }}>
                    제작명을 입력해주세요.
                  </Text>
                )}
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
                  ref={nameRef}
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
                  onChangeText={(value) => {
                    setName(value);
                    setNameError(false);
                    formikProps.setFieldValue('order_name', value);
                  }}
                  onSubmitEditing={() => mobileRef.current.focus()}
                  autoCapitalize="none"
                  onBlur={formikProps.handleBlur('order_name')}
                />
                {nameError && (
                  <Text
                    style={{
                      width: '100%',
                      fontFamily: 'SCDream4',
                      fontSize: 12,
                      lineHeight: 18,
                      color: '#366DE5',
                      marginBottom: 5,
                    }}>
                    고객명을 입력해주세요.
                  </Text>
                )}
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
                  ref={mobileRef}
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
                  onChangeText={(value) => {
                    setMobile(value);
                    setMobileError(false);
                    formikProps.setFieldValue('order_mobile', value);
                  }}
                  onSubmitEditing={() => companyRef.current.focus()}
                  autoCapitalize="none"
                  onBlur={formikProps.handleBlur('order_mobile')}
                  keyboardType="number-pad"
                />
                {mobileError && (
                  <Text
                    style={{
                      width: '100%',
                      fontFamily: 'SCDream4',
                      fontSize: 12,
                      lineHeight: 18,
                      color: '#366DE5',
                      marginBottom: 5,
                    }}>
                    휴대폰 번호를 입력해주세요.
                  </Text>
                )}
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
                  ref={companyRef}
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
                {propsScreenName !== 'DirectOrder' ? (
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
                ) : (
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
                    items={defaultLocat.map((v, _i) => {
                      // setPfId(v.pf_id);
                      let krChg = '';
                      switch (v) {
                        case 'seoul':
                          krChg = '서울';
                          break;
                        case 'busan':
                          krChg = '부산';
                          break;
                        case 'daegu':
                          krChg = '대구';
                          break;
                        case 'incheon':
                          krChg = '인천';
                          break;
                        case 'gwangju':
                          krChg = '광주';
                          break;
                        case 'sejong':
                          krChg = '세종/대전/청주';
                          break;
                        case 'ulsan':
                          krChg = '울산';
                          break;
                        case 'gyeongi':
                          krChg = '경기';
                          break;
                        case 'gangwon':
                          krChg = '강원';
                          break;
                        case 'choongcheong':
                          krChg = '충청';
                          break;
                        case 'jeonra':
                          krChg = '전라';
                          break;
                        case 'gyeongsang':
                          krChg = '경상';
                          break;
                        case 'jeju':
                          krChg = '제주';
                          break;
                        default:
                          krChg = '';
                          break;
                      }
                      return {value: v, label: krChg};
                    })}
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
                )}
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
                    {ca_id === '8' ||
                    ca_id === '15' ||
                    ca_id === '16' ||
                    ca_id === '17' ||
                    ca_id === '18' ||
                    ca_id === '19'
                      ? '희망 인쇄물 기입사항'
                      : '메모'}
                  </Text>
                  {ca_id === '8' ||
                  ca_id === '15' ||
                  ca_id === '16' ||
                  ca_id === '17' ||
                  ca_id === '18' ||
                  ca_id === '19' ? (
                    <Text style={[styles.profileRequired, {color: '#366DE5'}]}>
                      (필수)
                    </Text>
                  ) : (
                    <Text style={[styles.profileRequired, {color: '#707070'}]}>
                      (선택)
                    </Text>
                  )}
                </View>
                <TextInput
                  ref={memoRef}
                  value={memo}
                  placeholder={
                    ca_id === '8' ||
                    ca_id === '15' ||
                    ca_id === '16' ||
                    ca_id === '17' ||
                    ca_id === '18' ||
                    ca_id === '19'
                      ? '희망하시는 인쇄물에 대한 상세한 설명을 적어주세요.'
                      : '메모를 입력해주세요.'
                  }
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
                  onChangeText={(text) => {
                    setMemoError(false);
                    setMemo(text);
                  }}
                  multiline={true}
                  autoCapitalize="none"
                />
                {memoError && (
                  <Text
                    style={{
                      width: '100%',
                      fontFamily: 'SCDream4',
                      fontSize: 12,
                      lineHeight: 18,
                      color: '#366DE5',
                      marginVertical: 5,
                    }}>
                    희망 인쇄물 기입사항을 입력해주세요.
                  </Text>
                )}
              </View>
              {/* // 메모  */}

              {/* 이전, 다음 버튼 부분 (Prev, Next) */}
              {formikProps.isSubmitting ? (
                <ActivityIndicator size="large" color="#275696" />
              ) : (
                <View>
                  {ca_id === '8' ||
                  ca_id === '15' ||
                  ca_id === '16' ||
                  ca_id === '17' ||
                  ca_id === '18' ||
                  ca_id === '19' ? (
                    <TouchableOpacity onPress={toggleModal} activeOpacity={0.8}>
                      <View style={[styles.submitBtn, {marginBottom: 10}]}>
                        <Text style={styles.submitBtnText}>
                          기타인쇄물 견적 제출
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ) : (
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
                  )}
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
