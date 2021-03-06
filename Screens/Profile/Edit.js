import * as React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from 'react-native';

import {
  UserId,
  UserName,
  UserMobile,
  UserEmail,
  UserMobileCfm,
  UserCompany,
  UserProfileImg,
} from '../../Modules/UserInfoReducer';

import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import qs from 'qs';
import ImagePicker from 'react-native-image-crop-picker';
import FastImage from 'react-native-fast-image';

import Header from '../Common/DetailHeader';
import Timer from '../Common/Timer';
import {SCDream4, SCDream5, SCDream6} from '../../src/font';

const baseUrl = 'http://dmonster1506.cafe24.com/json/proc_json.php/';

const Edit = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  const dispatch = useDispatch();

  // Redux 에서 유저 정보 가져오기
  const {
    mb_id,
    mb_email,
    mb_name,
    mb_hp,
    mb_1,
    mb_2,
    mb_profile_img,
    sns_check,
    sns_type,
  } = useSelector((state) => state.UserInfoReducer);

  const [profileImg, setProfileImg] = React.useState(null);

  const [source, setSource] = React.useState({});

  // 프로필 사진 설정
  const pickImageHandler = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      sortOrder: 'none',
      compressImageMaxWidth: 500,
      compressImageMaxHeight: 500,
      compressImageQuality: 1,
      compressVideoPreset: 'MediumQuality',
      includeExif: true,
      cropperCircleOverlay: true,
      useFrontCamera: false,
      // includeBase64: true,
      cropping: true,
    })
      .then((img) => {
        dispatch(UserProfileImg(img.path));
        setSource({
          uri: img.path,
          type: img.mime,
          name: img.path.slice(img.path.lastIndexOf('/')),
        });
        setProfileImg(img.path);
      })
      .catch((e) => console.log(e));
  };

  // 회원 정보 수정시 입력값 담기
  const [pwd, setPwd] = React.useState(null);
  const [mobileConfirmNum, setMobileConfirmNum] = React.useState('null');
  const [email, setEmail] = React.useState(null);
  const [company, setCompany] = React.useState(null);

  // 비밀번호 보이기 기능
  const [pwdEyes, setPwdEyes] = React.useState(true);
  const togglePwdEyes = () => {
    setPwdEyes(!pwdEyes);
  };

  // 모바일 번호 임시 저장
  const [mobileNo, setMobileNo] = React.useState(null);
  const mobileRef = React.useRef(null);

  // 모바일 인증 아이디 저장 및 버튼 색상 변화 상태
  const [mobileConfirmId, setMobileConfirmId] = React.useState(null);
  const [isMobileConfimed, setMobileConfimed] = React.useState(false);

  // 인증시 카운터
  const [minutes, setMinutes] = React.useState(0);
  const [seconds, setSeconds] = React.useState(0);
  const [isCounter, setIsCounter] = React.useState(false);
  const confirmCount = (num) => {
    setIsCounter(true);
    setMinutes(num);
    // setSeconds(num);
  };

  const confirmClearCount = (num) => {
    setIsCounter(false);
    setMinutes(num);
    // setSeconds(num);
  };

  const [isSend, setIsSend] = React.useState(false);

  const onFailConfirm = () => {
    setIsSend(false);
    setReSend(true);
    setReSendStatus('y');
  };

  // 인증여부 mb_1 의 인증'Y' 미인증 'N'를 위한 상태값
  const [confirm, setConfirm] = React.useState('Y');

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
            setConfirm('Y');
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

  // 본인인증(휴대전화번호) 인증번호 입력 시간 초과로 재전송일 경우 로직
  const reAuthenticateSMS = (register_mobile) => {
    setConfirm('N');
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
          mb_hp: register_mobile,
          cert_num: null,
          rt_yn: 'Y',
        }),
      })
        .then((res) => {
          if (res.data.result == '1') {
            // setMobileConfirmId(res.data.item);
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

  const beforeEditComplete = (
    mb_id,
    mb_name,
    mb_hp,
    mb_1,
    mb_email,
    mb_2,
    mb_img,
  ) => {
    dispatch(UserId(mb_id));
    dispatch(UserName(mb_name));
    dispatch(UserMobile(mb_hp));
    dispatch(UserMobileCfm(mb_1));
    dispatch(UserEmail(mb_email));
    dispatch(UserCompany(mb_2));
    // dispatch(UserProfileImg(mb_img));
    navigation.navigate('Stack');
  };

  const frmdata = new FormData();
  frmdata.append('method', 'proc_modify_member');
  frmdata.append('mb_id', mb_id);
  frmdata.append('mb_password', pwd ? pwd : '');
  frmdata.append('mb_hp', mobileNo);
  frmdata.append('mb_1', confirm);
  frmdata.append('mb_email', email ? email : mb_email);
  frmdata.append('mb_2', company ? company : mb_2 ? mb_2 : '');
  frmdata.append('mb_img', source);

  const [imgMime, setImgMime] = React.useState(null);

  // React.useEffect(() => {
  //   if (mb_profile_img) {
  //     const sliceImg = mb_profile_img.slice(mb_profile_img.lastIndexOf('.'));
  //     if (sliceImg === '.gif') {
  //       setImgMime('gif');
  //     }
  //   }
  // }, [mb_profile_img]);

  const getProfileInf = React.useCallback(() => {
    if (mb_profile_img) {
      const sliceImg = mb_profile_img.slice(mb_profile_img.lastIndexOf('.'));
      if (sliceImg === '.gif') {
        setImgMime('gif');
      }
    }
  }, [mb_profile_img]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getProfileInf();
    });

    return unsubscribe;
  }, [navigation]);

  const onSubmit = () => {

    if(!isMobileConfimed) {
      Alert.alert('휴대폰 번호를 인증해주세요.','', [
        {
          text: '확인',
          onPress: () => mobileRef.current.focus()
        }
      ])
    } else {
      axios({
        method: 'post',
        url: `${baseUrl}`,
        data: frmdata,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((res) => {
          if (res.data.result === '1') {
            Alert.alert(
              '수정되었습니다.',
              '확인을 누르시면 메인으로 이동합니다.',
              [
                {
                  text: '확인',
                  onPress: () =>
                    beforeEditComplete(
                      res.data.item.mb_id,
                      res.data.item.mb_name,
                      res.data.item.mb_hp,
                      res.data.item.mb_1,
                      res.data.item.mb_email,
                      res.data.item.mb_2,
                      // res.data.item.mb_img,
                    ),
                },
                {
                  text: '취소',
                },
              ],
            );
          } else {
            Alert.alert(res.data.message);
          }
        })
        .catch((err) => {
          Alert.alert(err, '관리자에게 문의하세요', [
            {
              text: '확인',
            },
          ]);
        });
    }    
  };

  return (
    <>
      <Header title={routeName} navigation={navigation} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={{backgroundColor: '#F5F5F5'}}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              marginVertical: 10,
              paddingTop: 10,
            }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={pickImageHandler}
              style={{
                borderWidth: 1,
                borderColor: '#E3E3E3',
                borderRadius: 100,
              }}>
              {mb_profile_img && imgMime !== 'gif' ? (
                <Image
                  source={{uri: `${mb_profile_img}`}}
                  resizeMode="cover"
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 100,
                  }}
                />
              ) : mb_profile_img && imgMime === 'gif' ? (
                <FastImage
                  source={{uri: `${mb_profile_img}`}}
                  resizeMode={FastImage.resizeMode.contain}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 100,
                  }}
                />
              ) : (
                <Image
                  source={require('../../src/assets/photo.png')}
                  resizeMode="cover"
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 100,
                  }}
                />
              )}
            </TouchableOpacity>
            <Text
              style={[
                styles.normalText,
                {
                  textAlign: 'center',
                  fontSize: 15,
                  marginVertical: 5,
                  letterSpacing: -1,
                },
              ]}>
              프로필 이미지 등록
            </Text>
          </View>
        </View>
        <View style={{paddingHorizontal: 20, paddingVertical: 20}}>
          <View style={styles.profileBox}>
            <Text style={styles.profileTitle}>아이디</Text>
            {sns_check !== 'Y' ? (
              <Text style={styles.profileDesc}>{mb_id}</Text>
            ) : sns_check === 'Y' && sns_type === 'google' ? (
              <View
                style={{
                  alignSelf: 'flex-start',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: '#E3E3E3',
                  borderRadius: 5,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}>
                <Image
                  source={require('../../src/assets/gg.png')}
                  resizeMode="cover"
                  style={{
                    width: 17,
                    height: 25,
                    marginRight: 5,
                  }}
                />
                <Text
                  style={{
                    fontFamily: SCDream4,
                    fontSize: 14,
                  }}>
                  구글 로그인 완료
                </Text>
              </View>
            ) : sns_check === 'Y' && sns_type === 'kakao' ? (
              <View
                style={{
                  alignSelf: 'flex-start',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: '#FAE100',
                  borderRadius: 5,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  backgroundColor: '#FAE100',
                }}>
                <Image
                  source={require('../../src/assets/kakao.png')}
                  resizeMode="cover"
                  style={{
                    width: 17,
                    height: 20,
                    marginRight: 5,
                  }}
                />
                <Text
                  style={{
                    fontFamily: SCDream4,
                    fontSize: 14,
                  }}>
                  카카오 로그인 완료
                </Text>
              </View>
            ) : sns_check === 'Y' && sns_type === 'apple' ? (
              <View
                style={{
                  alignSelf: 'flex-start',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: '#222',
                  borderRadius: 5,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  backgroundColor: '#222',
                }}>
                <Image
                  source={require('../../src/assets/apple.png')}
                  resizeMode="cover"
                  style={{
                    width: 13,
                    height: 20,
                    marginRight: 5,
                  }}
                />
                <Text
                  style={{
                    fontFamily: SCDream4,
                    fontSize: 14,
                    color: '#fff',
                  }}>
                  애플 로그인 완료
                </Text>
              </View>
            ) : sns_check === 'Y' && sns_type === 'naver' ? (
              <View
                style={{
                  alignSelf: 'flex-start',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: '#2DB400',
                  borderRadius: 5,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  backgroundColor: '#2DB400',
                }}>
                <Image
                  source={require('../../src/assets/naver.png')}
                  resizeMode="cover"
                  style={{
                    width: 12,
                    height: 13,
                    marginRight: 5,
                  }}
                />
                <Text
                  style={{
                    fontFamily: SCDream4,
                    fontSize: 14,
                    color: '#fff',
                  }}>
                  네이버 로그인 완료
                </Text>
              </View>
            ) : null}
          </View>

          {/* 회원 등급 */}
          <View style={styles.profileBox}>
            <Text style={[styles.profileTitle, {marginBottom: 10}]}>
              회원등급
            </Text>
            <View style={styles.flexRowCenter}>
              <Text style={styles.profileDesc}>일반회원</Text>
            </View>
          </View>

          {/* // 회원 등급 */}

          {/* 성함 변경 */}
          <View style={styles.profileBox}>
            <Text style={[styles.profileTitle, {marginBottom: 10}]}>성함</Text>
            {sns_type !== 'apple' ? 
            <View style={styles.flexRowCenter}>
              <Text style={styles.profileDesc}>{mb_name}</Text>
            </View>
            : null }
            {sns_type === 'apple' ? 
            <TextInput
              value={mb_name}
              placeholder="성함을 입력해주세요."
              placeholderTextColor="#aaa"
              style={[
                styles.normalText,
                {
                  borderWidth: 1,
                  borderColor: '#E3E3E3',
                  borderRadius: 4,
                  paddingHorizontal: 10,
                  color: '#111',
                  height: 50
                },
              ]}
              autoCapitalize="none"
              // editable={false}
            />
            : null }
          </View>
          {/* // 성함 변경 */}

          {/* 비밀번호 변경 */}
          {sns_check !== 'Y' && (
            <View style={styles.profileBox}>
              <Text style={[styles.profileTitle, {marginBottom: 10}]}>
                비밀번호 변경
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
                  marginBottom: 5,
                  height: 50,
                }}>
                <TextInput
                  value={pwd}
                  placeholder="비밀번호를 변경하시려면 입력해주세요."
                  placeholderTextColor="#A2A2A2"
                  style={[styles.normalText, {width: '90%'}]}
                  onChangeText={(text) => setPwd(text)}
                  autoCapitalize="none"
                  secureTextEntry={pwdEyes}
                />
                <TouchableOpacity activeOpacity={0.8} onPress={togglePwdEyes}>
                  <Image
                    source={
                      pwdEyes
                        ? require('../../src/assets/icon_eye.png')
                        : require('../../src/assets/icon_eye_on.png')
                    }
                    resizeMode="center"
                    style={{width: 35, height: 20}}
                  />
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  fontFamily: SCDream4,
                  fontSize: 12,
                  color: '#366DE5',
                }}>
                ※ 비밀번호를 변경하시지 않을 경우 공백상태로 두셔도 됩니다.
              </Text>
            </View>
          )}
          {/* // 비밀번호 변경 */}

          {/* 휴대폰 번호 변경 */}
          <View style={styles.profileBox}>
            <Text style={[styles.profileTitle, {marginBottom: 10}]}>
              휴대폰 번호
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginBottom: 5,
              }}>
              <TextInput
                ref={mobileRef}
                value={mb_hp ? mb_hp : mobileNo}
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
                    height: 50
                  },
                ]}
                onChangeText={(text) => setMobileNo(text)}
                keyboardType="number-pad"
                autoCapitalize="none"
                editable={!isSend ? true : false}
              />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => reAuthenticateSMS(mobileNo)}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: isSend ? '#ccc' : '#275696',
                  borderRadius: 4,
                  height: 50,
                  paddingHorizontal: 20,
                }}>
                <Text
                  style={[
                    styles.normalText,
                    {color: '#fff', textAlign: 'center'},
                  ]}>
                  인증번호 전송
                </Text>
              </TouchableOpacity>
              {/* 처음 Default의 경우,  Disabled(버튼명은 "인증완료") TextInput을 누르면 버튼 Active 상태로 바뀌면서 재인증 하기 text로 변경 md_1 은 최초 Y상태, TextInput을 누르면 mb_1은 N으로 변경되도록, 인증처리 전까지 */}
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
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginBottom: 5,
              }}>
              <TextInput
                value={mobileConfirmId}
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
                    height: 50
                  },
                ]}
                onChangeText={(text) => setMobileConfirmId(text)}
                keyboardType="number-pad"
                autoCapitalize="none"
                editable={isMobileConfimed ? false : true}
              />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => confirmMobile(mobileConfirmNum)}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: isMobileConfimed ? '#ccc' : '#275696',
                  borderRadius: 4,
                  height: 50,
                  paddingHorizontal: 20,
                }}>
                <Text
                  style={[
                    styles.normalText,
                    {color: '#fff', textAlign: 'center'},
                  ]}>
                  {isMobileConfimed ? '인증처리 완료' : '인증번호 확인'}
                </Text>
              </TouchableOpacity>
            </View>
            <Text
                style={{
                  fontFamily: SCDream4,
                  fontSize: 12,
                  color: '#366DE5',
                }}>
                ※ 휴대폰 번호는 반드시 입력하여 인증받으셔야 합니다.
              </Text>
          </View>
          {/* // 휴대폰 번호 변경 */}

          {/* 이메일 변경 */}
          <View style={styles.profileBox}>
            <Text style={[styles.profileTitle, {marginBottom: 10}]}>
              이메일
            </Text>
            {(sns_type !== 'kakao' && sns_type !== 'google' && sns_type !== 'naver')? (
              <TextInput
                value={email ? email : mb_email}
                placeholder="이메일을 입력해주세요."
                placeholderTextColor="#A2A2A2"
                style={[
                  styles.normalText,
                  {
                    borderWidth: 1,
                    borderColor: '#E3E3E3',
                    borderRadius: 4,
                    paddingHorizontal: 10,
                    height: 50
                  },
                ]}
                onChangeText={(text) => setEmail(text)}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            ) : (
              <View>
                <Text>{mb_email}</Text>
              </View>
            )}
          </View>
          {/* // 이메일 변경 */}

          {/* 회사명 변경 */}
          <View style={styles.profileBox}>
            <Text style={[styles.profileTitle, {marginBottom: 10}]}>
              회사명
            </Text>
            <TextInput
              value={company ? company : mb_2 ? mb_2 : null}
              placeholder="회사명을 입력해주세요."
              placeholderTextColor="#A2A2A2"
              style={[
                styles.normalText,
                {
                  borderWidth: 1,
                  borderColor: '#E3E3E3',
                  borderRadius: 4,
                  paddingHorizontal: 10,
                  height: 50
                },
              ]}
              onChangeText={(text) => setCompany(text)}
              autoCapitalize="none"
            />
          </View>
          {/* // 회사명 변경 */}
        </View>

        <View style={{paddingHorizontal: 20, marginBottom: 50}}>
          <TouchableOpacity onPress={() => onSubmit()} activeOpacity={0.8}>
            <View style={[styles.submitBtn, {marginBottom: 10}]}>
              <Text style={styles.submitBtnText}>수정 완료</Text>
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
    marginBottom: 25,
  },
  profileTitle: {
    fontFamily: SCDream5,
    fontSize: 15,
    lineHeight: 19,
    marginBottom: 10,
  },
  profileDesc: {
    fontFamily: SCDream4,
    fontSize: 15,
    color: '#111',
  },
  submitBtn: {
    borderRadius: 4,
    backgroundColor: '#275696',
    width: '100%',
    paddingVertical: 15,
  },
  submitBtnText: {
    fontFamily: SCDream4,
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
    fontFamily: SCDream4,
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
    fontFamily: SCDream4,
    fontSize: 14,
    lineHeight: 19,
    marginBottom: 5,
  },
  listDesc: {
    fontFamily: SCDream4,
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
    fontFamily: SCDream4,
  },
  mediumText: {
    fontFamily: SCDream5,
  },
  boldText: {
    fontFamily: SCDream6,
  },
});

export default Edit;
