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
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';

import DetailHeader from '../../Common/DetailHeader';
import Auth from '../../../src/api/Auth.js';

const SetPwd = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  const [newPwd, setNewPwd] = React.useState(null);
  const [newPwdRe, setNewPwdRe] = React.useState(null);

  const setUserNewPwd = () => {
    if (newPwd === null) {
    }
  };

  // 유효성 체크
  const validationSchema = yup.object().shape({
    register_pw: yup
      .string()
      .matches(
        /^(?=.*[a-zA-Z])(?=.*[!@#$%&\w'*+-/=?^_{|}~])(?=.*[0-9]).{6,20}$/,
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
  });

  return (
    <>
      <DetailHeader title={routeName} navigation={navigation} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={{paddingHorizontal: 20, paddingVertical: 20}}>
          {/* 비밀번호 */}
          <Formik
            initialValues={{
              register_pw: '',
              register_confirmPw: '',
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
              } else {
                Alert.alert('인증되지 않은 입력란이 있습니다.');
                return false;
              }
              setTimeout(() => {
                actions.setSubmitting(false);
              }, 1000);
            }}
            validationSchema={validationSchema}>
            {(formikProps) => (
              <View style={{marginBottom: 20}}>
                <Text style={[styles.profileTitle, {marginBottom: 10}]}>
                  새로운 비밀번호
                </Text>
                <TextInput
                  placeholder="새로운 비밀번호를 입력해주세요."
                  placeholderTextColor="#A2A2A2"
                  style={{
                    borderWidth: 1,
                    borderColor: '#E3E3E3',
                    borderRadius: 2,
                    paddingHorizontal: 10,
                    marginBottom: 5,
                  }}
                  autoCapitalize="none"
                  secureTextEntry
                />
                <TextInput
                  placeholder="새로운 비밀번호를 재입력해주세요."
                  placeholderTextColor="#A2A2A2"
                  style={{
                    borderWidth: 1,
                    borderColor: '#E3E3E3',
                    borderRadius: 2,
                    paddingHorizontal: 10,
                  }}
                  autoCapitalize="none"
                  secureTextEntry
                />
              </View>
            )}
            {/* // 비밀번호 */}
          </Formik>
        </View>

        <View style={{paddingHorizontal: 20, marginBottom: 50}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('SetPwdComplete')}
            activeOpacity={0.8}>
            <View style={[styles.submitBtn, {marginBottom: 10}]}>
              <Text style={styles.submitBtnText}>비밀번호 변경</Text>
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
    marginBottom: 20,
  },
  profileTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    lineHeight: 19,
    marginBottom: 7,
  },
  profileDesc: {
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

export default SetPwd;
