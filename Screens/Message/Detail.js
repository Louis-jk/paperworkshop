import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import DetailHeader from '../Common/DetailHeader';

const Detail = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  console.log('MSG ROON Props', props);

  const exitMsgRoom = () => {
    Alert.alert('채팅방을 나가시겠습니까?', '메세지는 삭제되지 않습니다.', [
      {
        text: '확인',
        onPress: () => navigation.navigate('Message'),
      },
    ]);
  };

  return (
    <>
      <DetailHeader title={routeName} navigation={navigation} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View>
          <View
            style={{
              marginVertical: 20,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ marginRight: 10 }}>- - - - - - - -</Text>
            <Text style={styles.normalText}>2021.01.28 (목)</Text>
            <Text style={{ marginLeft: 10 }}>- - - - - - - -</Text>
          </View>
          <View
            style={{
              justifyContent: 'flex-start',
              paddingHorizontal: 20,
            }}>
            {/* 파트너스 회원 답변 Area */}
            <View
              style={{
                alignSelf: 'flex-end',
                flexDirection: 'row-reverse',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                paddingVertical: 10,
                width: '70%',
              }}>
              <View style={styles.msgBubbleP}>
                <Text style={[styles.msgTextP, styles.normalText]}>
                  안녕하세요! 문의드릴게 있습니다.{' '}
                </Text>
              </View>
              <Text
                style={[
                  styles.normalText,
                  { alignSelf: 'flex-end', fontSize: 12, color: '#000000' },
                ]}>
                14:01
              </Text>
            </View>
            {/* // 파트너스 회원 답변 Area */}

            {/* 파트너스 회원 답변 Area */}
            <View
              style={{
                alignSelf: 'flex-end',
                flexDirection: 'row-reverse',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                paddingVertical: 10,
                width: '70%',
              }}>
              <View style={styles.msgBubbleP}>
                <Text style={[styles.msgTextP, styles.normalText]}>
                  이런 패키지를 만들고 싶습니다.
                </Text>
              </View>
              <Text
                style={[
                  styles.normalText,
                  { alignSelf: 'flex-end', fontSize: 12, color: '#000000' },
                ]}>
                14:02
              </Text>
            </View>
            {/* // 파트너스 회원 답변 Area */}

            {/* 파트너스 회원 답변 - 파일 다운로드 Area */}
            <View
              style={{
                alignSelf: 'flex-end',
                flexDirection: 'row-reverse',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                paddingVertical: 10,
                width: '70%',
              }}>
              <View
                style={{
                  backgroundColor: '#fff',
                  padding: 10,
                  borderRadius: 5,
                  marginLeft: 10,
                }}>
                <Image
                  source={require('../../src/images/package01.jpg')}
                  resizeMode="cover"
                  style={{ width: 120, height: 120, borderRadius: 5 }}
                />
              </View>
              <Text
                style={[
                  styles.normalText,
                  { alignSelf: 'flex-end', fontSize: 12, color: '#000000' },
                ]}>
                14:02
              </Text>
            </View>
            {/* // 파트너스 회원 답변 - 파일 다운로드 Area */}

            <View style={{ marginBottom: 20 }} />

            {/* 일반회원 문의 Area */}
            <View
              style={{
                alignSelf: 'flex-start',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                paddingVertical: 10,
                width: '70%',
              }}>
              <Image
                source={require('../../src/images/person01.jpg')}
                resizeMode="cover"
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  marginRight: 10,
                }}
              />
              <View style={styles.msgBubble}>
                <Text style={[styles.msgText, styles.normalText]}>
                  안녕하세요. 보내주신 패키지의 경우는
                </Text>
              </View>
              <Text
                style={[
                  styles.normalText,
                  { alignSelf: 'flex-end', fontSize: 12, color: '#000000' },
                ]}>
                14:03
              </Text>
            </View>
            {/* // 일반회원 문의 Area */}
            {/* 일반회원 문의 Area */}
            <View
              style={{
                alignSelf: 'flex-start',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                paddingVertical: 10,
                width: '70%',
              }}>
              <Image
                source={require('../../src/images/person01.jpg')}
                resizeMode="cover"
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  marginRight: 10,
                }}
              />
              <View style={styles.msgBubble}>
                <Text style={[styles.msgText, styles.normalText]}>
                  우리 회사의 경우 견적이 아래와 같습니다.
                </Text>
              </View>
              <Text
                style={[
                  styles.normalText,
                  { alignSelf: 'flex-end', fontSize: 12, color: '#000000' },
                ]}>
                14:03
              </Text>
            </View>
            {/* // 일반회원 문의 Area */}
            {/* 파트너스 회원 답변 - 사진첩부 Area */}
            <View
              style={{
                alignSelf: 'flex-start',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                paddingVertical: 10,
                width: '70%',
              }}>
              <Image
                source={require('../../src/images/person01.jpg')}
                resizeMode="cover"
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  marginRight: 10,
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  backgroundColor: '#fff',
                  padding: 10,
                  borderRadius: 5,
                  marginRight: 10,
                }}>
                <TouchableOpacity onPress={() => Alert.alert('다운로드')}>
                  <Image
                    source={require('../../src/assets/down.png')}
                    resizeMode="cover"
                    style={{ width: 30, height: 30, marginRight: 10 }}
                  />
                </TouchableOpacity>
                <Text style={styles.normalText}>abcdefg.pdf</Text>
              </View>

              <Text
                style={[
                  styles.normalText,
                  { alignSelf: 'flex-end', fontSize: 12, color: '#000000' },
                ]}>
                14:15
              </Text>
            </View>
            {/* // 파트너스 회원 답변 - 사진첩부 Area */}
          </View>

          <View
            style={{
              alignSelf: 'center',
              marginTop: 80,
              marginBottom: 50,
            }}>
            <TouchableOpacity activeOpacity={0.8} onPress={exitMsgRoom}>
              <View
                style={{
                  justifyContent: 'center',
                  borderRadius: 50,
                  backgroundColor: 'rgba(68, 68, 68, 0.2)',
                }}>
                <Text
                  style={[
                    styles.normalText,
                    {
                      fontSize: 14,
                      color: '#000',
                      paddingHorizontal: 30,
                      paddingVertical: 10,
                    },
                  ]}>
                  채팅방 나가기
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#275696',
          paddingVertical: 10,
          paddingHorizontal: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingLeft: 5,
          }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => Alert.alert('파일 선택하는 부분입니다.')}>
            <Image
              source={require('../../src/assets/chat_fileupload.png')}
              resizeMode="contain"
              style={{ width: 22, height: 22, marginRight: 20 }}
            />
          </TouchableOpacity>
          <TextInput
            placeholder="메세지 글적기..."
            placeholderTextColor="#FFFFFF"
            multiline={true}
            autoCapitalize="none"
            style={[styles.normalText, { color: '#fff', fontSize: 14, width: '75%' }]}
          />
        </View>
        <TouchableOpacity activeOpacity={0.8} onPress={() => Alert.alert('메세지 전송!')}>
          <Image
            source={require('../../src/assets/icon01.png')}
            resizeMode="contain"
            style={{ width: 40, height: 30 }}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EFEFEF',
  },
  msgBubble: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    borderTopRightRadius: 50,
    marginRight: 5,
    width: 200,
  },
  msgText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#000000',
  },
  msgBubbleP: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#275696',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
    borderTopLeftRadius: 50,
    marginLeft: 5,
    width: 200,
  },
  msgTextP: {
    fontSize: 14,
    lineHeight: 20,
    color: '#fff',
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

export default Detail;
