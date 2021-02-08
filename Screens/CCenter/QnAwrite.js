import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';

import Header from '../Common/HeaderBackBtnNotSearch';

const QnAwrite = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  return (
    <>
      <Header title={routeName} navigation={navigation} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <Text style={[styles.profileTitle, { marginRight: 5 }]}>문의 제목</Text>
            <Text style={[styles.profileRequired]}>(필수)</Text>
          </View>
          <TextInput
            placeholder="문의 제목을 입력해주세요."
            placeholderTextColor="#A2A2A2"
            style={[
              styles.normalText,
              {
                fontSize: 14,
                borderWidth: 1,
                borderColor: '#E3E3E3',
                borderRadius: 4,
                paddingHorizontal: 10,
                marginBottom: 25,
              },
            ]}
            autoCapitalize="none"
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <Text style={[styles.profileTitle, { marginRight: 5 }]}>문의 내용</Text>
            <Text style={[styles.profileRequired]}>(필수)</Text>
          </View>
          <TextInput
            placeholder="문의 내용을 입력해주세요."
            placeholderTextColor="#A2A2A2"
            style={[
              styles.normalText,
              {
                borderWidth: 1,
                borderColor: '#E3E3E3',
                borderRadius: 5,
                backgroundColor: '#fff',
                height: 200,
                flex: 1,
                textAlignVertical: 'top',
                paddingLeft: 10,
                paddingVertical: 10,
                marginBottom: 50,
              },
            ]}
            multiline={true}
          />

          <View style={{ marginBottom: 50 }}>
            <TouchableOpacity
              onPress={() =>
                Alert.alert('문의내용을 전송하였습니다.', '답변이 오면 알림으로 알려드립니다.', [
                  {
                    text: '확인',
                  },
                ])
              }
              activeOpacity={0.8}>
              <View style={[styles.submitBtn, { marginBottom: 10 }]}>
                <Text style={styles.submitBtnText}>문의하기</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.8}>
              <View style={styles.cancelBtn}>
                <Text style={styles.cancelBtnText}>취소</Text>
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
  normalText: {
    fontFamily: 'SCDream4',
  },
  mediumText: {
    fontFamily: 'SCDream5',
  },
  boldText: {
    fontFamily: 'SCDream6',
  },
  profileTitle: {
    fontFamily: 'SCDream5',
    fontSize: 15,
    color: '#111',
  },
  profileRequired: {
    fontFamily: 'SCDream4',
    fontSize: 14,
    color: '#366DE5',
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
});

export default QnAwrite;
