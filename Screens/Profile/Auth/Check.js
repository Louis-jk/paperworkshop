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
} from '../../../Modules/UserInfoReducer';
import Auth from '../../../src/api/Auth.js';

const Check = (props) => {
  const navigation = props.navigation;

  const dispatch = useDispatch();

  const [fFcmToken, setFfcmToken] = React.useState(null); // fcmtoken 현재 페이지 저장
  const [checkPlatform, setCheckPlatform] = React.useState(null); // OS 체크

  const getData = async () => {
    try {
      console.log('체크하나 ');
      const jsonValue = await AsyncStorage.getItem('@paper_info');
      if (jsonValue !== null) {
        const UserInfo = JSON.parse(jsonValue);
        const uId = UserInfo.userId;
        const uPwd = UserInfo.userPwd;
        console.log('아이디는', uId);
        console.log('비번은', uPwd);
        login(uId, uPwd);
      } else {
        navigation.navigate('Login');
      }
    } catch (e) {
      // error reading value
      console.log('스토리지 에러', e);
    }
  };

  // 로그인 API
  const login = (loginId, loginPwd) => {
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

          navigation.navigate('Stack');
        } else {
          Alert.alert(res.data.message, '다시 시도해주세요.', [
            {
              text: '확인',
              onPress: () => loginIdRef.current.focus(),
            },
          ]);
        }
      })
      .catch((err) => {
        navigation.navigate('Login');
      });
    // navigation.navigate('Stack')
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

    if (Platform.OS === 'ios') {
      setCheckPlatform('ios');
    } else {
      setCheckPlatform('aos');
    }

    getData();
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
