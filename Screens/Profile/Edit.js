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

import Header from '../Common/Header';
import Footer from '../Common/Footer';

const Edit = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  const [category01, setCategory01] = React.useState(null);
  const [category02, setCategory02] = React.useState(null);
  const [value, setValue] = React.useState(null);

  return (
    <>
      <Header title={routeName} navigation={navigation} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={{ backgroundColor: '#F5F5F5' }}>
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
              style={{
                borderWidth: 1,
                borderColor: '#E3E3E3',
                borderRadius: 100,
              }}>
              <Image
                source={require('../../src/assets/photo.png')}
                resizeMode="cover"
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 100,
                }}
              />
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
        <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
          <View style={styles.profileBox}>
            <Text style={styles.profileTitle}>이메일</Text>
            <Text style={styles.profileDesc}>abcd@naver.com</Text>
          </View>

          {/* 회원 등급 */}
          <View style={styles.profileBox}>
            <Text style={[styles.profileTitle, { marginBottom: 10 }]}>회원등급</Text>
            <View style={styles.flexRowCenter}>
              <Text style={styles.profileDesc}>일반회원</Text>
            </View>
          </View>

          {/* // 회원 등급 */}

          {/* 비밀번호 변경 */}
          <View style={styles.profileBox}>
            <Text style={[styles.profileTitle, { marginBottom: 10 }]}>비밀번호 변경</Text>
            <TextInput
              placeholder="비밀번호를 입력해주세요."
              placeholderTextColor="#A2A2A2"
              style={[
                styles.normalText,
                {
                  borderWidth: 1,
                  borderColor: '#E3E3E3',
                  borderRadius: 4,
                  paddingHorizontal: 10,
                  marginBottom: 5,
                },
              ]}
              autoCapitalize="none"
              secureTextEntry
            />
            <TextInput
              placeholder="비밀번호를 재입력해주세요."
              placeholderTextColor="#A2A2A2"
              style={[
                styles.normalText,
                {
                  borderWidth: 1,
                  borderColor: '#E3E3E3',
                  borderRadius: 4,
                  paddingHorizontal: 10,
                },
              ]}
              autoCapitalize="none"
              secureTextEntry
            />
          </View>
          {/* // 비밀번호 변경 */}

          {/* 성함 변경 */}
          <View style={styles.profileBox}>
            <Text style={[styles.profileTitle, { marginBottom: 10 }]}>성함</Text>
            <TextInput
              value="김성준"
              placeholder="성함을 입력해주세요."
              placeholderTextColor="#A2A2A2"
              style={[
                styles.normalText,
                {
                  borderWidth: 1,
                  borderColor: '#E3E3E3',
                  borderRadius: 4,
                  paddingHorizontal: 10,
                },
              ]}
              autoCapitalize="none"
            />
          </View>
          {/* // 성함 변경 */}

          {/* 휴대폰 번호 변경 */}
          <View style={styles.profileBox}>
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
                keyboardType="number-pad"
                autoCapitalize="none"
              />
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#275696',
                  borderRadius: 4,
                  height: 50,
                  paddingHorizontal: 20,
                }}>
                <Text style={[styles.normalText, { color: '#fff', textAlign: 'center' }]}>
                  인증번호 전송
                </Text>
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
                keyboardType="number-pad"
                autoCapitalize="none"
              />
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#275696',
                  borderRadius: 4,
                  height: 50,
                  paddingHorizontal: 20,
                }}>
                <Text style={[styles.normalText, { color: '#fff', textAlign: 'center' }]}>
                  인증번호 확인
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* // 휴대폰 번호 변경 */}

          {/* 이메일 변경 */}
          <View style={styles.profileBox}>
            <Text style={[styles.profileTitle, { marginBottom: 10 }]}>이메일</Text>
            <TextInput
              value="abcd@naver.com"
              placeholder="이메일을 입력해주세요."
              placeholderTextColor="#A2A2A2"
              style={[
                styles.normalText,
                {
                  borderWidth: 1,
                  borderColor: '#E3E3E3',
                  borderRadius: 4,
                  paddingHorizontal: 10,
                },
              ]}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>
          {/* // 이메일 변경 */}

          {/* 회사명 변경 */}
          <View style={styles.profileBox}>
            <Text style={[styles.profileTitle, { marginBottom: 10 }]}>회사명</Text>
            <TextInput
              value="디몬스터"
              placeholder="회사명을 입력해주세요."
              placeholderTextColor="#A2A2A2"
              style={[
                styles.normalText,
                {
                  borderWidth: 1,
                  borderColor: '#E3E3E3',
                  borderRadius: 4,
                  paddingHorizontal: 10,
                },
              ]}
              autoCapitalize="none"
            />
          </View>
          {/* // 회사명 변경 */}
        </View>

        <View style={{ paddingHorizontal: 20, marginBottom: 50 }}>
          <TouchableOpacity onPress={() => Alert.alert('수정 완료')} activeOpacity={0.8}>
            <View style={[styles.submitBtn, { marginBottom: 10 }]}>
              <Text style={styles.submitBtnText}>수정 완료</Text>
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
    marginBottom: 25,
  },
  profileTitle: {
    fontFamily: 'SCDream5',
    fontSize: 15,
    lineHeight: 19,
    marginBottom: 10,
  },
  profileDesc: {
    fontFamily: 'SCDream4',
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

export default Edit;
