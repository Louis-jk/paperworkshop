import * as React from 'react';
import {View, Text, Alert, ActivityIndicator} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  LoginCheck,
} from '../../../Modules/UserInfoReducer';
import Auth from '../../../src/api/Auth.js';

const Check = (props) => {
  const navigation = props.navigation;

  const dispatch = useDispatch();

  // FCM 토큰과 플랫폼 가져오기
  const getTokenPlatformAPI = () => {
    messaging()
      .getToken()
      .then((currentToken) => {
        dispatch(setFcmToken(currentToken));

        if (Platform.OS === 'ios') {
          getData(currentToken, 'ios');
        } else {
          getData(currentToken, 'aos');
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

  //  Async Storage에 UserID, UserPwd가 있는지 확인(자동로그인의 경우)
  const getData = async (token, device) => {
    try {
      const jsonValue = await AsyncStorage.getItem('@paper_info');
      if (jsonValue !== null) {
        const UserInfo = JSON.parse(jsonValue);
        const uId = UserInfo.userId;
        const uPwd = UserInfo.userPwd;
        // 있다면 로그인API 호출 (UserID, UserPwd, FcmToken, Platform)
        login(uId, uPwd, token, device);
      } else {
        // 없다면 로그인 화면으로 이동
        navigation.navigate('Login');
      }
    } catch (e) {
      // error reading value
      console.log('스토리지 에러', e);
    }
  };

  // 로그인 API
  const login = (id, pwd, fToken, cDevice) => {
    Auth.onLogin(id, pwd, fToken, cDevice)
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
          navigation.navigate('EntryBefore');
        } else {
          navigation.navigate('Login');
        }
      })
      .catch((err) => {
        navigation.navigate('Login');
      });
    // navigation.navigate('Stack')
  };

  React.useEffect(() => {
    getTokenPlatformAPI();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#275696',
      }}>
      <Text style={{fontFamily: 'SCDream4', color: '#fff', marginBottom: 10}}>
        사용자 확인중...
      </Text>
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );
};

export default Check;
