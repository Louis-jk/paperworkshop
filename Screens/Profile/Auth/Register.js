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

// import RNPickerSelect from 'react-native-picker-select';
// import {Picker} from '@react-native-community/picker';

import DetailHeader from '../../Common/DetailHeader';
import Footer from '../../Common/Footer';

const Register = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  const [category01, setCategory01] = React.useState(null);
  const [category02, setCategory02] = React.useState(null);
  const [value, setValue] = React.useState(null);

  return (
    <>
      <DetailHeader title={routeName} navigation={navigation} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
          <View style={styles.profileBox}>
            <Text style={styles.profileTitle}>아이디</Text>
            <TextInput
              placeholder="아이디를 입력해주세요."
              placeholderTextColor="#A2A2A2"
              style={{
                borderWidth: 1,
                borderColor: '#E3E3E3',
                borderRadius: 2,
                paddingHorizontal: 10,
                marginBottom: 5,
              }}
              autoCapitalize="none"
            />
          </View>

          {/* 비밀번호  */}
          <View style={{ marginBottom: 20 }}>
            <Text style={[styles.profileTitle, { marginBottom: 10 }]}>비밀번호 </Text>
            <TextInput
              placeholder="비밀번호를 입력해주세요."
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
              placeholder="비밀번호를 재입력해주세요."
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
          {/* // 비밀번호  */}

          {/* 성함  */}
          <View style={{ marginBottom: 20 }}>
            <Text style={[styles.profileTitle, { marginBottom: 10 }]}>성함</Text>
            <TextInput
              value="김성준"
              placeholder="비밀번호를 입력해주세요."
              placeholderTextColor="#A2A2A2"
              style={{
                borderWidth: 1,
                borderColor: '#E3E3E3',
                borderRadius: 2,
                paddingHorizontal: 10,
              }}
              autoCapitalize="none"
            />
          </View>
          {/* // 성함  */}

          {/* 휴대폰 번호  */}
          <View style={{ marginBottom: 20 }}>
            <Text style={[styles.profileTitle, { marginBottom: 10 }]}>휴대폰 번호</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginBottom: 5,
              }}>
              <TextInput
                value="010-1234-5678"
                placeholder="휴대전화번호를 입력해주세요."
                placeholderTextColor="#A2A2A2"
                style={{
                  flex: 1,
                  borderWidth: 1,
                  borderColor: '#E3E3E3',
                  borderRadius: 2,
                  paddingHorizontal: 10,
                  marginRight: 10,
                }}
                keyboardType="number-pad"
                autoCapitalize="none"
              />
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#275696',
                  borderRadius: 2,
                  height: 50,
                  paddingHorizontal: 20,
                }}>
                <Text style={{ color: '#fff', textAlign: 'center' }}>인증번호 전송</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginBottom: 5,
              }}>
              <TextInput
                value=""
                placeholder="인증번호를 입력해주세요."
                placeholderTextColor="#A2A2A2"
                style={{
                  flex: 1,
                  borderWidth: 1,
                  borderColor: '#E3E3E3',
                  borderRadius: 2,
                  paddingHorizontal: 10,
                  marginRight: 10,
                }}
                keyboardType="number-pad"
                autoCapitalize="none"
              />
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#275696',
                  borderRadius: 2,
                  height: 50,
                  paddingHorizontal: 20,
                }}>
                <Text style={{ color: '#fff', textAlign: 'center' }}>인증번호 확인</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* // 휴대폰 번호  */}

          {/* 이메일  */}
          <View style={{ marginBottom: 20 }}>
            <Text style={[styles.profileTitle, { marginBottom: 10 }]}>이메일</Text>
            <TextInput
              value=""
              placeholder="이메일을 입력해주세요."
              placeholderTextColor="#A2A2A2"
              style={{
                borderWidth: 1,
                borderColor: '#E3E3E3',
                borderRadius: 2,
                paddingHorizontal: 10,
              }}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>
          {/* // 이메일  */}

          {/* 회사명  */}
          <View style={{ marginBottom: 20 }}>
            <Text style={[styles.profileTitle, { marginBottom: 10 }]}>회사명</Text>
            <TextInput
              value=""
              placeholder="회사명을 입력해주세요."
              placeholderTextColor="#A2A2A2"
              style={{
                borderWidth: 1,
                borderColor: '#E3E3E3',
                borderRadius: 2,
                paddingHorizontal: 10,
              }}
              autoCapitalize="none"
            />
          </View>
          {/* // 회사명  */}
        </View>

        <View style={{ paddingHorizontal: 20, marginBottom: 50 }}>
          <TouchableOpacity onPress={() => navigation.navigate('Signed')} activeOpacity={0.8}>
            <View style={[styles.submitBtn, { marginBottom: 10 }]}>
              <Text style={styles.submitBtnText}>회원가입</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.8}>
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
});

export default Register;
