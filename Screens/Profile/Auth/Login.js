import * as React from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  ScrollView,
  Platform,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {
  login as kLogin,
  getProfile,
  getAccessToken,
  logout,
} from '@react-native-seoul/kakao-login';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import {setFcmToken} from '../../../Modules/InfoReducer';
import {
  UserId,
  UserName,
  UserMobile,
  UserEmail,
  UserCompany,
  UserMobileCfm,
  UserType,
  UserProfileImg,
  UserEstimateCnt,
  SnsCheck,
  SnsType,
} from '../../../Modules/UserInfoReducer';
import Auth from '../../../src/api/Auth.js';

const Login = (props) => {
  const navigation = props.navigation;

  const dispatch = useDispatch();

  const loginIdRef = React.useRef(null);
  const loginPwdRef = React.useRef(null);

  const [fFcmToken, setFfcmToken] = React.useState(null); // fcmtoken 현재 페이지 저장
  const [checkPlatform, setCheckPlatform] = React.useState(null); // OS 체크
  const [loginId, setLoginId] = React.useState(null);
  const [loginPwd, setLoginPwd] = React.useState(null);

  const [autoLogin, setAutoLogin] = React.useState(false); // 자동 로그인
  const toggleCheck = () => {
    if (loginId !== null || loginPwd !== null) {
      setAutoLogin((prev) => !prev);
    } else {
      Alert.alert('아이디 또는 비밀번호를 입력해주세요', '', [
        {
          text: '확인',
        },
      ]);
    }
  };

  const storeData = async () => {
    try {
      const jsonValue = JSON.stringify({userId: loginId, userPwd: loginPwd});
      await AsyncStorage.setItem('@paper_info', jsonValue);
    } catch (e) {
      Alert.alert(e, '관리자에게 문의하세요', [
        {
          text: '확인',
        },
      ]);
    }
  };

  const [loggedIn, setloggedIn] = React.useState(false);
  const [userInfo, setuserInfo] = React.useState([]);

  // 구글 로그인 성공
  const gSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {accessToken, idToken} = await GoogleSignin.signIn();
      const userInfo = await GoogleSignin.signIn();
      setuserInfo(userInfo);
      setloggedIn(true);
      snsLogin(userInfo, 'google');
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        alert('Cancel');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        alert('Signin in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        alert('PLAY_SERVICES_NOT_AVAILABLE');
      } else {
        // some other error happened
        console.log('else err');
      }
    }
  };

  const socialGoogleConfigure = async () => {
    await GoogleSignin.configure({
      webClientId:
        '512027257209-o83borl6om72r886gb1qrf7ag6sh46ne.apps.googleusercontent.com',
    });
  };

  const snsLogin = (payload, type) => {
    console.log('payload', payload);

    let id = payload.user.id;
    let idToken = payload.idToken;
    let name = payload.user.name;
    let email = payload.user.email;

    Auth.onSnsLogin(id, idToken, name, email, checkPlatform, fFcmToken, type)
      .then((res) => {
        console.log('sns 로그인', res);
        if (res.data.result === '1') {
          dispatch(UserId(res.data.item.mb_id));
          dispatch(UserName(res.data.item.mb_name));
          dispatch(UserMobile(res.data.item.mb_hp));
          dispatch(UserEmail(res.data.item.mb_email));
          dispatch(UserCompany(res.data.item.mb_2));
          dispatch(UserMobileCfm(res.data.item.mb_1));
          dispatch(UserType(res.data.item.mb_level));
          dispatch(UserProfileImg(res.data.item.mb_profile));
          dispatch(UserEstimateCnt(res.data.item.estimate_cnt));
          dispatch(SnsCheck(res.data.item.sns_check));
          dispatch(SnsType(res.data.item.sns_type));
          navigation.navigate('Stack');
        }
      })
      .catch((err) => {
        Alert.alert(err, '관리자에게 문의하세요.', [
          {
            text: '확인',
          },
        ]);
      });
  };

  console.log('userInfo', userInfo);

  // kakao 로그인

  const [kakaoLoginLoading, setKakaoLoginLoading] = React.useState(false);
  const [naverToken, setNaverToken] = React.useState(null);

  // const kakaoLogin = async () => {
  //   const kLogin = await getAccessToken();
  //   let result = JSON.stringify(kLogin);
  //   console.log('kLogin', result);
  // };

  const kakaoLogin = async () => {
    try {
      const token = await kLogin();
      let jsonDe = JSON.stringify(token);
      Alert.alert(jsonDe);
    } catch (err) {
      console.log(err);
      Alert.alert('카카오톡 계정 정보가 없습니다.', '다시 확인해주세요.', [
        {
          text: '확인',
        },
      ]);
    }
  };

  // 비밀번호 보이기 기능
  const [pwdEyes, setPwdEyes] = React.useState(true);
  const togglePwdEyes = () => {
    setPwdEyes(!pwdEyes);
  };

  React.useEffect(() => {
    messaging()
      .getToken()
      .then((currentToken) => {
        setFfcmToken(currentToken);
        dispatch(setFcmToken(currentToken));
      })
      .catch((err) =>
        Alert.alert('관리자에게 문의하세요', err.messaging(), [
          {
            text: '확인',
          },
        ]),
      );

    socialGoogleConfigure();

    if (Platform.OS === 'ios') {
      setCheckPlatform('ios');
    } else {
      setCheckPlatform('aos');
    }
  }, []);

  // 로그인 API
  const login = () => {
    Auth.onLogin(loginId, loginPwd, fFcmToken, checkPlatform)
      .then((res) => {
        if (res.data.result === '1') {
          dispatch(UserId(res.data.item.mb_id));
          dispatch(UserName(res.data.item.mb_name));
          dispatch(UserMobile(res.data.item.mb_hp));
          dispatch(UserEmail(res.data.item.mb_email));
          dispatch(UserCompany(res.data.item.mb_2));
          dispatch(UserMobileCfm(res.data.item.mb_1));
          dispatch(UserType(res.data.item.mb_level));
          dispatch(UserProfileImg(res.data.item.mb_profile));
          dispatch(UserEstimateCnt(res.data.item.estimate_cnt));
          if (autoLogin) {
            storeData();
            navigation.navigate('Stack');
          } else {
            navigation.navigate('Stack');
          }
        } else {
          Alert.alert(res.data.message, '다시 시도해주세요.', [
            {
              text: '확인',
              onPress: () => loginIdRef.current.focus(),
            },
          ]);
        }
      })
      .catch((err) =>
        Alert.alert(err, '관리자에게 문의하세요', [
          {
            text: '확인',
          },
        ]),
      );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          justifyContent: 'space-around',
          alignItems: 'center',
          paddingTop: 70,
          zIndex: -100,
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 30,
          }}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={require('../../../src/assets/logo02.png')}
              resizeMode="contain"
              style={{
                width: Dimensions.get('window').width - 150,
                height: 50,
                marginBottom: 50,
              }}
            />
            <View style={{marginBottom: 30, paddingHorizontal: 40}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                  borderWidth: 1,
                  borderColor: '#E3E3E3',
                  borderRadius: 4,
                  marginBottom: 10,
                  height: 50,
                }}>
                <TextInput
                  ref={loginIdRef}
                  value={loginId}
                  placeholder="아이디"
                  style={[styles.normalText, {width: '80%'}]}
                  onChangeText={(text) => setLoginId(text)}
                  autoCapitalize="none"
                  onSubmitEditing={() => loginPwdRef.current.focus()}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                  borderWidth: 1,
                  borderColor: '#E3E3E3',
                  borderRadius: 4,
                  marginBottom: 10,
                  height: 50,
                }}>
                <TextInput
                  ref={loginPwdRef}
                  value={loginPwd}
                  placeholder="비밀번호"
                  placeholderTextColor="#A2A2A2"
                  style={[styles.normalText, {width: '80%'}]}
                  onChangeText={(text) => setLoginPwd(text)}
                  autoCapitalize="none"
                  secureTextEntry={pwdEyes}
                  // onSubmitEditing={() => login()}
                />
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={togglePwdEyes}
                  hitSlop={{top: 5, bottom: 5, right: 5, left: 5}}>
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

              <TouchableOpacity
                activeOpacity={1}
                onPress={toggleCheck}
                style={{
                  alignSelf: 'flex-end',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}
                hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}>
                <Text
                  style={[
                    {fontSize: 14, color: '#111111', marginRight: 5},
                    styles.normalText,
                  ]}>
                  자동 로그인
                </Text>
                <Image
                  source={
                    autoLogin
                      ? require('../../../src/assets/radio_on.png')
                      : require('../../../src/assets/radio_off.png')
                  }
                  resizeMode="cover"
                  style={{
                    width: 17,
                    height: 17,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{marginBottom: 20}}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => login()}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: Dimensions.get('window').width - 100,
                backgroundColor: '#275696',
                borderRadius: 4,
                paddingVertical: 15,
              }}>
              <Text style={[{fontSize: 16, color: '#fff'}, styles.normalText]}>
                로그인
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              width: Dimensions.get('window').width - 100,
            }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('FindId')}
              hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
              <Text style={styles.normalText}>아이디 찾기</Text>
            </TouchableOpacity>
            <View
              style={{height: '90%', width: 1, backgroundColor: '#E3E3E3'}}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('FindPwd')}
              hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
              <Text style={styles.normalText}>비밀번호 찾기</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20,
          }}>
          <View style={{width: 100, height: 1, backgroundColor: '#E3E3E3'}} />
          <Text
            style={[
              {fontSize: 16, color: '#111111', marginHorizontal: 16},
              styles.mediumText,
            ]}>
            소셜 로그인
          </Text>
          <View style={{width: 100, height: 1, backgroundColor: '#E3E3E3'}} />
        </View>

        <View style={{marginBottom: 10}}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => kakaoLogin()}
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: Dimensions.get('window').width - 100,
              backgroundColor: '#FAE105',
              borderRadius: 4,
              paddingVertical: 10,
              marginBottom: 10,
            }}>
            <Image
              source={require('../../../src/assets/kakao.png')}
              resizeMode="contain"
              style={{width: 30, height: 30}}
            />
            <Text style={[{fontSize: 14, color: '#2A1617'}, styles.normalText]}>
              카카오로 로그인
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => Alert.alert('네이버 로그인')}
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: Dimensions.get('window').width - 100,
              backgroundColor: '#27D34A',
              borderRadius: 4,
              paddingVertical: 16,
              marginBottom: 10,
            }}>
            <Image
              source={require('../../../src/assets/icon_n.png')}
              resizeMode="contain"
              style={{width: 30, height: 18}}
            />
            <Text style={[{fontSize: 14, color: '#fff'}, styles.normalText]}>
              네이버로 로그인
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => Alert.alert('애플로그인')}
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: Dimensions.get('window').width - 100,
              backgroundColor: '#333333',
              borderRadius: 4,
              paddingVertical: 10,
              marginBottom: 10,
            }}>
            <Image
              source={require('../../../src/assets/apple.png')}
              resizeMode="contain"
              style={{width: 30, height: 30}}
            />
            <Text style={[{fontSize: 14, color: '#fff'}, styles.normalText]}>
              애플로 로그인
            </Text>
          </TouchableOpacity>
          {/* <GoogleSigninButton
            style={{width: 192, height: 48}}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={gSignIn}
            // disabled={this.state.isSigninInProgress}
          /> */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => gSignIn()}
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: Dimensions.get('window').width - 100,
              borderWidth: 1,
              borderColor: '#333333',
              backgroundColor: '#fff',
              borderRadius: 4,
              paddingVertical: 4,
            }}>
            <Image
              source={require('../../../src/assets/gg.png')}
              resizeMode="contain"
              style={{width: 38, height: 40}}
            />
            <Text style={[{fontSize: 14, color: '#333333'}, styles.normalText]}>
              구글로 로그인
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={[
              styles.normalText,
              {fontSize: 14, color: '#ADADAD', marginRight: 10},
            ]}>
            아직 가입되지 않은 회원입니까?
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Register')}
            style={{
              paddingHorizontal: 10,
              paddingVertical: 10,
            }}>
            <Text style={[styles.normalText, {fontSize: 14, color: '#275696'}]}>
              회원가입
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  textInput: {
    width: Dimensions.get('window').width - 100,
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 4,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    marginBottom: 10,
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

export default Login;
