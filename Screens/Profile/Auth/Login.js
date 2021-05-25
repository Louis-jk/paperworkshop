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
  BackHandler, 
  ToastAndroid,
  ActivityIndicator,
  SafeAreaView
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
// import {
//   login as kLogin,
//   getProfile as getKakaoProfile,
// } from '@react-native-seoul/kakao-login'; // 카카오 로그인
import KakaoSDK from '@actbase/react-kakaosdk';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin'; // 구글 로그인
import {NaverLogin, getProfile} from '@react-native-seoul/naver-login'; // 네이버 로그인
import jwtDecode from 'jwt-decode';
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
  LoginCheck,
} from '../../../Modules/UserInfoReducer';
import Auth from '../../../src/api/Auth.js';
import {SCDream4, SCDream5, SCDream6} from '../../../src/font';

// Apple login login start
import { appleAuth } from '@invertase/react-native-apple-authentication';

/**
 * You'd technically persist this somewhere for later use.
 */
let user = null;

/**
 * Fetches the credential state for the current user, if any, and updates state on completion.
 */
async function fetchAndUpdateCredentialState(updateCredentialStateForUser) {
  if (user === null) {
    updateCredentialStateForUser('N/A');
  } else {
    const credentialState = await appleAuth.getCredentialStateForUser(user);
    if (credentialState === appleAuth.State.AUTHORIZED) {
      updateCredentialStateForUser('AUTHORIZED');
    } else {
      updateCredentialStateForUser(credentialState);
    }
  }
}

/**
 * Starts the Sign In flow.
 */
async function onAppleButtonPress(updateCredentialStateForUser) {
  console.warn('Beginning Apple Authentication');

  // start a login request
  try {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    const {
      user: newUser,
      email,
      nonce,
      identityToken,
      realUserStatus /* etc */,
    } = appleAuthRequestResponse;

    user = newUser;

    fetchAndUpdateCredentialState(updateCredentialStateForUser).catch(error =>
      updateCredentialStateForUser(`Error: ${error.code}`),
    );

    if (identityToken) {
      // e.g. sign in with Firebase Auth using `nonce` & `identityToken`
      console.log(nonce, identityToken);
    } else {
      // no token - failed sign-in?
    }

    if (realUserStatus === appleAuth.UserStatus.LIKELY_REAL) {
      console.log("사람입니다.");
    }

    console.warn(`Apple Authentication Completed, ${user}, ${email}`);
  } catch (error) {
    if (error.code === appleAuth.Error.CANCELED) {
      console.warn('애플 로그인을 취소하였습니다.');
    } else {
      console.error(error);
    }
  }
}
// Apple login login end

const Login = (props) => {
  const navigation = props.navigation;

  const dispatch = useDispatch();
  const [credentialStateForUser, updateCredentialStateForUser] = React.useState(-1);
  console.log("credentialStateForUser", credentialStateForUser);

  const loginIdRef = React.useRef(null);
  const loginPwdRef = React.useRef(null);

  const [fFcmToken, setFfcmToken] = React.useState(null); // fcmtoken 현재 페이지 저장
  const [checkPlatform, setCheckPlatform] = React.useState(null); // OS 체크
  const [loginId, setLoginId] = React.useState(null);
  const [loginPwd, setLoginPwd] = React.useState(null);
  const [isLoading, setLoading] = React.useState(false);

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

  // SNS 로그인 처리(디비 접속)
  const SnsLoginHandler = (payload, token, type) => {
    let kakaoPhoneNum = '';
    let applePhoneNum = '';
    let appleName = '';
    let appleEmail = '';

    if (type === 'kakao') {
      // kakaoPhoneNum = payload.phoneNumber !== 'null' ? payload.phoneNumber : '';
      kakaoPhoneNum = '';
    }
    if (type === 'apple') {
      applePhoneNum = '';
      if(payload.email !== '' || payload.email !== null) {
        appleEmail = payload.email;
      } else {
        appleEmail = '';
      }

    }

    let id = type === 'google' ? payload.user.id : type === 'apple' ? payload.sub : payload.id;
    let idToken = token;
    let name =
      type === 'naver'
        ? payload.name
        : type === 'kakao'
        ? payload.properties.nickname
        : type === 'apple' 
        ? appleName
        : payload.user.name;
    let email = type === 'google' ? payload.user.email : type === 'kakao' ? payload.kakao_account.email : type === 'apple' ? appleEmail : payload.email;
    let profileImg =
      type === 'naver'
        ? payload.profile_image
        : type === 'kakao'
        ? payload.properties.profile_image
        : type === 'apple'
        ? ''
        : payload.user.photo;
    let mobile =
      type === 'naver' ? payload.mobile : type === 'kakao' ? kakaoPhoneNum : '';

    Auth.onSnsLogin(
      id,
      idToken,
      name,
      email,
      checkPlatform,
      fFcmToken,
      type,
      profileImg,
      mobile,
    )
      .then((res) => {
        console.log('sns 로그인', res);
        if (res.data.result === '1') {
          dispatch(UserId(res.data.item.mb_id));
          dispatch(UserName(res.data.item.mb_name));
          dispatch(UserMobile(res.data.item.mb_hp));
          dispatch(UserEmail(res.data.item.mb_email));
          dispatch(UserCompany(res.data.item.mb_2));
          dispatch(UserMobile(res.data.item.mb_hp));
          dispatch(UserMobileCfm(res.data.item.mb_1));
          dispatch(UserType(res.data.item.mb_level));
          dispatch(UserProfileImg(res.data.item.mb_profile));
          dispatch(UserEstimateCnt(res.data.item.estimate_cnt));
          dispatch(SnsCheck(res.data.item.sns_check));
          dispatch(SnsType(res.data.item.sns_type));
          dispatch(LoginCheck('Y'));
          navigation.navigate('Stack');
          // const resetAction = CommonActions.reset({
          //   index: 1,
          //   routes: [
          //     { name: 'EntryBefore' },
          //   ],
          // });
          // navigation.dispatch(resetAction);
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

  // 애플 로그인   
  const appleLogin = async () => {
    
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      console.log("appleAuthRequestResponse",appleAuthRequestResponse);

      const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

      if(credentialState === appleAuth.State.AUTHORIZED) {
        const {identityToken, user, email, nonce, realUserStatus} = appleAuthRequestResponse;
       
        const decoded = jwtDecode(identityToken);

        let appleUserInfo = {
          idToken : identityToken,
          user,
          email,
          nonce,
          realUserStatus
        }
        await SnsLoginHandler(decoded, identityToken, 'apple');
        // console.log("decoded", decoded);
        // console.log("appleUserInfo", appleUserInfo);
        // console.log("user", user);
        // console.log("identityToken", identityToken);
      }      
    }
    catch(err) {
      if(err.code === appleAuth.Error.CANCELED) {
        // console.warn('User canceled Apple Sign in.');
        Alert.alert('애플로 로그인을 취소하셨습니다.', '', [
          {
            text: '확인'
          }
        ])
      }
      else {
        Alert.alert('애플 로그인에 실패했습니다.','', [
          {
            text: '확인'
          }
        ]);
        console.error(err);
      }
    }
  }

  // 구글 로그인
  const [userInfo, setuserInfo] = React.useState([]);

  const gSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {accessToken, idToken} = await GoogleSignin.signIn();
      const userInfo = await GoogleSignin.signIn();
      setuserInfo(userInfo);
      console.log('userInfo', userInfo);
      SnsLoginHandler(userInfo, userInfo.idToken, 'google');
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        Alert.alert('구글 로그인을 취소하셨습니다.','', [
          {
            text: '확인'
          }
        ]);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        // alert('Signin in progress');
        Alert.alert('구글 로그인 진행 중.','', [
          {
            text: '확인'
          }
        ]);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        // alert('PLAY_SERVICES_NOT_AVAILABLE');
        Alert.alert('귀하의 구글 계정은 사용하실 수 없는 계정입니다.','', [
          {
            text: '확인'
          }
        ]);
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

  // 카카오 로그인
  const kakaoLogin = async () => {
    try{
      KakaoSDK.init('2194770efdaf3f52d4f09e1dc7f0c83b');
      const tokens = await KakaoSDK.login();
      console.log("kakao login tokens :: ", tokens);
      await kakaoGetProfile(tokens.access_token);
      // const accessToken = await KakaoSDK.getAccessToken();
      // console.log("kakao accessToken :: ", accessToken);
    }catch(err) {
      Alert.alert('카카오톡 계정 정보가 없습니다.', '카카오톡을 사용 중이신지 확인해주세요.', [
        {
          text: '확인',
        },
      ]);
    }
    
  }

  const kakaoGetProfile = async (accessToken) => {
    try{
      const profile = await KakaoSDK.getProfile();
      console.log("kakao profile ::", profile);
      await SnsLoginHandler(profile, accessToken, 'kakao');
    } catch(err) {
      Alert.alert('오류가 발생하였습니다.', '다시 확인해주세요.', [
        {
          text: '확인',
        },
      ]);
    }    
  }
  
  // const kakaoLogin = async () => {
  //   try {
  //     const kakaoToken = await kLogin();
  //     console.log('kakao ', kakaoToken);
  //     alert("kakao", kakaoToken);
  //     await getKakaoProfileHandler(kakaoToken.accessToken);
  //   } catch (err) {
  //     console.log(err);
  //     alert("err", err);
  //     Alert.alert('카카오톡 계정 정보가 없습니다.', '카카오톡을 사용 중이신지 확인해주세요.', [
  //       {
  //         text: '확인',
  //       },
  //     ]);
  //   }
  // };

  // const getKakaoProfileHandler = async (accessToken) => {
  //   try {
  //     const profile = await getKakaoProfile();
  //     console.log('profile', profile);
  //     await SnsLoginHandler(profile, accessToken, 'kakao');
  //   } catch (err) {
  //     Alert.alert('오류가 발생하였습니다.', '다시 확인해주세요.', [
  //       {
  //         text: '확인',
  //       },
  //     ]);
  //   }
  // };

  // 네이버 로그인
  const ioskeys = {
    kConsumerKey: 'zXPV13LnmSXZKOK5I98c',
    kConsumerSecret: 'LC6fGLiHQq',
    kServiceAppName: '페이퍼공작소',
    kServiceAppUrlScheme: 'testapp', // only for iOS
  };

  const androidkeys = {
    kConsumerKey: 'zXPV13LnmSXZKOK5I98c',
    kConsumerSecret: 'LC6fGLiHQq',
    kServiceAppName: '페이퍼공작소',
  };

  const initials = Platform.OS === 'ios' ? ioskeys : androidkeys;

  const [naverToken, setNaverToken] = React.useState(null);

  const naverLoginHandler = (props) => {
    return new Promise((resolve, reject) => {
      NaverLogin.login(props, (err, token) => {
        console.log(`\n\n  Token is fetched  :: ${token} \n\n`);
        setNaverToken(token);
        getUserProfile(token);
        if (err) {
          reject(err);
          return;
        }
        resolve(token);
      });
    });
  };

  const getUserProfile = async (token) => {
    const profileResult = await getProfile(token.accessToken);
    if (profileResult.resultcode === '024') {
      Alert.alert('네이버 계정 로그인을 실패하였습니다.', profileResult.message);
      return;
    }
    console.log('profileResult', profileResult);
    SnsLoginHandler(profileResult.response, token.accessToken, 'naver');
  };

  //  자동 로그인 처리
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

  // 비밀번호 보이기 기능
  const [pwdEyes, setPwdEyes] = React.useState(true);
  const togglePwdEyes = () => {
    setPwdEyes(!pwdEyes);
  };

  // 안드로이드 뒤로가기 버튼 제어  
  let currentCount = 0;

  const backAction = () => {    
    if (currentCount < 1) {      
      ToastAndroid.show("한번 더 누르면 앱을 종료합니다.", ToastAndroid.SHORT);
      console.log("0에 해당");
      currentCount++;
    } else {
      console.log("1에 해당");
      BackHandler.exitApp();
    }

    setTimeout(() => {
      currentCount = 0;
    }, 2000);

    return true;
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

    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () => BackHandler.removeEventListener("hardwareBackPress", backAction);

  }, []);

  // 로그인 API
  const login = () => {
    setLoading(true);
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
          dispatch(LoginCheck('Y'));
          if (autoLogin) {
            storeData();
            navigation.navigate('Stack');
            // const resetAction = CommonActions.reset({
            //   index: 1,
            //   routes: [
            //     { name: 'EntryBefore' },
            //   ],
            // });
            // navigation.dispatch(resetAction);
          } else {
            navigation.navigate('Stack');
            // const resetAction = CommonActions.reset({
            //   index: 1,
            //   routes: [
            //     { name: 'EntryBefore' },
            //   ],
            // });
            // navigation.dispatch(resetAction);            
          }
          setLoading(false);
        } else {
          setLoading(false);
          Alert.alert(res.data.message, '다시 시도해주세요.', [
            {
              text: '확인',
              onPress: () => loginIdRef.current.focus(),
            },
          ]);
        }
      })
      .catch((err) => {
        setLoading(false);
        Alert.alert(err, '관리자에게 문의하세요', [
          {
            text: '확인',
          },
        ])
      });
  };

  // 애플 로그인 관련 start
  React.useEffect(() => {
    if (!appleAuth.isSupported) return;

    fetchAndUpdateCredentialState(updateCredentialStateForUser).catch(error =>
      updateCredentialStateForUser(`Error: ${error.code}`),
    );
  }, []);
  
  React.useEffect(() => {
    if (!appleAuth.isSupported) return;

    return appleAuth.onCredentialRevoked(async () => {
      console.warn('Credential Revoked');
      fetchAndUpdateCredentialState(updateCredentialStateForUser).catch(error =>
        updateCredentialStateForUser(`Error: ${error.code}`),
      );
    });
  }, []);

  if (!appleAuth.isSupported) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <Text>Apple Authentication is not supported on this device.</Text>
      </View>
    );
  }
  // 애플 로그인 관련 end


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
      <SafeAreaView style={{ backgroundColor: '#fff' }}>
        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <View
          style={{
            flex: 1,
            height: Dimensions.get('window').height,
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

          <View>
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
              onPress={() => naverLoginHandler(initials)}
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
            {Platform.OS === 'ios' ? (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => appleLogin()}
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
            ) : null}
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
      </SafeAreaView>
    </>
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
    fontFamily: SCDream4,
  },
  mediumText: {
    fontFamily: SCDream5,
  },
  boldText: {
    fontFamily: SCDream6,
  },
});

export default Login;
