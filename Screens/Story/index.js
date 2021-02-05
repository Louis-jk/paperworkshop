import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Header from '../Common/Header';

const index = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  return (
    <>
      <Header title={routeName} navigation={navigation} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View>
          {/* 고객후기 */}
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 20,
              backgroundColor: '#fff',
              width: Dimensions.get('screen').width,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <Text style={[styles.mediumText, { fontSize: 16, marginRight: 12 }]}>고객후기</Text>
              <Text style={[styles.normalText, { fontSize: 14, color: '#275696' }]}>
                총 리뷰수 26
              </Text>
            </View>
            {/* 고객후기 리스트 박스 */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('ReviewDetail')}
              style={{ borderWidth: 1, borderColor: '#E3E3E3', borderRadius: 5, marginBottom: 10 }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  marginBottom: 20,
                  paddingTop: 20,
                  paddingHorizontal: 20,
                  paddingBottom: 10,
                }}>
                <ImageBackground
                  source={require('../../src/images/w01.jpg')}
                  resizeMode="cover"
                  style={{ width: 75, height: 70, position: 'relative' }}>
                  <Text
                    style={[
                      styles.normalText,
                      {
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        fontSize: 10,
                        backgroundColor: 'rgba(0,0,0,0.45)',
                        color: '#fff',
                        padding: 5,
                      },
                    ]}>
                    +6
                  </Text>
                </ImageBackground>
                <View style={{ flexShrink: 2, marginLeft: 20 }}>
                  <Text style={[styles.boldText, { fontSize: 14, marginBottom: 10 }]}>
                    하나로세상(김*미 고객님)
                  </Text>
                  <Text style={[styles.normalText, { fontSize: 14, lineHeight: 22 }]}>
                    배송도 빠르고 프린트 퀄리티도 너무 좋아요 배송도 빠르고 프린트 퀄리티도 너무
                    좋아요
                  </Text>
                </View>
              </View>
              <View style={{ width: '100%', height: 1, backgroundColor: '#E3E3E3' }} />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                }}>
                <View>
                  <Text
                    style={[
                      styles.normalText,
                      { fontSize: 12, color: '#707070', marginBottom: 7 },
                    ]}>
                    소통만족도
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../../src/images/rating04.png')}
                      resizeMode="cover"
                      style={{ width: 55, height: 15, marginRight: 5 }}
                    />
                    <Text style={[styles.normalText, { fontSize: 10 }]}>4.0</Text>
                  </View>
                </View>
                <View>
                  <Text
                    style={[
                      styles.normalText,
                      { fontSize: 12, color: '#707070', marginBottom: 7 },
                    ]}>
                    품질만족도
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../../src/images/rating.png')}
                      resizeMode="cover"
                      style={{ width: 55, height: 15, marginRight: 5 }}
                    />
                    <Text style={[styles.normalText, { fontSize: 10 }]}>5.0</Text>
                  </View>
                </View>
                <View>
                  <Text
                    style={[
                      styles.normalText,
                      { fontSize: 12, color: '#707070', marginBottom: 7 },
                    ]}>
                    납기만족도
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../../src/images/rating.png')}
                      resizeMode="cover"
                      style={{ width: 55, height: 15, marginRight: 5 }}
                    />
                    <Text style={[styles.normalText, { fontSize: 10 }]}>5.0</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            {/* // 고객후기 리스트 박스 */}
            {/* 고객후기 리스트 박스 */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('ReviewDetail')}
              style={{ borderWidth: 1, borderColor: '#E3E3E3', borderRadius: 5, marginBottom: 10 }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  marginBottom: 20,
                  paddingTop: 20,
                  paddingHorizontal: 20,
                  paddingBottom: 10,
                }}>
                <ImageBackground
                  source={require('../../src/images/w02.jpg')}
                  resizeMode="cover"
                  style={{ width: 75, height: 70, position: 'relative' }}>
                  <Text
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      fontSize: 10,
                      backgroundColor: 'rgba(0,0,0,0.45)',
                      color: '#fff',
                      padding: 5,
                    }}>
                    +6
                  </Text>
                </ImageBackground>
                <View style={{ flexShrink: 2, marginLeft: 20 }}>
                  <Text style={[styles.boldText, { fontSize: 14, marginBottom: 10 }]}>
                    신세계세상(정*주 고객님)
                  </Text>
                  <Text style={[styles.normalText, { fontSize: 14, lineHeight: 22 }]}>
                    퀄리티 하나는 정말 끝내줍니다. 믿고 맡기는 업체로 선정한 지 꽤 됩니다.
                  </Text>
                </View>
              </View>
              <View style={{ width: '100%', height: 1, backgroundColor: '#E3E3E3' }} />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                }}>
                <View>
                  <Text
                    style={[
                      styles.normalText,
                      { fontSize: 12, color: '#707070', marginBottom: 7 },
                    ]}>
                    소통만족도
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../../src/images/rating04.png')}
                      resizeMode="cover"
                      style={{ width: 55, height: 15, marginRight: 5 }}
                    />
                    <Text style={[styles.normalText, { fontSize: 10 }]}>4.0</Text>
                  </View>
                </View>
                <View>
                  <Text
                    style={[
                      styles.normalText,
                      { fontSize: 12, color: '#707070', marginBottom: 7 },
                    ]}>
                    품질만족도
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../../src/images/rating.png')}
                      resizeMode="cover"
                      style={{ width: 55, height: 15, marginRight: 5 }}
                    />
                    <Text style={[styles.normalText, { fontSize: 10 }]}>5.0</Text>
                  </View>
                </View>
                <View>
                  <Text
                    style={[
                      styles.normalText,
                      { fontSize: 12, color: '#707070', marginBottom: 7 },
                    ]}>
                    납기만족도
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../../src/images/rating04.png')}
                      resizeMode="cover"
                      style={{ width: 55, height: 15, marginRight: 5 }}
                    />
                    <Text style={[styles.normalText, { fontSize: 10 }]}>4.0</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            {/* // 고객후기 리스트 박스 */}
            {/* 고객후기 리스트 박스 */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('ReviewDetail')}
              style={{ borderWidth: 1, borderColor: '#E3E3E3', borderRadius: 5, marginBottom: 10 }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  marginBottom: 20,
                  paddingTop: 20,
                  paddingHorizontal: 20,
                  paddingBottom: 10,
                }}>
                <ImageBackground
                  source={require('../../src/images/w03.jpg')}
                  resizeMode="cover"
                  style={{ width: 75, height: 70, position: 'relative' }}>
                  <Text
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      fontSize: 10,
                      backgroundColor: 'rgba(0,0,0,0.45)',
                      color: '#fff',
                      padding: 5,
                    }}>
                    +6
                  </Text>
                </ImageBackground>
                <View style={{ flexShrink: 2, marginLeft: 20 }}>
                  <Text style={[styles.boldText, { fontSize: 14, marginBottom: 10 }]}>
                    내안에바다(전*리 고객님)
                  </Text>
                  <Text style={[styles.normalText, { fontSize: 14, lineHeight: 22 }]}>
                    명함은 항상 여기서 주문해요. 고급지도 종류별로 다양하고 디지털로 찍어도 오프셋
                    뺨치게 잘나옵니다.
                  </Text>
                </View>
              </View>
              <View style={{ width: '100%', height: 1, backgroundColor: '#E3E3E3' }} />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                }}>
                <View>
                  <Text
                    style={[
                      styles.normalText,
                      { fontSize: 12, color: '#707070', marginBottom: 7 },
                    ]}>
                    소통만족도
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../../src/images/rating.png')}
                      resizeMode="cover"
                      style={{ width: 55, height: 15, marginRight: 5 }}
                    />
                    <Text style={[styles.normalText, { fontSize: 10 }]}>5.0</Text>
                  </View>
                </View>
                <View>
                  <Text
                    style={[
                      styles.normalText,
                      { fontSize: 12, color: '#707070', marginBottom: 7 },
                    ]}>
                    품질만족도
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../../src/images/rating.png')}
                      resizeMode="cover"
                      style={{ width: 55, height: 15, marginRight: 5 }}
                    />
                    <Text style={[styles.normalText, { fontSize: 10 }]}>5.0</Text>
                  </View>
                </View>
                <View>
                  <Text
                    style={[
                      styles.normalText,
                      { fontSize: 12, color: '#707070', marginBottom: 7 },
                    ]}>
                    납기만족도
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../../src/images/rating04.png')}
                      resizeMode="cover"
                      style={{ width: 55, height: 15, marginRight: 5 }}
                    />
                    <Text style={[styles.normalText, { fontSize: 10 }]}>4.0</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            {/* // 고객후기 리스트 박스 */}

            {/* 고객후기 전체보기 버튼 */}
            {/* <TouchableOpacity
              activeOpacity={0.8}
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff',
                borderWidth: 1,
                borderColor: '#E3E3E3',
                borderRadius: 5,
                marginTop: 20,
              }}>
              <Text
                style={[
                  styles.normalText,
                  { textAlign: 'center', fontSize: 16, color: '#444444', paddingVertical: 15 },
                ]}>
                고객후기 전체보기
              </Text>
            </TouchableOpacity> */}
            {/* // 고객후기 전체보기 버튼 */}
          </View>
          {/* // 고객후기 */}
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
