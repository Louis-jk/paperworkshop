import * as React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Keyboard,
  Alert,
  Image,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import qs from 'qs';
import moment from 'moment';

import DetailHeader from '../../Common/HeaderNotBackBtnDrawer';
import {
  joinId,
  joinPwd,
  joinName,
  joinMobile,
  joinMobileCfm,
  joinEmail,
  joinCompany,
} from '../../../Modules/JoinReducer';

import Timer from '../../Common/Timer';

const baseUrl = 'http://dmonster1506.cafe24.com/json/proc_json.php/';

const Register = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  const dispatch = useDispatch();

  // 인증시 카운터
  const [minutes, setMinutes] = React.useState(0);
  const [seconds, setSeconds] = React.useState(0);
  const [isCounter, setIsCounter] = React.useState(false);
  const confirmCount = (num) => {
    setIsCounter(true);
    setMinutes(num);
  };

  const confirmClearCount = (num) => {
    setIsCounter(false);
    setMinutes(num);
  };

  // 아이디 중복체크
  const [checkedId, setCheckedId] = React.useState(false);

  const checkUserId = (register_id) => {
    if (register_id.length < 4) {
      Alert.alert('아이디를 4자리이상 입력바랍니다.');
      return false;
    }

    if (register_id.length > 20) {
      Alert.alert('아이디를 20자리이내로 입력바랍니다.');
      return false;
    }

    const reg = RegExp(/^[aA-zZ-_0-9]+$/);

    const checkRegId = register_id;

    if (register_id == '') {
      Alert.alert('아이디를 입력해주세요.');
    } else if (reg.test(checkRegId) === false) {
      Alert.alert(
        '아이디 생성 규칙에 따르십시요.',
        '아이디는 4자리 이상 20자리 이하로 영문 소문자/대문자, 숫자, 특수기호 - , _만 허용됩니다.',
      );
      return false;
    } else {
      axios({
        method: 'post',
        url: `${baseUrl}`,
        data: qs.stringify({
          method: 'proc_duplicate_id',
          mb_id: register_id,
        }),
      })
        .then((res) => {
          if (res.data.result == '1') {
            Alert.alert(res.data.message);
            setCheckedId(true);
          } else {
            IdAlertMsg();
          }
        })
        .catch((err) =>
          Alert.alert(err, '관리자에게 문의하세요.', [
            {
              text: '확인',
            },
          ]),
        );
    }
  };

  const IdAlertMsg = () => {
    setCheckedId(false);
    Alert.alert(
      '이미 사용 중인 아이디입니다.',
      '다른 아이디를 사용해 주십시요.',
      [
        {
          text: '확인',
        },
      ],
    );
  };
  // 모바일 번호 임시 저장
  const [mobileNo, setMobileNo] = React.useState(null);

  // 모바일 인증 아이디 저장 및 버튼 색상 변화 상태
  const [mobileConfirmId, setMobileConfirmId] = React.useState(null);
  const [isMobileConfimed, setMobileConfimed] = React.useState(false);

  // 본인 인증 시간 초과의 경우 상태관리
  const [reSend, setReSend] = React.useState(false);
  const [reSendStatus, setReSendStatus] = React.useState('n');
  const onFailConfirm = () => {
    setIsSend(false);
    setReSend(true);
    setReSendStatus('y');
  };

  // 본인인증(휴대전화번호) 문자발송 버튼
  const [isSend, setIsSend] = React.useState(false);
  const authenticateSMS = (register_mobile) => {
    if (register_mobile.length > 11) {
      Alert.alert('휴대전화번호가 올바르지 않습니다.');
      return false;
    }

    if (register_mobile === '') {
      Alert.alert('휴대전화번호를 입력해주세요.');
    } else {
      Alert.alert(
        `${register_mobile}로 인증번호가 발송되었습니다.`,
        '인증번호 확인 후 입력해주세요.',
        [
          {
            text: '확인',
            onPress: () => {
              setIsSend(true);
              confirmCount(3);
            },
          },
        ],
      );
      axios({
        method: 'post',
        url: `${baseUrl}`,
        data: qs.stringify({
          method: 'proc_cert_mb_hp',
          mb_hp: register_mobile,
          mb_level: '2',
        }),
      })
        .then((res) => {
          if (res.data.result == '1') {
            setMobileConfimed(false);
          } else {
            Alert.alert(res.data.message, '가입여부를 확인해주세요.', [
              {
                text: '확인',
                onPress: () => confirmClearCount(0),
              },
            ]);
          }
        })
        .catch((err) =>
          Alert.alert('문제가 있습니다.', err, [
            {
              text: '확인',
            },
          ]),
        );
    }
  };

  // 본인인증(휴대전화번호) 인증번호 입력 시간 초과로 재전송일 경우 로직
  const reAuthenticateSMS = (register_mobile) => {
    if (register_mobile.length > 11) {
      Alert.alert('휴대전화번호가 올바르지 않습니다.');
      return false;
    }

    if (register_mobile === '') {
      Alert.alert('휴대전화번호를 입력해주세요.');
    } else {
      Alert.alert(
        `${register_mobile}로 인증번호가 발송되었습니다.`,
        '인증번호 확인 후 입력해주세요.',
        [
          {
            text: '확인',
            onPress: () => {
              setIsSend(true);
              confirmCount(3);
            },
          },
        ],
      );
      axios({
        method: 'post',
        url: `${baseUrl}`,
        data: qs.stringify({
          method: 'proc_cert_confirm',
          mb_hp: mobileNo,
          cert_num: null,
          rt_yn: 'Y',
        }),
      })
        .then((res) => {
          if (res.data.result == '1') {
            setMobileConfimed(false);
            confirmClearCount(0);
          } else {
            Alert.alert(
              '휴대전화번호를 올바르게 입력해주세요.',
              res.data.message,
              [
                {
                  text: '확인',
                },
              ],
            );
          }
        })
        .catch((err) =>
          Alert.alert('문제가 있습니다.', err, [
            {
              text: '확인',
            },
          ]),
        );
    }
  };

  // 본인인증(휴대전화번호) 인증번호 확인 버튼
  const confirmMobile = (register_confirmMobile) => {
    if (register_confirmMobile === '') {
      Alert.alert('인증번호를 입력해주세요.');
      return false;
    } else if (isSend === false) {
      Alert.alert(
        '정확한 번호로 문자발송해주세요.',
        '문자발송을 완료해주세요.',
        [
          {
            text: '확인',
            onPress: () => {},
          },
        ],
      );
      return false;
    } else {
      axios({
        method: 'post',
        url: `${baseUrl}`,
        data: qs.stringify({
          method: 'proc_cert_confirm',
          mb_hp: mobileNo,
          cert_num: mobileConfirmId,
          rt_yn: 'N',
        }),
      })
        .then((res) => {
          if (res.data.result == '1') {
            Alert.alert('본인 인증되었습니다.', res.data.message, [
              {
                text: '확인',
                onPress: () => {
                  setMobileConfimed(true);
                  confirmClearCount(0);
                },
              },
            ]);
          } else {
            Alert.alert('인증에 실패하였습니다.', res.data.message, [
              {
                text: '확인',
              },
            ]);
          }
        })
        .catch((err) =>
          Alert.alert('문제가 있습니다.', err, [
            {
              text: '확인',
            },
          ]),
        );
    }
  };

  // 유효성 체크
  const validationSchema = yup.object().shape({
    register_id: yup
      .string()
      .matches(/^[aA-zZ\-\_0-9]+$/, {
        message:
          '아이디는 4자리 이상 20자리 이하로 영문 소문자/대문자, 숫자, 특수기호 - , _만 허용됩니다.',
      })
      .required('아이디를 입력해주세요.')
      .label('User Id')
      .min(4, '아이디는 4자리 이상 입력해주세요.')
      .max(20, '아이디는 20자리 이하로 입력해주세요.'),
    register_pw: yup
      .string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*()+|=])[A-Za-z\d~!@#$%^&*()+|=]{8,16}$/,
        {
          message:
            '비밀번호는 8자리 이상 16자리 이하로 영문 소문자/대문자, 숫자, 특수기호 조합으로 입력해주세요.',
        },
      )
      .required('비밀번호를 입력해주세요.')
      .label('Password')
      .min(6, '비밀번호는 6자리 이상 입력해주세요.')
      .max(20, '비밀번호는 20자리 이하로 입력해주세요'),
    register_confirmPw: yup
      .string()
      .required('비밀번호를 재입력 해주세요.')
      .label('비밀번호 매칭 확인')
      .test(
        'passwords-match',
        '재입력하신 비밀번호가 초기 비밀번호와 일치하지 않습니다.',
        function (value) {
          return this.parent.register_pw === value;
        },
      ),
    register_name: yup.string().required('성함을 입력해주세요.').label('Name'),
    register_mobile: yup
      .string()
      .matches(/^\d+$/, '숫자만 입력 가능합니다.')
      .required('휴대폰 번호를 입력해주세요.')
      .min(10, '휴대폰 번호를 정확히 입력해주세요.')
      .max(11, '휴대폰 번호를 정확히 입력해주세요.')
      .label('Mobile'),
    register_confirmMobile: yup
      .string()
      .matches(/^\d+$/, '숫자만 입력 가능합니다.')
      .required('인증번호를 입력해주세요.')
      .label('Mobile Confirm'),
    register_email: yup
      .string()
      .email('이메일 형식에 맞게 입력해주세요.')
      .required('이메일을 입력해주세요.')
      .label('Email'),
  });

  const [pwdEyes, setPwdEyes] = React.useState(true);
  const togglePwdEyes = () => {
    setPwdEyes(!pwdEyes);
  };

  const [pwdReEyes, setPwdReEyes] = React.useState(true);
  const togglePwdReEyes = () => {
    setPwdReEyes(!pwdReEyes);
  };

  const signIn = (
    mb_id,
    mb_password,
    mb_password_re,
    mb_name,
    mb_hp,
    mb_1,
    mb_email,
    mb_2,
  ) => {
    axios({
      method: 'post',
      url: `${baseUrl}`,
      data: qs.stringify({
        method: 'proc_add_member',
        mb_id,
        mb_password,
        mb_password_re,
        mb_name,
        mb_hp,
        mb_1,
        mb_email,
        mb_2,
      }),
    })
      .then((res) => {
        if (res.data.result === '1') {
          navigation.navigate('Signed');
        } else {
          Alert.alert('회원가입에 실패하였습니다.', res.data.message, [
            {
              text: '확인',
            },
          ]);
        }
      })
      .catch((err) =>
        Alert.alert(`${err.message()}`, '관리자에게 문의하세요', [
          {
            text: '확인',
          },
        ]),
      );
  };

  return (
    <>
      <DetailHeader title={routeName} navigation={navigation} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Formik
          initialValues={{
            register_id: '',
            register_pw: '',
            register_confirmPw: '',
            register_name: '',
            register_mobile: '',
            register_confirmMobile: '',
            register_email: '',
            register_company: '',
          }}
          onSubmit={(values, actions) => {
            if (checkedId) {
              let mb_1 = isMobileConfimed ? 'Y' : 'N';
              signIn(
                values.register_id,
                values.register_pw,
                values.register_confirmPw,
                values.register_name,
                values.register_mobile,
                mb_1,
                values.register_email,
                values.register_company,
              );
              dispatch(joinId(values.register_id));
              dispatch(joinPwd(values.register_pw));
              dispatch(joinName(values.register_name));
              dispatch(joinMobile(values.register_mobile));
              dispatch(joinMobileCfm(values.register_confirmMobile));
              dispatch(joinEmail(values.register_email));
              dispatch(joinCompany(values.register_company));
            } else {
              Alert.alert('인증되지 않은 입력란이 있습니다.', '확인해주세요.', [
                {
                  text: '확인',
                },
              ]);
              return false;
            }
            setTimeout(() => {
              actions.setSubmitting(false);
            }, 1000);
          }}
          validationSchema={validationSchema}>
          {(formikProps) => (
            <>
              <View style={{paddingHorizontal: 20, paddingVertical: 20}}>
                <View style={styles.profileBox}>
                  <Text style={styles.profileTitle}>아이디</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      marginBottom: 5,
                    }}>
                    <TextInput
                      placeholder="아이디를 입력해주세요."
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
                          height: 50,
                        },
                      ]}
                      onChangeText={(value) => {
                        setCheckedId(false);
                        formikProps.setFieldValue('register_id', value);
                      }}
                      autoCapitalize="none"
                      onBlur={formikProps.handleBlur('register_id')}
                    />
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        checkUserId(formikProps.values.register_id);
                        Keyboard.dismiss();
                      }}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: checkedId ? '#ccc' : '#275696',
                        borderRadius: 4,
                        height: 50,
                        paddingHorizontal: 20,
                      }}
                      disabled={checkedId ? true : false}>
                      <Text
                        style={[
                          styles.normalText,
                          {color: '#fff', textAlign: 'center'},
                        ]}>
                        중복확인
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {!formikProps.values.register_id &&
                  !formikProps.errors.register_id &&
                  checkedId === false ? (
                    <Text
                      style={{
                        width: '100%',
                        fontFamily: 'SCDream4',
                        fontSize: 12,
                        color: '#B5B5B5',
                        lineHeight: 18,
                        marginBottom: 2,
                      }}>
                      아이디는 영문, 숫자, 특수기호(- , _ 만 허용)만 사용
                      가능하며, 4자리 이상, 20자리 이내로 입력해주세요.
                    </Text>
                  ) : formikProps.touched.register_id &&
                    formikProps.values.register_id &&
                    checkedId === false ? (
                    <Text
                      style={{
                        width: '100%',
                        fontFamily: 'SCDream4',
                        fontSize: 12,
                        lineHeight: 18,
                        color: '#366DE5',
                      }}>
                      아이디 중복확인을 해주세요.
                    </Text>
                  ) : formikProps.touched.register_id &&
                    !formikProps.errors.register_id &&
                    checkedId ? (
                    <Text
                      style={{
                        width: '100%',
                        fontFamily: 'SCDream4',
                        fontSize: 12,
                        color: '#B5B5B5',
                        lineHeight: 20,
                        marginBottom: 2,
                      }}>
                      사용가능한 아이디입니다.
                    </Text>
                  ) : formikProps.touched.register_id &&
                    formikProps.errors.register_id ? (
                    <Text
                      style={{
                        width: '100%',
                        fontFamily: 'SCDream4',
                        fontSize: 12,
                        lineHeight: 18,
                        color: '#366DE5',
                        marginBottom: 5,
                      }}>
                      {formikProps.touched.register_id &&
                        formikProps.errors.register_id}
                    </Text>
                  ) : checkedId && formikProps.touched.register_id ? (
                    setCheckedId(false)
                  ) : null}
                </View>

                {/* 비밀번호  */}
                <View style={{marginBottom: 20}}>
                  <Text style={[styles.profileTitle, {marginBottom: 10}]}>
                    비밀번호
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingHorizontal: 10,
                      borderWidth: 1,
                      borderColor: '#E3E3E3',
                      borderRadius: 4,
                      marginBottom:
                        formikProps.touched.register_pw &&
                        formikProps.errors.register_pw
                          ? 0
                          : 5,
                      height: 50,
                    }}>
                    <TextInput
                      placeholder="비밀번호를 입력해주세요."
                      placeholderTextColor="#A2A2A2"
                      style={[styles.normalText, {width: '90%'}]}
                      onChangeText={formikProps.handleChange('register_pw')}
                      autoCapitalize="none"
                      onBlur={formikProps.handleBlur('register_pw')}
                      secureTextEntry={pwdEyes}
                    />
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={togglePwdEyes}>
                      <Image
                        source={
                          pwdEyes
                            ? require('../../../src/assets/icon_eye.png')
                            : require('../../../src/assets/icon_eye_on.png')
                        }
                        resizeMode="center"
                        style={{width: 35, height: 20}}
                      />
                    </TouchableOpacity>
                  </View>
                  {!formikProps.values.register_pw &&
                  !formikProps.errors.register_pw ? (
                    <Text
                      style={{
                        width: '100%',
                        fontFamily: 'SCDream4',
                        fontSize: 12,
                        lineHeight: 18,
                        color: '#B5B5B5',
                        lineHeight: 18,
                        marginBottom: 10,
                      }}>
                      ※ 비밀번호는 영문, 숫자, 특수기호 조합으로 8자리~16자리
                      이내로 입력해주세요.
                    </Text>
                  ) : formikProps.touched.register_pw &&
                    formikProps.errors.register_pw ? (
                    <Text
                      style={{
                        width: '100%',
                        fontFamily: 'SCDream4',
                        fontSize: 12,
                        lineHeight: 18,
                        color: '#366DE5',
                        marginBottom: 10,
                        marginTop: 5,
                      }}>
                      {formikProps.touched.register_pw &&
                        formikProps.errors.register_pw}
                    </Text>
                  ) : null}
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingHorizontal: 10,
                      borderWidth: 1,
                      borderColor: '#E3E3E3',
                      borderRadius: 4,
                      marginBottom:
                        formikProps.touched.register_confirmPw &&
                        formikProps.errors.register_confirmPw
                          ? 5
                          : 0,
                      height: 50,
                    }}>
                    <TextInput
                      placeholder="비밀번호를 재입력해주세요."
                      placeholderTextColor="#A2A2A2"
                      style={[styles.normalText, {width: '90%'}]}
                      onChangeText={formikProps.handleChange(
                        'register_confirmPw',
                      )}
                      autoCapitalize="none"
                      onBlur={formikProps.handleBlur('register_confirmPw')}
                      secureTextEntry={pwdReEyes}
                    />
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={togglePwdReEyes}>
                      <Image
                        source={
                          pwdReEyes
                            ? require('../../../src/assets/icon_eye.png')
                            : require('../../../src/assets/icon_eye_on.png')
                        }
                        resizeMode="center"
                        style={{width: 35, height: 20}}
                      />
                    </TouchableOpacity>
                  </View>
                  {formikProps.touched.register_confirmPw &&
                    formikProps.errors.register_confirmPw && (
                      <Text
                        style={{
                          width: '100%',
                          fontFamily: 'SCDream4',
                          fontSize: 12,
                          lineHeight: 18,
                          color: '#366DE5',
                          marginBottom: 5,
                        }}>
                        {formikProps.touched.register_confirmPw &&
                          formikProps.errors.register_confirmPw}
                      </Text>
                    )}
                </View>
                {/* // 비밀번호  */}

                {/* 성함  */}
                <View style={{marginBottom: 20}}>
                  <Text style={[styles.profileTitle, {marginBottom: 10}]}>
                    성함
                  </Text>
                  <TextInput
                    placeholder="성함을 입력해주세요."
                    placeholderTextColor="#A2A2A2"
                    style={[
                      styles.normalText,
                      {
                        borderWidth: 1,
                        borderColor: '#E3E3E3',
                        borderRadius: 4,
                        paddingHorizontal: 10,
                        marginBottom: 5,
                        height: 50,
                      },
                    ]}
                    onChangeText={(value) => {
                      formikProps.setFieldValue('register_name', value);
                    }}
                    autoCapitalize="none"
                    onBlur={formikProps.handleBlur('register_name')}
                    autoCapitalize="none"
                  />
                  {formikProps.touched.register_name &&
                  formikProps.errors.register_name ? (
                    <Text
                      style={{
                        width: '100%',
                        fontFamily: 'SCDream4',
                        fontSize: 12,
                        lineHeight: 18,
                        color: '#366DE5',
                        marginBottom: 5,
                      }}>
                      {formikProps.touched.register_name &&
                        formikProps.errors.register_name}
                    </Text>
                  ) : null}
                </View>
                {/* // 성함  */}

                {/* 휴대폰 번호  */}
                <View style={{marginBottom: 20}}>
                  <Text style={[styles.profileTitle, {marginBottom: 10}]}>
                    휴대폰 번호
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      marginBottom:
                        formikProps.touched.register_mobile &&
                        formikProps.errors.register_mobile &&
                        !formikProps.values.register_mobile
                          ? 0
                          : 5,
                    }}>
                    <TextInput
                      placeholder="휴대전화번호를 입력해주세요."
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
                          height: 50,
                        },
                      ]}
                      value={formikProps.values.register_mobile}
                      onChangeText={(value) => {
                        setIsSend(false);
                        formikProps.setFieldValue('register_mobile', value);
                      }}
                      editable={!isSend ? true : false}
                      keyboardType="number-pad"
                      autoCapitalize="none"
                    />
                    {!reSend ? (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                          authenticateSMS(formikProps.values.register_mobile);
                          setMobileNo(formikProps.values.register_mobile);
                        }}
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: isSend ? '#ccc' : '#275696',
                          borderRadius: 4,
                          height: 50,
                          paddingHorizontal: 20,
                        }}
                        disabled={isSend ? true : false}>
                        <Text
                          style={[
                            styles.normalText,
                            {color: '#fff', textAlign: 'center'},
                          ]}>
                          인증번호 전송
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                          reAuthenticateSMS(formikProps.values.register_mobile);
                          setMobileNo(formikProps.values.register_mobile);
                        }}
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: isSend ? '#ccc' : '#275696',
                          borderRadius: 4,
                          height: 50,
                          paddingHorizontal: 20,
                        }}
                        disabled={isSend ? true : false}>
                        <Text
                          style={[
                            styles.normalText,
                            {color: '#fff', textAlign: 'center'},
                          ]}>
                          인증번호 재전송
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                  {isCounter ? (
                    <Timer
                      minutes={minutes}
                      setMinutes={setMinutes}
                      seconds={seconds}
                      setSeconds={setSeconds}
                      onFailConfirm={onFailConfirm}
                    />
                  ) : null}
                  {formikProps.touched.register_mobile &&
                  formikProps.errors.register_mobile &&
                  !formikProps.values.register_mobile ? (
                    <Text
                      style={{
                        width: '100%',
                        fontFamily: 'SCDream4',
                        fontSize: 12,
                        lineHeight: 18,
                        color: '#366DE5',
                        marginBottom: 15,
                      }}>
                      {formikProps.touched.register_mobile &&
                        formikProps.errors.register_mobile}
                    </Text>
                  ) : null}
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      marginBottom:
                        formikProps.touched.register_confirmMobile &&
                        formikProps.errors.register_confirmMobile
                          ? 0
                          : 5,
                    }}>
                    <TextInput
                      value=""
                      placeholder="인증번호를 입력해주세요."
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
                          height: 50,
                        },
                      ]}
                      value={formikProps.values.register_confirmMobile}
                      // onChangeText={formikProps.handleChange(
                      //   'register_confirmMobile',
                      // )}
                      // setMobileConfimed(false)
                      onChangeText={(value) => {
                        setMobileConfimed(false);
                        setMobileConfirmId(value);
                        formikProps.setFieldValue(
                          'register_confirmMobile',
                          value,
                        );
                      }}
                      keyboardType="number-pad"
                      autoCapitalize="none"
                      editable={isMobileConfimed ? false : true}
                    />
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() =>
                        confirmMobile(formikProps.values.register_confirmMobile)
                      }
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: isMobileConfimed ? '#ccc' : '#275696',
                        borderRadius: 4,
                        height: 50,
                        paddingHorizontal: 20,
                      }}
                      disabled={isMobileConfimed ? true : false}>
                      <Text
                        style={[
                          styles.normalText,
                          {color: '#fff', textAlign: 'center'},
                        ]}>
                        {isMobileConfimed ? '인증처리 완료' : '인증번호 확인'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {formikProps.touched.register_confirmMobile &&
                  formikProps.errors.register_confirmMobile &&
                  !isMobileConfimed ? (
                    <Text
                      style={{
                        width: '100%',
                        fontFamily: 'SCDream4',
                        fontSize: 12,
                        lineHeight: 18,
                        color: '#366DE5',
                        marginBottom: 15,
                      }}>
                      {formikProps.touched.register_confirmMobile &&
                        formikProps.errors.register_confirmMobile}
                    </Text>
                  ) : null}
                </View>
                {/* // 휴대폰 번호  */}

                {/* 이메일  */}
                <View
                  style={{
                    marginBottom:
                      formikProps.touched.register_email &&
                      formikProps.errors.register_email
                        ? 10
                        : 30,
                  }}>
                  <Text style={[styles.profileTitle, {marginBottom: 10}]}>
                    이메일
                  </Text>
                  <TextInput
                    placeholder="이메일을 입력해주세요."
                    placeholderTextColor="#A2A2A2"
                    style={[
                      styles.normalText,
                      {
                        borderWidth: 1,
                        borderColor: '#E3E3E3',
                        borderRadius: 4,
                        paddingHorizontal: 10,
                        height: 50,
                        marginBottom:
                          formikProps.touched.register_email &&
                          formikProps.errors.register_email
                            ? 5
                            : 0,
                      },
                    ]}
                    onChangeText={formikProps.handleChange('register_email')}
                    onBlur={formikProps.handleBlur('register_email')}
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />
                  {formikProps.touched.register_email &&
                  formikProps.errors.register_email ? (
                    <Text
                      style={{
                        width: '100%',
                        fontFamily: 'SCDream4',
                        fontSize: 12,
                        lineHeight: 18,
                        color: '#366DE5',
                        marginBottom: 15,
                      }}>
                      {formikProps.touched.register_email &&
                        formikProps.errors.register_email}
                    </Text>
                  ) : null}
                </View>
                {/* // 이메일  */}

                {/* 회사명  */}
                <View style={{marginBottom: 20}}>
                  <Text style={[styles.profileTitle, {marginBottom: 10}]}>
                    회사명
                  </Text>
                  <TextInput
                    placeholder="회사명을 입력해주세요."
                    placeholderTextColor="#A2A2A2"
                    style={[
                      styles.normalText,
                      {
                        borderWidth: 1,
                        borderColor: '#E3E3E3',
                        borderRadius: 4,
                        paddingHorizontal: 10,
                        height: 50,
                      },
                    ]}
                    onChangeText={formikProps.handleChange('register_company')}
                    autoCapitalize="none"
                  />
                </View>
                {/* // 회사명  */}
              </View>

              {formikProps.isSubmitting ? (
                <ActivityIndicator size="large" color="#275696" />
              ) : (
                <View style={{paddingHorizontal: 20, marginBottom: 50}}>
                  <TouchableOpacity
                    onPress={formikProps.handleSubmit}
                    // onPress={() => navigation.navigate('Signed')}
                    activeOpacity={0.8}>
                    <View style={[styles.submitBtn, {marginBottom: 10}]}>
                      <Text style={styles.submitBtnText}>회원가입</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    activeOpacity={0.8}>
                    <View style={styles.cancelBtn}>
                      <Text style={styles.cancelBtnText}>취소</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            </>
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
    lineHeight: 19,
    marginBottom: 7,
  },
  profileDesc: {
    fontFamily: 'SCDream4',
    fontSize: 15,
    lineHeight: 16,
    color: '#111',
  },
  submitBtn: {
    borderRadius: 4,
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
  picker: {
    width: 180,
  },
  listWrap: {
    paddingVertical: 20,
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

export default Register;
