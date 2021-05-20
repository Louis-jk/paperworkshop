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

import Header from '../../Common/HeaderNotBackBtnDrawer';
import {SCDream4, SCDream5, SCDream6} from '../../../src/font';

const SetPwdComplete = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  return (
    <>
      <Header title={routeName} navigation={navigation} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            // height: Dimensions.get('window').height - 100,
            height: Dimensions.get('window').height - 200,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingVertical: 20,
          }}>
          <Text
            style={{
              fontFamily: SCDream5,
              fontSize: 18,
              color: '#275696',
              marginTop: 20,
            }}>
            비밀번호가 변경되었습니다.
          </Text>
          <Text
            style={{
              fontFamily: SCDream4,
              fontSize: 16,
              color: '#111',
              marginTop: 10,
              marginBottom: 30,
            }}>
            변경된 비밀번호로 이용하실 수 있습니다.
          </Text>
          <View
            style={{
              width: '100%',
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              activeOpacity={0.8}>
              <View style={[styles.submitBtn, {marginBottom: 10}]}>
                <Text style={styles.submitBtnText}>로그인 하기</Text>
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
    fontFamily: SCDream4,
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default SetPwdComplete;
