import React from 'react';
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
} from 'react-native';

const Login = (props) => {
  const navigation = props.navigation;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          justifyContent: 'space-around',
          alignItems: 'center',
          paddingTop: 70,
        }}>
        <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 30 }}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image
              source={require('../../../src/assets/logo02.png')}
              resizeMode="contain"
              style={{
                width: Dimensions.get('window').width - 150,
                height: 50,
                marginBottom: 50,
              }}
            />
            <View style={{ marginBottom: 30 }}>
              <TextInput placeholder="이메일" style={styles.textInput} editable={false} />
              <TextInput placeholder="비밀번호" style={styles.textInput} editable={false} />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}>
                <Text style={{ fontSize: 14, color: '#111111', marginRight: 5 }}>자동 로그인</Text>
                <Image
                  source={require('../../../src/assets/radio_on.png')}
                  resizeMode="cover"
                  style={{
                    width: 17,
                    height: 17,
                  }}
                />
              </View>
            </View>
          </View>
          <View style={{ marginBottom: 20 }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Stack')}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: Dimensions.get('window').width - 100,
                backgroundColor: '#275696',
                borderRadius: 4,
                paddingVertical: 15,
              }}>
              <Text style={{ fontSize: 16, color: '#fff' }}>로그인</Text>
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
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Text>아이디 찾기</Text>
            </TouchableOpacity>
            <View style={{ height: '90%', width: 1, backgroundColor: '#E3E3E3' }} />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('FindPwd')}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Text>비밀번호 찾기</Text>
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
          <View style={{ width: 100, height: 1, backgroundColor: '#E3E3E3' }} />
          <Text style={{ fontSize: 16, color: '#111111', marginHorizontal: 16 }}>소셜 로그인</Text>
          <View style={{ width: 100, height: 1, backgroundColor: '#E3E3E3' }} />
        </View>

        <View style={{ marginBottom: 10 }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => Alert.alert('카카오 로그인')}
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
              style={{ width: 30, height: 30 }}
            />
            <Text style={{ fontSize: 16, color: '#2A1617' }}>카카오로 로그인</Text>
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
              paddingVertical: 14,
              marginBottom: 10,
            }}>
            <Image
              source={require('../../../src/assets/icon_n.png')}
              resizeMode="contain"
              style={{ width: 30, height: 18 }}
            />
            <Text style={{ fontSize: 16, color: '#fff' }}>네이버로 로그인</Text>
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
              style={{ width: 30, height: 30 }}
            />
            <Text style={{ fontSize: 16, color: '#fff' }}>애플로 로그인</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => Alert.alert('구글 로그인')}
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
              style={{ width: 38, height: 40 }}
            />
            <Text style={{ fontSize: 16, color: '#333333' }}>구글로 로그인</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ fontSize: 14, color: '#ADADAD', marginRight: 10 }}>
            아직 가입되지 않은 회원입니까?
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Register')}
            style={{
              paddingHorizontal: 10,
              paddingVertical: 10,
            }}>
            <Text style={{ fontSize: 14, color: '#275696' }}>회원가입</Text>
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
});

export default Login;