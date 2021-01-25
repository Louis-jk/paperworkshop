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
      <ScrollView style={styles.container}>
        <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
            <View style={{ position: 'relative' }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  letterSpacing: -2,
                  marginBottom: 20,
                  marginRight: 23,
                }}>
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
              style={{
                fontSize: 16,
                fontWeight: '400',
                letterSpacing: -2,
                marginBottom: 20,
                marginRight: 20,
                color: '#707070',
              }}>
              패키지
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '400',
                letterSpacing: -2,
                marginBottom: 20,
                marginRight: 20,
                color: '#707070',
              }}>
              일반인쇄
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '400',
                letterSpacing: -2,
                marginBottom: 20,
                color: '#707070',
              }}>
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
              placeholder="업체명을 입력하세요."
              placeholderTextColor="#BEBEBE"
              autoFocus={true}
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
                  marginBottom: 5,
                }}>
                <Text
                  style={{
                    color: '#000',
                    fontSize: 14,
                    fontWeight: 'bold',
                  }}>
                  삼보인쇄
                </Text>
                <Text
                  style={{
                    color: '#275696',
                    fontSize: 14,
                    fontWeight: 'bold',
                    paddingHorizontal: 5,
                  }}>
                  NEW
                </Text>
              </View>
              <View>
                <Text style={{ fontSize: 14, lineHeight: 18 }} numberOfLines={1}>
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
                  marginBottom: 5,
                }}>
                <Text
                  style={{
                    color: '#000',
                    fontSize: 14,
                    fontWeight: 'bold',
                  }}>
                  동천문화인쇄
                </Text>
                <Text
                  style={{
                    color: '#275696',
                    fontSize: 14,
                    fontWeight: 'bold',
                    paddingHorizontal: 5,
                  }}>
                  NEW
                </Text>
              </View>
              <View>
                <Text style={{ fontSize: 14, lineHeight: 18 }} numberOfLines={1}>
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
                  marginBottom: 5,
                }}>
                <Text
                  style={{
                    color: '#000',
                    fontSize: 14,
                    fontWeight: 'bold',
                  }}>
                  미래엔인쇄서비스
                </Text>
                <Text
                  style={{
                    color: '#275696',
                    fontSize: 14,
                    fontWeight: 'bold',
                    paddingHorizontal: 5,
                  }}>
                  NEW
                </Text>
              </View>
              <View>
                <Text style={{ fontSize: 14, lineHeight: 18 }} numberOfLines={1}>
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
                  marginBottom: 5,
                }}>
                <Text
                  style={{
                    color: '#000',
                    fontSize: 14,
                    fontWeight: 'bold',
                  }}>
                  삼보인쇄
                </Text>
                <Text
                  style={{
                    color: '#275696',
                    fontSize: 14,
                    fontWeight: 'bold',
                    paddingHorizontal: 5,
                  }}>
                  NEW
                </Text>
              </View>
              <View>
                <Text style={{ fontSize: 14, lineHeight: 18 }} numberOfLines={1}>
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
                  marginBottom: 5,
                }}>
                <Text
                  style={{
                    color: '#000',
                    fontSize: 14,
                    fontWeight: 'bold',
                  }}>
                  동천문화인쇄
                </Text>
                <Text
                  style={{
                    color: '#275696',
                    fontSize: 14,
                    fontWeight: 'bold',
                    paddingHorizontal: 5,
                  }}>
                  NEW
                </Text>
              </View>
              <View>
                <Text style={{ fontSize: 14, lineHeight: 18 }} numberOfLines={1}>
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
                  marginBottom: 5,
                }}>
                <Text
                  style={{
                    color: '#000',
                    fontSize: 14,
                    fontWeight: 'bold',
                  }}>
                  미래엔인쇄서비스
                </Text>
                <Text
                  style={{
                    color: '#275696',
                    fontSize: 14,
                    fontWeight: 'bold',
                    paddingHorizontal: 5,
                  }}>
                  NEW
                </Text>
              </View>
              <View>
                <Text style={{ fontSize: 14, lineHeight: 18 }} numberOfLines={1}>
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
});

export default index;
