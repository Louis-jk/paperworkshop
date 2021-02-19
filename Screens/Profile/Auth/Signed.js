import * as React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
  Alert,
} from 'react-native';
import axios from 'axios';
import qs from 'qs';

import {useSelector, useDispatch} from 'react-redux';

import Header from '../../Common/Header';
import {
  UserId,
  UserName,
  UserMobile,
  UserEmail,
  UserCompany,
} from '../../../Modules/UserInfoReducer';

const baseUrl = 'http://dmonster1506.cafe24.com/json/proc_json.php/';

const Signed = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  const dispatch = useDispatch();

  const {fcmToken} = useSelector((state) => state.InfoReducer); // Redux에서 fcmtoken 가져오기
  const {mb_name, mb_id, mb_password} = useSelector(
    (state) => state.JoinReducer,
  ); // Redux에서 가입시 회원 정보 가져오기
  const [checkPlatform, setCheckPlatform] = React.useState(null); // OS 체크

  React.useEffect(() => {
    if (Platform.OS === 'ios') {
      setCheckPlatform('ios');
    } else {
      setCheckPlatform('aos');
    }
  }, []);

  // 로그인 API
  const login = () => {
    axios({
      method: 'post',
      url: `${baseUrl}`,
      data: qs.stringify({
        method: 'proc_login_member',
        mb_id,
        mb_password,
        mb_3: fcmToken,
        mb_4: checkPlatform,
      }),
    })
      .then((res) => {
        if (res.data.result === '1') {
          dispatch(UserId(res.data.item.mb_id));
          dispatch(UserName(res.data.item.mb_name));
          dispatch(UserMobile(res.data.item.mb_hp));
          dispatch(UserEmail(res.data.item.mb_email));
          dispatch(UserCompany(res.data.item.mb_2));
          navigation.navigate('Stack');
        } else {
          Alert.alert(res.data.message);
        }
      })
      .catch((err) => Alert.alert(`${err.messaging()}`));
  };

  return (
    <>
      <Header title={routeName} navigation={navigation} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View
          style={{
            height: Dimensions.get('window').height - 100,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingVertical: 20,
          }}>
          <Text
            style={[
              styles.mediumText,
              {fontSize: 20, color: '#275696', marginTop: 20, marginBottom: 10},
            ]}>
            {mb_name}님 환영합니다.
          </Text>
          <Text
            style={[
              styles.mediumText,
              {fontSize: 18, color: '#111', marginBottom: 30},
            ]}>
            회원가입이 정상적으로 완료되었습니다.
          </Text>

          <View
            style={{
              width: '100%',
            }}>
            <TouchableOpacity onPress={() => login()} activeOpacity={0.8}>
              <View style={[styles.submitBtn, {marginBottom: 10}]}>
                <Text style={styles.submitBtnText}>홈으로</Text>
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

export default Signed;
