import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import Header from '../Common/Header';

const index = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  return (
    <>
      <Header title={routeName} navigation={navigation} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
            <View style={{ position: 'relative' }}>
              <Text
                style={[
                  styles.boldText,
                  {
                    fontSize: 16,
                    marginBottom: 20,
                    marginRight: 23,
                  },
                ]}>
                전체
              </Text>
              <View
                style={{
                  position: 'absolute',
                  top: -1,
                  right: 15,
                  width: 6,
                  height: 6,
                  borderRadius: 6,
                  backgroundColor: '#275696',
                }}
              />
            </View>
            <Text
              style={[
                styles.normalText,
                {
                  fontSize: 16,
                  fontWeight: '400',
                  letterSpacing: -2,
                  marginBottom: 20,
                  marginRight: 20,
                  color: '#707070',
                },
              ]}>
              패키지
            </Text>
            <Text
              style={[
                styles.normalText,
                {
                  fontSize: 16,
                  fontWeight: '400',
                  letterSpacing: -2,
                  marginBottom: 20,
                  marginRight: 20,
                  color: '#707070',
                },
              ]}>
              일반인쇄
            </Text>
            <Text
              style={[
                styles.normalText,
                {
                  fontSize: 16,
                  fontWeight: '400',
                  letterSpacing: -2,
                  marginBottom: 20,
                  color: '#707070',
                },
              ]}>
              기타 인쇄물
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 20,
              borderWidth: 1,
              borderColor: '#DEDEDE',
              borderRadius: 5,
              paddingHorizontal: 10,
            }}>
            <TextInput
              placeholder="키워드를 입력하세요."
              placeholderTextColor="#BEBEBE"
              autoFocus={false}
              style={[styles.normalText, { width: '80%' }]}
            />
            <TouchableOpacity>
              <Image
                source={require('../../src/assets/top_seach.png')}
                resizeMode="contain"
                style={{ width: 30, height: 30 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexWrap: 'wrap',
            marginVertical: 5,
          }}>
          {/* 파트너스 리스트(list) */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('GalleryDetail')}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginVertical: 10,
              paddingHorizontal: 20,
            }}>
            <View
              style={{
                flex: 4,
                marginRight: 15,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                <Text
                  style={[
                    styles.normalText,
                    {
                      color: '#000',
                      fontSize: 14,
                    },
                  ]}>
                  삼보인쇄
                </Text>
                <Text
                  style={[
                    styles.normalText,
                    {
                      color: '#275696',
                      fontSize: 14,
                      paddingHorizontal: 5,
                    },
                  ]}>
                  NEW
                </Text>
              </View>
              <View>
                <Text
                  style={[styles.mediumText, { fontSize: 14, lineHeight: 18 }]}
                  numberOfLines={1}>
                  [패키지] 병원/의약품/건강/케어/헬스 관련패키지
                </Text>
              </View>
            </View>
            <View style={{ flex: 1, alignSelf: 'flex-end' }}>
              <Image
                source={require('../../src/images/p11.jpg')}
                resizeMode="cover"
                style={{ width: 70, height: 70, borderRadius: 5 }}
              />
            </View>
          </TouchableOpacity>
          {/* // 파트너스 리스트(list) */}
          <View
            style={{ width: Dimensions.get('window').width, height: 1, backgroundColor: '#F5F5F5' }}
          />
          {/* 파트너스 리스트(list) */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('GalleryDetail')}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginVertical: 10,
              paddingHorizontal: 20,
            }}>
            <View
              style={{
                flex: 4,
                marginRight: 15,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                <Text
                  style={[
                    styles.normalText,
                    {
                      color: '#000',
                      fontSize: 14,
                    },
                  ]}>
                  동천문화인쇄
                </Text>
                <Text
                  style={[
                    styles.normalText,
                    {
                      color: '#275696',
                      fontSize: 14,
                      paddingHorizontal: 5,
                    },
                  ]}>
                  NEW
                </Text>
              </View>
              <View>
                <Text
                  style={[styles.mediumText, { fontSize: 14, lineHeight: 18 }]}
                  numberOfLines={1}>
                  식품, 박스, 패키지 디자인 전문입니다.
                </Text>
              </View>
            </View>
            <View style={{ flex: 1, alignSelf: 'flex-end' }}>
              <Image
                source={require('../../src/images/p13.jpg')}
                resizeMode="cover"
                style={{ width: 70, height: 70, borderRadius: 5 }}
              />
            </View>
          </TouchableOpacity>
          {/* // 파트너스 리스트(list) */}
          <View
            style={{ width: Dimensions.get('window').width, height: 1, backgroundColor: '#F5F5F5' }}
          />
          {/* 파트너스 리스트(list) */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('GalleryDetail')}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginVertical: 10,
              paddingHorizontal: 20,
            }}>
            <View
              style={{
                flex: 4,
                marginRight: 15,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                <Text
                  style={[
                    styles.normalText,
                    {
                      color: '#000',
                      fontSize: 14,
                    },
                  ]}>
                  미래엔인쇄서비스
                </Text>
                <Text
                  style={[
                    styles.normalText,
                    {
                      color: '#275696',
                      fontSize: 14,
                      paddingHorizontal: 5,
                    },
                  ]}>
                  NEW
                </Text>
              </View>
              <View>
                <Text
                  style={[styles.mediumText, { fontSize: 14, lineHeight: 18 }]}
                  numberOfLines={1}>
                  [일반인쇄] 설 선물세트 / 선물 박스 패키지 디자인
                </Text>
              </View>
            </View>
            <View style={{ flex: 1, alignSelf: 'flex-end' }}>
              <Image
                source={require('../../src/images/w03.jpg')}
                resizeMode="cover"
                style={{ width: 70, height: 70, borderRadius: 5 }}
              />
            </View>
          </TouchableOpacity>
          {/* // 파트너스 리스트(list) */}
          <View
            style={{ width: Dimensions.get('window').width, height: 1, backgroundColor: '#F5F5F5' }}
          />
          {/* 파트너스 리스트(list) */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('GalleryDetail')}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginVertical: 10,
              paddingHorizontal: 20,
            }}>
            <View
              style={{
                flex: 4,
                marginRight: 15,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                <Text
                  style={[
                    styles.normalText,
                    {
                      color: '#000',
                      fontSize: 14,
                    },
                  ]}>
                  삼보인쇄
                </Text>
                <Text
                  style={[
                    styles.normalText,
                    {
                      color: '#275696',
                      fontSize: 14,
                      paddingHorizontal: 5,
                    },
                  ]}>
                  NEW
                </Text>
              </View>
              <View>
                <Text
                  style={[styles.mediumText, { fontSize: 14, lineHeight: 18 }]}
                  numberOfLines={1}>
                  [패키지] 병원/의약품/건강/케어/헬스 관련패키지
                </Text>
              </View>
            </View>
            <View style={{ flex: 1, alignSelf: 'flex-end' }}>
              <Image
                source={require('../../src/images/p11.jpg')}
                resizeMode="cover"
                style={{ width: 70, height: 70, borderRadius: 5 }}
              />
            </View>
          </TouchableOpacity>
          {/* // 파트너스 리스트(list) */}
          <View
            style={{ width: Dimensions.get('window').width, height: 1, backgroundColor: '#F5F5F5' }}
          />
          {/* 파트너스 리스트(list) */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('GalleryDetail')}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginVertical: 10,
              paddingHorizontal: 20,
            }}>
            <View
              style={{
                flex: 4,
                marginRight: 15,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                <Text
                  style={[
                    styles.normalText,
                    {
                      color: '#000',
                      fontSize: 14,
                    },
                  ]}>
                  동천문화인쇄
                </Text>
                <Text
                  style={[
                    styles.normalText,
                    {
                      color: '#275696',
                      fontSize: 14,
                      paddingHorizontal: 5,
                    },
                  ]}>
                  NEW
                </Text>
              </View>
              <View>
                <Text
                  style={[styles.mediumText, { fontSize: 14, lineHeight: 18 }]}
                  numberOfLines={1}>
                  식품, 박스, 패키지 디자인 전문입니다.
                </Text>
              </View>
            </View>
            <View style={{ flex: 1, alignSelf: 'flex-end' }}>
              <Image
                source={require('../../src/images/p13.jpg')}
                resizeMode="cover"
                style={{ width: 70, height: 70, borderRadius: 5 }}
              />
            </View>
          </TouchableOpacity>
          {/* // 파트너스 리스트(list) */}
          <View
            style={{ width: Dimensions.get('window').width, height: 1, backgroundColor: '#F5F5F5' }}
          />
          {/* 파트너스 리스트(list) */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('GalleryDetail')}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginVertical: 10,
              paddingHorizontal: 20,
            }}>
            <View
              style={{
                flex: 4,
                marginRight: 15,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                <Text
                  style={[
                    styles.normalText,
                    {
                      color: '#000',
                      fontSize: 14,
                    },
                  ]}>
                  미래엔인쇄서비스
                </Text>
                <Text
                  style={[
                    styles.normalText,
                    {
                      color: '#275696',
                      fontSize: 14,
                      paddingHorizontal: 5,
                    },
                  ]}>
                  NEW
                </Text>
              </View>
              <View>
                <Text
                  style={[styles.mediumText, { fontSize: 14, lineHeight: 18 }]}
                  numberOfLines={1}>
                  [일반인쇄] 설 선물세트 / 선물 박스 패키지 디자인
                </Text>
              </View>
            </View>
            <View style={{ flex: 1, alignSelf: 'flex-end' }}>
              <Image
                source={require('../../src/images/w03.jpg')}
                resizeMode="cover"
                style={{ width: 70, height: 70, borderRadius: 5 }}
              />
            </View>
          </TouchableOpacity>
          {/* // 파트너스 리스트(list) */}
          <View
            style={{ width: Dimensions.get('window').width, height: 1, backgroundColor: '#F5F5F5' }}
          />
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
});

export default index;
